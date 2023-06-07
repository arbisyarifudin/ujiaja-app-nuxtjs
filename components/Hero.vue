<template>
  <div class="container">
    <div class="hero" id="hero">
      <div class="row">
        <div class="col-lg-6 col-md-8 col-12">
          <template v-if="props.isJudulFirst">
            <span v-html="props.subjudul" class="subjudul" />
            <h2 class="judul">{{ props.judul }}</h2>
          </template>
          <template v-else>
            <h2 class="judul">{{ props.judul }}</h2>
            <span v-html="props.subjudul" class="subjudul" />
          </template>
          <b-button
            v-if="props.ctaButtonText"
            :variant="props.ctaButtonVariant"
            class="px-4 button-cta"
            :href="props.cataButtonUrl"
            >{{ props.ctaButtonText }}</b-button
          >
        </div>
      </div>
      <img :src="formatImageSource(props.image)" class="hero-image" />
    </div>
  </div>
</template>

<style scoped>
  .button-cta:hover {
    transform: scale(1.1);
  }
</style>

<script>
export default {
  props: ["props"],
  methods: {
    formatImageSource(endpoint) {
      return process.env.apiUrl + `/storage/${endpoint}`;
    },
  }
};
</script>
