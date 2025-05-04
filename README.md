# crop-coders -  [Presentation deck ](https://drive.google.com/file/d/1Y1Q-k5jYut5c2DRxnlPvy9Q6bWdNcLCl/view?usp=sharing)
# AgriCredit Platform: Farmers and Lenders
 
A real-world end-to-end system for farmer credit scoring, personalized loan recommendation, lender-farmer marketplace, and AI contract generation, fully integrated with speech-to-text and regional language support.
 
---
 
# 📦 Project Structure
 
```plaintext
/project-root/
│
├── /scripts/                    # Utility scripts for ML, STT, TTS, Translation
│     ├── sql_utils.py
│     ├── predict_credit_score.py
│     ├── speech_to_text_inference.py
│     ├── translate_text.py
│     ├── text_to_speech.py
│     ├── loan_recommendation_engine.py
│     ├── offer_generation.py
│     ├── llama_integration.py
│
├── /api_cpu/                     # CPU Node - Farmer + Lender Flask Server
│     ├── app.py
│
├── /api_gpu/                     # GPU Node - STT, TTS, Llama Flask Server
│     ├── app.py
│
├── /model/                       # Pretrained Models
│     ├── credit_score_model.pkl
│
├── /db/                          # Database Folder
│     ├── farmers.db (created after db_setup.py)
│
├── db_setup.py                   # Script to create database schema
├── dummy_seed_data.py             # Script to seed dummy farmers and lenders
├── requirements_cpu.txt           # CPU Requirements
├── requirements_gpu.txt           # GPU Requirements
├── run_server_cpu.sh              # Bash script to run CPU server
├── run_server_gpu.sh              # Bash script to run GPU server
├── README.md                      # This file
```
 
---
 
# 🛠 Setup Instructions
 
---
 
## 1. CPU Node Setup
 
### Login to CPU Node
 
```bash
ssh -i ~/.ssh/your_ssh_private_key root@<CPU_PUBLIC_IP>
```
 
### Update Packages
 
```bash
apt update && apt upgrade -y && apt install unzip git python3-pip python3-venv sqlite3 -y
```
 
### Upload Project
 
From your local Windows machine:
 
```bash
scp -i C:\Users\ADMIN\.ssh\your_key C:\Users\ADMIN\Downloads\project_root_final.zip root@<CPU_PUBLIC_IP>:/root/
```
 
### Unzip and Navigate
 
```bash
unzip project_root_final.zip
cd project_root_final
```
 
### Setup Python Virtual Environment
 
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements_cpu.txt
```
 
### Prepare Database
 
```bash
python3 db_setup.py
python3 dummy_seed_data.py
```
 
### Launch CPU Flask Server
 
```bash
bash run_server_cpu.sh
```
 
Or manually:
 
```bash
python3 api_cpu/app.py
```
 
✅ Runs on `http://<CPU_NODE_IP>:5000/`
 
---
 
## 2. GPU Node Setup
 
### Login to GPU Node
 
```bash
ssh -i ~/.ssh/your_ssh_private_key root@<GPU_PUBLIC_IP>
```
 
### Update Packages
 
```bash
apt update && apt upgrade -y && apt install unzip git python3-pip python3-venv -y
```
 
### Upload Project
 
From your local Windows machine:
 
```bash
scp -i C:\Users\ADMIN\.ssh\your_key C:\Users\ADMIN\Downloads\project_root_final.zip root@<GPU_PUBLIC_IP>:/root/
```
 
### Unzip and Navigate
 
```bash
unzip project_root_final.zip
cd project_root_final
```
 
### Setup Python Virtual Environment
 
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements_gpu.txt
```
 
### Launch GPU Flask Server
 
```bash
bash run_server_gpu.sh
```
 
Or manually:
 
```bash
python3 api_gpu/app.py
```
 
✅ Runs on `http://<GPU_NODE_IP>:6000/`
 
---
 
# 📡 API Summary
 
... (API details remain unchanged) ...
 
---
 
# 📣 Deployment Commands Quick Summary
 
```bash
# CPU Node
bash run_server_cpu.sh
 
# GPU Node
bash run_server_gpu.sh
 
# Prepare Database
python3 db_setup.py
python3 dummy_seed_data.py
```
