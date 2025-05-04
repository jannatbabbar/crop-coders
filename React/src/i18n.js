import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        login: "Login"
      }
    },
    pa: {
      translation: {
        welcome: "ਸੁਆਗਤ ਹੈ",
        login: "ਲਾਗਇਨ ਕਰੋ"
      }
    },
    kn: {
      translation: {
        welcome: "ಸ್ವಾಗತ",
        login: "ಲಾಗಿನ್ ಮಾಡಿ"
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
