<template>
  <main>
    <v-container>
      <blogCard :blogs="blogs" />
      <v-row v-if="loading">
        <v-col class="px-0" v-for="n in 3" :key="n">
          <v-skeleton-loader class="mx-auto" max-width="350" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-if="loading">
        <v-col class="px-0" v-for="n in 3" :key="n">
          <v-skeleton-loader class="mx-auto" max-width="350" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/store";
import { mapGetters, mapActions } from "vuex";
import blogCard from "@/components/blogCard/blogCard.vue";

@Component({
  components: {
    blogCard
  }
})
export default class blogs extends Vue {
  get blogs() {
    return store.getters.blogs;
  }

  get loading() {
    return store.getters.loading;
  }

  mounted() {
    store.dispatch.fetchAllBlogs();
  }
}
</script>

<style lang="scss" scoped>
.blog-card:hover {
  .img-overlay {
    opacity: 0;
  }
}

.blog-img {
  position: relative;
  .img-overlay {
    transition: all 0.3s;
    background: rgba(98, 203, 49, 0.3);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>