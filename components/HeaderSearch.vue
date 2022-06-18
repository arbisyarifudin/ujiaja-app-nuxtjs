<template>
  <header
    id="header"
    :class="[
      'header header-search',
      haveVariant ? 'variant-' + this.variant : '',
    ]"
  >
    <b-navbar toggleable="lg" type="dark" variant="transparent">
      <b-container>
        <!-- <b-navbar-brand to="/"><img src="/logo-ujiaja.png" /></b-navbar-brand> -->
        <b-navbar-brand to="/"><img v-if="ApiUrl" :src="ApiUrl(navData.logo)" class="img-fluid" style="width: 60px"/></b-navbar-brand>
        <b-navbar-toggle target="navbarheader"></b-navbar-toggle>
        <b-collapse id="navbarheader" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto align-items-center">
            <b-nav-item-dropdown text="Produk UjiAja">
              <template #button-content>
                Produk UjiAja <i class="fas fa-chevron-down ml-1"></i>
              </template>
              <b-dropdown-item href="/produk/tryout">TryOut</b-dropdown-item>
              <b-dropdown-item href="/produk/les-privat"
                >Les Privat</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item href="/tentang">Tentang UjiAja</b-nav-item>
            <b-nav-item href="/untuk-tutor">Untuk Tutor</b-nav-item>
            <b-nav-item href="/untuk-siswa">Untuk Siswa</b-nav-item>
            <b-nav-item href="/untuk-orangtua">Untuk Orangtua</b-nav-item>
            <b-nav-item href="/untuk-orangtua">Bantuan?</b-nav-item>
            <b-button
              href="/masuk"
              variant="outline-primary"
              class="mt-5 mt-lg-0"
              >Masuk</b-button
            >
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <div class="hero" id="hero" style="min-height: 400px">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-8 col-10">
            <h2>Bantuan</h2>
            <!-- <div
              class="form-group cari-bantuan"
              style="z-index: 99; position: relative"
            >
              <div
                class="
                  input-group
                  cari-bantuan
                  d-flex
                  align-items-center align-content-center
                "
              >
                <input
                  type="text"
                  name="search"
                  class="form-control car-bantuan"
                  placeholder="Cari Bantuan"
                />
                <span
                  ><button
                    type="submit"
                    class="btn btn-outline-primary cari-bantuan px-4"
                  >
                    <i class="fa fa-search"> </i> Cari
                  </button></span
                >
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <img src="/bantuan.png" class="hero-image" />
    </div>
  </header>
</template>

<script>
export default {
  props: ["variant", "navData"],
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
   methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
    },
  },
};
</script>