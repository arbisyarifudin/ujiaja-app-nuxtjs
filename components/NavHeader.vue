<template>
  <b-navbar toggleable="lg" type="dark" variant="transparent" class="mx-lg-5">
    <b-container>
      <!-- <b-navbar-brand to="/"><img src="/logo-ujiaja.png" /></b-navbar-brand> -->
      <b-navbar-brand to="/"><img v-if="ApiUrl" :src="ApiUrl(navData.logo)" class="img-fluid" style="height: 80px; max-width: 150px!important; object-fit:contain;"/></b-navbar-brand>

      <b-navbar-toggle target="navbarheader">
        MENU
      </b-navbar-toggle>
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
    }
  }
}
</script>