module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint/eslint-plugin'
	],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: [
		'.eslintrc.js'
	],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'warning',
		'@typescript-eslint/quotes': 'single',
		quotes: [
			'error'
		],
		'jsx-quotes': [
			'warn',
			'prefer-single'
		],
		indent: [
			'error'
		],
		'block-scoped-var': [
			'warn'
		],
		'default-param-last': [
			'error'
		],
		eqeqeq: [
			'off'
		],
		'no-var': [
			'error'
		],
		'prefer-destructuring': [
			'warn'
		]
	}
};