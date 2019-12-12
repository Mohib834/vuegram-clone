import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
const auth = firebase.auth();
const db = firebase.firestore();

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        activeUserUid: '',
        blogs: []
    },
    getters: {
        activeUserUid(state) {
            return state.activeUserUid;
        },
        blogs(state) {
            return state.blogs;
        }
    },
    mutations: {
        activeUserUid(state, payload) {
            state.activeUserUid = payload;
        },
        addBlog(state, payload) {
            state.blogs = payload;
        }
    },
    actions: {
        signup(context, payload) {
            const { userData, vm } = payload;
            // Creating a new User 
            auth.createUserWithEmailAndPassword(userData.email, userData.password
            ).then((response) => {
                // const { uid } = response.user;
                // Dispatching an action which will store the data in firestore
                context.dispatch('storeNewUserData', { ...userData })
                vm.$router.push({ name: 'dashboard' })
            }).catch(err => console.log(err));
        },
        signin(context, payload) {
            const { userData, vm } = payload;
            console.log(context);
            // Creating a new User 
            auth.signInWithEmailAndPassword(userData.email, userData.password
            ).then((response) => {
                // const { uid } = response.user;
                // Dispatching an action which will store the data in firestore
                vm.$router.push({ name: 'dashboard' })
            }).catch(err => console.log(err));
        },
        async signout(context, payload) {
            const { vm } = payload;
            await auth.signOut()
            vm.$router.push({ name: 'registration' })
        },
        storeNewUserData(context, payload) {
            // Storing the user data in firestore.
            db.collection('users').add(payload)
                .catch(err => console.log(err));
        },
        storeActiveUserUid(context, payload) {
            context.commit('activeUserUid', payload);
        },
        submitBlog(context, payload) {
            const { activeUserUid } = context.getters;
            console.log(activeUserUid);
            db.collection('blogs').add({ blog: payload.blogText, uid: activeUserUid })
                .then(response => context.dispatch('fetchAllBlogs'))
                .catch(err => console.log(err))
        },
        fetchAllBlogs(context, payload) {
            const blogs = [];
            db.collection('blogs').onSnapshot(snapshot => {
                const changes = snapshot.docChanges();
                changes.forEach(change => {
                    if (change.type === 'added') { //If it is being added then add the added blog into the state.blogs
                        blogs.push(change.doc.data());
                    }
                })
            })
            context.commit('addBlog', blogs)
        }
    }
})
