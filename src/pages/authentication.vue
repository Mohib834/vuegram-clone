<template>
  <main>
    <v-container fluid class="pa-0">
      <v-layout class="pa-0">
        <v-col class="pa-0" cols="12" sm="6">
          <v-img height="100vh" :src="require('@/assets/img/banner.png')" />
        </v-col>
        <v-col class="pa-0" cols="12" sm="6">
          <v-container class="d-flex" style="padding: 100px; height: 100%;">
            <router-view />
          </v-container>
        </v-col>
      </v-layout>
    </v-container>
  </main>
</template>


<style lang="scss">
.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: rgba(0, 0, 0, 0.2) !important;

  &:hover {
    border-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
