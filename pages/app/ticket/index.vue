<template>
  <div class="row">
    <div class="col-md-12">
      <h3>Pengaduan Saya</h3>
      <p>
        Ini adalah daftar pengaduan dan permintaan bantuan yang pernah Kamu buat. Cek balasan kami
        melalui email kamu ya!
      </p>
    </div>
    <div class="col-md-12 my-3 crud">
      <div class="bg-white px-4 py-4 crud-body">
        <div class="row justify-content-between crud-tools">
          <div class="col-lg-4 col-md-12 col-12 mb-3 mb-lg-0">
            <b-input-group>
              <template #prepend>
                <b-input-group-text class="pl-3"
                  ><i class="fas fa-search"></i
                ></b-input-group-text>
              </template>
              <b-form-input
                class="small px-2"
                v-model="filter.keyword"
                placeholder="Cari pengaduan"
                debounce="300"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-lg-6 col-md-12 col-12">
            <div class="row justify-content-end align-items-center">
              <div class="col-lg-4 col-md-4 col-6 mb-3 mb-md-0">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    class="small"
                    v-model="sorting"
                    :options="[
                      { text: '-- Urutkan --', value: '' },
                      { text: 'Terbaru', value: 'latest' },
                      { text: 'Terlama', value: 'oldest' }
                    ]"
                    @change="getData()"
                  ></b-form-select>
                </b-input-group>
              </div>
              <div class="col-lg-4 col-md-4 col-6 mb-3 mb-md-0">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    class="small"
                    v-model="status"
                    :options="[
                      { text: '-- Status --', value: '' },
                      { text: 'Buka', value: 'Buka' },
                      { text: 'Ditutup', value: 'Ditutup' }
                    ]"
                    @change="getData()"
                  ></b-form-select>
                </b-input-group>
              </div>
              <div class="col-lg-4 col-md-4 col-12 text-right">
                <button
                  class="btn btn-primary tambah crud-btn__add px-4"
                  style="padding-top: 10px; padding-bottom: 10px;"
                  v-b-modal.modal-add
                >
                  Buat Pengaduan
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr class="mb-0" />
        <div class="courses-review review pos-relative">
          <ul class="review-list list-unstyled">
            <li
              class="d-flex review-item"
              v-for="(item, index) in list"
              :key="'uls' + index"
            >
              <div class="review-data ml-md-4">
                <div class="d-flex justify-content-between">
                  <div class="review-data__author">
                    <b>#{{ item.kode }}</b> - {{ item.subjek }}
                  </div>
                  <div>
                    Status: 
                    <span :class="statusBadge(item.status)">{{
                      item.status
                    }}</span>
                  </div>
                </div>
                <div class="d-flex review-data__rating">
                  <div class="time">
                    {{ formatTanggal(item.created_at, "DD MMMM YYYY - HH:mm") }}
                    WIB
                  </div>
                </div>
                <div class="review-data__comment mt-2">
                  {{ item.permasalahan }}
                </div>
              </div>
            </li>
          </ul>
          <div class="pos-relative" v-if="!loading && list && list.length < 1">
            <UITableNotFound text="Belum ada data pengaduan." />
          </div>
          <UILoading v-if="loading" />
          <b-pagination
            class="pagination-table"
            v-if="totalRows > 0 && totalRows > filter.perPage && !loading"
            v-model="filter.page"
            :total-rows="totalRows"
            :per-page="filter.perPage"
          >
          </b-pagination>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-add"
      title="Buat Pengaduan"
      centered
      hide-footer
      class="admin-modal"
    >
      <div>
        <p class="modal-text">
          Jika ada sesuatu yang membutuhkan bantuan atau ingin diadukan terkait hal teknis maupun non-teknis, silakan isi formulir
          dibawah. Kami akan tindak lanjutin pengaduan bantuanmu melalui email.
        </p>
        <div class="form-group">
          <label>Subjek</label>
          <b-form-input
            name="subjek"
            class="small py-3"
            placeholder="Tuliskan subjek dari pemasalahanmu"
            v-model="form.subjek"
          ></b-form-input>
        </div>
        <div class="form-group">
          <label>Permasalahan</label>
          <b-form-textarea
            name="permasalahan"
            class="small py-3"
            rows="4"
            placeholder="Tuliskan detail permasalahanmu"
            v-model="form.permasalahan"
          ></b-form-textarea>
        </div>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary square"
            type="button"
            @click="$bvModal.hide('modal-status')"
          >
            Tutup
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2 square"
            type="button"
            :disabled="submitting"
            @click.prevent="submitData"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Kirim
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
      submitting: false,
      loading: true,
      list: [],
      totalRows: 10,
      filter: {
        sortBy: "created_at",
        sortDir: "desc",
        page: 1,
        perPage: 10,
        keyword: ""
      },
      status: "",
      prioritas: "",
      sorting: "latest",
      selectedId: null,
      selectedIndex: null,
      selectedData: {},
      form: {
        subjek: '',
        permasalahan: ''
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    tentor() {
      return this.$store.state.dataUser.detail;
    }
  },
  watch: {
    "filter.page": function(value) {
      if (value) {
        this.getData();
      }
    },
    "filter.keyword": function(value) {
      this.getData();
    }
  },
  methods: {
    getData() {
      if (this.sorting == "latest") {
        this.filter.sortBy = "created_at";
        this.filter.sortDir = "desc";
      } else if (this.sorting == "oldest") {
        this.filter.sortBy = "created_at";
        this.filter.sortDir = "asc";
      }

      this.loading = true;
      this.$axios
        .$get("api/pengaduan", {
          params: {
            q: this.filter.keyword,
            page: this.filter.page,
            paginate: this.filter.perPage,
            sortBy: this.filter.sortBy,
            sortDir: this.filter.sortDir,
            prioritas: this.prioritas,
            status: this.status
          }
        })
        .then(res => {
          if (res.success) {
            this.list = res.data.data;
            this.totalRows = res.data.total;
            this.filter.perPage = res.data.per_page;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case "Buka":
          statusClass += "success";
          break;
        case "Ditutup":
          statusClass += "secondary";
          break;
        default:
          statusClass += "secondary";
          break;
      }
      return statusClass;
    },
    prioritasBadge(prioritas) {
      let prioritasClass = "badge badge-";
      switch (prioritas) {
        case "Rendah":
          prioritasClass += "warning";
          break;
        case "Sedang":
          prioritasClass += "info";
          break;
        case "Tinggi":
          prioritasClass += "danger";
          break;
        default:
          prioritasClass += "secondary";
          break;
      }
      return prioritasClass;
    },
    updateStatus() {
      if (this.selectedData && this.selectedData.status) {
        this.$axios
          .$put(`api/pengaduan/update-status/${this.selectedData.id}`, {
            status: this.selectedData.status
          })
          .then(response => {
            if (response.success) {
              this.showToastMessage(response.message, "success");
            }
          })
          .catch(error => {
            this.catchError(error);
          });
      }
    },
    updatePrioritas() {
      if (this.selectedData && this.selectedData.prioritas) {
        this.$axios
          .$put(`api/pengaduan/update-prioritas/${this.selectedData.id}`, {
            prioritas: this.selectedData.prioritas
          })
          .then(response => {
            if (response.success) {
              this.showToastMessage(response.message, "success");
            }
          })
          .catch(error => {
            this.catchError(error);
          });
      }
    },
    submitData() {
      this.submitting = true;
      this.$axios
        .$post(`api/pengaduan`, this.form)
        .then(response => {
          if (response.success) {
            this.showToastMessage('Pengaduan berhasil dikirim!', "success");
            this.list.unshift(response.data)
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.submitting = false;
        });
    }
  }
};
</script>
