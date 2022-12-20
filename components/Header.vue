<template>
  <header
    id="header"
    :class="['header', haveVariant ? 'variant-' + this.variant : '']"
  >
    <NavHeader :navData="navData"/>

    <Hero :props="heroData" v-if="heroData" />
  </header>
</template>

<style scoped>

</style>

<script>
export default {
  props: ["heroData", "variant", "navData"],
  data() {
    return {};
  },
  computed: {
    haveVariant() {
      if (this.variant || this.variant == "") {
        return true;
      }
      return false;
    },
  },
};
</script>
