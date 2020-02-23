<template>
  <header style="margin-bottom:90px;" v-if="showNav">
    <v-app-bar color="primary" dark fixed>
      <v-container>
        <v-layout>
          <v-toolbar-title style="font-size:24px" class="d-flex align-center font-weight-bold">
            <router-link
              style="text-decoration:none"
              class="white--text"
              :to="{name: 'blogs'}"
            >Vuegram</router-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-tabs
            height="40px"
            background-color="transparent"
            class="d-flex justify-end"
            style="width:80%"
            hide-slider
          >
            <v-tab style="font-size:15px" class="text-capitalize" :to="{name: 'blogs'}">All Blogs</v-tab>
            <v-tab style="font-size:15px" class="text-capitalize" :to="{name: 'myblogs'}">My Blogs</v-tab>
            <v-tab style="font-size:15px" class="text-capitalize" @click.prevent="logout">Logout</v-tab>
          </v-tabs>
        </v-layout>
      </v-container>
    </v-app-bar>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import store from "@/store/store";

@Component
export default class TheHeader extends Vue {
  get showNav() {
    return store.getters.showNav;
  }

  logout() {
    store.dispatch.signout({ vm: this });
  }
}
</script>