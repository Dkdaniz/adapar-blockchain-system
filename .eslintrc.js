module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': [2, { props: false }],
    'camelcase': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'no-plusplus': 'off',
    'no-case-declarations': 'off',
    'array-callback-return': 'off',
    'new-cap': 'off',
    'eslint-disable no-return-await': 'off',
    'eslint-disable no-await-in-loop': 'off',
    'eslint-disable-next-line no-return-await':'off',
    'eslint-disable consistent-return': 'off'
  },
};

