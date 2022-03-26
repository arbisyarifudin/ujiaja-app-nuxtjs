<template>
  <div class="container-fluid crud">
    <div class="col-md-12 dash-kelas p-0 text-left">
      <div class="col-md-12 dash-kelas mandiri-detail p-0">
        <h2 class="pb-0 mb-5">
          <BackUrl
            :title="null"
            :url="`/app/bundling/${dataDetail.id}/detail`"
            class="py-1 px-2 mr-3"
          />
          <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail Pesanan
        </h2>
        <div class="row flex-wrap">
          <div class="col-md-6 mb-4">
            <h5 class="">Ringkasan Pembelian</h5>
            <div class="bg-white p-4 mr-2 mt-3">
              <p>Pilih pembayaran sesuai dengan apa yang kamu mau:</p>
              <!-- <form class="form-user">
                <div class="form-group reg-siswa">
                  <select name="" class="form-control p-0">
                    <option value=""
                      ><p><i class="fa fa-qrcode"></i>Bank Transfer</p></option
                    >
                    <option value="">Pembayaran E-Money</option>
                    <option value="">Pembayaran E-Money</option>
                  </select>
                </div>
              </form> -->
              <div class="accordion">
                <div id="accordion" role="tablist">
                  <b-card no-body class="mb-2 shadow-none bg-white">
                    <b-card-header
                      header-tag="header"
                      class="py-1"
                      role="tab"
                      v-b-toggle="'accordion-manual'"
                    >
                      <a
                        class="card-link d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <p
                            class="text-card mb-1"
                            style="font-weight: 500; font-size: 18px"
                          >
                            Bank Transfer (Verifikasi Manual)
                          </p>
                          <p class="small mb-0" style="font-size: 13px">
                            Kamu perlu mengunggah bukti bayar dan kami akan
                            memverifikasinya dalam 1x24 jam.
                          </p>
                        </div>
                        <div>
                          <span class="when-closed"
                            ><i class="fas fa-chevron-down"></i
                          ></span>
                          <span class="when-open"
                            ><i class="fas fa-chevron-up"></i
                          ></span>
                        </div>
                      </a>
                    </b-card-header>
                    <b-collapse
                      :id="'accordion-manual'"
                      :visible="!loading"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body class="px-4 py-2">
                        <ul class="list-unstyled">
                          <li
                            class="d-flex justify-content-between align-items-center "
                            style="border-bottom: 1px solid #555"
                            v-for="(bank, b) in banks"
                            :key="b"
                          >
                            <label
                              class="d-flex align-items-center w-100 h-100 pt-4 pb-2"
                              :for="`radio-${b}`"
                            >
                              <img
                                :src="iconBank(bank.nama_bank)"
                                alt="bca"
                                class="mr-3 img-fluid"
                                style="width: 60px; object-fit: contain"
                              />
                              <span
                                style="font-size: 16px; font-weight: 500"
                                v-text="bank.nama_bank"
                              ></span>
                            </label>
                            <input
                              type="radio"
                              :id="`radio-${b}`"
                              name="radio"
                              :value="bank"
                              v-model="bankTerpilih"
                            />
                          </li>
                        </ul>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                  <b-card no-body class="mb-2 shadow-none bg-white">
                    <b-card-header
                      header-tag="header"
                      class="py-1"
                      role="tab"
                      v-b-toggle="'accordion-xendit'"
                    >
                      <a
                        class="card-link d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <p
                            class="text-card mb-1"
                            style="font-weight: 500; font-size: 18px"
                          >
                            Pembayaran Instan (Verifikasi Otomatis)
                          </p>
                          <p class="small mb-0" style="font-size: 13px">
                            Segera setelah kamu melakukan pembayaran sistem akan
                            memverifikasinya otomatis.
                          </p>
                        </div>
                        <div>
                          <span class="when-closed"
                            ><i class="fas fa-chevron-down"></i
                          ></span>
                          <span class="when-open"
                            ><i class="fas fa-chevron-up"></i
                          ></span>
                        </div>
                      </a>
                    </b-card-header>
                    <b-collapse
                      :id="'accordion-xendit'"
                      :visible="false"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body class="px-4 py-2">
                        <ul class="list-unstyled">
                          <li
                            class="d-flex justify-content-between align-items-center "
                            style="border-bottom: 1px solid #555"
                            v-for="(xendit, x) in xendits"
                            :key="x"
                          >
                            <label
                              class="d-flex align-items-center w-100 h-100 pt-4 pb-2"
                              :for="`radio-${x + 2 * 2}`"
                            >
                              <div v-html="xendit.icon" class="mr-2"></div>
                              <span
                                style="font-size: 16px; font-weight: 500"
                                v-text="xendit.text"
                              ></span>
                            </label>
                            <input
                              type="radio"
                              :id="`radio-${x + 2 * 2}`"
                              name="radio"
                              :value="xendit"
                              v-model="xenditTerpilih"
                            />
                          </li>
                        </ul>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-4">
            <div class="row flex-wrap">
              <div class="col-md-12 mb-4">
                <h5>Pesanan</h5>
                <div class="bg-white p-4 mr-2 mt-3" style="min-height: 200px">
                  <h5>{{ dataDetail.name }}</h5>
                  <p class="mb-2 mt-3">Harga Bundling</p>
                  <h5 class="mb-0 text-primary">
                    Rp {{ formatRupiah(dataDetail.price) }}
                  </h5>
                </div>
              </div>
              <div class="col-md-12 mb-4">
                <h5>Ringkasan Pembelian</h5>
                <div class="bg-white p-4 mt-3">
                  <div class="d-flex d-flex justify-content-between">
                    <div class="mr-5 pr-5">
                      <p class="mb-3">Harga Bundling</p>
                      <p
                        class="mb-3 small"
                        v-if="paymentMethod == 'Bank Transfer'"
                      >
                        Kode Unik
                      </p>
                      <p
                        class="mb-3 small"
                        v-if="paymentMethod == 'Pihak Ketiga'"
                      >
                        Biaya Admin
                      </p>
                      <p class="m-0 text-primary ">Subtotal</p>
                    </div>
                    <div class="ml-5 pl-5">
                      <p class="mb-3 text-right">
                        Rp {{ formatRupiah(dataDetail.price) }}
                      </p>
                      <p
                        class="mb-3 small text-right"
                        v-if="paymentMethod == 'Bank Transfer'"
                      >
                        Rp {{ bankTerpilih.nama_bank ? kodeUnik : "-" }}
                      </p>
                      <p
                        class="mb-3 small text-right"
                        v-if="paymentMethod == 'Pihak Ketiga'"
                      >
                        Rp {{ xenditTerpilih.text ? biayaAdm : "-" }}
                      </p>
                      <h5 class="m-0 text-primary text-right">
                        Rp
                        {{
                          bankTerpilih.nama_bank || xenditTerpilih.text
                            ? formatRupiah(totalHarga)
                            : "-"
                        }}
                      </h5>
                    </div>
                  </div>
                  <div class="col-md-12 text-right">
                    <button
                      class="btn btn-primary mr-0 mt-5"
                      type="button"
                      v-b-modal.modal-konfirmasi
                      v-if="bankTerpilih.nama_bank || xenditTerpilih.text"
                    >
                      Bayar Sekarang
                    </button>
                    <button
                      class="btn btn-primary mr-0 mt-5"
                      type="button"
                      disabled
                      v-else
                    >
                      Bayar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-konfirmasi"
      hide-footer
      centered
      size="md"
      no-close-on-backdrop
      no-close-on-esc
      modal-class="admin-modal"
      content-class="bg-primary--soft"
    >
      <div class="px-5 text-center">
        <h3 class="mb-2" style="font-size: 22px;">
          Konfirmasi Pemesanan
        </h3>
        <p style="font-size: 14px;">
          Apakah pembelian kamu sudah benar? Kamu tidak akan bisa mengubah lagi
          metode pembayaran setelah ini
        </p>
      </div>
      <div class="bg-white py-4 px-5 " style="border-radius: 15px;">
        <div
          class="row align-items-center mt-3 pb-3"
          style="border-bottom: 1px solid #4787;"
        >
          <div
            class="col-md-8 p-0 text-left  d-flex align-items-center"
            v-if="paymentMethod == 'Bank Transfer'"
          >
            <img
              :src="iconBank(bankTerpilih.nama_bank)"
              alt="bank icon"
              class="img-fluid"
              style="min-width: 60px"
            />
            <div class="ml-3">
              Bank Transfer <br />
              <strong>{{ bankTerpilih.nama_bank }}</strong>
            </div>
          </div>
          <div
            class="col-md-8 p-0 text-left d-flex align-items-center"
            v-if="paymentMethod == 'Pihak Ketiga'"
          >
            <div v-html="xenditTerpilih.icon"></div>
            <div class="ml-3">
              <small>Pembayaran Instan</small> <br />
              {{ xenditTerpilih.text }}
            </div>
          </div>
          <div class="col-md-4 p-0 text-right" style="">
            <p class="mb-0">
              Terpilih <i class="fa fa-check-circle text-success"></i>
            </p>
          </div>
        </div>
        <div class="row">
          <h5 class="mt-3 col-md-12 p-0">Ringkasan Pembelian</h5>
        </div>
        <div
          class="row align-items-center "
          style="border-bottom: 1px solid #4787;"
        >
          <div class="col-md-6 p-0 text-left">
            <p class="m-0">Subtotal</p>
            <p class="" v-if="paymentMethod == 'Bank Transfer'">Kode Unik</p>
            <p class="" v-if="paymentMethod == 'Pihak Ketiga'">Biaya Admin</p>
          </div>
          <div class="col-md-6 p-0 text-right">
            <p class="m-0">Rp {{ formatRupiah(dataDetail.price) }}</p>
            <p class="" v-if="paymentMethod == 'Bank Transfer'">
              Rp {{ kodeUnik }}
            </p>
            <p class="" v-if="paymentMethod == 'Pihak Ketiga'">
              Rp {{ biayaAdm }}
            </p>
          </div>
        </div>
        <div class="row align-items-center pt-3">
          <div class="col-md-6 p-0 text-left">
            <p class="">Total Tagihan</p>
          </div>
          <div class="col-md-6 p-0 text-right">
            <p class="font-weight-bold">Rp {{ formatRupiah(totalHarga) }}</p>
          </div>
        </div>
      </div>
      <div
        class="modal-footer pt-5"
        style="border: 0px; justify-content: center;"
      >
        <button
          class="btn btn-outline-secondary px-4 "
          style="border-radius: 25px;"
          type="button"
          @click.prevent="$bvModal.hide('modal-konfirmasi')"
          v-if="!loading"
        >
          Kembali
        </button>
        <button
          class="btn btn-primary tambah px-4 py-2"
          style="border-radius: 25px; border: 1px solid transparent;"
          type="button"
          @click.prevent="onSubmit"
          :disabled="loading"
        >
          <b-spinner small class="mr-1" v-if="loading"></b-spinner>
          Konfirmasi
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: false,
      dataDetail: {
        produk: {},
        tryout: []
      },
      // banks: [
      //   { text: "BCA", value: "bca", icon: "/icon/bca.png" },
      //   { text: "BNI", value: "bni", icon: "/icon/bni.png" },
      //   { text: "BRI", value: "bri", icon: "/icon/bri.png" }
      // ],
      paymentMethod: "Bank Transfer",
      banks: [],
      bankTerpilih: {},
      xendits: [
        {
          text: "Bank Transfer (Virtual Account)",
          value: "bank-transfer",
          icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M7.684 12.5h-3v13h3v-13zM15.684 12.5h-3v13h3v-13zM23.684 12.5h-3v13h3v-13zM3.184 25.5h22a1.5 1.5 0 011.5 1.5v1a.5.5 0 01-.5.5h-24a.5.5 0 01-.5-.5v-1a1.5 1.5 0 011.5-1.5v0zM26.684 9.5h-25v3h25v-3z" stroke="#5D7077"></path><path d="M14.184 2.147L2.002 9h24.365L14.184 2.147zm0-1a1 1 0 01.49.129l12.183 6.852c.897.505.539 1.872-.49 1.872H2.002c-1.03 0-1.388-1.367-.49-1.872l12.182-6.852a1 1 0 01.49-.129z" fill="#5D7077"></path><circle cx="24" cy="24" r="7.5" fill="#fff" stroke="#5D7077"></circle><path d="M27.5 25.5h-6.646l1.073-1.073-.354-.354-1.5 1.5a.25.25 0 000 .354l1.5 1.5.354-.354L20.854 26H27.5v-.5 0zM27.927 22.073l-1.5-1.5-.354.354L27.146 22H20.5v.5h6.646l-1.073 1.073.354.354 1.5-1.5a.25.25 0 000-.354z" fill="#5D7077" stroke="#5D7077" stroke-width="0.2"></path></svg>`
        },
        {
          text: "Retail Outlets",
          value: "retail-outlets",
          icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M28 18.5H4A1.5 1.5 0 002.5 20v4A1.5 1.5 0 004 25.5h24a1.5 1.5 0 001.5-1.5v-4a1.5 1.5 0 00-1.5-1.5z" stroke="#5D7077"></path><path d="M12 22H6" stroke="#5D7077" stroke-linecap="round"></path><path d="M28 18v-1.666a.334.334 0 00-.332-.334H16.334a.334.334 0 00-.334.334V18h12zm1 1H15v-2.666c0-.737.597-1.334 1.334-1.334h11.334c.736 0 1.332.597 1.332 1.334V19z" fill="#5D7077"></path><path d="M22 10a1 1 0 011 1v4h-2v-4a1 1 0 011-1z" fill="#fff"></path><path d="M22 10.5a.5.5 0 01.5.5v3.333a.167.167 0 01-.167.167h-.666a.167.167 0 01-.167-.167V11a.5.5 0 01.5-.5v0z" stroke="#5D7077"></path><path d="M26 6.5h-8A1.5 1.5 0 0016.5 8v4a1.5 1.5 0 001.5 1.5h8a1.5 1.5 0 001.5-1.5V8A1.5 1.5 0 0026 6.5z" stroke="#5D7077"></path></svg>`
        },
        {
          text: "E-wallet / QRIS",
          value: "ewallet",
          icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M23 2.5H9A1.5 1.5 0 007.5 4v24A1.5 1.5 0 009 29.5h14a1.5 1.5 0 001.5-1.5V4A1.5 1.5 0 0023 2.5zM7.5 6.5h17M7.5 23.5h17" stroke="#5D7077"></path><path d="M12.5 26.5h7" stroke="#5D7077" stroke-linecap="round"></path></svg>`
        },
        {
          text: "Credit / Debit Card",
          value: "credit-card",
          icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M27 7.5H5A1.5 1.5 0 003.5 9v14A1.5 1.5 0 005 24.5h22a1.5 1.5 0 001.5-1.5V9A1.5 1.5 0 0027 7.5z" stroke="#5D7077"></path><path d="M29 12H3v4h26v-4z" fill="#5D7077"></path><path d="M6 20h8" stroke="#5D7077" stroke-linecap="round"></path><path d="M26 17h-5v5h5v-5z" fill="#fff"></path><path d="M25.5 17.5h-4v4h4v-4z" stroke="#5D7077"></path></svg>`
        }
      ],
      xenditTerpilih: {},
      hargaProduk: 0,
      kodeUnik: 235,
      biayaAdm: 1500
    };
  },
  mounted() {
    this.$root.$on("bv::collapse::state", (collapseId, isJustShown) => {
      // console.log("collapseId:", collapseId);
      // console.log("isJustShown:", isJustShown);
      if (collapseId == "accordion-manual" && isJustShown) {
        this.paymentMethod = "Bank Transfer";
        this.xenditTerpilih = {};
      } else if (collapseId == "accordion-xendit" && isJustShown) {
        this.paymentMethod = "Pihak Ketiga";
        this.bankTerpilih = {};
      }
    });
    if (!this.$route.params.id)
      return this.$router.push("/app/bundle");
    this.getDetail("bundling", this.$route.params.id);
    this.getBank("bank");
  },
  computed: {
    totalHarga() {
      return this.paymentMethod == "Bank Transfer"
        ? this.hargaProduk + this.kodeUnik
        : this.hargaProduk + this.biayaAdm;
    },
    user() {
      return this.$store.state.dataUser.user;
    }
  },
  methods: {
    resetModal() {},
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}/detail`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            if(this.dataDetail.is_enrolled) {
              this.$router.replace({
                path: `/app/payment/${this.dataDetail.transaksi_user.id}/detail`
              });
            }
            this.hargaProduk = this.dataDetail.price;
            this.kodeUnik = this.getRandomInt(100, 999);
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getBank(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/bank`, {
          params: {
            paginate: 20
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.banks = res.data.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    onSubmit() {
      this.loading = true;
      let dataSave;

      dataSave = {
        id_user: this.user.id,
        id_produk: this.dataDetail.id,
        id_bank: this.bankTerpilih.id ?? null,
        tanggal_transaksi: new Date(),
        tipe: this.paymentMethod,
        harga_produk: this.hargaProduk,
        kode_unik: this.paymentMethod == 'Bank Transfer' ? this.kodeUnik : null,
        biaya_adm: this.paymentMethod == 'Pihak Ketiga' ? this.biayaAdm : null,
        total_harga: this.totalHarga,
        jenis_transaksi: 'Bundling'
      };

      // console.log(dataSave)
      // return;

      this.$axios
        .$post(`/api/transaksi/create`, dataSave)
        .then(res => {
          console.log(res);
          if (res.success) {
            const response = res.data;
            this.showToastMessage("Transaksi berhasil dibuat!", "success");
            if (this.paymentMethod == "Pihak Ketiga") {
              window.open(
                response.xendit.invoice_url + "#" + this.xenditTerpilih.value,
                "_blank"
              );
              this.$router.replace({
                path: `/app/payment/${response.transaksi.id}/detail`
              });
            } else {
              this.$router.replace({
                path: `/app/payment/${response.id}/confirm`
              });
            }
          }
          return true;
        })
        .then(() => {
          this.getNotif()
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    iconBank(nama = "") {
      let icon;
      switch (nama.toUpperCase()) {
        case "BCA":
          icon = "/icon/bca.png";
          break;
        case "BNI":
          icon = "/icon/bni.png";
          break;
        case "BRI":
          icon = "/icon/bri.png";
          break;
        case "MANDIRI":
          icon = "/icon/bank-mandiri.png";
          break;
        default:
          icon = "/icon/bca.png";
          break;
      }
      return icon;
    },
    formatRupiah(num) {
      if (num) {
        return num.toLocaleString("ID-id");
      }
      return 0;
    }
  }
};
</script>
