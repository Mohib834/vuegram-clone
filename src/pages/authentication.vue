<template>
  <main style="height:100vh">
    <v-container style="height:100vh" class="d-flex align-center">
      <v-row>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" class="d-flex align-center" sm="6">
          <v-img height="540px" width="670px" contain :src="require('@/assets/img/banner.svg')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-container class="d-flex justify-center" style="padding: 100px; height: 100%;">
            <router-view />
          </v-container>
        </v-col>
      </v-row>
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
