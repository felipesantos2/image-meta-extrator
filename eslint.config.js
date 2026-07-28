import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default [
	// Ignorar pastas que não precisam de lint
	{ ignores: ['dist/', 'node_modules/'] },

	// Configuração principal para arquivos JS/JSX
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				__APP_VERSION__: 'readonly',
			},
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			// Regras recomendadas do ESLint
			...js.configs.recommended.rules,

			// Regras do React
			...reactPlugin.configs.recommended.rules,
			...reactPlugin.configs['jsx-runtime'].rules,

			// Regras do React Hooks
			...reactHooksPlugin.configs.recommended.rules,

			// Indentação com tabs
			indent: ['error', 'tab'],

			// Regras customizadas
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'no-console': ['warn', { allow: ['error'] }],
			'react/prop-types': 'off', // Não usamos PropTypes neste projeto

			// Desativar regra que impede setState em useEffect
			'react-hooks/set-state-in-effect': 'off',
		},
	},

	// Desabilitar regras de formatação que conflitam com Prettier
	prettierConfig,
];
