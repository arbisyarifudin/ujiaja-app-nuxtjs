<template>
  <ul class="nav navbar-nav pl-3 flex-column">
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/user/dashboard">
        <i class="fas fa-chart-pie fa-2x fa-fw mr-2"></i>Dashboard</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/user/partner/courses"
        ><i class="fab fa-wpforms fa-2x fa-fw mr-2"></i> Kelas Kursus</nuxt-link
      >
    </li>
    <li class="nav-item" v-if="userDetailWatch && userDetailWatch.total_kursus > 0">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/user/partner/uktt"
        ><i class="far fa-edit fa-2x fa-fw mr-2"></i> Ujian UKTT</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/user/payment"
        ><i class="far fa-file-alt fa-2x fa-fw mr-2"></i> Riwayat
        Transaksi</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/user/partner/testimonial"
        ><i class="far fa-comment fa-2x fa-fw mr-2"></i> Testimoni
        Siswa</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link d-flex align-items-center" to="/user/ticket"
        ><i class="far fa-question-circle fa-2x fa-fw mr-2"></i>
        Pengaduan</nuxt-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    userDetail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      userWatch: {},
      userDetailWatch: {},
    }
  },
  mounted() {
    this.userWatch = this.user
    this.userDetailWatch = this.userDetail
  },
  watch: {
    user(value) {
      if(value) {
        this.userWatch = value
      }
    },
    userDetail(value) {
      console.log(value)
      if(value) {
        this.userDetailWatch = value
      }
    }
  }
}
</script>
