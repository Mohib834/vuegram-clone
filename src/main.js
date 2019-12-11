import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import vueRouter from 'vue-router';
import './firebase/firebase';
import { store } from './store/store';
import { routes } from './routes/routes';

Vue.config.productionTip = false

Vue.use(vueRouter);
const router = new vueRouter({
  routes,
  mode: 'history',
})

new Vue({
  vuetify,
  render: h => h(App),
  store,
  router
}).$mount('#app')
