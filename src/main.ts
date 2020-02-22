import "./firebase/firebase";
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { router } from "./router";
import store from "./store/store";
import firebase from "firebase";

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user);
    store.dispatch.storeActiveUserUid(user.uid);
  } else {
    store.dispatch.storeActiveUserUid(null);
  }
});

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store: store.original
}).$mount("#app");
