<template>
  <main style="height: 100vh">
    <v-container class="fill-height">
      <v-row>
        <v-col class="d-flex align-center">
          <v-img max-width="700px" class="mx-auto mt-n12" :src="require('@/assets/img/404.svg')" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import store from "@/store/store";

@Component
export default class NotFound extends Vue {
  mounted() {
    store.commit.CHANGE_SHOW_NAV_STATUS(false);
  }
}
</script>