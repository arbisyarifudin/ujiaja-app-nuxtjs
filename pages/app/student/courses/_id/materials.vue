<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Materi Kelas
          </h2>
          <BackUrl :url="`/app/student/courses/${$route.params.id}/detail`" />
        </div>
      </div>
      <div class="col-md-12">
        <UIMenuCourseDetailStudent :data="dataDetail" :data2="dataDetailByStudent" :loading="loading" />
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
                      <div class="d-flex justify-content-between">
                        <div>
                          <h5 class="card-title">{{ materi.judul_materi }}</h5>
                          <div>
                            <i class="fas fa-clock fa-fw mr-1"></i>
                            {{
                              formatTanggal(
                                materi.created_at,
                                "Do MMMM YYYY, HH:mm"
                              )
                            }}
                            WIB
                          </div>
                        </div>
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
                              class="
                                media-item media-item--file
                                d-flex
                                align-items-center
                              "
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
              <b-pagination
                class="pagination-table"
                v-if="
                  totalRows > 0 && totalRows > filter.perPage && !loadingTable
                "
                v-model="filter.page"
                :total-rows="totalRows"
                :per-page="filter.perPage"
              >
              </b-pagination>
              <div
                v-if="totalRows == 0 && !loading && !filter.keyword"
                class="small text-center"
              >
                Belum ada materi yang di unggah oleh Tentor.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-finish"
      title="Konfirmasi Selesaikan Sesi"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah kamu yakin ingin konfirmasi selesaikan sesi? Harap konfirmasi
          jika memang sesi dengan Tentor ini sudah selesai.
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-success tambah px-4 py-2"
            type="button"
            :disabled="submitting"
            @click.prevent="selesaikanSesi"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner>
            Ya
          </button>
          <button
            class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
            type="button"
            @click="$bvModal.hide('modal-finish')"
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
      submitting: false,
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
      detailMateri: {},
      editMode: false,
      selectedId: null,
      selectedIndex: null,
      form: {
        judul_materi: "",
        deskripsi_materi: "",
        link_file_materi: "",
        link_video_materi: ""
      },
      dataError: {},
      files: {
        link_file_materi: null
      },
      dataDetailByStudent: {}
    };
  },
  created() {
    if (!this.$route.params.id)
      return this.$router.push("/app/partner/courses");
    this.getDetail("kursus", this.$route.params.id);
    this.getDetailByStudent();
    this.getMaterial();
  },
  watch: {
    "filter.keyword"(value) {
      this.getMaterial();
    }
  },
  methods: {
    resetModal() {
      this.editMode = false;
      this.detailMateri = {};
    },
    resetForm() {
      // this.isValidForm = {
      //   judul: '',
      //   deskripsi: '',
      //   link_file: '',
      //   link_video: '',
      // };
      this.dataError = [];
    },
    showError(field) {
      if (
        this.dataError[field] !== undefined &&
        this.dataError[field].length > 0
      ) {
        let html = `<div class="form-error__info">
                        ${this.dataError[field][0]}
                        </div>`;
        return html;
      }
      return "";
    },
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
    getDetailByStudent() {
      this.loading = true;
      this.$axios
        .$get(`/api/kursus-siswa/find/${this.$route.params.id}/student`)
        .then(res => {
          if (res.success) {
            this.dataDetailByStudent = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetailMateri(id) {
      this.editMode = true;
      this.$bvModal.show("modal-edit");
      this.loadingTable = true;
      this.$axios
        .$get(`/api/kursus-materi/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.detailMateri = res.data;
            this.form = res.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loadingTable = false));
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
    },
    selesaikanSesi() {
      this.submitting = true;
      this.$axios
        .$put(
          `/api/kursus-siswa/update/${this.dataDetailByStudent.id}/status`,
          {
            status_dikelas: "Sesi Selesai"
          }
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast(
              "Sesi berhasil dikonfirmasi! Terima kasih sudah bersama kami. Jangan lupa tinggalkan ulasanmu yah.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.dataDetailByStudent = res.data;
            this.$bvModal.hide("modal-finish");
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.submitting = false));
    },
  }
};
</script>

<style></style>
