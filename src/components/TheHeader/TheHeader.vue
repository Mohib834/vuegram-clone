<template>
  <header class="mb-8">
    <v-app-bar color="primary" dark>
      <v-container>
        <v-layout>
          <v-toolbar-title style="font-size:24px" class="d-flex align-center font-weight-bold">
            <router-link
              style="text-decoration:none"
              class="white--text"
              :to="{name: 'dashboard'}"
            >Vuegram</router-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-tabs
            height="40px"
            background-color="transparent"
            class="d-flex justify-end"
            style="width:80%"
          >
            <v-tab style="font-size:15px" class="text-capitalize" :to="{name: dashboard}">All Posts</v-tab>
            <v-tab style="font-size:15px" class="text-capitalize" to="/myblogs">My Posts</v-tab>
            <v-tab style="font-size:15px" class="text-capitalize" @click.prevent="logout">Logout</v-tab>
          </v-tabs>
        </v-layout>
      </v-container>
    </v-app-bar>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("signout", { vm: this });
    }
  }
};
</script>