<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Daftar Tentor Les</h2>
        <p>
          Data ini berisi data dari para Tentor atau Guru Les.
        </p>
      </div>
      <div class="col-md-12 text-right mt-4 crud-tools">
        <div class="row no-gutters justify-content-between">
          <div class="col-md-3">
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><i class="fas fa-filter"></i
                ></b-input-group-text>
              </template>
              <b-form-select
                v-model="filter.perPage"
                :options="[
                  { text: 'Tampil 5', value: 5 },
                  { text: 'Tampil 10', value: 10 },
                  { text: 'Tampil 25', value: 25 },
                  { text: 'Tampil 50', value: 50 }
                ]"
                @change="getData('users/teacher')"
              ></b-form-select>
            </b-input-group>
          </div>

          <div class="col-md-5 d-flex align-items-center crud-tools">
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><i class="fas fa-search"></i
                ></b-input-group-text>
              </template>
              <b-form-input
                v-model="filter.keyword"
                placeholder="Cari tentor"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
      </div>
      <div class="col-md-12 crud-body">
        <div class="overflow-auto">
          <table class="table-data-kelas table table-borderless">
            <thead class="thead-table">
              <tr>
                <th class="no" width="50">No</th>
                <th width="50" class="aksi">Aksi</th>
                <!-- <th width="100">Status</th> -->
                <!-- <th>Tanggal</th> -->
                <th>Nama Lengkap</th>
                <th>Email</th>
                <th>No. Telp/HP</th>
                <th>Pend. Terakhir</th>
                <th>Umur</th>
              </tr>
            </thead>
            <tbody class="body-table">
              <template v-if="totalRows > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="text-center">{{ (filter.page - 1) * filter.perPage + (index + 1) }}</td>
                  <td class="btn-table">
                    <button
                      class="btn btn-light px-2 mt-n2"
                      @click.prevent="
                        selectedId = item.id_teacher;
                        selectedIndex = index;
                        getDetail('users/teacher');
                      "
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </td>
                  <!-- <td><span :class="statusBadge(item.status)">{{item.status}}</span></td> -->
                  <!-- <td>
                    {{
                      formatTanggal(
                        item.tanggal_transaksi,
                        "Do MMMM YYYY HH:mm"
                      )
                    }}
                    WIB
                  </td> -->
                  <td>{{ item.nama_lengkap }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.nomor_telephone }}</td>
                  <td>{{ item.pendidikan_terakhir ? item.pendidikan_terakhir : '-' }}</td>
                  <td>
                    <span v-if="item.tanggal_lahir">{{ formatSelisih(item.tanggal_lahir, new Date(), 'years') }}</span>
                    <span v-else>-</span>
                     tahun
                  </td>
                </tr>
              </template>
              <UITableLoading v-if="loading" />
              <UITableNotFound
                v-if="totalRows == 0 && filter.keyword && !loading"
              />
            </tbody>
          </table>

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

      <div
        v-if="totalRows == 0 && !loading && !filter.keyword"
        class="crud-body kosong"
      >
        <h2 class="kosong-title">Oops!</h2>
        <p class="kosong-subtitle">Belum ada data Tentor</p>
      </div>
    </div>

    <b-modal
      id="modal-detail"
      title="Detail Tentor"
      hide-footer
      centered
      size="lg"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <template v-if="detail && !loading">
        <!-- <p style="">
          Konfirmasi terlebih dahulu informasi di bawah ini dengan teliti
          sebelum melakukan verifikasi!
        </p> -->
        <div class="row justify-content-center">
          <div class="col-md-8 modal-body-kiri">
            <h5>Identitas Diri</h5>
            <hr />
            <table class="table table-borderless">
              <tr>
                <th width="150">Nama Lengkap</th>
                <th width="10">:</th>
                <th>{{ detail.nama_lengkap }}</th>
              </tr>
              <tr v-if="detail.user">
                <th width="150">Status Akun</th>
                <th width="10">:</th>
                <th>
                  <span :class="statusBadge(detail.user.verifikasi)">{{
                    detail.user.verifikasi == 1
                      ? "Belum Diverifikasi"
                      : "Sudah Diverifikasi"
                  }}</span>
                  <button
                    type="button"
                    v-if="detail.user.verifikasi != 2"
                    class="btn btn-sm btn-success px-2 py-0"
                    title="Verifikasi"
                    @click="verifyUser(2)"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    type="button"
                    v-if="detail.user.verifikasi == 2"
                    class="btn btn-sm btn-danger px-2 py-0"
                    title="Verifikasi"
                    @click="verifyUser(1)"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </th>
              </tr>
              <tr>
                <th width="150">Tgl. Bergabung</th>
                <th width="10">:</th>
                <th>
                  {{ formatTanggal(detail.created_at, "Do MMMM YYYY") }}
                </th>
              </tr>
              <tr>
                <th width="150">Email</th>
                <th width="10">:</th>
                <th>{{ detail.email }}</th>
              </tr>
              <tr>
                <th width="150">No. Telp/HP</th>
                <th width="10">:</th>
                <th>{{ detail.nomor_telephone }}</th>
              </tr>
              <tr>
                <th width="150">Tanggal Lahir</th>
                <th width="10">:</th>
                <th>
                  {{ detail.tempat_lahir }},
                  {{
                    formatTanggal(
                      detail.tanggal_lahir ? detail.tanggal_lahir : "1980-01-01"
                    )
                  }}
                </th>
              </tr>
              <tr>
                <th width="150">Umur</th>
                <th width="10">:</th>
                <th>
                  <span v-if="detail.tanggal_lahir">{{ formatSelisih(detail.tanggal_lahir, new Date(), 'years') }}</span>
                  <span v-else>-</span>
                   tahun
                  </th>
              </tr>
              <tr>
                <th width="150">Pendidikan Terakhir</th>
                <th width="10">:</th>
                <th>{{ detail.pendidikan_terakhir }}</th>
              </tr>
              <tr>
                <th width="150">Alamat Lengkap</th>
                <th width="10">:</th>
                <th>{{ detail.alamat_lengkap ? detail.alamat_lengkap : '-' }}
                  <span v-if="detail.nama_kecamatan">, {{detail.nama_kecamatan}},</span>
                  <span v-if="detail.nama_kota">{{detail.nama_kota}},</span>
                  <span v-if="detail.nama_provinsi">{{detail.nama_provinsi}},</span>
                </th>
              </tr>
              <tr>
                <th width="150">Agama</th>
                <th width="10">:</th>
                <th>{{ detail.agama }}</th>
              </tr>
              <tr>
                <th width="150">Jenis Kelamin</th>
                <th width="10">:</th>
                <th>{{ detail.jenis_kelamin }}</th>
              </tr>
              <tr>
                <th width="150">Sumber Info</th>
                <th width="10">:</th>
                <th>{{ detail.info }}</th>
              </tr>
            </table>
          </div>
          <div class="col-md-8 modal-body-kanan">
            <h5>Dokumen Pendukung</h5>
            <div v-if="detail.user">
              Status Approval :
              <span :class="statusBadge(detail.verifikasi)">{{
                detail.verifikasi == 1
                  ? "Belum Diverifikasi"
                  : "Sudah Diverifikasi"
              }}</span>
            </div>
            <hr />
            <template v-if="detail.user_doc">
              <div
                v-for="(doc, index) in detail.user_doc"
                :key="'ud' + index"
                class="mb-3"
              >
                <h6 v-text="doc.doc_label"></h6>
                <div class="card">
                  <img
                    :src="ApiUrl(doc.doc_file)"
                    :alt="doc.doc_type"
                    class="card-img-top"
                    style="height: 250px; object-fit: contain"
                  />
                </div>
              </div>
            </template>
            <div class="mt-4" v-if="detail.verifikasi != 2">
              <div class="mb-3">
                <p class="mb-2">
                  Apakah dokumen ini dapat diterima?
                </p>
                <!-- <select class="form-control" v-model="form.verifikasi">
                    <option :value="null">-- Pilih --</option>
                    <option :value="1">Terima</option>
                    <option :value="0">Tolak</option>
                  </select> -->
              </div>
              <!-- <div class="mb-3" v-if="form.verifikasi == '3'">
                  <p class="mb-2">Tulis alasan penolakan</p>
                  <textarea
                    class="form-control"
                    rows="4"
                    v-model="form.alasan_penolakan"
                  ></textarea>
                </div> -->
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-primary tambah px-4 py-1"
            type="button"
            :disabled="submitting"
            v-if="detail.verifikasi != 2"
            @click.prevent="verifyBukti"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner> Terima
            Dokumen
          </button>
          <button
            class="btn btn-sm btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-detail')"
          >
            Tutup
          </button>
        </div>
      </template>
      <div style="min-height: 200px; position: relative" v-else>
        <UILoading />
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      submitting: false,
      filter: {
        page: 1,
        perPage: 5,
        keyword: ""
      },
      totalRows: 0,
      items: [],
      selectedId: null,
      selectedIndex: null,
      detail: {},
      showBukti: false,
      form: {
        verifikasi: null
      }
    };
  },
  created() {
    this.getData("users/teacher");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("users/teacher");
    },
    "filter.page": function(value) {
      this.getData("users/teacher");
    }
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    }
  },
  methods: {
    resetModal() {
      this.detail = {};
    },
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case 1:
          statusClass += "danger";
          break;
        case 2:
          statusClass += "success";
          break;
        default:
          statusClass += "secondary";
          break;
      }
      return statusClass;
    },
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.items = res.data.data;
            this.totalRows = res.data.total;
            this.filter.perPage = res.data.per_page;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetail(type) {
      this.loading = true;
      this.$bvModal.show("modal-detail");
      this.$axios
        .$get(`/api/${type}/find/${this.selectedId}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.detail = res.data;
            this.form.status =
              this.detail.status == "Menunggu Verifikasi"
                ? null
                : this.detail.status;
            this.form.alasan_penolakan = this.detail.alasan_penolakan;
            this.form.jenis_transaksi = this.detail.jenis_transaksi;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    verifyUser(status) {
      var conf = confirm(
        `Apakah anda yakin menjadikan User ${
          status !== 2
            ? "sebagai belum di verifikasi / nonaktif"
            : "sebagai telah di verifikasi"
        }?`
      );
      if (!conf) {
        return;
      }
      this.submitting = true;
      this.$axios
        .$put(`/api/users/teacher/update/${this.selectedId}`, {
          ...this.detail,
          tgl_lahir: this.detail.tanggal_lahir,
          alamat: this.detail.alamat_lengkap,
          username: this.detail.user.username,
          verifikasi: status
        })
        .then(res => {
          if (res.success) {
            this.$bvToast.toast(
              `User berhasil ${
                status !== 2 ? "dinonaktifkan" : "diverifikasi"
              }!`,
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.items[
              this.selectedIndex
            ].user.verifikasi = status;
            this.detail.user.verifikasi = status
            // this.$bvModal.hide("modal-detail");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.submitting = false));
    },
    verifyBukti() {
      var conf = confirm("Apakah anda yakin?");
      if (!conf) {
        return;
      }
      this.submitting = true;
      this.$axios
        .$get(`/api/verifikasi/patner/${this.selectedId}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$bvToast.toast("Dokumen berhasil diverifikasi!", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.items[this.selectedIndex].verifikasi = this.form.verifikasi;
            this.detail.verifikasi = this.form.verifikasi
            // this.$bvModal.hide("modal-detail");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.submitting = false));
    }
  }
};
</script>
