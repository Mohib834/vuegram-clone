import "./firebase/firebase";
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { router } from "./router";
import store from "./store/store";
import firebase from "firebase";
import { Component } from "vue-property-decorator";

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch.storeActiveUserUid(user.uid);
    store.dispatch.getUserData({ uid: user.uid });
  } else {
    store.dispatch.storeActiveUserUid(null);
  }
});

Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
]);

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store: store.original
}).$mount("#app");
