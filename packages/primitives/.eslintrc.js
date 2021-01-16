module.exports = {
  "parser": "@typescript-eslint/parser",
  'parserOptions': {
    'project': './tsconfig.json', // Required to have rules that rely on Types.
    'tsconfigRootDir': './'
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "standard"
  ]
}
