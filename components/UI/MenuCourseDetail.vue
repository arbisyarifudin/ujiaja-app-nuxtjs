<template>
  <div class="header-detail bg-white my-4 px-5 py-4" v-if="!loading">
    <div class="d-flex align-items-center justify-content-between">
      <h3 class="mb-0">
        {{ detail.nama_kursus }}
      </h3>
      <div >
        <router-link
          :to="`/app/partner/courses/${detail.id}/edit?ref=${$route.path}`"
          role="button"
          class="btn btn-success square py-1 mr-2"
          title="Ubah Kelas"
        >
          Ubah Kelas
        </router-link>
        <router-link
          v-if="detail.status_verifikasi"
          :to="`/app/partner/courses/${detail.id}/students?ref=${$route.path}`"
          role="button"
          class="btn btn-info square py-1 px-2 mr-2"
          title="Lihat Siswa"
        >
          <i class="fas fa-users fa-fw"></i>
        </router-link>
        <router-link
          v-if="detail.status_verifikasi"
          :to="`/app/partner/courses/${detail.id}/materials?ref=${$route.path}`"
          role="button"
          class="btn btn-primary square py-1 px-2 mr-2"
          title="Lihat Materi"
        >
          <i class="fas fa-book fa-fw"></i>
        </router-link>
        <button
          v-if="detail.status_verifikasi"
          type="button"
          class="btn btn-danger square py-1"
          title="Opsi Lain"
          v-b-modal.modal-option
        >
          <i class="fas fa-ellipsis-h"></i>
        </button>
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
      <i class="fas fa-fw fa-circle mx-3" style="font-size: 5px"></i>
      <span>
        Status Verifikasi:
        <span
          :class="[
            detail.status_verifikasi
              ? 'badge badge-success'
              : 'badge badge-secondary'
          ]"
          >{{
            detail.status_verifikasi ? "Sudah Diverifikasi" : "Sedang Ditinjau"
          }}</span
        >
      </span>
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
