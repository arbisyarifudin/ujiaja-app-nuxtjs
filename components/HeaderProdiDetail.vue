<template>
  <header
    :class="[
      'header headerdua-karir karir-detail',
      haveVariant ? 'variant-' + this.variant : ''
    ]"
    :style="
      `
      background: linear-gradient(360deg, rgba(138, 131, 255, 0.68) 0%, rgba(246, 244, 255, 0.3) 100% ), 
      url(/background/temukan-program.png);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;`
    "
  >
    <NavHeader
      style="background: linear-gradient(180deg, #F9F871 0%, #FFFFC1 100%);  box-shadow: 0px 2px 4px rgba(84, 84, 84, 0.12);
      border-radius: 0px 0px 12px 12px;"
      :navData="navData"
    />
    <div class="hero" id="hero" style="min-height: 400px;">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center pb-4">
            <div
              class="justify-content-center p-3"
              style="background: rgba(138, 131, 255, 0.5); border-radius: 12px"
            >
              <h2 class="mt-4 mb-3" style="font-size: 46px">
                {{ heroData.nama_studi }}
              </h2>
              <!-- <div class="row">
                <div class="col-md-6 text-right pr-4">
                  <h4>Pelajaran Terkait: Matematika</h4>
                </div>
                <div class="col-md-6 text-left pl-4">
                  <h4>Kategori Prodi: Komputer & Teknologi</h4>
                </div>
              </div> -->
              <!-- <p
                style="font-size: 22px"
                class="text-white"
                v-if="heroData.mapel"
              >
                Pelajaran Terkait:
                {{ heroData.mapel.nama_mapel }}
              </p> -->
              <div v-if="heroData.list_mapel && heroData.list_mapel.length > 0">
                <p class="text-white" style="font-size: 22px">
                  Pelajaran Terkait: <br />
                  <span
                    v-for="(item, index) in heroData.list_mapel"
                    :key="index"
                    class="small"
                  >
                    {{ item.mapel.nama_mapel }}
                    <span v-if="index != heroData.list_mapel.length - 1"
                      >,</span
                    >
                  </span>
                </p>
              </div>
              <div v-else>
                <p class="text-white" style="font-size: 22px">
                  Pelajaran Terkait: -
                </p>
              </div>
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
    }
  }
};
</script>
