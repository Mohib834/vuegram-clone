<template>
  <main id="myblogs">
    <template v-if="renderTemplate">
      <v-container>
        <v-layout row>
          <v-col cols="12" sm="4">
            <v-card
              class="pa-6"
              flat
              style="border-radius:0; box-shadow: 0 10px 15px rgba(0,0,0,.1)"
            >
              <v-card-title class="px-0">{{user.firstName + ' ' + user.lastName}}</v-card-title>
              <v-card-subtitle class="px-0 mb-4">{{ user.occupation }}</v-card-subtitle>
              <v-sheet class="d-flex justify-center mt-5 mb-5 mt-4">
                <v-avatar v-if="!user.photo" color="grey" width="150px" height="150px">
                  <v-icon dark size="80px">mdi-account-circle</v-icon>
                </v-avatar>
                <v-avatar v-else width="200px" height="200px">
                  <img
                    style="object-fit: cover; object-position:top"
                    :src="user.photo"
                    width="100%"
                    height="100%"
                  />
                </v-avatar>
              </v-sheet>
              <v-card-text class="text-center mt-n1">{{user.bio}}</v-card-text>
              <v-btn
                style="border-radius:0"
                block
                color="primary"
                width="130px"
                class="text-none mb-3 mt-1"
                @click="show = true"
              >Create a Post</v-btn>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8">
            <template v-if="myBlogs.length === 0">
              <v-img
                class="align-center mx-auto"
                width="600px"
                height="600px"
                contain
                :src="require('@/assets/img/empty.svg')"
              >
                <h3
                  class="headline text-center primary--text"
                  style="position:absolute; top:0; left:50%; transform:translate(-50%)"
                >Blogs Not Found !</h3>
              </v-img>
            </template>
            <template v-else>
              <v-simple-table>
                <tbody>
                  <template v-if="loading">
                    <tr v-for="n in 3" :key="n">
                      <td class="px-0">
                        <v-skeleton-loader max-height="160px" type="article" />
                      </td>
                    </tr>
                  </template>
                  <tr class="table-row" v-for="blog in myBlogs" :key="blog.blogId">
                    <td class="pa-4" style="position:relative">
                      <v-btn
                        @click="dialog = true"
                        width="20px"
                        color="transparent"
                        elevation="0"
                        style="position:absolute; right: 0; top:0;"
                      >
                        <v-icon size="16px">mdi-close</v-icon>
                      </v-btn>
                      <h2 class="mb-1">{{ blog.blogContent.blogTitle }}</h2>
                      <p
                        class="mb-1 caption font-italic grey--text"
                      >{{ blog.blogContent.createdAt }}</p>
                      <p class="blog-text" v-html="trim(blog.blogContent.blogText)"></p>
                      <ul style="list-style:none" class="d-flex pl-0">
                        <li
                          class="mr-3 overline primary--text text-lowercase"
                        >comments {{blog.blogContent.comments ? blog.blogContent.comments.length : 0}}</li>
                        <li class="mr-3 overline primary--text text-lowercase">likes 0</li>
                        <li class="mr-3 overline primary--text text-lowercase">
                          <router-link :to="`/blog/${blog.blogId}`">view full post</router-link>
                        </li>
                      </ul>
                    </td>
                    <v-dialog v-model="dialog" max-width="500px" class="dialog">
                      <v-card style="border-radius: 0;" class="pa-3">
                        <v-card-title class="title d-flex flex-column pa-2">
                          <strong class="headline mb-0">Are you sure!</strong>
                          <p class="font-weight-light mb-0">
                            The blog will be deleted
                            completely?
                          </p>
                        </v-card-title>
                        <v-card-actions class="d-flex justify-center pa-2">
                          <v-btn
                            color="#F32013"
                            dark
                            width="100px"
                            :loading="loading"
                            style="border-radius:0"
                            @click="deleteBlog(blog.blogId)"
                            class="mr-4"
                          >Yes</v-btn>
                          <v-btn
                            color="primary"
                            width="100px"
                            @click="dialog = false"
                            style="border-radius:0"
                          >No</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </tr>
                </tbody>
              </v-simple-table>
            </template>
          </v-col>
        </v-layout>
      </v-container>
      <v-overlay v-if="show">
        <v-form ref="form" lazy-validation>
          <v-card
            color="#fff"
            width="1300px"
            light
            class="blog-editor-card"
            style="border-radius:0"
          >
            <v-overlay v-if="loading">
              <v-card
                color="#fff"
                elevation="6"
                class="d-flex flex-column"
                style="height: 100px;display: flex;align-items: center;padding: 4px 30px;z-index: 100;"
              >
                <v-card-title class="primary--text font-weight-bold">Please Wait</v-card-title>
                <v-sheet width="600px">
                  <v-progress-linear background-color="#bbb" :value="uploadProgress"></v-progress-linear>
                </v-sheet>
              </v-card>
            </v-overlay>
            <v-card-title class="card-title mb-4 py-2">
              <h3 class="white--text font-weight-medium">New Blog Entry</h3>
              <v-spacer />
              <v-btn @click="show = false" color="transparent" elevation="0">
                <v-icon color="#fff">mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-subtitle class="mt-0 mb-0 py-0 mb-n3">
              <v-text-field
                type="text"
                label="Your title goes here!"
                outlined
                style="border-radius:0"
                dense
                v-model="newBlogData.blogTitle"
                validate-on-blur
                :rules="rules.text"
              />
            </v-card-subtitle>
            <v-card-subtitle class="pb-0 mb-n1">
              <v-file-input
                style="border-radius:0"
                label="Upload blog banner image"
                prepend-inner-icon="mdi-camera"
                prepend-icon
                filled
                v-model="newBlogData.image"
                validate-on-blur
                :rules="rules.upload"
              ></v-file-input>
            </v-card-subtitle>
            <v-card-text style="overflow-y:scroll; max-height:400px">
              <vue-editor v-model="newBlogData.blogText"></vue-editor>
            </v-card-text>
            <v-card-actions
              style="background:#fff; z-index: 4; position:relative"
              class="px-4 mt-n4"
            >
              <v-btn
                :loading="loading"
                @click="submitBlog"
                color="primary"
                class="text-capitalize px-4"
                style="border-radius:0"
              >Add Post</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-form>
      </v-overlay>
    </template>
  </main>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import store from "@/store/store";
