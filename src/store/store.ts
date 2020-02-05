import Vue from "vue";
import Vuex from "vuex";
import main from './modules/index';
import { createDirectStore } from 'direct-vuex';

Vue.use(Vuex);

const { store, moduleActionContext } = createDirectStore({
  modules: {
    main
  }
})

export default store;
export { moduleActionContext }

export type AppStore = typeof store
declare module "vuex" {
  interface Store<S> {
    direct: AppStore
  }
}

