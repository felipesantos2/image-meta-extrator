import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './pt.json';
import en from './en.json';

i18n.use(initReactI18next).init({
	resources: {
		pt: { translation: pt },
		en: { translation: en },
	},
	lng: 'pt', // Idioma padrão: Português
	fallbackLng: 'pt',
	interpolation: {
		escapeValue: false, // React já faz o escape
	},
});

export default i18n;
