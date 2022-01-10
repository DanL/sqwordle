module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'never'],
    'no-alert': ['off'],
    'no-param-reassign': ['off'],
    'no-underscore-dangle': ['off'],
    'no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'comma-dangle': ['always-multiline'],
    'react/react-in-jsx-scope': ['off'],
    'react/prop-types': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
  },
}
