<template>
  <ul class="nav navbar-nav pl-3 flex-column">
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/dashboard">
        <i class="fas fa-chart-pie fa-2x fa-fw mr-2"></i>Dashboard</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/app/partner/courses"
        ><i class="fab fa-wpforms fa-2x fa-fw mr-2"></i> Kelas Kursus</nuxt-link
      >
    </li>
    <!-- <b-nav-item-dropdown text="Kelas Kursus" right>
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('course')
              ? 'nuxt-link-active'
              : ''
          ]"
          ><i class="fas fa-wpforms fa-fw mr-2"></i> Kelas Kursus</span
        >
      </template>
      <b-dropdown-item to="/app/course/mine">Kelas Saya</b-dropdown-item>
      <b-dropdown-item to="/app/course/mine">Kelas Saya</b-dropdown-item>
    </b-nav-item-dropdown> -->
    <!-- <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/courses"
        ><i class="fas fa-book fa-2x fa-fw mr-2"></i> Bank Soal</nuxt-link
      >
    </li> -->
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/app/partner/uktt"
        ><i class="far fa-edit fa-2x fa-fw mr-2"></i> Ujian UKTT</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/payment"
        ><i class="far fa-file-alt fa-2x fa-fw mr-2"></i> Riwayat
        Transaksi</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/app/partner/testimonial"
        ><i class="far fa-comment fa-2x fa-fw mr-2"></i> Testimoni
        Siswa</nuxt-link
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
