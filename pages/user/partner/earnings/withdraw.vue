<template>
  <b-card class="shadow-none bg-transparent">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="card-title d-flex align-items-center">
        <b-spinner small type="grow" class="mr-2" v-if="loading" /> Penarikan
        Dana
      </h3>
      <BackUrl url="/user/partner/earnings" />
    </div>
    <hr />
    <b-card class="mb-4">
      <div class="row">
        <div class="col-md-7">
          <h4>Saldo Anda</h4>
        </div>
        <div class="col-md-5">
          <h3 class="d-flex justify-content-between">
            <span class="h6">Rp</span>
            <span>{{ dataPendapatan.totalSaldo }}</span>
          </h3>
        </div>
      </div>
    </b-card>
    <form method="POST" @submit="submitRequest">
      <b-card class="mb-4">
        <div class="row">
          <div class="col-md-7">
            <h4>Input Jumlah Penarikan</h4>
          </div>
          <div class="col-md-5">
            <div class="text-info small mb-1">
              Minimal penarikan: Rp. {{ formatRupiah(minNominalPenarikan) }}
            </div>
            <b-input-group prepend="Rp">
              <money
                v-model="nominalPenarikan"
                v-bind="money"
                class="form-control text-right"
              ></money>
              <!-- <b-input type="text" v-model.lazy="nominalPenarikan" v-money="money" class="text-right"/> -->
            </b-input-group>
            <div
              v-html="showError('nominalPenarikan')"
              class="text-danger"
            ></div>
          </div>
        </div>
      </b-card>
      <b-card class="mb-4">
        <div class="row">
          <div class="col-md-12">
            <h4>Rekening Pencairan</h4>
          </div>
          <div class="col-md-4">
            <b-input
              class="small py-3"
              v-model="namaRekening"
              placeholder="Masukkan nama pemilik rekening"
              name="nama_rekening"
            />
          </div>
          <div class="col-md-4">
            <!-- <b-input
            class="small py-3"
            v-model="bankRekening"
            placeholder="Masukkan nama bank"
          /> -->
            <b-select
              :options="bankListOption"
              v-model="bankRekening"
              name="bank_rekening"
            ></b-select>
          </div>
          <div class="col-md-4">
            <b-input
              class="small py-3"
              v-model="nomorRekening"
              placeholder="Masukkan nomor rekening"
              name="nomor_rekening"
            />
          </div>
        </div>
        <div v-html="showError('rekening')" class="text-danger mt-2"></div>
      </b-card>
      <div class="row justify-content-end align-items-center">
        <div class="col-md-7">
          <div class="row align-items-center justify-content-end">
            <div class="col-md-5">
              <b-input-group>
                <template #prepend>
                  <b-input-group-text class="text-secondary"
                    ><i class="fas fa-lock"></i
                  ></b-input-group-text>
                </template>
                <b-input
                  type="password"
                  v-model="password"
                  class="small py-3"
                  placeholder="Masukkan password Anda"
                />
              </b-input-group>
              <div
                v-html="showError('password')"
                class="text-danger mt-2"
              ></div>
            </div>
            <div class="col-md-7">
              <b-button
                variant="primary"
                type="submit"
                class="square"
                :disabled="loading || submitting || !isValidNominal"
                @click.prevent="submitRequest"
              >
                <b-spinner small v-if="submitting"></b-spinner>
                <i class="fas fa-paper-plane mr-1" v-else></i>
                Kirim Permintaan Penarikan</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="mb-3 d-flex align-items-center">
              <b-spinner small type="grow" class="mr-2" v-if="loading" />
              Riwayat Penarikan
            </h4>
            <div class="table-responsive">
              <table class="table table-bordered normal">
                <thead class="thead-light">
                  <tr>
                    <th>Tanggal</th>
                    <th>Kode</th>
                    <th>Bank</th>
                    <th>Nominal</th>
                    <th style="width: 100px;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in dataPenarikanList"
                    :key="'k' + index"
                  >
                    <td width="200">
                      {{ formatTanggal(item.created_at, "Do MMMM YYYY HH:mm") }}
                      WIB
                    </td>
                     <td>
                      {{ item.kode }}
                    </td>
                    <td>
                      <span>{{ item.nama_rekening }} <br>
                      {{ item.bank_rekening }} - No. {{ item.nomor_rekening }}</span>
                      <b-button v-if="item.status_penarikan == 'Selesai'" @click="selectedData = item; $bvModal.show('modal-image')" variant="primary" size="sm" class="ml-2 px-1 py-0"><i class="fas fa-fw fa-search"></i></b-button>
                    </td>
                    <td>
                      <div class="d-flex justify-content-between">
                        <span>Rp</span>
                        <span class="font-weight-bold">{{
                          formatRupiah(item.nominal_penarikan)
                        }}</span>
                      </div>
                    </td>
                    <td>
                      <span :class="statusBadge(item.status_penarikan)">{{
                        item.status_penarikan
                      }}</span>
                    </td>
                  </tr>
                  <UITableLoading v-if="loading" />
                  <UITableNotFound
                    text="Belum ada data."
                    v-if="
                      dataPenarikanList &&
                        dataPenarikanList.length == 0 &&
                        filter.keyword &&
                        !loading
                    "
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
        </div>
      </div>
    </div>
    <b-modal id="modal-image" title="Bukti Pencairan Dana" hide-footer>
      <div v-if="selectedData.bukti_transfer">
        <!-- <h6>Penarikan #{{selectedData.kode}}</h6> -->
        <!-- <hr> -->
        <img :src="ApiUrl(selectedData.bukti_transfer)" alt="bukti transfer dana" class="img-fluid" style="width: 100%">
        <hr>
        <b-button variant="outline-primary" size="sm" @click="$bvModal.hide('modal-image')">Tutup</b-button>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import { Money } from "v-money";

