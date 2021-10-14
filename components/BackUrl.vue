<template>
  <router-link
    v-if="url"
    role="button"
    :to="url"
    class="btn btn-outline-secondary mr-2 square"
    :title="title"
  >
    <b-icon icon="arrow-left" class="mr-1"></b-icon>
    <span v-if="title">{{ title }}</span>
  </router-link>
  <button
    v-else
    role="button"
    @click.prevent="$router.go(-1)"
    class="btn btn-outline-secondary mr-2 square"
    :title="title"
  >
    <b-icon icon="arrow-left" class="mr-1"></b-icon>
    <span v-if="title">{{ title }}</span>
  </button>
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
