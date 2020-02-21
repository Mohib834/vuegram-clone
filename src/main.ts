import "./firebase/firebase";
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { router } from "./router";
import store from "./store/store";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store: store.original
}).$mount("#app");
