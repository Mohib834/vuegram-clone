import Vue from "vue";
import vueRouter, { Route } from "vue-router";
import { routes } from "./routes/routes";
import { openDB } from "idb";
import store from "./store/store";

Vue.use(vueRouter);

export const router = new vueRouter({
  routes,
  mode: "history"
});

router.beforeEach(async (to: Route, from: Route, next: Function) => {
  const requireAuth = to.meta.requireAuth;

  if (requireAuth) {
    store.getters.activeUserUid ? next() : null;
  } else next();
});