import { mapActions, mapGetters } from "vuex";
// @ts-ignore
import { VueEditor } from "vue2-editor";

@Component({
  components: {
    VueEditor
  }
})
export default class MyBlogs extends Vue {
  dialog: boolean;
  blog: string;
  show: boolean;
  loading: boolean;
  newBlogData: {
    blogText: string;
    blogTitle: string;
    image: File | null;
  };
  rules: {
    text: Array<Function>;
    upload: Array<Function>;
  };
  renderTemplate: boolean;

  @Ref("form") form!: HTMLFormElement;

  constructor() {
    super();
    this.blog = "";
    this.loading = false;
    this.show = false;
    this.newBlogData = {
      blogText: "",
      blogTitle: "",
      image: null
    };
    this.dialog = false;

    this.rules = {
      text: [(v: string) => v.length === 0 && "Field cannot be left empty"],
      upload: [(v: File) => !v && "Please Upload an image"]
    };
    this.renderTemplate = false;
  }

  mounted() {
    store.dispatch.fetchMyBlogs().then(() => {
      this.renderTemplate = true;
    });
  }

  get isLoading() {
    return store.getters.loading;
  }

  get myBlogs() {
    return store.getters.myBlogs;
  }

  get uploadProgress() {
    return store.getters.uploadProgress;
  }

  get user() {
    return store.getters.user;
  }

  trim(value: string) {
    return value.slice(0, 200) + "...";
  }

  submitBlog() {
    if (this.form.validate()) {
      this.loading = true;

      store.dispatch
        .submitBlog(
          this.newBlogData as {
            blogText: string;
            blogTitle: string;
            image: File;
            by: string;
          }
        )
        .then(response => {
          this.show = false;
          this.loading = false;
        })
        .catch(() => {
          this.show = false;
        });
    }
  }

  deleteBlog(blogId: string) {
    this.loading = true;
    store.dispatch
      .deleteMyBlog(blogId)
      .then(response => {
        this.loading = false;
        this.dialog = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss">
main#myblogs {
  position: relative;

  .table-row {
    transition: all 0.2s;
    margin-bottom: 10px;

    &:hover {
      background: #fff !important;
    }
    li {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .card-title {
    background: #655de2;
    color: #fff;
  }

  .dialog .v-dialog {
    border-radius: 0;
  }

  .blog-text br {
    display: none;
  }

  .empty {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-bottom: 5px;
      border-bottom: 2px solid #655de2;
    }
  }
}
</style>
