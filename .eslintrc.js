module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  root: true,
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'object-curly-newline': ['error', { ObjectPattern: { multiline: true } }],
    semi: ['error', 'never'],
    'prettier/prettier': [
      'warn',
      {
        semi: false,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 100,
        parser: 'typescript',
        tabWidth: 2,
        endOfLine: 'auto',
      },
    ],
  },
}
