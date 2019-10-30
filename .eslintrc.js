module.exports = {
  extends: ['airbnb-typescript', 'plugin:prettier/recommended', 'prettier/@typescript-eslint', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/state-in-constructor': 'off',
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  globals: {
    window: 'readonly',
  },
};
