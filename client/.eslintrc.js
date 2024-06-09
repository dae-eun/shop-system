module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:vue/vue3-recommended", "plugin:prettier/recommended"],
  plugins: ["vue", "prettier"],
  rules: {
    "no-console": "off",
    "vue/no-v-html": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "vue/multi-word-component-names": ["error", { ignores: ["index", "default", "sub", "clear", "error"] }]
  }
}
