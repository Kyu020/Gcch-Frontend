import { createApp } from "vue";
import { createPinia } from "pinia";
import axiosInstance from './plugins/axios';
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.config.globalProperties.$axios = axiosInstance;
app.use(createPinia());
app.use(router);

// ✅ WAIT for the router to be ready before mounting the app
router.isReady().then(() => {
  app.mount("#app");
  console.log('App mounted successfully');
}).catch(error => {
  console.error("Router error:", error);
  document.body.innerHTML = `
      <div style="color: red; padding: 20px;">
          Failed to initialize application. 
          Please ensure the backend server is running.
          Error: ${error.message}
      </div>
  `;
});

// Disable devtools
app.config.devtools = false;
app.config.debug = false;
app.config.silent = true;
