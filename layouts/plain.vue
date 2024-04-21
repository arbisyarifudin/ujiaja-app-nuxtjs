<template>
  <Nuxt />
</template>

<style lang="scss">
.option-text {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    padding-top: 0px;
    padding-bottom: 0px;
    p {
        margin-bottom: 0!important;
        padding-left: 5px;
    }
}
</style>

<script>
export default {
  computed: {
    favicon() {
      return this.$store.state.dataSetting.find(item => item.key == 'favicon')?.isi;
    }
  },
  head() {
    return {
      title: 'App',
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
