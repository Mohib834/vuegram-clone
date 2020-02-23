<template>
  <main v-if="renderTemplate" style="background:#fff">
    <section>
      <v-container fluid class="pa-0" style="position:relative;height: 80vh">
        <div
          style="z-index: 10; position:absolute; top: 50%; left: 50%; transform:translate(-50%,-50%);"
        >
          <span
            class="d-block white--text text-center mt-n3 caption"
          >{{ blog.blogContent.createdAt }}</span>
          <h1 class="display-4 white--text text-center">{{ blog.blogContent.blogTitle }}</h1>
          <span class="d-block white--text text-center mt-6">
            <v-avatar class="mr-2" v-if="user.photo" size="40px">
              <img :src="user.photo" style="object-position:top; object-fit:cover;" />
            </v-avatar>
            <v-avatar class="mr-2" v-else>
              <v-icon dark size="40px">mdi-account-circle</v-icon>
            </v-avatar>
            {{blog.blogContent.createdBy.name}}
          </span>
        </div>
        <v-img
          style="filter: brightness(0.5);"
          width="100%"
          height="100%"
          :src="blog.blogContent.blogImage"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
              style="background:#f7f7f7;"
            ></v-row>
          </template>
        </v-img>
      </v-container>
    </section>
    <section>
      <v-container style="max-width: 700px; " class="mt-10">
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet v-html="blog.blogContent.blogText"></v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-col>
            <v-card color="#f7f7f7" elevation="0" class="pa-10">
              <v-sheet width="680px" color="transparent" class="mx-auto">
                <strong class="mb-10 d-block">{{ commentsNum }}</strong>
                <v-list color="transparent">
                  <v-list-item
                    class="px-0 mb-12 d-flex align-center"
                    style="position: relative; transition:all .3s"
                    v-for="(comment, i) in blog.blogContent.comments"
                    :key="i"
                  >
                    <span
                      class="caption"
                      style="position:absolute; right: 0; top:-10px;"
                    >{{ comment.createdAt }}</span>
                    <v-avatar
                      class="mr-2"
                      v-if="blog.blogContent.createdBy.photo"
                      size="70px"
                      style="position:relative; left: -6px;top:-30px"
                    >
                      <img
                        :src="blog.blogContent.createdBy.photo"
                        style="object-position:top; object-fit:cover;"
                      />
                    </v-avatar>
                    <v-avatar class="mr-2" v-else style="position:relative; left: -6px;top:-16px">
                      <v-icon color="primary" dark size="70px">mdi-account-circle</v-icon>
                    </v-avatar>
                    <v-sheet
                      class="d-flex flex-column"
                      width="100%"
                      color="transparent"
                      min-height="70px"
                    >
                      <v-list-item-title class="mb-1 mr-auto font-weight-bold">{{ comment.by }}</v-list-item-title>
                      <v-list-item-action-text
                        class="font-weight-bold"
                        style="line-height:1.4; display:block"
                      >{{ comment.text }}</v-list-item-action-text>
                      <v-btn
                        color="#F32013"
                        height="30px"
                        class="mb-3 font-weight-bold mt-3 ml-auto"
                        dark
                        style="border-radius:0; font-size: 10px;"
                      >delete</v-btn>
                      <v-divider />
                    </v-sheet>
                  </v-list-item>
                </v-list>
                <v-form ref="form" class="d-flex flex-column" @submit.prevent="submitComment">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    label="Comment..."
                    background-color="#fff"
                    v-model="comment"
                    :disabled="loading"
                  ></v-textarea>
                  <v-btn
                    :loading="loading"
                    @click="submitComment"
                    color="primary"
                    dark
                    class="ml-auto font-weight-bold"
                  >Post</v-btn>
                </v-form>
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import store from "@/store/store";
import { Blog as BlogType } from "@/store/modules/types";

@Component
export default class Blog extends Vue {
  comment = "";
  renderTemplate = false;

  @Ref("form") form!: HTMLFormElement;

  get loading() {
    return store.getters.loading;
  }

  get blog() {
    return store.getters.blog;
  }

  get user() {
    return store.getters.user;
  }

  get commentsNum() {
    if (this.blog.blogContent.comments) {
      return this.blog.blogContent.comments.length == 1
        ? "1 Comment"
        : this.blog.blogContent.comments.length + " Comments";
    } else {
      return "0 Comments";
    }
  }

  submitComment() {
    // console.log(this.$route.params);
    store.dispatch
      .addComment({
        comment: this.comment,
        blogId: this.$route.params.id
      })
      .then(() => {
        this.form.reset();
      })
      .catch(() => {
        this.form.reset();
      });
  }

  mounted() {
    store.dispatch.fetchABlog({ id: this.$route.params.id }).then(() => {
      this.renderTemplate = true;
    });
    store.commit.CHANGE_SHOW_NAV_STATUS(false);
  }

  destroyed() {
    store.commit.CHANGE_SHOW_NAV_STATUS(true);
  }
}
</script>
