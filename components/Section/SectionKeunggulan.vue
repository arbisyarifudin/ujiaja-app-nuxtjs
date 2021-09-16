<template>
  <div
    :class="['section section-keunggulan', haveVariant ? this.variant : '']"
    id="section-keunggulan"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center mb-2">
          <h2 class="judul">{{ props.judul }}</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div id="keunggulan-nav">
            <button class="nav-prev">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-next">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div id="keunggulan-slider">
            <no-ssr>
              <vue-tiny-slider v-bind="tinySliderOptions">
                <div
                  class="slider-item"
                  v-for="(item, i) in props.item"
                  :key="'sk' + i"
                >
                  <div
                    class="
                      d-flex
                      flex-column
                      justify-content-center
                      align-items-center
                      p-2
                    "
                  >
                    <img :src="item.gambar" class="image" />
                    <h2 class="title">{{ item.judul }}</h2>
                    <p class="caption">{{ item.subjudul }}</p>
                  </div>
                </div>
              </vue-tiny-slider>
            </no-ssr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionKeunggulan",
  props: ["props", "variant"],
  computed: {
    haveVariant() {
      if (this.variant || this.variant == "") {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      tinySliderOptions: {
        mouseDrag: false,
        autoplay: true,
        autoplayButtonOutput: false,
        loop: true,
        nav: false,
        controls: true,
        controlsText: [
          '<i class="fas fa-chevron-left"></i>',
          '<i class="fas fa-chevron-right"></i>',
        ],
        controlsContainer: "#keunggulan-nav",
        gutter: 20,
        swipeAngle: 45,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          992: {
            items: 3,
          },
        },
      },
    };
  },
};
</script>

