import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

const auth = firebase.auth();
const db = firebase.firestore();

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        activeUserUid: '',
        blogs: [],
        authFormLoading: false,
    },
    getters: {
        activeUserUid(state) {
            return state.activeUserUid;
        },
        blogs(state) {
            return state.blogs;
        },
        authFormLoading(state) {
            return state.authFormLoading;
        }
    },
    mutations: {
        activeUserUid(state, payload) {
            state.activeUserUid = payload;
        },
        addBlog(state, payload) {
            state.blogs = payload;
        },
        changeAuthLoadingStatus(state, payload) {
            state.authFormLoading = payload
        }
    },
    actions: {
        signup(context, payload) {
            // Set the authFormLoading to true
            context.commit('changeAuthLoadingStatus', true);

            const { userData, vm } = payload;
            // Creating a new User 
            auth.createUserWithEmailAndPassword(userData.email, userData.password
            ).then((response) => {
                // const { uid } = response.user;
                // Dispatching an action which will store the data in firestore
                context.dispatch('storeNewUserData', { ...userData })
                vm.$router.push({ name: 'dashboard' })
                // Set the authFormLoading to false
                context.commit('changeAuthLoadingStatus', false);
            }).catch(err => {
                console.log(err);
                // Set the authFormLoading to false
                context.commit('changeAuthLoadingStatus', false);
            });
        },
        signin(context, payload) {
            // Set the authFormLoading to true
            context.commit('changeAuthLoadingStatus', true);

            const { userData, vm } = payload;

            // Creating a new User 
            auth.signInWithEmailAndPassword(userData.email, userData.password
            ).then((response) => {
                // const { uid } = response.user;
                // Dispatching an action which will store the data in firestore
                vm.$router.push({ name: 'dashboard' })

                // Set the authFormLoading to false
                context.commit('changeAuthLoadingStatus', false);
            }).catch(err => {
                console.log(err);
                // Set the authFormLoading to false
                context.commit('changeAuthLoadingStatus', false);
            });
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
