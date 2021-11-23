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
        <UIMenuCourseDetail :data="dataDetail" :loading="loading" />
      </div>
      <div class="col-md-12 my-3">
        <div class="bg-white px-4 py-4">
          <div class="row">
            <div class="col-md-12 crud">
              <div class="material-head row align-items-center">
                <div class="col-md-8">
                  <h4 class="mb-0">Daftar Materi Kelas</h4>
                </div>
                <div class="col-md-4 d-flex align-items-center crud-tools">
                  <b-input-group>
                    <template #prepend>
                      <b-input-group-text class="pl-3"
                        ><i class="fas fa-search"></i
                      ></b-input-group-text>
                    </template>
                    <b-form-input
                      class="py-1 small"
                      placeholder="Cari materi"
                      debounce="500"
                      v-model="filter.keyword"
                    ></b-form-input>
                  </b-input-group>
                </div>
              </div>
              <hr class="mb-3" />
              <ul class="list-unstyled material-list relative">
                <li
                  class="material-item mb-4"
                  v-for="(materi, index) in dataMaterial"
                  :key="'m' + index"
                >
                  <div class="card shadow-none">
                    <div class="card-body">
                      <h5 class="card-title">{{ materi.judul_materi }}</h5>
                      <div>
                        <i class="fas fa-clock fa-fw mr-1"></i>
                        {{ formatTanggal(materi.created_at, 'Do MMMM YYYY, HH:mm') }} WIB
                      </div>
                      <hr />
                      <div class="material-content row align-items-center">
                        <div
                          class="material-description col-md-8"
                          v-html="materi.deskripsi_materi"
                        ></div>
                        <div class="material-media col-md-4">
                          <ul class="list-unstyled">
                            <li
                              class="media-item media-item--file d-flex align-items-center"
                              @click="openUrl(materi.link_file_materi)"
                            >
                              <i
                                class="fas fa-file fa-fw mr-2 fa-3x media-icon"
                              ></i>
                              <div>
                                <div class="media-name">Materi</div>
                                <div class="media-link" target="_blank">
                                  {{ materi.link_file_materi }}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <UILoading tag="div" v-if="loadingTable" />
                <UINotFound
                  tag="div"
                  v-if="totalRows == 0 && filter.keyword && !loadingTable"
                />
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
      dataDetail: {
        mapel: {},
        tentor: {},
        jenjang: {},
        penjurusan: {},
        jadwals: []
      },
      totalRows: 100,
      filter: {
        page: 1,
        perPage: 6,
        keyword: ""
      },
      dataMaterial: [],
      selectedId: null,
      selectedIndex: null
    };
  },
  created() {
    if (!this.$route.params.id)
      return this.$router.push("/app/partner/courses");
    this.getDetail("kursus", this.$route.params.id);
    this.getMaterial();
  },
  watch: {
    "filter.keyword"(value) {
      this.getMaterial();
    }
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
        .$get("/api/kursus-materi/pagination", {
          params: {
            id_kursus: this.$route.params.id,
            q: this.filter.keyword,
            paginate: this.filter.perPage
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataMaterial = res.data.data;
            this.totalRows = res.data.total;
            this.filter.perPage = res.data.per_page;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loadingTable = false));
    },
    openUrl(link) {
      const destination = this.ApiUrl(link);
      var anchor = document.createElement("a");
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("class", "d-none");
      anchor.setAttribute("href", destination);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    }
  }
};
</script>

<style></style>
