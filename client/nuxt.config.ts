// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: process.env.host,
    port: 3000,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      SUPABASE_IMAGES_BUCKET: process.env.SUPABASE_IMAGES_BUCKET,
    },
  },
  css: ['@/assets/scss/app.scss', 'swiper/swiper-bundle.css'],
  plugins: ['~/plugins/eventBus.ts'],
  modules: [
    '@pinia/nuxt',
    'nuxt-quasar-ui',
    'dayjs-nuxt',
    '@nuxt/eslint',
    '@nuxtjs/eslint-module',
    '@nuxtjs/supabase',
  ],
  quasar: {
    lang: 'ko-KR',
    extras: {
      fontIcons: ['material-icons'],
    },
  },
  dayjs: {
    locales: ['ko'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ko',
  },
  supabase: {
    // Options
    url: process.env.SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    redirect: true,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/userCheck',
      include: ['/cms(/*)?'],
      exclude: [],
      cookieRedirect: false,
    },
  },
});
