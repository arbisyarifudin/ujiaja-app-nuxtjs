<template>
  <b-navbar toggleable="lg" type="dark" variant="transparent" class="mx-lg-5">
    <b-container>
      <!-- <b-navbar-brand to="/"><img src="/logo-ujiaja.png" /></b-navbar-brand> -->
      <b-navbar-brand href="https://ujiaja.com"><img v-if="ApiUrl" :src="ApiUrl(navData.logo)" class="img-fluid" style="height: 30px; max-width: 150px!important; object-fit:contain;"/></b-navbar-brand>

      <b-navbar-toggle target="navbarheader" style="display: none !important;">
        MENU
      </b-navbar-toggle>
      <b-collapse id="navbarheader" is-nav style="display: none !important;">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto align-items-center">
          <b-nav-item-dropdown text="Produk UjiAja">
            <template #button-content>
              Produk UjiAja <i class="fas fa-chevron-down ml-1"></i>
            </template>
            <b-dropdown-item href="http://ujiaja.com/produk/tryout">TryOut</b-dropdown-item>
            <b-dropdown-item href="http://ujiaja.com/produk/les-privat"
              >Les Privat</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item href="http://ujiaja.com/tentang">Tentang UjiAja</b-nav-item>
          <b-nav-item href="http://ujiaja.com/untuk-tutor">Untuk Tutor</b-nav-item>
          <b-nav-item href="http://ujiaja.com/untuk-siswa">Untuk Siswa</b-nav-item>
          <b-nav-item href="http://ujiaja.com/untuk-orangtua">Untuk Orangtua</b-nav-item>
          <b-nav-item :href="`https://api.whatsapp.com/send?phone=6282328517779&text=Halo%20kak%2C%20saya%20memerlukan%20bantuan%20terkait%20ujiaja.com%3F%20`" target="_blank">Bantuan?</b-nav-item>
          <b-button href="/masuk" variant="outline-primary" class="mt-5 mt-lg-0"
            >Masuk</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
    },
  },
  props: {
    navData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    footerData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
