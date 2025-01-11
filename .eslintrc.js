module.exports = {
  extends: ['airbnb-base', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'markdown',
    'html',
  ],
  env: {
    browser: true,
  },
  rules: {
    // dæmi verða læsilegri ef þau eru ekki með löngum línum
    'max-len': ['error', { code: 80, ignoreUrls: true }],

    // console.log mikið notað í dæmum
    'no-console': 0,

    // leyfa i++ í for
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    'function-paren-newline': ['error', 'consistent'],

    // viljum frekar named export
    'import/prefer-default-export': 0,

    // verðum að hafa .mjs
    'import/extensions': 0,

    'no-continue': 0,
  },
};
