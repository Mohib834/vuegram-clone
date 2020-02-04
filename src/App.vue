<template>
  <v-app class="v-app">
    <TheHeader v-if="$route.name != 'registration' && $route.name != 'signin'" />
    <router-view></router-view>
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader.vue";

export default {
  components: {
    TheHeader
  }
};
</script>

<style lang="scss">
.v-app {
  background: rgba(#46bd87, 0.15) !important;
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