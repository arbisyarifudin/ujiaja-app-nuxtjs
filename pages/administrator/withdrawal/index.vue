<template>
  <b-card class="shadow-none bg-transparent">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="card-title d-flex align-items-center">
        <b-spinner small type="grow" class="mr-2" v-if="loading" /> Penarikan
        Dana
      </h3>
    </div>
    <p>
      Ini adalah daftar riwayat penarikan dana yang dilakukan oleh Tentor.
      Silakan tindak lanjut permintaan penarikan yang belum di proses.
    </p>

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
                placeholder="Cari penarikan"
                debounce="300"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-lg-6 col-md-12 col-12">
            <div class="row justify-content-end align-items-center">
              <div class="col-lg-5 col-md-5 col-12 mb-3 mb-md-0">
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
                    @change="getPenarikanList"
                  ></b-form-select>
                </b-input-group>
              </div>
              <div class="col-lg-5 col-md-5 col-12 mb-3 mb-md-0">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    class="small"
                    v-model="filter.status"
                    :options="[
                      { text: '-- Status --', value: '' },
                      { text: 'Menunggu Diproses', value: 'Pending' },
                      { text: 'Sedang Diproses', value: 'Proses' },
                      { text: 'Dana Dikirimkan', value: 'Proses' }
                    ]"
                    @change="getPenarikanList"
                  ></b-form-select>
                </b-input-group>
              </div>
            </div>
          </div>
        </div>
        <hr class="mb-0" />
        <div class="courses-review review pos-relative">
          <ul class="review-list list-unstyled">
            <li
              class="d-flex review-item"
              v-for="(item, index) in dataList"
              :key="'uls' + index"
            >
              <img
                :src="ApiUrl(item.tentor ? item.tentor.foto : '-')"
                @error="noImage"
                alt="profile pic"
                class="review-avatar"
              />
              <div class="review-data ml-md-4">
                <div class="mb-2">
                  <span class="mr-1"
                    ><b-icon icon="person"></b-icon>
                    {{ item.tentor ? item.tentor.nama_lengkap : "" }}</span
                  >
                  <span
                    class="badge badge-info"
                    style="font-weight: normal; font-size: 10px"
                    >@{{
                      item.tentor && item.tentor.user
                        ? item.tentor.user.username
                        : "username"
                    }}</span
                  >
                </div>
                <div class="d-flex justify-content-between">
                  <div class="review-data__author">
                    <b>#{{ item.kode }}</b> -
                    {{ formatTanggal(item.created_at, "DD MMMM YYYY - HH:mm") }}
                    WIB
                  </div>
                  <div>
                    <span
                      style="font-size: 12px"
                      :class="statusBadge(item.status_penarikan)"
                      >{{ statusLabel(item.status_penarikan) }}</span
                    >
                    <!-- <b-dropdown
                      size="sm"
                      variant="outline-primary"
                      toggle-class="text-decoration-none square px-2 py-0 ml-2"
                      no-caret
                      dropleft
                    >
                      <template #button-content>
                        <b-icon icon="three-dots"></b-icon>
                      </template>
                      <b-dropdown-item
                        @click.prevent="
                          selectedData = item;
                          $bvModal.show('modal-status');
                        "
                        >Ubah Status</b-dropdown-item
                      >
                    </b-dropdown> -->
                  </div>
                </div>
                <div
                  class="review-data__comment mt-3 d-flex align-items-center"
                >
                  <h5 class="mb-0">
                    Rp {{ formatRupiah(item.nominal_penarikan) }}
                  </h5> 
                  <span class="ml-2 small">|</span> 
                  <b-button
                    title="Lihat Detail"
                    variant="light"
                    class="px-2 text-dark ml-2"
                    size="sm"
                    @click.prevent="
                      selectedData = item; selectedIndex = index
                      $bvModal.show('modal-detail');
                    "
                    ><i class="fas fa-search fa-fw"></i></b-button>
                  <b-button
                    v-if="item.status_penarikan == 'Pending'"
                    title="Proses"
                    variant="light"
                    class="px-2 ml-2 text-success"
                    size="sm"
                    @click.prevent="selectedData = item; selectedIndex = index
                      $bvModal.show('modal-proses');"
                    ><i class="fas fa-check fa-fw"></i></b-button>
                    <b-button
                    v-if="item.status_penarikan == 'Proses'"
                    title="Kirim Dana"
                    variant="light"
                    class="px-2 ml-2 text-primary"
                    size="sm"
                    @click.prevent="selectedData = item; selectedIndex = index
                      $bvModal.show('modal-kirim');"
                    ><i class="fas fa-paper-plane fa-fw"></i></b-button>
                </div>
              </div>
            </li>
          </ul>
          <div
            class="pos-relative"
            v-if="!loading && dataList && dataList.length < 1"
          >
            <UITableNotFound text="Belum ada data penarikan." />
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
      id="modal-detail"
      title="Detail Penarikan"
      centered
      hide-footer
      class="admin-modal"
    >
      <div>
        <p class="modal-text">
          Berikut adalah detail dari penarikan ini, mohon tindak lanjuti
          permintaan penarikan/pencairan dana jika data sudah Anda verifikasi.
        </p>
        <hr />

        <div class="">
          <table class="table table-borderless">
            <tr>
              <th width="150">Kode Penarikan</th>
              <th width="10">:</th>
              <td>{{ selectedData.kode }}</td>
            </tr>
            <tr>
              <th width="150">Nominal Penarikan</th>
              <th width="10">:</th>
              <td>Rp {{ formatRupiah(selectedData.nominal_penarikan) }}</td>
            </tr>
            <tr>
              <th width="150">Nama Tentor</th>
              <th width="10">:</th>
              <td>
                {{
                  selectedData.tentor ? selectedData.tentor.nama_lengkap : ""
                }}
              </td>
            </tr>
            <tr>
              <th width="150">Username Tentor</th>
              <th width="10">:</th>
              <td>
                {{
                  selectedData.tentor && selectedData.tentor.user
                    ? selectedData.tentor.user.username
                    : ""
                }}
              </td>
            </tr>
            <tr>
              <th width="150">Rekening Pencairan</th>
              <th width="10">:</th>
              <td>
                <div class="border-dashed rounded p-3">
                  {{ selectedData.bank_rekening }} <br>
                  {{ selectedData.nomor_rekening }} <br>
                  a.n
                  {{ selectedData.nama_rekening }}
                </div>
              </td>
            </tr>
            <tr v-if="selectedData.bukti_transfer">
              <th width="150">Bukti Pencairan Dana</th>
              <th width="10">:</th>
              <td>
                <div class="border-dashed rounded p-3">
                  <a :href="ApiUrl(selectedData.bukti_transfer)" target="_blank"><img :src="ApiUrl(selectedData.bukti_transfer)" alt="bukti transfer" class="img-fluid"></a>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-detail')"
          >
            Tutup
          </button>
          <!-- <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="submitData()"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Submit
          </button> -->
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-proses"
      title="Proses Permintaan Penarikan Data"
      centered
      hide-footer
      class="admin-modal"
    >
      <div>
        <p class="modal-text">
          Apakah Anda yakin ingin mengubah status penarikan <b>#{{selectedData.kode}}</b> menjadi <b>DIPROSES</b> ? Pemberitahuan akan dikirimkan ke Tentor terkait. 
          Selanjutnya, mohon jika dana sudah di transfer ke rekening tentor silakan <b>langsung unggah bukti transfer</b> pada tombol yang tersedia.
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-proses')"
          >
            Batal
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="prosesDanaPenarikan"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Ya, Proses
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-kirim"
      title="Kirim Bukti Transfer Penarikan Dana"
      centered
      hide-footer
      class="admin-modal"
    >
      <div>
        <p class="modal-text">
         Mohon unggah bukti transfer jika dana sudah ditransfer ke rekening yang Tentor cantumkan pada permintaan penarikan <b>#{{selectedData.kode}}</b> ini.
        </p>
        <div class="">
        <table class="table table-borderless">
          <tr>
            <th width="150">Nominal Penarikan</th>
            <th width="10">:</th>
            <td>Rp {{ formatRupiah(selectedData.nominal_penarikan) }}</td>
          </tr>
          <tr>
            <th width="150">Nama Tentor</th>
            <th width="10">:</th>
            <td>
              {{
                selectedData.tentor ? selectedData.tentor.nama_lengkap : ""
              }}
            </td>
          </tr>
          <tr>
            <th width="150">Username Tentor</th>
            <th width="10">:</th>
            <td>
              {{
                selectedData.tentor && selectedData.tentor.user
                  ? selectedData.tentor.user.username
                  : ""
              }}
            </td>
          </tr>
          <tr>
            <th width="150">Rekening Pencairan</th>
            <th width="10">:</th>
            <td>
              <div class="border-dashed rounded p-3">
                {{ selectedData.bank_rekening }} <br>
                {{ selectedData.nomor_rekening }} <br>
                a.n
                {{ selectedData.nama_rekening }}
              </div>
            </td>
          </tr>
          <tr>
            <th width="150">Bukti Transfer</th>
            <th width="10">:</th>
            <td>
              <input type="file" ref="bukti" name="bukti" class="form-control" @change="handleUploadedFile">
            </td>
          </tr>
        </table>
      </div>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-kirim')"
          >
            Batal
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="kirimDanaPenarikan"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Unggah Bukti
          </button>
        </div>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import { Money } from "v-money";

