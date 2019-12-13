<template>
  <div>
    <TheHeader />
    <main>
      <blogsContainer />
    </main>
  </div>
</template>

<script>
import blogsContainer from "@/components/blogsContainer/blogsContainer.vue";
import TheHeader from "@/components/TheHeader/TheHeader.vue";

export default {
  components: {
    blogsContainer,
    TheHeader
  }
};
</script>