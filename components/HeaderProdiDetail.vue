<template>
  <header
    :class="[
      'header headerdua-karir karir-detail',
      haveVariant ? 'variant-' + this.variant : ''
    ]"
    :style="
      `background: linear-gradient(360deg, rgba(138, 131, 255, 0.68) 0%, rgba(246, 244, 255, 0.3) 100% ), url(/karir-deskripsi.png);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;`
    "
  >
    <NavHeader />
    <div class="hero" id="hero" style="min-height: 400px;">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center pb-4">
            <div
              class="justify-content-center p-3"
              style="background: rgba(138, 131, 255, 0.5); border-radius: 12px"
            >
              <h2 class="mt-4 mb-3" style="font-size: 46px">
                Teknik Informatika
              </h2>
              <!-- <div class="row">
                <div class="col-md-6 text-right pr-4">
                  <h4>Pelajaran Terkait: Matematika</h4>
                </div>
                <div class="col-md-6 text-left pl-4">
                  <h4>Kategori Prodi: Komputer & Teknologi</h4>
                </div>
              </div> -->
              <p style="font-size: 22px" class="text-white">
                Pelajaran Terkait: Matematika
              </p>
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
    }
  }
};
</script>
