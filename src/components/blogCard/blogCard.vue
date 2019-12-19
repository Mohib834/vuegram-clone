<template>
  <v-layout row>
    <v-col v-for="(blog, i) in this.blogs" :key="i">
      <v-card class="blog-card mx-auto" elevation="5" max-width="350" style="border-radius:0">
        <v-img
          class="white--text align-end blog-img"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <div class="img-overlay" />
          <v-card-title>My Blog 1</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">Blog</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{blog.blog}}</div>
        </v-card-text>

        <v-card-actions class="pb-4">
          <v-btn class="text-capitalize" style="border-radius: 0" color="primary">View</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-layout>
</template>

<script>
export default {
  props: ["blogs"]
};
</script>