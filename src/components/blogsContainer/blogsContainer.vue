<template>
  <v-container>
    <v-layout row>
      <v-col cols="12" sm="4">
        <v-card class="pa-6" flat style="border-radius:0">
          <v-card-title class="px-0">Your Name</v-card-title>
          <v-card-subtitle class="px-0 mb-4">Your Designation</v-card-subtitle>
          <v-textarea
            v-model="blogText"
            rows="8"
            flat
            outlined
            label="Create a Post"
            style="border-radius:0"
          ></v-textarea>
          <v-btn
            style="border-radius:0"
            block
            color="primary"
            width="130px"
            class="text-capitalize mb-3 mt-1"
            @click.prevent="postBlog"
          >Post</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-simple-table>
          <tbody>
            <tr class="table-row" v-for="(b, i) in blogs" :key="i">
              <td class="pa-4">
                <h2 class="mb-1">Blog Heading</h2>
                <p class="mb-1 caption font-italic grey--text">2 days ago</p>
                <p>{{b.blog}}</p>
                <ul style="list-style:none" class="d-flex pl-0">
                  <li class="mr-3 overline primary--text text-lowercase">comments 0</li>
                  <li class="mr-3 overline primary--text text-lowercase">likes 0</li>
                  <li class="mr-3 overline primary--text text-lowercase">view full post</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  mounted() {
    this.$store.dispatch("fetchAllBlogs");
  },
  data() {
    return {
      blogText: ""
    };
  },
  computed: {
    ...mapGetters(["blogs"])
  },
  methods: {
    ...mapActions(["submitBlog"]),
    postBlog() {
      this.submitBlog({ blogText: this.blogText });
      this.blogText = "";
    }
  }
};
</script>

<style lang="scss">
.table-row {
  transition: all 0.2s;
  &:hover {
    background: rgba(#62cb31, 0.1);
  }

  li {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
