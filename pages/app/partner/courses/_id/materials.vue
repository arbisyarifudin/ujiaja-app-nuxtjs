<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10">
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
                    <button
                      class="
                        btn btn-primary
                        tambah
                        crud-btn__add
                        px-2
                        py-1
                        ml-2
                        small
                        align-items-center
                        d-flex
                      "
                      to="/app/partner/courses/add"
                      title="Tambah Materi"
                      type="button"
                      v-b-modal.modal-edit
                    >
                      <i class="fas fa-plus fa-fw"></i>
                    </button>
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
                                'Do MMMM YYYY, HH:mm'
                              )
                            }}
                            WIB
                          </div>
                        </div>
                        <div>
                          <b-button
                            variant="light"
                            class="square px-2 text-info"
                            @click.prevent="
                              selectedId = materi.id;
                              selectedIndex = index;
                              getDetailMateri(materi.id);
                            "
                            title="Ubah Materi"
                            ><i class="fas fa-fw fa-edit"></i
                          ></b-button>
                          <b-button
                            variant="light"
                            class="square px-2 text-danger"
                            @click.prevent="
                              selectedId = materi.id;
                              selectedIndex = i;
                              $bvModal.show('modal-delete');
                            "
                            title="Hapus Materi"
                            ><i class="fas fa-fw fa-trash"></i
                          ></b-button>
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
                Belum ada materi. Silakan buat terlebih dahulu.
              </div>
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
            {{ dataDetail.menerima_peserta ? 'Nonaktifkan' : 'Aktifkan' }}
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
      id="modal-delete"
      title="Hapus Materi"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">Apakah Anda yakin ingin menghapus Materi Ini?</p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-danger tambah px-4 py-2"
            type="button"
            :disabled="loadingTable"
            @click.prevent="deleteData()"
          >
            <b-spinner small v-if="loadingTable" class="mr-1"></b-spinner> Hapus
          </button>
          <button
            class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
            type="button"
            @click="$bvModal.hide('modal-delete')"
          >
            Batal
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-edit"
      :title="editMode ? 'Ubah Materi' : 'Tambah Materi'"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div class="crud">
        <form class="form-user" @submit.prevent="validateFormOrtu">
          <div class="form-group reg-siswa">
            <label for="judul_materi">Nama Lengkap</label>
            <input
              type="text"
              class="form-control"
              id="judul_materi"
              placeholder="Tulis Judul Materi"
              v-model="form.judul_materi"
            />
            <div v-html="showError('judul_materi')"></div>
          </div>
          <div class="form-group reg-siswa">
            <label for="deskripsi_materi">Deskripsi Materi</label>
            <textarea
              class="form-control"
              id="deskripsi_materi"
              placeholder="Tulis Deskripsi Materi"
              v-model="form.deskripsi_materi"
            ></textarea>
            <div v-html="showError('deskripsi_materi')"></div>
          </div>
          <div class="form-group reg-siswa">
            <label for="file_materi">File Materi</label>
            <div class="custom-file mb-3">
              <input
                type="file"
                class="custom-file-input"
                id="file_materi"
                ref="link_file_materi"
                @change="handleUploadedFile('link_file_materi')"
              />
              <label class="custom-file-label" for="file_materi"
                >Pilih file atau drag kesini</label
              >
              <div class="small text-info mt-1">
                <small
                  >File yang diizinkan .pdf, .doc, .docx, .zip, .xls, .xlsx,
                  .ppt</small
                >
              </div>
            </div>
            <div v-html="showError('file_materi')"></div>
          </div>
        </form>
      </div>
      <div class="modal-footer justify-content-end" style="border: 0px">
        <button
          class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
          type="button"
          @click="$bvModal.hide('modal-edit')"
        >
          Batal
        </button>
        <button
          class="btn btn-sm btn-primary tambah px-4 py-2"
          type="button"
          :disabled="loadingTable"
          @click.prevent="submitData()"
        >
          <b-spinner small class="mr-1" v-if="loadingTable"></b-spinner>
          <i class="fas fa-save fa-fw mr-1" v-else></i> Submit
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data() {
    return {
      loading: true,
      loadingTable: false,
      dataDetail: {
        mapel: {},
        tentor: {},
        jenjang: {},
        penjurusan: {},
        jadwals: [],
      },
      totalRows: 100,
      filter: {
        page: 1,
        perPage: 6,
        keyword: '',
      },
      dataMaterial: [],
      detailMateri: {},
      editMode: false,
      selectedId: null,
      selectedIndex: null,
      form: {
        judul_materi: '',
        deskripsi_materi: '',
        link_file_materi: '',
        link_video_materi: '',
      },
      dataError: {},
      files: {
        link_file_materi: null,
      },
    };
  },
  created() {
    if (!this.$route.params.id)
      return this.$router.push('/app/partner/courses');
    this.getDetail('kursus', this.$route.params.id);
    this.getMaterial();
  },
  watch: {
    'filter.keyword'(value) {
      this.getMaterial();
    },
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
      return '';
    },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetailMateri(id) {
      this.editMode = true;
      this.$bvModal.show('modal-edit');
      this.loadingTable = true;
      this.$axios
        .$get(`/api/kursus-materi/find/${id}`)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.detailMateri = res.data;
            this.form = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loadingTable = false));
    },
    deleteData() {
      this.loadingTable = true;
      this.$axios
        .$delete(`/api/kursus-materi/delete/${this.selectedId}`)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast('Data materi berhasil dihapus!', {
              title: 'Sukses',
              variant: 'danger',
              solid: true,
              autoHideDelay: 3000,
            });
            this.dataMaterial.splice(this.selectedIndex, 1);
            this.$bvModal.hide('modal-delete');
          }
          return true;
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loadingTable = false));
    },
    async getMaterial() {
      this.loadingTable = true;
      await this.$axios
        .$get('/api/kursus-materi/pagination', {
          params: {
            id_kursus: this.$route.params.id,
            q: this.filter.keyword,
            paginate: this.filter.perPage,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.dataMaterial = res.data.data;
            this.totalRows = res.data.total;
            this.filter.perPage = res.data.per_page;
          }
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loadingTable = false));
    },
    openUrl(link) {
      const destination = this.ApiUrl(link);
      var anchor = document.createElement('a');
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('class', 'd-none');
      anchor.setAttribute('href', destination);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    },
    handleUploadedFile(param) {
      this.files[param] = this.$refs[param].files[0];
      console.log(this.files[param]);
      this.$refs[param].closest('.custom-file').children[1].textContent =
        this.files[param].name;

      let formData = new FormData();
      formData.append('file', this.files[param]);

      if (this.files[param] != null) {
        this.loadingTable = true;
        this.$axios
          .$post(`/api/upload/file`, formData)
          .then((res) => {
            console.log(res);
            if (res) {
              this.form[param] = res.data.file_url;
            }
            return;
          })
          .catch((err) => {
            console.log(err);
            this.catchError(err);
          })
          .finally(() => (this.loadingTable = false));
      }
    },
    submitData() {
      this.loadingTable = true;
      if (this.editMode) {
        this.$axios
          .$put(`/api/kursus-materi/update/${this.selectedId}`, this.form)
          .then((res) => {
            console.log(res);
            if (res.success) {
              this.$root.$bvToast.toast('Materi berhasil diperbarui.', {
                title: 'Sukses',
                variant: 'success',
                solid: true,
                autoHideDelay: 3000,
              });
              this.dataMaterial[this.selectedIndex] = res.data;
              this.$bvModal.hide('modal-edit');
            }
          })
          .catch((err) => {
            console.log(err);
            this.catchError(err);
          })
          .finally(() => (this.loadingTable = false));
      } else {
        const dataCreate = {
          ...this.form,
          id_kursus: this.$route.params.id,
        };
        this.$axios
          .$post(`/api/kursus-materi/create`, dataCreate)
          .then((res) => {
            console.log(res);
            if (res.success) {
              this.$root.$bvToast.toast('Materi berhasil dibuat.', {
                title: 'Sukses',
                variant: 'success',
                solid: true,
                autoHideDelay: 3000,
              });
              this.$bvModal.hide('modal-edit');
            }
          })
          .catch((err) => {
            console.log(err);
            this.catchError(err);
          })
          .finally(() => (this.loadingTable = false));
      }
    },
  },
};
</script>

<style></style>
