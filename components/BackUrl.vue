<template>
  <button
    type="button"
    @click.prevent="url ? $router.push(url) : $router.go(-1)"
    class="btn btn-outline-secondary mr-2 square"
  >
    <b-icon icon="arrow-left" class="mr-1"></b-icon>
    Kembali
  </button>
</template>

<script>
export default {
  props: ["url"]
};
</script>
