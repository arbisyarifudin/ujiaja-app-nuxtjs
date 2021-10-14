<template>
  <router-link
    role="button"
    :to="url ? url : ''"
    :tag="url ? 'a' : 'button'"
    @click.prevent="url ? '' : $router.go(-1)"
    class="btn btn-outline-secondary mr-2 square"
    :title="title"
  >
    <b-icon icon="arrow-left" class="mr-1"></b-icon>
    <span v-if="title">{{ title }}</span>
  </router-link>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "Kembali"
    }
  }
};
</script>
