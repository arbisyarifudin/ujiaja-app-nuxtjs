<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Transaksi & Pembayaran</h2>
        <p>
          Data ini berisi transaksi dari pembayaran yang dilakukan oleh Siswa
          dan Tentor.
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
                @change="getData('transaksi')"
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
                placeholder="Cari transaksi"
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
                <th width="100">Status</th>
                <th>Tanggal</th>
                <th>Kode Transaksi</th>
                <th>Metode Pembayaran</th>
                <th>Nama Pengguna</th>
                <th width="120">Total</th>
              </tr>
            </thead>
            <tbody class="body-table">
              <template v-if="totalRows > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="text-center">{{ (index + 1) }}</td>
                  <td class="btn-table">
                    <button
                      class="btn btn-light px-2 mt-n2"
                      @click.prevent="
                        selectedId = item.id;
                        selectedIndex = index;
                        getDetail('transaksi');
                      "
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </td>
                  <td><span :class="statusBadge(item.status)">{{item.status}}</span></td>
                  <td>
                    {{
                      formatTanggal(
                        item.tanggal_transaksi,
                        "Do MMMM YYYY HH:mm"
                      )
                    }}
                    WIB
                  </td>
                  <td>{{ item.kode }}</td>
                  <td>
                    {{
                      item.tipe == "Pihak Ketiga"
                        ? "Pembayaran Instan"
                        : "Pembayaran Manual"
                    }}
                  </td>
                  <td>
                    <i class="fas fa-user"></i>
                    {{
                      item.user && item.user.siswa
                        ? item.user.siswa.nama_lengkap
                        : item.user.guru.nama_lengkap
                    }}
                  </td>
                  <td>
                    <div class="d-flex justify-content-between">
                      <span>Rp</span>
                      <strong>{{ formatRupiah(item.total_harga) }}</strong>
                    </div>
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
        <p class="kosong-subtitle">Belum ada transaksi</p>
      </div>
    </div>

    <b-modal
      id="modal-detail"
      title="Detail Pembayaran"
      hide-footer
      centered
      size="md"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <template v-if="detail && detail.user && !loading">
        <p style="">
          Konfirmasi terlebih dahulu informasi di bawah ini dengan teliti
          sebelum melakukan verifikasi!
        </p>
        <div class="row">
          <div class="col-md-12 modal-body-kiri">
            <table class="table table-borderless">
              <tr>
                <th width="150">Kode Transaksi</th>
                <th width="10">:</th>
                <th>{{ detail.kode }}</th>
              </tr>
              <tr>
                <th width="150">Tgl. Transaksi</th>
                <th width="10">:</th>
                <th>
                  {{
                    formatTanggal(
                      detail.tanggal_transaksi,
                      "Do MMMM YYYY HH:mm"
                    )
                  }}
                  WIB
                </th>
              </tr>
              <tr>
                <th width="150">Nama Pengguna</th>
                <th width="10">:</th>
                <th>
                  {{
                    detail.user && detail.user.siswa
                      ? detail.user.siswa.nama_lengkap
                      : detail.user.guru.nama_lengkap
                  }}
                </th>
              </tr>
              <tr>
                <th width="150">Kategori Produk</th>
                <th width="10">:</th>
                <th>Beli {{detail.jenis_transaksi}}</th>
              </tr>
              <tr>
                <th width="150">Nama Produk</th>
                <th width="10">:</th>
                <th>
                  <template v-if="detail.produk">
                    {{ detail.produk.nama_produk }}
                  </template>
                  <template v-else-if="detail.mbti">
                    {{ detail.mbti.judul }}
                  </template>
                </th>
              </tr>
              <tr>
                <th width="150">Total Transaksi</th>
                <th width="10">:</th>
                <th>Rp {{ formatRupiah(detail.total_harga) }}</th>
              </tr>
              <tr>
                <th width="150">Metode Pembayaran</th>
                <th width="10">:</th>
                <th>
                  {{
                    detail.tipe == "Pihak Ketiga"
                      ? "Pembayaran Instan"
                      : "Transfer Manual"
                  }}
                  <br />
                  <span :class="statusBadge(detail.status)">{{ detail.status }}</span>
                  <template v-if="!showBukti && form.status == 'Menunggu Verifikasi'">
                    <hr />
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      @click.prevent="showBukti = true"
                    >
                      <i class="fas fa-file-alt mr-1"></i> Lihat Bukti Pembayaran
                    </button>
                  </template>
                </th>
              </tr>
              <tr>
                <th width="150">Tujuan Pembayaran</th>
                <th width="10">:</th>
                <th>
                  <template v-if="detail.bank">
                    <span v-text="detail.bank.nama_bank"></span> - 
                    <span v-text="detail.bank.nomor_rekening"></span>
                     A.N
                    <span v-text="detail.bank.nama_pemilik"></span> 
                  </template>
                   <template v-else-if="detail.xendit">
                    <span v-text="detail.xendit.payment_channel"></span> -  
                    <span v-text="'No. VA : ' + detail.xendit.payment_destination"></span>
                  </template>
                </th>
              </tr>
            </table>
          </div>
          <div class="col-md-12" v-if="!detail.xendit">
            <div class="modal-body-kanan">
              <div class="card-image" v-show="showBukti || form.status != 'Menunggu Verifikasi'">
                <a href="/reg-siswa.png" target="_blank">
                  <img
                    src="/reg-siswa.png"
                    alt="payment struck image"
                    class="img-fluid"
                  />
                </a>
                <div class="mt-4">
                  <div class="mb-3">
                    <p class="mb-2">
                      Apakah bukti pembayaran ini dapat diterima?
                    </p>
                    <select class="form-control" v-model="form.status">
                      <option :value="null">-- Pilih --</option>
                      <option value="Sudah Diverifikasi">Terima</option>
                      <option value="Ditolak">Tolak</option>
                    </select>
                  </div>
                  <div class="mb-3" v-if="form.status == 'Ditolak'">
                    <p class="mb-2">Tulis alasan penolakan</p>
                    <textarea
                      class="form-control"
                      rows="4"
                      v-model="form.alasan_penolakan"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-detail')"
          >
            Tutup
          </button>
          <button
            class="btn btn-sm btn-primary tambah px-4 py-1"
            type="button"
            :disabled="submitting"
            v-if="(showBukti || form.status != 'Menunggu Verifikasi') && !detail.xendit"
            @click.prevent="verifyBukti"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner> Submit
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
        status: null,
        alasan_penolakan: null,
        jenis_transaksi: "",
      }
    };
  },
  created() {
    this.getData("transaksi");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("transaksi");
    },
    "filter.page": function(value) {
      this.getData("transaksi");
    }
  },
  methods: {
    resetModal() {
      this.detail = {};
    },
    statusBadge (status) {
      let statusClass = 'badge badge-';
      switch (status) {
        case 'Menunggu Pembayaran':
          statusClass += 'warning'
          break;
        case 'Menunggu Verifikasi':
          statusClass += 'info'
          break;
        case 'Sudah Diverifikasi':
          statusClass += 'success'
          break;
        case 'Ditolak':
          statusClass += 'danger'
          break;
        case 'Kadaluarsa':
          statusClass += 'secondary'
          break;
        case 'Dibatalkan':
          statusClass += 'warning'
          break;
        default:
          statusClass += 'secondary'
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
            this.form.status = this.detail.status == 'Menunggu Verifikasi' ? null : this.detail.status
            this.form.alasan_penolakan = this.detail.alasan_penolakan
            this.form.jenis_transaksi = this.detail.jenis_transaksi
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    verifyBukti() {
      if(!this.form.status) {
        this.showToastMessage('Status perlu diisi', 'warning');
        return;
      } 
      if(this.form.status == 'Ditolak' && !this.form.alasan_penolakan) {
        this.showToastMessage('Alasan penolakan wajib diisi', 'warning');
        return;
      }
      this.submitting = true;
      this.$axios
        .$put(`/api/transaksi/update-status/${this.selectedId}`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$bvToast.toast("Pembayaran berhasil diverifikasi!", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.items[this.selectedIndex].status = this.form.status;
            this.$bvModal.hide("modal-detail");
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
