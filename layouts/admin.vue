<template>
  <div class="admin-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 bg-white">
          <nav class="sidebar navbar-light pt-3 pl-4" id="menu">
            <img src="/logo2.png" class="img-fluid w-25 pb-4" />
            <ul class="nav navbar-nav pl-3 flex-column">
              <li class="nav-item">
                <a
                  class="nav-link d-flex align-items-center active"
                  href="/app/dashboard"
                  ><i class="fas fa-chart-pie fa-fw mr-2"></i> Dashboard</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  ><i class="fas fa-school fa-fw mr-2"></i> Sekolah</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  ><i class="fas fa-university fa-fw mr-2"></i> Perguruan
                  Tinggi</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  ><i class="fas fa-caret-square-up fa-fw mr-2"></i> Jenjang</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  ><i class="fas fa-clipboard fa-fw mr-2"></i> Modul Tryout</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  ><i class="fas fa-laptop fa-fw mr-2"></i> Modul Belajar</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  ><i class="fas fa-cash-register fa-fw mr-2"></i> Transaksi
                  User</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  ><i class="fas fa-id-badge fa-fw mr-2"></i> Verifikasi</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  ><i class="fas fa-file-alt fa-fw mr-2"></i> Laporan
                  Transaksi</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  ><i class="fas fa-chart-bar fa-fw mr-2"></i> Statistik User</a
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9 bg-light">
          <div id="header">
            <nav class="navbar navbar-expand navbar-light bg-light">
              <!-- <ul class="nav navbar-nav mr-auto align-items-center">
                <li class="nav-item">
                  <span class="small text-muted"
                    >Selamat datang,
                    {{ user.detail ? user.detail.nama_lengkap : "?" }} !</span
                  >
                </li>
              </ul> -->
              <ul class="nav navbar-nav ml-auto align-items-center">
                <b-nav-item-dropdown text="Notif" right no-caret>
                  <template #button-content>
                    <i class="fas fa-bell"></i>
                  </template>
                  <b-dropdown-item href="/produk/tryout">Notif</b-dropdown-item>
                  <b-dropdown-item href="/produk/les-pribate"
                    >Nofif 2</b-dropdown-item
                  >
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Profil" right no-caret>
                  <template #button-content>
                    <img src="/icon-user.png" class="img-fluid" width="24" />
                  </template>
                  <b-dropdown-item href="/administrator/profile"
                    >Profil</b-dropdown-item
                  >
                  <b-dropdown-item @click.prevent="appLogout"
                    >Keluar</b-dropdown-item
                  >
                </b-nav-item-dropdown>
              </ul>
            </nav>
          </div>
          <main id="konten" class="konten px-3">
            <Nuxt />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth-admin",
  computed: {
    user() {
      return this.$store.state.dataUser;
    },
  },
  mounted() {
    console.log(this.user);
  },
};
</script>

<style>
@import url("@/assets/ano/admin.css");
@import url("@/assets/admin.css");
</style>