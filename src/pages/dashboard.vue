<template>
  <div>
    <header class="mb-8">
      <v-app-bar color="primary" dark>
        <v-container>
          <v-layout>
            <v-toolbar-title
              style="font-size:24px"
              class="d-flex align-center font-weight-bold"
            >Vuegram</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-list color="transparent">
              <v-list-item>
                <a class="vuegram-link white--text" @click.prevent="logout">Logout</a>
              </v-list-item>
            </v-list>
          </v-layout>
        </v-container>
      </v-app-bar>
    </header>
    <main>
      <vuegram-blogs-container />
    </main>
  </div>
</template>

<script>
import vuegramBlogsContainer from "../components/vuegramBlogsContainer/vuegramBlogsContainer.vue";

export default {
  components: {
    vuegramBlogsContainer
  },
  methods: {
    logout() {
      this.$store.dispatch("signout", { vm: this });
    }
  }
};
</script>