export default {
  layout: "admin",
  components: { Money },
  data() {
    return {
      loading: true,
      submitting: false,
      dataList: [],
      filter: {
        page: 1,
        perPage: 10,
        keyword: "",
        status: ""
      },
      totalRows: 1,
      sorting: "latest",
      selectedData: {},
      selectedIndex: null,
      file_bukti: null,
      form: {
        bukti_transfer: ''
      }
    };
  },
  created() {
    this.getPenarikanList();
  },
  watch: {
    
  },
  methods: {
    formatRupiah(nominal) {
      if (nominal) {
        nominal = parseFloat(nominal);
        return nominal.toLocaleString("id-ID");
      }
      return 0;
    },
    getPenarikanList() {
      if (this.sorting == "latest") {
        this.filter.sortBy = "created_at";
        this.filter.sortDir = "desc";
      } else if (this.sorting == "oldest") {
        this.filter.sortBy = "created_at";
        this.filter.sortDir = "asc";
      }

      this.loading = true;
      this.$axios
        .$get("/api/penarikan/riwayat", {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            sortBy: this.filter.sortBy,
            sortDir: this.filter.sortDir,
            status_penarikan: this.filter.status
          }
        })
        .then(response => {
          if (response.success) {
            this.dataList = response.data.data;
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    prosesDanaPenarikan() {

      if(this.selectedData.id) {
        this.loading = true;
        this.$axios
          .$put("/api/penarikan/proses-dana/" + this.selectedData.id, {})
          .then(response => {
            if (response.success) {
              this.dataList[this.selectedIndex].status_penarikan = 'Proses'
              this.showToastMessage('Penarikan diproses!', 'success');
              this.$bvModal.hide('modal-proses')
            }
          })
          .catch(error => {
            this.catchError(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }

    },
    kirimDanaPenarikan() {

      if(this.selectedData.id) {
        this.loading = true;
        this.$axios
          .$put("/api/penarikan/kirim-dana/" + this.selectedData.id, this.form)
          .then(response => {
            if (response.success) {
              this.dataList[this.selectedIndex].status_penarikan = 'Selesai'
              this.dataList[this.selectedIndex].bukti_transfer = response.data.bukti_transfer
              this.showToastMessage('Dana dikirim dan proses penarikan selesai!', 'success');
              this.$bvModal.hide('modal-kirim')
            }
          })
          .catch(error => {
            this.catchError(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }

    },
    handleUploadedFile() {
      this.file_bukti = this.$refs.bukti.files[0];
      // console.log(this.file_bukti);

      // let reader = new FileReader();
      // reader.onload = function(e) {
      //   document.getElementById("file-bukti_preview").src = e.target.result;
      // };
      // reader.readAsDataURL(this.file_bukti); // convert to base64 string

      let formData = new FormData();

      formData.append("image", this.file_bukti);
      // console.log(formData);

      if (this.file_bukti != null) {
        this.loading = true;
        this.$axios
          .$post(`/api/upload/image`, formData)
          .then(res => {
            console.log(res);
            if (res) {
              this.form.bukti_transfer = res.data.image_url;
            }
            return;
          })
          .catch(err => {
            console.log(err);
            this.catchError(err);
          })
          .finally(() => (this.loading = false));
      }
    },
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case "Pending":
          statusClass += "warning";
          break;
        case "Proses":
          statusClass += "danger";
          break;
        case "Selesai":
          statusClass += "success";
          break;
        default:
          statusClass += "secondary";
          break;
      }
      return statusClass;
    },
    statusLabel(status) {
      switch (status) {
        case "Pending":
          return "Menunggu Diproses";
        case "Proses":
          return "Sedang Diproses";
        case "Selesai":
          return "Dana Dikirimkan";
        default:
          return "-";
      }
    }
  }
};
</script>

<style scoped>
.table tr th {
  vertical-align: middle;
}
.table tr td {
  font-weight: 400;
  color: #777 !important;
  vertical-align: middle;
}
</style>
