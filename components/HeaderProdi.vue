<template>
  <header
    :class="['header headerdua', haveVariant ? 'variant-' + this.variant : '']"
  >
      <!-- style="background: linear-gradient(180deg, rgba(115, 112, 251, 0.9) 0%, rgba(138, 131, 255, 0.9) 100%);
      box-shadow: 0px 2px 4px rgba(84, 84, 84, 0.12);
      border-radius: 0px 0px 12px 12px;" -->
    <NavHeader
    style="background-color: rgba(39, 13, 204, 0.75)!important;
      border-radius: 0px 0px 12px 12px;"
      :navData="navData"
    />
    <div class="hero" id="hero" style="min-height: 400px">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <div class="justify-content-center">
              <h2 class="m-0 mb-4" style="font-size: 40px">
                Temukan Program Studi
              </h2>
              <h4 class="m-0">
                Pastikan jurusan yang kamu pilih sesuai dengan minat dan bakat
                kamu.
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
  props: ["heroData", "variant", 'navData'],
  data() {
    return {};
  },
  computed: {
    haveVariant() {
      if (this.variant || this.variant == "") {
        return true;
      }
      return false;
    }
  }
};
</script>
