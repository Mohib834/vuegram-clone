import Vue from "vue";
import Vuex from "vuex";
import { moduleActionContext } from "../store";
import { State, UserData } from "./types";
import firebase, { FirebaseError } from "firebase";
import { defineModule } from "direct-vuex";
import { Blog } from "./types";
import moment from "moment";

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

Vue.use(Vuex);

const store = defineModule({
  state: (): State => ({
    activeUserUid: null,
    blogs: [],
    myBlogs: [],
    blog: {} as Blog,
    authFormLoading: false,
    loading: false,
    showNav: true,
    uploadProgress: 0,
    user: {} as Omit<UserData, "password">,
    snackbar: {} as {
      toggle: boolean;
      message: string;
      color: string;
    }
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
    },
    uploadProgress(state: State) {
      return state.uploadProgress;
    },
    user(state: State) {
      return state.user;
    },
    snackbar(state: State) {
      return state.snackbar;
    }
  },
  mutations: {
    SET_ACTIVE_USER_UID(state: State, payload: string | null) {
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
    },
    SET_UPLOAD_PROGRESS(state: State, payload: number) {
      state.uploadProgress = payload;
    },
    SET_USER_DATA(state: State, payload: Omit<UserData, "password">) {
      state.user = payload;
    },
    TOGGLE_SNACKBAR(
      state: State,
      payload: { message: string; toggle: boolean; color: string }
    ) {
      state.snackbar = payload;
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
          delete userData.password;

          if (response.user)
            dispatch.storeNewUserData({
              userData,
              uid: response.user.uid
            });

          vm.$router.push({ name: "setup" });
          // Set the authFormLoading to false
          commit.CHANGE_AUTH_LOADING_STATUS(false);
        })
        .catch(err => {
          console.log(err);
          // Set the authFormLoading to false
          commit.CHANGE_AUTH_LOADING_STATUS(false);
          commit.TOGGLE_SNACKBAR({
            toggle: true,
            message: err.message,
            color: "#CA0B00"
          });
        });
    },
    signin(
      context,
      payload: { userData: { email: string; password: string }; vm: Vue }
    ) {
      const { commit } = modActionContext(context);

      // Set the authFormLoading to true
      commit.CHANGE_AUTH_LOADING_STATUS(true);
      const { userData, vm } = payload;

      // Creating a new User
      auth
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then(response => {
          // Set the authFormLoading to false
          commit.CHANGE_AUTH_LOADING_STATUS(false);
          // Redirect
          vm.$router.push({ name: "myblogs" });
        })
        .catch(err => {
          console.log(err);
          // Set the authFormLoading to false
          commit.CHANGE_AUTH_LOADING_STATUS(false);
          commit.TOGGLE_SNACKBAR({
            toggle: true,
            message: err.message,
            color: "#CA0B00"
          });
        });
    },
    async signout(context, payload: { vm: Vue }) {
      const { vm } = payload;
      await auth.signOut();
      vm.$router.push({ name: "registration" });
    },
    getUserData(context, payload: { uid: string }) {
      const { commit } = modActionContext(context);
      commit.CHANGE_LOADING_STATUS(true);

      db.collection("users")
        .doc(payload.uid)
        .get()
        .then(response => {
          commit.SET_USER_DATA(response.data() as Omit<UserData, "password">);
          commit.CHANGE_LOADING_STATUS(false);
        })
        .catch(err => {
          console.log(err);
        });
    },
    storeNewUserData(
      context,
      payload: { userData: Omit<UserData, "password">; uid: string }
    ) {
      const { commit } = modActionContext(context);
      // set user state
      commit.SET_USER_DATA(payload.userData);
      // Storing the user data in firestore.
      return db
        .collection("users")
        .doc(payload.uid)
        .set(payload.userData);
    },
    setupUser(
      context,
      payload: {
        data: { photo: File | null; bio: string; occupation: string };
        vm: Vue;
      }
    ) {
      const { commit, getters, dispatch } = modActionContext(context);
      commit.SET_UPLOAD_PROGRESS(0);
      commit.CHANGE_LOADING_STATUS(true);

      if (getters.activeUserUid) {
        console.log("activeUserId inside");
        // #If user has added the photo
        // ## Upload the photo
        // ### Store the data.
        // #### else only upload the data without the photo
        // ##### Redirect to myblogs in both case

        // #If user has added the photo

        if (payload.data.photo) {
          let storageRef = storage.ref(getters.activeUserUid);
          // ## Upload the photo

          let fileRef = storageRef.child("/user-image/" + payload.data.photo);
          let uploadTask = fileRef.put(payload.data.photo);
          uploadTask.on(
            "state_changed",
            snapshot => {
              // current upload snapshot
              let percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              commit.SET_UPLOAD_PROGRESS(percentage);
            },
            err => {
              console.log(err);
            },
            () => {
              // ### Store the data.

              // Generate the photo download url
              uploadTask.snapshot.ref.getDownloadURL().then(url => {
                // Add More data to existing data
                let moreData = {
                  photo: url,
                  bio: payload.data.bio,
                  occupation: payload.data.occupation
                };

                db.collection("users")
                  .doc(getters.activeUserUid!)
                  .set(moreData, {
                    merge: true
                  })
                  .then(response => {
                    // set user state with additional data
                    let oldData = getters.user;
                    commit.SET_USER_DATA({
                      ...oldData,
                      ...moreData
                    });

                    payload.vm.$router.push({ name: "myblogs" });
                  });
              });
            }
          );
        } else {
          let moreData = {
            photo: null,
            bio: payload.data.bio,
            occupation: payload.data.occupation
          };
          // store additional data
          db.collection("users")
            .doc(getters.activeUserUid!)
            .set(moreData, {
              merge: true
            })
            .then(() => {
              // set user state with additional data
              let oldData = getters.user;
              commit.SET_USER_DATA({
                ...oldData,
                ...moreData
              });
              payload.vm.$router.push({ name: "myblogs" });
            });
        }
      }
    },
    storeActiveUserUid(context, payload: string | null) {
      const { commit } = modActionContext(context);
      commit.SET_ACTIVE_USER_UID(payload);
    },
    async submitBlog(
      context,
      payload: { blogText: string; blogTitle: string; image: File }
    ) {
      const { commit, dispatch, getters } = modActionContext(context);
      commit.CHANGE_LOADING_STATUS(true);
      commit.SET_UPLOAD_PROGRESS(0);
      const { activeUserUid } = getters;

      let blog: Blog = {
        uid: activeUserUid!,
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

      let storageRef = storage.ref(activeUserUid!); // Creating a reference to storage naming with a user id
      let fileRef = storageRef.child("/blog-images/" + payload.image); // creating a file reference.
      let uploadTask = fileRef.put(payload.image);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          snapshot => {
            // current upload snapshot
            let percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            commit.SET_UPLOAD_PROGRESS(percentage);
          },
          err => {
            // if error on upload
            console.log(err);
          },
          () => {
            // after completion
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
              blog.blogContent.blogImage = url;
              // Submit the blog data
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
          }
        );
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
              commit.SET_BLOGS(blogs);
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
            } else if (change.type == "removed") {
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
      const { comments } = getters.blog.blogContent;

      let blogComment = {
        text: payload.comment,
        by: "Mohib", // later
        createdAt: moment()
          .subtract(1, "days")
          .format("DD-MM-YYYY | h:mm:ss a")
      };

      let blogComments: { text: string; by: string; createdAt: string }[] | [];

      if (comments) {
        blogComments = comments.map(comment => comment);
      } else {
        blogComments = [];
      }

      blogComments = [...blogComments, blogComment];

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
