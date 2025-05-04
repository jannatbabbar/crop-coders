import React, { useState, useRef } from 'react';
import { WaveFile } from 'wavefile';
import './Microphone.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFarmer } from './context/FarmerContext';

const Microphone = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState(null);
    const mediaRecorderRef = useRef(null);
    const navigate = useNavigate();
    const audioChunksRef = useRef([]);
    const {farmerId} = useFarmer();

    function encodeWAV(audioBuffer) {
        const numChannels = audioBuffer.numberOfChannels;
        const sampleRate = audioBuffer.sampleRate;
        const format = 1; // PCM
        const bitDepth = 16;
    
        // Interleave channels
        let interleaved;
        if (numChannels === 2) {
            const ch1 = audioBuffer.getChannelData(0);
            const ch2 = audioBuffer.getChannelData(1);
            interleaved = new Float32Array(ch1.length * 2);
            for (let i = 0; i < ch1.length; i++) {
                interleaved[i * 2] = ch1[i];
                interleaved[i * 2 + 1] = ch2[i];
            }
        } else {
            interleaved = audioBuffer.getChannelData(0);
        }
    
        // Convert float samples to 16-bit PCM
        const buffer = new ArrayBuffer(44 + interleaved.length * 2);
        const view = new DataView(buffer);
    
        function writeString(view, offset, string) {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        }
    
        let offset = 0;
    
        writeString(view, offset, 'RIFF'); offset += 4;
        view.setUint32(offset, 36 + interleaved.length * 2, true); offset += 4;
        writeString(view, offset, 'WAVE'); offset += 4;
        writeString(view, offset, 'fmt '); offset += 4;
        view.setUint32(offset, 16, true); offset += 4;             // Subchunk1Size
        view.setUint16(offset, format, true); offset += 2;         // AudioFormat
        view.setUint16(offset, numChannels, true); offset += 2;
        view.setUint32(offset, sampleRate, true); offset += 4;
        view.setUint32(offset, sampleRate * numChannels * bitDepth / 8, true); offset += 4;
        view.setUint16(offset, numChannels * bitDepth / 8, true); offset += 2;
        view.setUint16(offset, bitDepth, true); offset += 2;
        writeString(view, offset, 'data'); offset += 4;
        view.setUint32(offset, interleaved.length * 2, true); offset += 4;
    
        // Write PCM samples
        for (let i = 0; i < interleaved.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, interleaved[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    
        return view;
    }
    
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
    
        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };
    
        mediaRecorder.onstop = async () => {
            const webmBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    
            // Decode WebM into raw PCM samples
            const arrayBuffer = await webmBlob.arrayBuffer();
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
            // Convert decoded PCM to WAV
            const wavBuffer = encodeWAV(audioBuffer);
            const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });
    
            const formData = new FormData();
            formData.append('audio', wavBlob, 'recording.wav');  // Correct field name is 'audio'
            formData.append('farmer_id', farmerId);  // Add farmer ID here, replace '12345' with the actual farmer ID
    
            try {
                const response = await axios.post(
                    'http://164.52.192.217:5000/cpu/speech-to-offer',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                console.log(response.data); // Log the response to check the data
    
                const result = response.data;
                if (result.intent === 'credit-score') {
                    navigate('/farmer/credit-score');
                } else if (result.intent === 'loan-recommendations') {
                    navigate('/farmer/loan-recommendations');
                } else {
                    console.error('Unknown transcription:', result.transcription);
                }
                setTranscription(result.intent);
            } catch (error) {
                console.error('Error sending speech to offer:', error.response ? error.response.data : error);
            }
    
            audioChunksRef.current = [];
        };
    
        mediaRecorder.start();
        setIsRecording(true);
    };
    

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    return (
        <div className="microphone">
            <h1>Microphone Input</h1>
            {isRecording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ) : (
                <button onClick={startRecording}>Start Recording</button>
            )}
            {transcription && <p>Transcription: {transcription}</p>}
        </div>
    );
};

export default Microphone;