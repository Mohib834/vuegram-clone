import Vue from "vue";
import vueRouter, { Route } from "vue-router";
import { routes } from "./routes/routes";
import store from "./store/store";
import firebase from "firebase";

Vue.use(vueRouter);

export const router = new vueRouter({
  routes,
  mode: "history"
});

router.beforeEach(async (to: Route, from: Route, next: Function) => {
  const requireAuth = to.meta.requireAuth;

  if (requireAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) return next();
      next("/signin");
    });
  } else next();
});
