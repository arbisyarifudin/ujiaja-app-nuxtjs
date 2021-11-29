<template>
   <div class="container-fluid konten-editprofil">
    <div class="col-md-12 dash-kelas p-0 text-left">
      <h2 class="pb-0">Dashboard</h2>
      <h5 class="mt-4">
        Halo {{ userDetail.nama_lengkap }}, selamat datang!<i class=""></i>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    }
  }
};
</script>
