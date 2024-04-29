module.exports = {
  // root: true,

  parserOptions: {
    ecmaVersion: 2021 // Allows for the parsing of modern ECMAScript features
  },

  // env: {
  //   node: true,
  //   browser: true,
  //   'vue/setup-compiler-macros': true
  // },

  extends: [
    'plugin:vue/vue3-recommended',
  ],

  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',

    'import/no-absolute-path': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }

}
