<template>
  <div class="section hero-lagi">
    <div class="container">
      <div class="row">
        <div
          class="
            col-md-6
            text-center
            pt-md-5
            pl-md-5
            pr-md-5
            pt-5
            px-3
            mb-4 mb-md-0
          "
        >
          <img :src="src" class="img-fluid" />
        </div>
        <div
          class="
            col-md-6
            pb-md-5
            pt-md-5
            pb-3
            d-flex
            flex-column
            justify-content-center
            align-items-start
          "
        >
          <h4>{{ title }}</h4>
          <div
            v-if="subtitle"
            style="font-size: 12px; color: #9490a4"
            class="mb-2 mt-n2"
          >
            {{ subtitle }}
          </div>
          <div v-html="description" />
          <a
            :href="href ? href : '#'"
            :class="isButton ? 'btn btn-outline-primary' : ''"
            >{{ ctaText }} <i class="fa fa-arrow-right" v-if="!isButton"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "subtitle",
    "description",
    "src",
    "href",
    "cta-text",
    "button",
  ],
  mounted() {
    // console.log(this.button);
  },
  computed: {
    isButton() {
      if (this.button == "" || this.button) {
        return true;
      }
      return false;
    },
  },
};
</script>
