module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'public', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': 'off',
  },
}
