<template>
  <main>
    <v-container>
      <v-sheet
        style="border-radius:0"
        color="primary"
        class="pa-3 font-weight-bold white--text mb-4"
      >All Posts</v-sheet>
      <blogCard :blogs="blogs" />
    </v-container>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import blogCard from "@/components/blogCard/blogCard.vue";

export default {
  components: {
    blogCard
  },
  mounted() {
    this.$store.dispatch("fetchAllBlogs");
  },
  computed: {
    ...mapGetters(["blogs"])
  }
};
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