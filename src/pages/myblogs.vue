<template>
  <main id="myblogs">
    <v-container>
      <v-layout row>
        <v-col cols="12" sm="4">
          <v-card class="pa-6" flat style="border-radius:0">
            <v-card-title class="px-0">Your Name</v-card-title>
            <v-card-subtitle class="px-0 mb-4"
              >Your Designation</v-card-subtitle
            >
            <v-sheet class="d-flex justify-center my-10 mt-4">
              <v-avatar color="grey" width="150px" height="150px">
                <v-icon dark size="80px">mdi-account-circle</v-icon>
              </v-avatar>
            </v-sheet>
            <v-btn
              style="border-radius:0"
              block
              color="primary"
              width="130px"
              class="text-none mb-3 mt-1"
              @click="show = true"
              >Create a Post</v-btn
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="8">
          <v-simple-table>
            <tbody>
              <template v-if="isLoading">
                <tr v-for="n in 3" :key="n">
                  <td>
                    <v-skeleton-loader
                      height="150px"
                      ref="skeleton"
                      class="mx-auto"
                      type="article"
                    />
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
                    <v-icon size="16px">
                      mdi-close
                    </v-icon>
                  </v-btn>
                  <h2 class="mb-1">{{ blog.blogContent.blogTitle }}</h2>
                  <p class="mb-1 caption font-italic grey--text">
                    {{ blog.blogContent.createdAt }}
                  </p>
                  <p
                    class="blog-text"
                    v-html="trim(blog.blogContent.blogText)"
                  ></p>
                  <ul style="list-style:none" class="d-flex pl-0">
                    <li class="mr-3 overline primary--text text-lowercase">
                      comments 0
                    </li>
                    <li class="mr-3 overline primary--text text-lowercase">
                      likes 0
                    </li>
                    <li class="mr-3 overline primary--text text-lowercase">
                      <router-link :to="`/blog/${blog.blogId}`">
                        view full post
                      </router-link>
                    </li>
                  </ul>
                </td>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                  persistent=""
                  class="dialog"
                >
                  <v-card style="border-radius: 0;">
                    <v-card-title class="title"
                      ><strong>Are you sure!</strong>The blog will be deleted
                      completely?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        @click="dialog = false"
                        style="border-radius:0"
                      >
                        No
                      </v-btn>

                      <v-btn
                        color="#F32013"
                        dark
                        :loading="loading"
                        class="ml-3"
                        style="border-radius:0"
                        @click="deleteBlog(blog.blogId)"
                      >
                        Yes
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-layout>
    </v-container>
    <v-overlay v-if="show">
      <v-card
        color="#fff"
        width="1300px"
        light
        class="blog-editor-card"
        style="border-radius:0"
      >
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
          />
        </v-card-subtitle>
        <v-card-subtitle class="pb-0 mb-n1">
          <v-file-input
            style="border-radius:0"
            label="Upload Blog Banner Image"
            prepend-inner-icon="mdi-camera"
            prepend-icon=""
            filled=""
            v-model="uploadedFile"
          ></v-file-input>
        </v-card-subtitle>
        <v-card-text>
          <vue-editor v-model="newBlogData.blogText"></vue-editor>
        </v-card-text>
        <v-card-actions class="px-4 pt-0 mt-n4">
          <v-btn
            :loading="loading"
            @click="submitBlog"
            color="primary"
            class="text-capitalize px-4"
            style="border-radius:0"
            >Add Post</v-btn
          >
          <v-spacer />
          <v-switch
            color="primary"
            v-model="publishSwitch"
            label="Public"
          ></v-switch>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store from "@/store/store";
import { mapActions, mapGetters } from "vuex";
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
  };
  publishSwitch: boolean;
  uploadedFile: any;

  constructor() {
    super();
    this.blog = "";
    this.loading = false;
    this.show = false;
    this.newBlogData = {
      blogText: "",
      blogTitle: ""
    };
    this.dialog = false;
    this.publishSwitch = false;
    this.uploadedFile = [];
  }

  mounted() {
    store.dispatch.fetchMyBlogs();
  }

  get isLoading() {
    return store.getters.loading;
  }

  get myBlogs() {
    return store.getters.myBlogs;
  }

  trim(value: string) {
    return value.slice(0, 200) + "...";
  }

  @Watch("uploadedFile")
  handler(v: any) {
    console.log(v);
  }

  submitBlog() {
    this.loading = true;
    store.dispatch
      .submitBlog(this.newBlogData)
      .then(response => {
        this.show = false;
        this.loading = false;
      })
      .catch(() => {
        this.show = false;
      });
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
    background: #62cb31;
    color: #fff;
  }

  .dialog .v-dialog {
    border-radius: 0;
  }

  .blog-text br {
    display: none;
  }
}
</style>
