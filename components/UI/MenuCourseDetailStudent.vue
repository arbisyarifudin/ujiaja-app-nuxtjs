<template>
  <div class="header-detail bg-white my-4 px-5 py-4" v-if="!loading">
    <div class="d-flex align-items-center justify-content-between">
      <h3 class="mb-0">
        {{ detail.nama_kursus }}
      </h3>
      <div>
        <router-link
          v-if="
            !detail.transaksi ||
              (detail.transaksi &&
                detail.transaksi.status_dikelas == 'Sesi Selesai')
          "
          :to="`/user/student/courses/${detail.id}/enroll?ref=${$route.path}`"
          role="button"
          class="btn btn-primary square py-1 px-2 mr-2"
          title="Beli"
        >
          <i class="fas fa-shopping-cart fa-fw"></i> Beli Kelas Kursus
        </router-link>
        <div v-else>
          <button
            v-if="
              detailStudent &&
                detailStudent.status_dikelas == 'Menunggu Konfirmasi Selesai'
            "
            role="button"
            class="btn btn-info square py-1 px-2 mr-2"
            title="Konfirmasi Selesai Sesi"
            v-b-modal.modal-finish
          >
            <i class="fas fa-check fa-fw"></i> Konfirmasi Selesai
          </button>
          <router-link
            v-if="detail.transaksi"
            :to="
              `/user/payment/${detail.transaksi.id}/detail?ref=${$route.path}`
            "
            role="button"
            class="btn btn-secondary square py-1 px-2 mr-2"
            title="Detail Pembayaran"
          >
            <i class="fas fa-file-alt fa-fw"></i> Detail Pembayaran
            <span
              v-if="detail.transaksi && detail.transaksi.status == 'Dibatalkan'"
              >(Dibatalkan)</span
            >
          </router-link>
          <router-link
            v-if="detail.transaksi && detail.transaksi.status == 'Dibatalkan'"
            :to="`/user/student/courses/${detail.id}/enroll?ref=${$route.path}`"
            role="button"
            class="btn btn-primary square py-1 px-2 mr-2"
            title="Beli"
          >
            <i class="fas fa-shopping-cart fa-fw"></i> Beli Kelas Kursus Lagi
          </router-link>
          <router-link
            v-if="
              detail.transaksi &&
                detail.transaksi.status == 'Sudah Diverifikasi' &&
                detailStudent.status_dikelas != 'Pending' &&
                detailStudent.status_dikelas != 'Ditolak'
            "
            :to="
              `/user/student/courses/${detail.id}/materials?ref=${$route.path}`
            "
            role="button"
            class="btn btn-primary square py-1 px-2 mr-2"
            title="Lihat Materi Kelas"
          >
            <i class="fas fa-book fa-fw"></i> Materi Kelas
          </router-link>
          <a
            v-if="
              detail.transaksi &&
                detail.transaksi.status == 'Sudah Diverifikasi' &&
                detailStudent.status_dikelas != 'Pending' &&
                detailStudent.status_dikelas != 'Ditolak'
            "
            :href="`tel:${detail.tentor.nomor_telephone}`"
            role="button"
            class="btn btn-success square py-1 px-2 mr-2"
            title="Hubungi Tentor"
          >
            <i class="fab fa-whatsapp fa-fw"></i>
          </a>
        </div>

        <b-dropdown text="Profil" right no-caret toggle-class="btn btn-success square" title="Bagikan Kelas Kursus" v-if="BaseUrl">
          <template #button-content>
           <b-icon icon="share"></b-icon>
          </template>
          <b-dropdown-item target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${BaseUrl($route.path, true)}`">Facebook</b-dropdown-item>
          <b-dropdown-item target="_blank" :href="`https://twitter.com/intent/tweet?text=Lihat!%20Ada%20kelas%20kursus%20menarik%20disini.%20${BaseUrl($route.path, true)}`">Twitter</b-dropdown-item>
          <b-dropdown-item target="_blank" :href="`https://www.linkedin.com/shareArticle?mini=true&url=${BaseUrl($route.path, true)}&title=${detail.nama_kursus}&summary=Lihat!%20Ada%20kelas%20kursus%20menarik%20disini.&source=Ujiaja.com`">LinkedIn</b-dropdown-item>
          <b-dropdown-item target="_blank" :href="`https://wa.me/?text=Lihat!%20Ada%20kelas%20kursus%20menarik%20disini.%20${BaseUrl($route.path, true)}`">Whatsapp</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <hr />
    <div class="d-flex align-items-center">
      <span class=""
        >Status Kelas Kursus:
        <span
          :class="[
            detail.menerima_peserta
              ? 'badge badge-success'
              : 'badge badge-secondary'
          ]"
          >{{ detail.menerima_peserta ? "Aktif" : "Nonaktif" }}</span
        ></span
      >
      <i
        class="fas fa-fw fa-circle mx-3"
        style="font-size: 5px"
        v-if="detailStudent && detailStudent.status_dikelas"
      ></i>
      <span v-if="detailStudent && detailStudent.status_dikelas"
        >Status Anda di Kelas:
        <span
          :class="statusBadge(detailStudent.status_dikelas)"
          v-text="labelBadge(detailStudent.status_dikelas)"
        ></span
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "data2", "loading"],
  data() {
    return {
      detail: {},
      detailStudent: {}
    };
  },
  mounted() {
    this.detail = this.data;
    this.detailStudent = this.data2;
  },
  watch: {
    data(value) {
      if (value) {
        this.detail = value;
      }
    },
    data2(value) {
      if (value) {
        this.detailStudent = value;
      }
    }
  },
  methods: {
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case "Bergabung":
          statusClass += "info";
          break;
        case "Menunggu Verifikasi Selesai":
          statusClass += "warning";
          break;
        case "Sesi Selesai":
          statusClass += "success";
          break;
        default:
          statusClass += "secondary";
          break;
      }
      return statusClass;
    },
    labelBadge(status) {
      let label = "";
      switch (status) {
        case "Ditolak & Sudah Bergabung Lagi":
          label = "Ditolak";
          break;
        case "Menunggu Konfirmasi Selesai":
          label = "Tentor telah menyelesaikan Kelas";
          break;
        case "Pending":
          label = "Menunggu Approval Tentor";
          break;
        default:
          label = status;
          break;
      }
      return label;
    }
  }
};
</script>
