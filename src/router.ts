import Vue from 'vue';
import vueRouter from 'vue-router';
import { routes } from './routes/routes';
import firebase from 'firebase';
import { openDB } from 'idb';
import store from './store/store';

Vue.use(vueRouter);

export const router = new vueRouter({
    routes,
    mode: 'history',
})

router.beforeEach(async (to, from, next) => {
    const requireAuth = to.meta.requireAuth;
    if (requireAuth) {
        const db = await openDB('firebaseLocalStorageDb', 1)
        const tx = db.transaction('firebaseLocalStorage', 'readonly');
        const IdbStore = tx.objectStore('firebaseLocalStorage');
        const currentUser = await IdbStore.getAll();
        tx.done;
        db.close();

        if (!currentUser[0]) {
            next({ name: 'registration' }); // If user is not logged in then go to registration page
        }
        // Storing active user id in the state
        store.dispatch.storeActiveUserUid(currentUser[0].value.uid);
        next();
    } else {
        next();
    }
})