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
                  <td class="text-center">{{ (index + 1) }}</td>
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
                  <td>{{ item.pendidikan_terakhir }}</td>
                  <td>{{ formatSelisih(item.tanggal_lahir, new Date(), 'years') }} tahun</td>
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
        <div class="row">
          <div class="col-md-6 modal-body-kiri">
            <table class="table table-borderless">
              <tr>
                <th width="150">Nama Lengkap</th>
                <th width="10">:</th>
                <th>{{ detail.nama_lengkap }}</th>
              </tr>
              <tr>
                <th width="150">Status Akun</th>
                <th width="10">:</th>
                <th><span :class="statusBadge(detail.verifikasi)">{{detail.verifikasi == 1 ? 'Belum Diverifikasi' : 'Sudah Diverifikasi'}}</span></th>
              </tr>
              <tr>
                <th width="150">Tgl. Bergabung</th>
                <th width="10">:</th>
                <th>
                  {{
                    formatTanggal(
                      detail.created_at,
                      "Do MMMM YYYY"
                    )
                  }}
                </th>
              </tr>
              <tr>
                <th width="150">Email</th>
                <th width="10">:</th>
                <th>{{detail.email}}</th>
              </tr>
              <tr>
                <th width="150">No. Telp/HP</th>
                <th width="10">:</th>
                <th>{{detail.nomor_telephone}}</th>
              </tr>
              <tr>
                <th width="150">Tanggal Lahir</th>
                <th width="10">:</th>
                <th>{{detail.tempat_lahir}}, {{formatTanggal(detail.tanggal_lahir)}}</th>
              </tr>
              <tr>
                <th width="150">Umur</th>
                <th width="10">:</th>
                <th>{{ formatSelisih(detail.tanggal_lahir, new Date(), 'years') }} tahun</th>
              </tr>
              <tr>
                <th width="150">Pendidikan Terakhir</th>
                <th width="10">:</th>
                <th>{{ detail.pendidikan_terakhir }}</th>
              </tr>
              <tr>
                <th width="150">Alamat Lengkap</th>
                <th width="10">:</th>
                <th>{{ detail.alamat_lengkap ? detail.alamat_lengkap : '-' }}</th>
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
          <div class="col-md-6 modal-body-kanan">

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
    this.getData('users/teacher');
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData('users/teacher');
    },
    "filter.page": function(value) {
      this.getData('users/teacher');
    }
  },
  methods: {
    resetModal() {
      this.detail = {};
    },
    statusBadge (status) {
      let statusClass = 'badge badge-';
      switch (status) {
        case 1:
          statusClass += 'danger'
          break;
        case 2:
          statusClass += 'success'
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
