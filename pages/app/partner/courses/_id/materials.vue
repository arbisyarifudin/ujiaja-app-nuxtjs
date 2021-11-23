<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10;">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Materi Kelas
          </h2>
          <BackUrl />
        </div>
      </div>
      <div class="col-md-12">
         <UIMenuCourseDetail :data="dataDetail" />
      </div>
      <div class="col-md-12 my-3">
        <div class="bg-white px-4 py-4">
          <div class="row">
            <div class="col-md-12 crud">
              <h4>Daftar Materi Kelas</h4>
              <hr class="mb-5"/>
              <ul class="list-unstyled material-list">
                <li class="material-item">
                  <div class="card shadow-sm">
                    <div class="card-body">
                      <h5 class="card-title">Judul Materi</h5>
                      <div><i class="fas fa-clock fa-fw mr-1"></i> 20 November 2021</div>
                      <hr>
                      <div >
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla fugiat aspernatur sint, quidem pariatur nostrum earum laboriosam veniam natus illum.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde maiores inventore beatae omnis ex? Repudiandae cumque nihil illo sapiente quasi.</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-option"
      title="Nonakifkan Kelas"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          <b>Nonaktifkan Kelas</b>, maka kelas tidak akan ditampilkan dalam
          pencarian dan siswa tidak bisa mengakses Kelas Les Privat ini. Atau
          <b>Hapus Kelas secara Permanen</b>, maka semua data dalam kelas akan
          dihapus dari Sistem.
        </p>
        <div class="modal-footer justify-content-center" style="border: 0px">
          <button
            class="btn btn-sm btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="updateStatus(dataDetail.menerima_peserta)"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner>
            {{ dataDetail.menerima_peserta ? "Nonaktifkan" : "Aktifkan" }}
          </button>
          <button
            class="btn btn-sm btn-secondary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="deleteData()"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Hapus
            Permanen
          </button>
          <button
            class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
            type="button"
            @click="$bvModal.hide('modal-option')"
          >
            Batal
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-approve"
      title="Terima Siswa"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah Anda yakin ingin menerima Siswa Ini?
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-success tambah px-4 py-2"
            type="button"
            :disabled="loadingTable"
            @click.prevent="approvalStudent('Bergabung')"
          >
            <b-spinner small v-if="loadingTable" class="mr-1"></b-spinner>
            Terima Siswa
          </button>
          <button
            class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
            type="button"
            @click="$bvModal.hide('modal-approve')"
          >
            Batal
          </button>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="modal-reject"
      title="Tolak Siswa"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah Anda yakin ingin menolak Siswa Ini?
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-danger tambah px-4 py-2"
            type="button"
            :disabled="loadingTable"
            @click.prevent="approvalStudent('Ditolak')"
          >
            <b-spinner small v-if="loadingTable" class="mr-1"></b-spinner> Tolak
            Siswa
          </button>
          <button
            class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
            type="button"
            @click="$bvModal.hide('modal-reject')"
          >
            Batal
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: true,
      loadingTable: false,
      filterKeyword: "",
      dataDetail: {
        mapel: {},
        tentor: {},
        jenjang: {},
        penjurusan: {},
        jadwals: []
      },
      tabs: 0,
      dataMaterial: [],
      selectedId: null,
      selectedIndex: null
    };
  },
  created() {
    if (!this.$route.params.id)
      return this.$router.push("/app/partner/courses");
    this.getDetail("kursus", this.$route.params.id);
  },

  methods: {
    resetModal() {},
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    deleteData() {
      const conf = confirm(
        "Apakah Anda Yakin? Data yang dihapus tidak dapat dikembalikan!"
      );
      if (!conf) {
        return;
      }

      this.loading = true;
      this.$axios
        .$delete(`/api/kursus/delete/${this.$route.params.id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data kursus berhasil dihapus!", {
              title: "Sukses",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000
            });
            this.$bvModal.hide("modal-option");
            this.$router.replace("/app/partner/courses");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    async getMaterial() {
      this.loadingTable = true;
      await this.$axios
        .$get("/api/kursus-materi/", {
          params: {
            id_kursus: this.$route.params.id,
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataMaterial = res.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loadingTable = false));
    }
  }
};
</script>

<style></style>
