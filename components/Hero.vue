<template>
  <div class="container">
    <div class="hero" id="hero">
      <div class="row">
        <div class="col-lg-6 col-md-8 col-12">
          <template v-if="props.isJudulFirst">
            <p class="subjudul">{{ props.subjudul }}</p>
            <h2 class="judul">{{ props.judul }}</h2>
          </template>
          <template v-else>
            <h2 class="judul">{{ props.judul }}</h2>
            <p class="subjudul">{{ props.subjudul }}</p>
          </template>
          <b-button
            :variant="props.ctaButtonVariant"
            class="px-4"
            :href="props.cataButtonUrl"
            >{{ props.ctaButtonText }}</b-button
          >
        </div>
      </div>
      <img :src="props.image" class="hero-image" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["props"],
};
</script>