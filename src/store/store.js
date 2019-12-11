import Vue from 'vue';
import Vuex from 'vuex';
// import axiosDB from 'axios/axiosDB.js';
// import axios from 'axios';
import firebase from 'firebase'
const auth = firebase.auth();
const db = firebase.firestore();

Vue.use(Vuex);

export const store = new Vuex.Store({
    store: {
        blogText: '',
    },
    mutations: {
    },
    actions: {
        signup(context, payload) {
            const { userData, vm } = payload;

            // Creating a new User 
            auth.createUserWithEmailAndPassword(userData.email, userData.password
            ).then((response) => {
                const { uid } = response.user;
                // Dispatching an action which will store the data in firestore
                context.dispatch('storeNewUserData', { ...userData })
                vm.$router.push({ name: 'dashboard' })
            }).catch(err => console.log(err));
        },
        storeNewUserData(context, payload) {
            // Storing the user data in firestore.
            db.collection('users').add(payload)
                .then(() => {
                    context.commit('storeNewUserData', payload);
                })
                .catch(err => console.log(err));
        },
        submitBlog(context, payload) {
            db.collection('blogs').add({ blog: context.state.blogText })
                .then(response => console.log(response))
                .catch(err => console.log(err))
        },
        fetchCurrentUserBlogs(context, payload) {
            auth.onAuthStateChanged(user => {
                if (user) {
                    db.collection('blogs').doc().then(response => console.log(response))
                }
            })
        }
    }
})