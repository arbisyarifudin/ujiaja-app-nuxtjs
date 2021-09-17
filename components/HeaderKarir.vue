<template>
  <header
    :class="[
      'header headerdua-karir',
      haveVariant ? 'variant-' + this.variant : '',
    ]"
  >
    <NavHeader />
    <div class="hero" id="hero" style="min-height: 400px">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <div class="justify-content-center">
              <h2 class="m-0 mb-4" style="font-size: 40px">
                Bergabunglah Dengan UjiAja!
              </h2>
              <h4 class="m-0">
                Mari bergabung bersama kami untuk majukan teknologi pendidikan
                Indonesia
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["heroData", "variant"],
  data() {
    return {};
  },
  computed: {
    haveVariant() {
      if (this.variant || this.variant == "") {
        return true;
      }
      return false;
    },
  },
};
</script>