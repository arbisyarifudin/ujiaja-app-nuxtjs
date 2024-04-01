<template>
  <header
    id="header"
    :class="['header', haveVariant ? 'variant-' + this.variant : '']"
    class="d-flex justify-content-center"
  >
    <NavHeader2 :navData="navData"/>
  </header>
</template>

<style scoped>

</style>

<script>
export default {
  props: ["variant", "navData"],
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
