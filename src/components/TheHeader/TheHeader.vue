<template>
  <header style="margin-bottom:90px;" v-if="showNav">
    <v-navigation-drawer color="primary" dark v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item>
          <router-link
            class="white--text"
            style="font-size:16px; text-decoration:none;"
            :to="{name: 'blogs'}"
          >All Blogs</router-link>
        </v-list-item>
        <template v-if="userLoggedIn">
          <v-list-item>
            <router-link
              class="white--text"
              style="font-size:16px; text-decoration:none;"
              :to="{name: 'myblogs'}"
            >My Blogs</router-link>
          </v-list-item>
          <v-list-item>
            <v-btn
              dark
              depressed
              color="white"
              class="primary--text font-weight-bold text-capitalize"
              style=" text-decoration:none;"
              @click.prevent="logout"
            >Logout</v-btn>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item>
            <router-link class="white--text" :to="{name: 'signin'}">Login</router-link>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark fixed>
      <v-container>
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer" v-if="$vuetify.breakpoint.mdAndDown"></v-app-bar-nav-icon>
          <v-toolbar-title class="d-flex align-center font-weight-bold" style="font-size:24px">
            <router-link
              style="text-decoration:none"
              class="white--text"
              :to="{name: 'blogs'}"
            >Vuegram</router-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-tabs
            v-if="!$vuetify.breakpoint.mdAndDown"
            height="40px"
            background-color="transparent"
            class="d-flex justify-end"
            style="width:80%"
            hide-slider
          >
            <v-tab style="font-size:15px" class="text-capitalize" :to="{name: 'blogs'}">All Blogs</v-tab>
            <template v-if="userLoggedIn">
              <v-tab style="font-size:15px" class="text-capitalize" :to="{name: 'myblogs'}">My Blogs</v-tab>
              <v-tab style="font-size:15px" class="text-capitalize" @click.prevent="logout">Logout</v-tab>
            </template>
            <template v-else>
              <v-tab style="font-size:15px" class="text-capitalize" :to="{name: 'signin'}">Login</v-tab>
            </template>
          </v-tabs>
        </v-row>
      </v-container>
    </v-app-bar>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import store from "@/store/store";

@Component
export default class TheHeader extends Vue {
  drawer = false;

  get showNav() {
    return store.getters.showNav;
  }

  get userLoggedIn() {
    return store.getters.activeUserUid;
  }

  logout() {
    store.dispatch.signout({ vm: this });
  }
}
</script>