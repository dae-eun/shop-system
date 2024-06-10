// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  runtimeConfig: {
    public: {},
  },
  css: ["@/assets/scss/app.scss", "swiper/swiper-bundle.css"],
  plugins: ["~/plugins/eventBus.ts", "~/plugins/auth.ts"],
  modules: [
    '@pinia/nuxt',
    "nuxt-quasar-ui",
    "dayjs-nuxt",
    "@nuxt/eslint",
    "@nuxtjs/eslint-module",
  ],
  quasar: {
    lang: "ko-KR",
    extras: {
      fontIcons: ["material-icons"],
    },
  },
  dayjs: {
    locales: ["ko"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "ko",
  },
});
