module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    'semi': 'off',
    'brace-style': 'off',
    'quote-props': 'off',
    'comma-dangle': 'off',
    'func-call-spacing': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'array-bracket-spacing': 'off',
    'space-before-function-paren': 'off',
    'no-alert': 'warn',
    'camelcase': ['error', { properties: 'always' }],
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],

    'import/no-default-export': 'off',
    'import/no-cycle': 'off', // ESLINT_TODO: This should be 'error' instead of 'off'
    'no-useless-escape': 'off',
    'no-useless-catch': 'off', // ESLINT_TODO: This should be 'error' instead of 'off'
    'no-unreachable': 'error',
    'no-prototype-builtins': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-empty-pattern': 'error',


    'no-fallthrough': 'off',
    'no-case-declarations': 'off',
    'getter-return': 'error',
    'no-return-await': 'error',
    'no-nested-ternary': 'off', 
    'array-callback-return': 'error',

    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc',
        'scaleInstance',
      ],
    }],

    'no-empty-function': 'off',
    'no-unused-vars': 'off',
    'indent': 'off',

    '@typescript-eslint/func-call-spacing': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/indent': ['error', 2],

    'react-hooks/exhaustive-deps': 'off'
  },
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
