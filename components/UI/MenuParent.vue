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
        to="/app/parent/tryout-history"
        ><i class="far fa-edit fa-2x fa-fw mr-2"></i> Hasil Ujian</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/app/parent/payment-history"
        ><i class="far fa-file-alt fa-2x fa-fw mr-2"></i> Riwayat
        Transaksi</nuxt-link
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
