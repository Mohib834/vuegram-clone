import Vue from "vue";
import Vuex from "vuex";
import { moduleActionContext } from "../store";
import { State, UserData } from "./types";
import firebase from "firebase";
import { defineModule } from "direct-vuex";
import { Blog } from "./types";
import moment from "moment";

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

Vue.use(Vuex);

const store = defineModule({
  state: (): State => ({
    activeUserUid: "",
    blogs: [],
    myBlogs: [],
    blog: {} as Blog,
    authFormLoading: false,
    loading: false,
    showNav: true
  }),
  getters: {
    activeUserUid(state: State) {
      return state.activeUserUid;
    },
    blog(state: State) {
      return state.blog;
    },
    blogs(state: State) {
      return state.blogs;
    },
    myBlogs(state: State) {
      return state.myBlogs;
    },
    authFormLoading(state: State) {
      return state.authFormLoading;
    },
    loading(state: State) {
      return state.loading;
    },
    showNav(state: State) {
      return state.showNav;
    }
  },
  mutations: {
    SET_ACTIVE_USER_UID(state: State, payload: string) {
      state.activeUserUid = payload;
    },
    SET_BLOG(state: State, payload: Blog) {
      state.blog = payload;
    },
    SET_BLOGS(state: State, payload: Array<Blog>) {
      state.blogs = payload;
    },
    SET_MY_BLOGS(state: State, payload: Array<Blog>) {
      state.myBlogs = payload;
    },
    CHANGE_AUTH_LOADING_STATUS(state: State, payload: boolean) {
      state.authFormLoading = payload;
    },
    CHANGE_LOADING_STATUS(state: State, payload: boolean) {
      state.loading = payload;
    },
    CHANGE_SHOW_NAV_STATUS(state: State, payload: boolean) {
      state.showNav = payload;
    }
  },
  actions: {
    signup(context, payload: { userData: UserData; vm: Vue }) {
      const { commit, dispatch } = modActionContext(context);
      // Set the authFormLoading to true
      commit.CHANGE_AUTH_LOADING_STATUS(true);

      const { userData, vm } = payload;

      // Creating a new User
      auth
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then(response => {
          // const { uid } = response.user;
          // Dispatching an action which will store the data in firestore
          dispatch.storeNewUserData({ ...userData });
          vm.$router.push({ name: "posts" });
          // Set the authFormLoading to false
          commit.CHANGE_AUTH_LOADING_STATUS(false);
        })
        .catch(err => {
          console.log(err);
          // Set the authFormLoading to false
          commit.CHANGE_AUTH_LOADING_STATUS(false);
        });
    },
    signin(context, payload: { userData: UserData; vm: Vue }) {
      const { commit } = modActionContext(context);

      // Set the authFormLoading to true
      commit.CHANGE_AUTH_LOADING_STATUS(true);
      const { userData, vm } = payload;

      // Creating a new User
      auth
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then(response => {
          // const { uid } = response.user;
          // Dispatching an action which will store the data in firestore
          vm.$router.push({ name: "posts" });

          // Set the authFormLoading to false
          commit.CHANGE_AUTH_LOADING_STATUS(false);
        })
        .catch(err => {
          console.log(err);
          // Set the authFormLoading to false
          commit.CHANGE_AUTH_LOADING_STATUS(false);
        });
    },
    async signout(context, payload: { vm: Vue }) {
      const { vm } = payload;
      await auth.signOut();
      vm.$router.push({ name: "registration" });
    },
    storeNewUserData(context, payload: UserData) {
      // Storing the user data in firestore.
      db.collection("users")
        .add(payload)
        .catch(err => console.log(err));
    },
    storeActiveUserUid(context, payload: string) {
      const { commit } = modActionContext(context);
      commit.SET_ACTIVE_USER_UID(payload);
    },
    async submitBlog(
      context,
      payload: { blogText: string; blogTitle: string; image: File }
    ) {
      const { commit, dispatch, getters } = modActionContext(context);
      commit.CHANGE_LOADING_STATUS(true);

      const { activeUserUid } = getters;

      let blog: Blog = {
        uid: activeUserUid,
        blogContent: {
          blogImage: "",
          blogTitle: payload.blogTitle,
          blogText: payload.blogText,
          createdAt: moment()
            .subtract(1, "days")
            .format("DD-MM-YYYY | h:mm:ss a"),
          createdBy: "User"
        }
      };

      let storageRef = storage.ref(activeUserUid); // Creating a reference to storage naming with a user id
      let fileRef = await storageRef
        .child("/blog-image/" + payload.image)
        .put(payload.image); // creating a file reference and uploading it on that reference.

      // fileRef.ref.getDownloadURL().then(downloadUrl => {
      //   console.log("url", downloadUrl);
      //   // Getting the download url after file uploadation
      //   blog.blogContent["blogImage"] = downloadUrl;
      // });

      let downloadUrl = await fileRef.ref.getDownloadURL();

      blog.blogContent["blogImage"] = downloadUrl;

      return new Promise((resolve, reject) => {
        db.collection("blogs")
          .add(blog)
          .then(response => {
            commit.CHANGE_LOADING_STATUS(false);
            resolve();
          })
          .catch(err => {
            console.log(err);
            commit.CHANGE_LOADING_STATUS(false);
            reject();
          });
      });
    },
    fetchAllBlogs(context) {
      const { commit } = modActionContext(context);
      // Set loading true
      commit.CHANGE_LOADING_STATUS(true);

      const blogs: Array<Blog> = [];

      db.collection("blogs").onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            //If it is being "added" then add the added blog into the state.blogs
            if (change.type == "added") {
              let blog = {
                ...change.doc.data(),
                blogId: change.doc.id
              } as Blog;

              blogs.push(blog);
              commit.SET_MY_BLOGS(blogs);
            }
          }
        });
        commit.SET_BLOGS(blogs);
        commit.CHANGE_LOADING_STATUS(false);
      });
    },
    fetchMyBlogs(context) {
      const { getters, commit } = modActionContext(context);
      commit.CHANGE_LOADING_STATUS(true);
      let blogs: Array<Blog> = [];
      const { activeUserUid } = getters;
      db.collection("blogs")
        .where("uid", "==", activeUserUid)
        .onSnapshot(snapshot => {
          const changes = snapshot.docChanges();
          changes.forEach(change => {
            if (change.type == "added") {
              let blog = {
                ...change.doc.data(),
                blogId: change.doc.id
              } as Blog;

              blogs.push(blog);
              commit.SET_MY_BLOGS(blogs);
            } else {
              blogs = getters.myBlogs.filter(blog => {
                return blog.blogId !== change.doc.id;
              });
              commit.SET_MY_BLOGS(blogs);
            }
          });
          commit.CHANGE_LOADING_STATUS(false);
        });
    },
    fetchABlog(context, payload: { id: string }): Promise<Blog> {
      const { commit } = modActionContext(context);
      const { id } = payload;
      commit.CHANGE_LOADING_STATUS(true);
      return new Promise((resolve, reject) => {
        db.collection("blogs")
          .doc(id)
          .get()
          .then(snapshot => {
            let blog = snapshot.data() as Blog;
            commit.SET_BLOG(blog);
            commit.CHANGE_LOADING_STATUS(false);
            resolve();
          })
          .catch(err => {
            console.log(err);
            commit.CHANGE_LOADING_STATUS(false);
            reject();
          });
      });
    },
    deleteMyBlog(context, payload: string) {
      //   const { dispatch } = modActionContext(context);
      const id = payload;
      db.collection("blogs")
        .doc(id)
        .delete();
      //   dispatch.fetchMyBlogs();
    },
    addComment(context, payload: { comment: string; blogId: string }) {
      const { dispatch, getters } = modActionContext(context);

      let blogComment = {
        text: payload.comment,
        by: "Mohib", // later
        createdAt: moment()
          .subtract(1, "days")
          .format("DD-MM-YYYY | h:mm:ss a")
      };
      // @ts-ignore
      let blogComments = [...getters.blog.blogContent.comments, blogComment];

      return new Promise((resolve, reject) => {
        db.collection("blogs")
          .doc(payload.blogId)
          .update({
            "blogContent.comments": blogComments
          })
          .then(response => {
            dispatch.fetchABlog({ id: payload.blogId });
            resolve();
          })
          .catch(err => {
            reject();
          });
      });
    }
  }
});

export default store;
// For Action types reflection
// Refer Direct-vuex documentation.
const modActionContext = (context: any) => moduleActionContext(context, store);
