<template>
  <ul class="nav navbar-nav pl-3 flex-column">
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/administrator/dashboard"
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
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('master_kelas') ||
            $route.path.includes('master_penjurusan') ||
            $route.path.includes('master_mapel')
              ? 'nuxt-link-active'
              : ''
          ]"
          ><i class="fas fa-school fa-fw mr-2"></i> Sekolah</span
        >
      </template>
      <b-dropdown-item to="/administrator/master_kelas">Kelas</b-dropdown-item>
      <b-dropdown-item to="/administrator/master_penjurusan"
        >Penjurusan</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/master_mapel"
        >Mata Pelajaran</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Perguruan Tinggi" right>
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('master_perguruan_tinggi') ||
            $route.path.includes('program-studi')
              ? 'nuxt-link-active'
              : ''
          ]"
          ><i class="fas fa-school fa-fw mr-2"></i> Perguruan Tinggi</span
        >
      </template>
      <b-dropdown-item to="/administrator/master_perguruan_tinggi"
        >Perguruan Tinggi</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/program-studi"
        >Program Studi</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Modul Tryout" right>
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('tryout') || $route.path.includes('product')
              ? 'nuxt-link-active'
              : ''
          ]"
        >
          <i class="fas fa-clipboard fa-fw mr-2"></i> Modul Tryout</span
        >
      </template>
      <b-dropdown-item to="/administrator/tryout"
        >Data Tryout & Soal</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/product"
        >Data Produk / Event</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Modul MBTI" right>
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('mbti') ||
            $route.path.includes('mbti/personality') ||
            $route.path.includes('mbti/dimention')
              ? 'nuxt-link-active'
              : ''
          ]"
        >
          <i class="fas fa-clipboard fa-fw mr-2"></i> Modul MBTI</span
        >
      </template>
      <b-dropdown-item to="/administrator/mbti/personality"
        >Data Kepribadian</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/mbti/dimention"
        >Data Dimensi Dasar</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/mbti"
        >Data MBTI & Soal</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/administrator/payment"
        ><i class="fas fa-id-badge fa-fw mr-2"></i> Transaksi</nuxt-link
      >
    </li>
     <b-nav-item-dropdown text="Pengguna" right>
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('user') ||
            $route.path.includes('user/student') ||
            $route.path.includes('user/tentor')
              ? 'nuxt-link-active'
              : ''
          ]"
        >
          <i class="fas fa-clipboard fa-fw mr-2"></i> Pengguna</span
        >
      </template>
      <b-dropdown-item to="/administrator/user/student"
        >Data Siswa</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/user/tentor"
        >Data Tentor</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <!-- <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="#"
        ><i class="fas fa-file-alt fa-fw mr-2"></i> Laporan Transaksi</nuxt-link
      >
    </li> -->
    <!-- <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="#"
        ><i class="fas fa-chart-bar fa-fw mr-2"></i> Statistik User</nuxt-link
      >
    </li> -->
     <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/administrator/ticket"
        ><i class="fas fa-question-circle fa-fw mr-2"></i> Pengaduan</nuxt-link
      >
    </li>
  </ul>
</template>
