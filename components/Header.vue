<template>
  <header
    id="header"
    :class="['header', haveVariant ? 'variant-' + this.variant : '']"
  >
    <NavHeader />
    <Hero :props="heroData" v-if="heroData" />
  </header>
</template>

<script>
export default {
  props: ["heroData", "variant"],
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