<template>
  <ul class="nav navbar-nav pl-3 flex-column">
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center active"
        to="/app/dashboard"
      >
        <i class="fas fa-chart-pie fa-2x fa-fw mr-2"></i>Dashboard</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="fab fa-wpforms fa-2x fa-fw mr-2"></i> Les Privat</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="far fa-edit fa-2x fa-fw mr-2"></i> Tryout</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="fas fa-book fa-2x fa-fw mr-2"></i> Bank Soal</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="far fa-edit fa-2x fa-fw mr-2"></i> Ujian UKTT</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="far fa-edit fa-2x fa-fw mr-2"></i> Tes MBTI</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="far fa-file-alt fa-2x fa-fw mr-2"></i> Riwayat
        Transaksi</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="far fa-comment fa-2x fa-fw mr-2"></i> Testimoni
        Siswa</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="far fa-question-circle fa-2x fa-fw mr-2"></i>
        Bantaun</nuxt-link
      >
    </li>
  </ul>
</template>