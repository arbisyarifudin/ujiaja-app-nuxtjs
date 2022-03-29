<template>
  <ul class="nav navbar-nav pl-3 flex-column">
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/dashboard">
        <i class="fas fa-chart-pie fa-2x fa-fw mr-2"></i>Dashboard</nuxt-link
      >
    </li>
    <b-nav-item-dropdown text="Les Privat" right>
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[$route.path.includes('courses') ? 'nuxt-link-active' : '']"
          ><i class="fab fa-wpforms fa-2x fa-fw mr-2"></i> Les Privat</span
        >
      </template>
      <b-dropdown-item to="/app/student/courses">Cari Guru Privat</b-dropdown-item>
      <b-dropdown-item to="/app/student/courses/mine">Kelas Privatku</b-dropdown-item>
    </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Tryout" right>
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[$route.path.includes('tryout') ? 'nuxt-link-active' : '']"
          ><i class="far fa-edit fa-2x fa-fw mr-2"></i> Tryout</span
        >
      </template>
      <b-dropdown-item to="/app/tryout">Cari Tryout</b-dropdown-item>
      <b-dropdown-item to="/app/tryout/mine">Tryoutku</b-dropdown-item>
    </b-nav-item-dropdown>
    <!-- <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="fas fa-book fa-2x fa-fw mr-2"></i> Bank Soal</nuxt-link
      >
    </li> -->
    <!-- <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/mbti"
        ><i class="fas fa-list-alt fa-2x fa-fw mr-2"></i> Tes Kepribadian</nuxt-link
      >
    </li> -->
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/bundling"
        ><i class="fas fa-box fa-2x fa-fw mr-2"></i> Bundle</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/material"
        ><i class="fas fa-book fa-2x fa-fw mr-2"></i> Material</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/payment"
        ><i class="far fa-file-alt fa-2x fa-fw mr-2"></i> Riwayat
        Transaksi</nuxt-link
      >
    </li>
    <li class="nav-item">
      <a class="nav-link d-flex align-items-center" href="/cari-program-studi" target="_blank"
        ><i class="far fa-hdd fa-2x fa-fw mr-2"></i> Cari Jurusan
        Kuliah</a
      >
    </li>
   <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/ticket"
        ><i class="far fa-question-circle fa-2x fa-fw mr-2"></i>
        Pengaduan</nuxt-link
      >
    </li>
  </ul>
</template>
