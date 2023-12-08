<template>
  <div>
    <NavHeader :navData="navData"/>

    <no-ssr>
      <vue-tiny-slider v-bind="tinySliderOptions" class="caraousel-image">
        <div v-for="(hero, indexHero) in heroData" :key="indexHero">
          <div class="container textBanner">
            <h2 class="judul">{{ hero.judul }}</h2>
            <p class="subjudul" v-html="hero.text" />
          </div>
          <img :src="formatImageSource(hero.banner)" alt="hero-image" />
        </div>
      </vue-tiny-slider>
    </no-ssr>

    <!-- <div class="caraousel-image my-slider">
      <div>
        <img src="https://picsum.photos/1600/900" alt="" srcset="" />
      </div>
      <div>
        <img src="https://picsum.photos/1600/900" alt="" srcset="" />
      </div>
      <div>
        <img src="https://picsum.photos/1600/900" alt="" srcset="" />
      </div>
    </div> -->
  </div>
</template>

<style scoped>

  nav {
    position: absolute;
    width: 100%;
    margin-left: 0 !important;
    z-index: 99;
    background: #454545aa !important;
  }
  .caraousel-image {
    min-height: 480px;
    max-height: 90vh;
    overflow: hidden;
  }

  .caraousel-image img {
    width: 100%;
  }

  .caraousel-image .textBanner {
    position: absolute;
    color: #FFFFFF !important;
  }
</style>

<script>


export default {
  props: ["heroData", "variant", "navData"],
  data() {
    return {
      tinySliderOptions: {
        autoplay: true,
        autoplayButtonOutput: false,
        controls: false,
        mouseDrag: true,
        loop: false,
        items: 1,
        swipeAngle: 45,
        nav: false
      }
    };
  },
  computed: {
    haveVariant() {
      if (this.variant || this.variant == "") {
        return true;
      }
      return false;
    },
  },
  methods: {
    formatImageSource(endpoint) {
      return process.env.apiUrl + `/storage/${endpoint}`;
    }
  },
};
</script>
