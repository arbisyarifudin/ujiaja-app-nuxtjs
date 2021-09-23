<template>
  <ul class="nav navbar-nav pl-3 flex-column">
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center active"
        to="/app/dashboard"
        ><i class="fas fa-chart-pie fa-fw mr-2"></i> Dashboard</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/administrator/master_jenjang"
        ><i class="fas fa-caret-square-up fa-fw mr-2"></i> Jenjang</nuxt-link
      >
    </li>
    <b-nav-item-dropdown text="Sekolah" right>
      <template #button-content>
        <i class="fas fa-school fa-fw mr-2"></i> Sekolah
      </template>
      <b-dropdown-item to="/administrator/master_kelas">Kelas</b-dropdown-item>
      <b-dropdown-item to="/administrator/master_penjurusan"
        >Penjurusan</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Perguruan Tinggi" right>
      <template #button-content>
        <i class="fas fa-school fa-fw mr-2"></i> Perguruan Tinggi
      </template>
      <b-dropdown-item to="/administrator/master_perguruan_tinggi"
        >Perguruan Tinggi</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/master_prodi"
        >Program Studi</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="#"
        ><i class="fas fa-clipboard fa-fw mr-2"></i> Modul Tryout</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="#"
        ><i class="fas fa-laptop fa-fw mr-2"></i> Modul Belajar</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="#"
        ><i class="fas fa-cash-register fa-fw mr-2"></i> Transaksi
        User</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="#"
        ><i class="fas fa-id-badge fa-fw mr-2"></i> Verifikasi</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="#"
        ><i class="fas fa-file-alt fa-fw mr-2"></i> Laporan Transaksi</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="#"
        ><i class="fas fa-chart-bar fa-fw mr-2"></i> Statistik User</nuxt-link
      >
    </li>
  </ul>
</template>