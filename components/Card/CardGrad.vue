<template>
  <div :class="['card-gradient', lg_class]">
    <slot />
  </div>
</template>

<script>
export default {
  props: ["lg"],
  data() {
    return {};
  },
  computed: {
    lg_class() {
      switch (this.lg) {
        case "top-bottom":
          return "lg-top-to-bottom";
        case "left-right":
          return "lg-left-to-right";
        case "right-left":
          return "lg-right-to-left";
        default:
          return "lg-top-to-bottom";
      }
    },
  },
};
</script>