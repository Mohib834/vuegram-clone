<template>
  <v-layout row v-if="renderTemplate">
    <v-col cols="4" v-for="(blog, i) in blogs" :key="i">
      <v-card
        class="blog-card mx-auto"
        elevation="5"
        height="395px"
        max-width="350"
        style="border-radius:0"
      >
        <v-img
          class="white--text align-end blog-img"
          height="200px"
          :src="blog.blogContent.blogImage"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular width="2" indeterminate color="primary"></v-progress-circular>
            </v-row>
          </template>
          <div class="img-overlay" />
          <v-card-title>{{blog.blogContent.blogTitle}}</v-card-title>
        </v-img>

        <v-card-text class="text--primary">
          <div class="blog-text" v-html="trim(blog.blogContent.blogText)"></div>
        </v-card-text>
        <v-card-actions class="pb-4 mt-n1">
          <v-btn
            :to="`/blog/${blog.blogId}`"
            class="text-capitalize"
            style="position:relative; left: 5px; border-radius: 0"
            color="primary"
          >View</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Blog } from "../../store/modules/types";

@Component
export default class BlogCard extends Vue {
  renderTemplate = false;

  @Prop()
  blogs!: Array<Blog>;

  mounted() {
    if (this.blogs) this.renderTemplate = true;
  }

  trim(value: string) {
    return value.slice(0, 230) + "...";
  }
}
</script>

<style lang="scss">
.blog-text {
  * {
    font-size: 14px;
  }
  p {
    margin-bottom: 0;
  }
  br {
    display: none;
  }
}
</style>