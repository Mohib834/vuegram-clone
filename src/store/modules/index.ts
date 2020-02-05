import Vue from 'vue';
import Vuex from 'vuex';
import { moduleActionContext } from '../store';
import { State, UserData } from './types';
import firebase from 'firebase';
import { createModule } from 'direct-vuex';
import { Blog } from './types';
import moment from 'moment';

const auth = firebase.auth();
const db = firebase.firestore();

Vue.use(Vuex);

const store = createModule({
    state: (): State => ({
        activeUserUid: '',
        blogs: [],
        myBlogs: [],
        authFormLoading: false,
        loading: false,
    }),
    getters: {
        activeUserUid(state: State) {
            return state.activeUserUid;
        },
        blogs(state: State) {
            return state.blogs;
        },
        myBlogs(state: State) {
            return state.myBlogs
        },
        authFormLoading(state: State) {
            return state.authFormLoading;
        },
        loading(state: State) {
            return state.loading;
        }
    },
    mutations: {
        activeUserUid(state: State, payload: string) {
            state.activeUserUid = payload;
        },
        addBlogs(state: State, payload: Array<Blog>) {
            state.blogs = payload;
        },
        addMyBlogs(state: State, payload: Array<Blog>) {
            state.myBlogs = payload;
        },
        changeAuthLoadingStatus(state: State, payload: boolean) {
            state.authFormLoading = payload
        },
        changeLoadingStatus(state: State, payload: boolean) {
            state.loading = payload;
        }
    },
    actions: {
        signup(context, payload: { userData: UserData, vm: Vue }) {
            const { commit, dispatch } = modActionContext(context);
            // Set the authFormLoading to true
            commit.changeAuthLoadingStatus(true);

            const { userData, vm } = payload;

            // Creating a new User 
            auth.createUserWithEmailAndPassword(userData.email, userData.password
            ).then((response) => {
                // const { uid } = response.user;
                // Dispatching an action which will store the data in firestore
                dispatch.storeNewUserData({ ...userData })
                vm.$router.push({ name: 'posts' })
                // Set the authFormLoading to false
                commit.changeAuthLoadingStatus(false);
            }).catch(err => {
                console.log(err);
                // Set the authFormLoading to false
                commit.changeAuthLoadingStatus(false);
            });
        },
        signin(context, payload: { userData: UserData, vm: Vue }) {
            const { commit } = modActionContext(context);

            // Set the authFormLoading to true
            commit.changeAuthLoadingStatus(true)
            const { userData, vm } = payload;

            // Creating a new User 
            auth.signInWithEmailAndPassword(userData.email, userData.password
            ).then((response) => {
                // const { uid } = response.user;
                // Dispatching an action which will store the data in firestore
                vm.$router.push({ name: 'posts' })

                // Set the authFormLoading to false
                commit.changeAuthLoadingStatus(false)

            }).catch(err => {
                console.log(err);
                // Set the authFormLoading to false
                commit.changeAuthLoadingStatus(false)

            });
        },
        async signout(context, payload: { vm: Vue }) {
            const { vm } = payload;
            await auth.signOut()
            vm.$router.push({ name: 'registration' })
        },
        storeNewUserData(context, payload: UserData) {
            // Storing the user data in firestore.
            db.collection('users').add(payload)
                .catch(err => console.log(err));
        },
        storeActiveUserUid(context, payload: string) {
            const { commit } = modActionContext(context);
            commit.activeUserUid(payload);
        },
        submitBlog(context, payload: { blogText: string }) {
            const { commit, dispatch, getters } = modActionContext(context);
            commit.changeLoadingStatus(true);

            const { activeUserUid } = getters;
            let blog: Blog = {
                uid: activeUserUid,
                blogContent: {
                    blogText: payload.blogText,
                    createdAt: moment().subtract(1, 'days').format('YYYY-MM-DD h:mm:ss a'),
                    createdBy: 'User'
                }
            }

            db.collection('blogs').add(blog)
                .then(response => {
                    //dispatch.fetchAllBlogs()
                    commit.changeLoadingStatus(false);
                })
                .catch(err => {
                    console.log(err)
                    commit.changeLoadingStatus(false);
                })
        },
        fetchAllBlogs(context) {
            const { commit } = modActionContext(context);
            // Set loading true
            commit.changeLoadingStatus(true);

            const blogs: Array<Blog> = [];

            db.collection('blogs').onSnapshot(snapshot => {
                const changes = snapshot.docChanges();
                changes.forEach(change => {
                    if (change.type === 'added') { //If it is being "added" then add the added blog into the state.blogs
                        const blog = change.doc.data() as Blog
                        blogs.push(blog);
                    }
                })
                context.commit('addBlogs', blogs)
                commit.changeLoadingStatus(false);
            })
        },
        fetchMyBlogs(context) {
            const { getters, commit } = modActionContext(context);
            const blogs: Array<Blog> = [];
            const { activeUserUid } = getters
            db.collection('blogs').where('uid', '==', activeUserUid).onSnapshot(snapshot => {
                const changes = snapshot.docChanges();
                console.log(changes);
                changes.forEach(change => {
                    console.log(change);
                    if (change.type === 'added') { // Will add the one which have 'added' type and will remove the 'deleted' one
                        console.log(change);
                        console.log(change.doc);
                        console.log(change.doc.data());
                    }
                })
            })
            commit.addMyBlogs(blogs);
        },
        deleteMyBlog(context, payload) {
            const { dispatch } = modActionContext(context);
            const id = payload;
            db.collection('blogs').doc(id).delete();
            dispatch.fetchMyBlogs();
        }
    }
})

export default store;
// For Action types reflection
// Refer Direct-vuex documentation.
const modActionContext = (context: any) => moduleActionContext(context, store);