export default {
  layout: "app",
  components: { Money },
  data() {
    return {
      loading: true,
      submitting: false,
      dataPendapatan: {
        totalPendapatan: "0",
        totalPendapatanNum: 0,
        totalPenarikan: "0",
        totalPenarikanNum: 0,
        totalSaldo: "0",
        totalSaldoNum: 0
      },
      dataPenarikanList: [],
      filter: {
        page: 1,
        perPage: 10,
        keyword: ""
      },
      totalRows: 1,
      // v-money
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false
      },
      bankListOption: [
        { text: "BCA", value: "BCA" },
        { text: "BNI", value: "BNI" },
        { text: "Mandiri", value: "Mandiri" },
        { text: "BRI", value: "BRI" },
        { text: "CIMB Niaga", value: "CIMB Niaga" },
        { text: "Muamalat", value: "Muamalat" },
        { text: "BTPN / Jenius", value: "BTPN / Jenius" },
        { text: "BCA Syariah", value: "BCA Syariah" },
        { text: "BNI Syariah", value: "BNI Syariah" },
        { text: "Bank Syariah Mandiri", value: "Bank Syariah Mandiri" },
        { text: "Permata", value: "Permata" },
        { text: "Permata Syariah", value: "Permata Syariah" }
      ],
      // form
      minNominalPenarikan: 0,
      nominalPenarikan: 0,
      namaRekening: "",
      bankRekening: "BCA",
      nomorRekening: "",
      password: "",
      // error
      dataError: {},
      isValidNominal: false,
      // detail
      selectedData: {}
    };
  },
  created() {
    this.getPendapatanTotal();
    this.getPenarikanList();
  },
  watch: {
    nominalPenarikan(newValue) {
      const newNominal = newValue ? parseInt(newValue) : 0;
      if (newNominal > this.dataPendapatan.totalSaldoNum) {
        this.isValidNominal = false;
        this.$set(this.dataError, "nominalPenarikan", [
          "Jumlah penarikan melebihi saldo Anda!"
        ]);
      } else if (newNominal < 0) {
        this.isValidNominal = false;
        this.$set(this.dataError, "nominalPenarikan", [
          "Jumlah penarikan tidak valid!"
        ]);
        // } else if (newNominal < this.minNominalPenarikan) {
        //   this.isValidNominal = false;
        //   // this.$set(this.dataError, "nominalPenarikan", [
        //   //   "Jumlah penarikan kurang dari minimal jumlah yang diizinkan!"
        //   // ]);
      } else {
        this.isValidNominal = true;
        this.$set(this.dataError, "nominalPenarikan", [""]);
      }
    },
    namaRekening(newValue) {
      if (newValue) {
        this.isValidNominal = true;
        this.$set(this.dataError, "rekening", [""]);
      }
    },
    bankRekening(newValue) {
      if (newValue) {
        this.isValidNominal = true;
        this.$set(this.dataError, "rekening", [""]);
      }
    },
    nomorRekening(newValue) {
      if (newValue) {
        this.isValidNominal = true;
        this.$set(this.dataError, "rekening", [""]);
      }
    },
    password(newValue) {
      if (newValue) {
        this.isValidNominal = true;
        this.$set(this.dataError, "password", [""]);
      }
    }
  },
  methods: {
    formatRupiah(nominal) {
      if (nominal) {
        nominal = parseFloat(nominal);
        return nominal.toLocaleString("id-ID");
      }
      return 0;
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
    submitRequest() {
      this.$set(this.dataError, "nominalPenarikan", [""]);
      if (!this.namaRekening || !this.bankRekening || !this.nomorRekening) {
        this.isValidNominal = false;
        this.$set(this.dataError, "rekening", [
          "Mohon lengkapi rekening penerima dana pencairan terlebih dahulu!"
        ]);
      }
      if (!this.password) {
        this.isValidNominal = false;
        this.$set(this.dataError, "password", ["Mohon masukkan password!"]);
      }
      if (this.nominalPenarikan < +this.minNominalPenarikan) {
        this.isValidNominal = false;
        this.$set(this.dataError, "nominalPenarikan", [
          "Jumlah penarikan kurang dari minimal jumlah yang diizinkan!"
        ]);
      }
      if (this.isValidNominal == false) {
        return;
      }

      const dataSubmit = {
        nominal_penarikan: this.nominalPenarikan,
        nama_rekening: this.namaRekening,
        bank_rekening: this.bankRekening,
        nomor_rekening: this.nomorRekening,
        password: this.password
      };

      this.submitting = true;
      this.$axios
        .$post("/api/penarikan/tentor", dataSubmit)
        .then(response => {
          if (response.success) {
            this.showToastMessage(
              "Penarikan berhasil dikirimkan! Mohon tunggu verifikasi dari kami.",
              "success"
            );
            this.nominalPenarikan = 0;
            this.namaRekening = "";
            this.bankRekening = "";
            this.nomorRekening = "";
            this.password = "";
            this.getPendapatanTotal();
            this.getPenarikanList();
          }
        })
        .catch(error => {
          this.catchError(error);
          if (error.response && error.response.status == 422) {
            for (let key in error.response.data.messages) {
              // console.log(key, error.response.data);
              this.$set(this.dataError, key, [
                error.response.data.messages[key]
              ]);
            }
          }
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    getPendapatanTotal() {
      this.loading = true;
      this.$axios
        .$get("/api/pendapatan/tentor/total-data")
        .then(response => {
          if (response.success) {
            this.dataPendapatan = response.data;
            this.minNominalPenarikan = this.getSetting("min_penarikan");
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPenarikanList() {
      this.loading = true;
      this.$axios
        .$get("/api/penarikan/tentor", {
          q: this.filter.keyword,
          paginate: this.filter.perPage
        })
        .then(response => {
          if (response.success) {
            this.dataPenarikanList = response.data.data;
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case "Pending":
          statusClass += "warning";
          break;
        case "Proses":
          statusClass += "info";
          break;
        case "Selesai":
          statusClass += "success";
          break;
        default:
          statusClass += "secondary";
          break;
      }
      return statusClass;
    }
  }
};
</script>
