module.exports = {
  extends: ['./node_modules/@open-wc/eslint-config/index.js', require.resolve('eslint-config-prettier')],
  rules: {
    'max-classes-per-file': 'off',
  },
};