<template>
  <b-card class="shadow-none bg-transparent">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="card-title d-flex align-items-center">
        <b-spinner small type="grow" class="mr-2" v-if="loading" /> Penarikan
        Dana
      </h3>
      <BackUrl url="/app/partner/earnings" />
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
    <b-card class="mb-4">
      <div class="row">
        <div class="col-md-7">
          <h4>Input Jumlah Penarikan</h4>
        </div>
        <div class="col-md-5">
          <div class="text-info small">
            Minimal penarikan: Rp. {{ minNominalPenarikan }}
          </div>
          <b-input-group prepend="Rp">
            <money
              v-model="nominalPenarikan"
              v-bind="money"
              class="form-control text-right"
            ></money>
            <!-- <b-input type="text" v-model.lazy="nominalPenarikan" v-money="money" class="text-right"/> -->
          </b-input-group>
          <div v-html="showError('nominalPenarikan')" class="text-danger"></div>
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
          />
        </div>
        <div class="col-md-4">
          <!-- <b-input
            class="small py-3"
            v-model="bankRekening"
            placeholder="Masukkan nama bank"
          /> -->
          <b-select :options="bankListOption" v-model="bankRekening"></b-select>
        </div>
        <div class="col-md-4">
          <b-input
            class="small py-3"
            v-model="nomorRekening"
            placeholder="Masukkan nomor rekening"
          />
        </div>
      </div>
      <div v-html="showError('rekening')" class="text-danger mt-2"></div>
    </b-card>
    <div class="text-right">
      <b-button variant="primary" class="square" :disabled="loading || submitting || !isValidNominal" @click.prevent="submitRequest"
        >
        <b-spinner small v-if="submitting"></b-spinner> 
        <i class="fas fa-paper-plane mr-1" v-else></i> 
        Kirim Permintaan
        Penarikan</b-button
      >
    </div>
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
        perPage: 6,
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
        {text: 'Bank BCA', value: 'bca'},
        {text: 'Bank BNI', value: 'bni'},
        {text: 'Bank Mandiri', value: 'mandiri'},
        {text: 'Bank BRI', value: 'bri'},
        {text: 'CIMB Niaga', value: 'cimb'},
        {text: 'Bank Muamalat', value: 'muamalat'},
        {text: 'BTPN / Jenius', value: 'tabungan_pensiunan_nasional'},
        {text: 'Bank BCA Syariah', value: 'bca'},
        {text: 'Bank BNI Syariah', value: 'bni'},
        {text: 'Bank Syariah Mandiri', value: 'bsm'},
        {text: 'Bank Permata', value: 'permata'},
        {text: 'Bank Permata Syariah', value: 'permata'},
      ],
      // form
      minNominalPenarikan: 0,
      nominalPenarikan: 0,
      namaRekening: "",
      bankRekening: "bca",
      nomorRekening: "",
      // error
      dataError: {},
      isValidNominal: false
    };
  },
  created() {
    this.getPendapatanTotal();
    // this.getDataList();
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
      } 
      else {
        this.isValidNominal = true;
        this.$set(this.dataError, "nominalPenarikan", [""]);
      }
    },
    namaRekening(newValue) {
      if(newValue) {
        this.isValidNominal = true
        this.$set(this.dataError, "rekening", [""]);
      }
    },
    bankRekening(newValue) {
      if(newValue) {
        this.isValidNominal = true
        this.$set(this.dataError, "rekening", [""]);
      }
    },
    nomorRekening(newValue) {
      if(newValue) {
        this.isValidNominal = true
        this.$set(this.dataError, "rekening", [""]);
      }
    }
  },
  methods: {
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
      this.$set(this.dataError, "nominalPenarikan", ['']);
      if(!this.namaRekening || !this.bankRekening || !this.nomorRekening) {
        this.isValidNominal = false;
        this.$set(this.dataError, "rekening", [
          "Mohon lengkapi rekening penerima dana pencairan terlebih dahulu!"
        ]);
      }
      if(this.nominalPenarikan < +this.minNominalPenarikan) {
        this.isValidNominal = false;
        this.$set(this.dataError, "nominalPenarikan", [
          "Jumlah penarikan kurang dari minimal jumlah yang diizinkan!"
        ]);
      }
      if(this.isValidNominal == false) {
        return
      }
    },
    getPendapatanTotal() {
      this.loading = true;
      this.$axios
        .$get("/api/pendapatan/tentor/total-data")
        .then(response => {
          console.log(response);
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
    getDataList() {
      this.loading = true;
      this.$axios
        .$get(
          "/api/pendapatan/tentor/perkursus/" + this.$route.params.id + "/list"
        )
        .then(response => {
          console.log(response);
          if (response.success) {
            this.dataPendapatanPerKursusDetailList = response.data.data;
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
