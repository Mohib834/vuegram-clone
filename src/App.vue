<template>
  <v-app class="v-app">
    <TheHeader v-if="$route.name != 'registration' && $route.name != 'signin'" />
    <v-snackbar :color="snackbar.color" top right v-model="snackbar.toggle">{{ snackbar.message }}</v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/store";
import TheHeader from "@/components/TheHeader/TheHeader.vue";

@Component({
  components: {
    TheHeader
  }
})
export default class App extends Vue {
  get snackbar() {
    return store.getters.snackbar;
  }
}
</script>

<style lang="scss">
.v-app {
  background: rgba(#655de2, 0.15) !important;
  // background: #fff !important;
  font-family: "Montserrat", sans-serif !important;
}

.vuegram-link {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>