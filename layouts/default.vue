<template>
  <Nuxt />
</template>

<script>
export default {
  computed: {
    favicon() {
      return this.$store.state.dataSetting.find(item => item.key == 'favicon')?.isi;
    }
  },
  head() {
    return {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: this.ApiUrl(this.favicon) }
      ]
    }
  },
  methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
    },
  }
};
</script>

<style>
@import url("@/assets/ano/compro.css");
/* @import url("@/assets/ano/compro2.css"); */
@import url("@/assets/compro.css");
/* @import url("@/assets/theme/compro-2.css"); */
@import url("@/assets/theme/compro-3.css");
</style>

<style scoped lang="scss">
// #compro {
//   &::v-deep {
//     @import "~assets/ano/compro.css";
//     @import "~assets/compro.css";
//   }
// }
</style>
