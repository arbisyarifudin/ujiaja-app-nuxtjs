<template>
    <div></div>
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
};
</script>
