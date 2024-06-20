import vueDompurifyHTMLPlugin from 'vue-dompurify-html';

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(vueDompurifyHTMLPlugin);
});
