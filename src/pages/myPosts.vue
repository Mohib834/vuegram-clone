<template>
  <main>
    <v-container>
      <v-layout row>
        <v-col cols="12" sm="4">
          <v-card class="pa-6" flat style="border-radius:0">
            <v-card-title class="px-0">Your Name</v-card-title>
            <v-card-subtitle class="px-0 mb-4">Your Designation</v-card-subtitle>
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
            >Create a Post</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8">
          <v-simple-table>
            <tbody>
              <tr class="table-row" v-for="(b, i) in myBlogs" :key="i">
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
    <v-overlay v-if="show">
      <v-card color="#fff" light class="blog-editor-card" style="border-radius:0">
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
          />
        </v-card-subtitle>
        <v-card-text>
          <vue-editor v-model="newBlogData.content"></vue-editor>
        </v-card-text>
        <v-card-actions class="px-4 pt-0 mt-n4">
          <v-btn color="primary" class="text-capitalize px-4" style="border-radius:0">Add Post</v-btn>
          <v-spacer />
          <v-switch color="primary" v-model="publishSwitch" label="Public"></v-switch>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </main>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  mounted() {
    this.$store.dispatch("fetchMyBlogs");
  },
  data() {
    return {
      blogText: "",
      show: false,
      newBlogData: {
        content: ""
      },
      publishSwitch: false
    };
  },
  computed: {
    ...mapGetters(["myBlogs"])
  }
};
</script>

<style lang="scss">
main {
  position: relative;
}

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

.card-title {
  background: #62cb31;
  color: #fff;
}
</style>