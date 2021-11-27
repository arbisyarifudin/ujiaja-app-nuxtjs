<template>
  <div class="header-detail bg-white my-4 px-5 py-4" v-if="!loading">
    <div class="d-flex align-items-center justify-content-between">
      <h3 class="mb-0">
        {{ detail.nama_kursus }}
      </h3>
      <div >
        <!-- <router-link
          v-if="detail.status_verifikasi"
          :to="`/app/partner/courses/${detail.id}/students?ref=${$route.path}`"
          role="button"
          class="btn btn-info square py-1 px-2 mr-2"
          title="Lihat Siswa"
        >
          <i class="fas fa-users fa-fw"></i>
        </router-link> -->
        <router-link
          :to="`/app/student/courses/${detail.id}/enroll?ref=${$route.path}`"
          role="button"
          class="btn btn-primary square py-1 px-2 mr-2"
          title="Beli">
          <i class="fas fa-shopping-cart fa-fw"></i> Beli Kelas Kursus
        </router-link>
      </div>
    </div>
    <hr />
    <div class="d-flex align-items-center">
      <span class=""
        >Status Kelas:
        <span
          :class="[
            detail.menerima_peserta
              ? 'badge badge-success'
              : 'badge badge-secondary'
          ]"
          >{{ detail.menerima_peserta ? "Aktif" : "Nonaktif" }}</span
        ></span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "loading"],
  data() {
    return {
      detail: {}
    };
  },
  mounted() {
    this.detail = this.data;
  },
  watch: {
    data(value) {
      if (value) {
        this.detail = value;
      }
    }
  }
};
</script>
