<template>
  <v-app class="v-app">
    <router-view></router-view>
  </v-app>
</template>

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