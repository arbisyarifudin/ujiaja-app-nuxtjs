<template>
  <header
    :class="[
      'header headerdua-karir karir-detail',
      haveVariant ? 'variant-' + this.variant : '',
    ]"
  >
    <!-- style="background-image: url('/baba.png')" -->
    <NavHeader :navData="navData"/>
    <div class="hero" id="hero" style="min-height: 400px">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center pb-4">
            <div
              class="justify-content-center p-3"
              style="background: rgba(138, 131, 255, 0.5); border-radius: 12px"
            >
              <h2 class="mt-4" style="font-size: 46px">
                Graphic Designer (Magang)
              </h2>
              <h4 style="font-size: 22px">Salary Rp 2.200.000</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["heroData", "variant", "navData"],
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