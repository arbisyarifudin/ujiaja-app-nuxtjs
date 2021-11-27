<template>
  <div>
    <div class="col-md-12 dash-kelas mandiri-detail p-0">
      <h2 class="pb-0 mb-5">
        <BackUrl :title="null" class="py-1 px-2 mr-3" />
        <b-spinner type="grow" class="mr-2" v-if="loading" /> Konfirmasi
        Pembayaran
      </h2>
      <div
        class="alert alert-info"
        v-if="isPayable(dataDetail, 'Bank Transfer')"
      >
        <div v-if="dataDetail.status != 'Menunggu Pembayaran'">
          Anda sudah melakukan konfirmasi pembayaran sebelumnya. Jika bukti yang
          diunggah salah, silakan lakukan proses unggah bukti pembayaran ulang.
          <hr />
        </div>
        <div>
          Status Pembayaran : <b>{{ dataDetail.status }}</b>
        </div>
        <div v-if="dataDetail.status == 'Ditolak'">
          Alasan Penolakan :
          {{ dataDetail.alasan_penolakan ? dataDetail.alasan_penolakan : "-" }}
        </div>
        <div v-if="dataDetail.status == 'Dibatalkan'">
          Alasan Pembatalan :
          {{
            dataDetail.alasan_pembatalan ? dataDetail.alasan_pembatalan : "-"
          }}
        </div>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="row flex-wrap">
          <div class="col-md-6 p-0">
            <h5>Tata Cara Pembayaran</h5>
            <div class="bg-white p-4 mr-2 mt-3">
              <div class="d-flex">
                <div class="col-md-7 p-0"><h5>Batas Waktu</h5></div>
                <div class="col-md-5 p-0 text-right">
                  <b-badge
                    variant="warning"
                    class="text-white py-2 px-3"
                    style="font-size: 14px; letter-spacing: 1px"
                  >
                    <i class="far fa-clock mr-2"></i>
                    {{ dataDetail.batas_pembayaran }}</b-badge
                  >
                </div>
              </div>
              <div
                class="m-3 px-4 py-3"
                :style="
                  `background: #F5EFFF; box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1); border-radius: 2px;`
                "
              >
                <img
                  :src="iconBank(dataDetail.nama_bank)"
                  alt="icon bank"
                  class="mb-3"
                />

                <!-- <input
                    type="file"
                    class="form-control"
                    placeholder="Pilih File"
                  /> -->
                <b-form-file
                  browse-text="Jelajahi"
                  class="cursor-pointer mb-3"
                  ref="file"
                  @change="handleUploadFile"
                  accept=".jpg, .png, .gif, .pdf"
                ></b-form-file>
                <!-- <button
                    class="btn btn-primary unggah py-1"
                    style="border-radius: 5px; position: absolute; right: 74px; top: 171px;"
                  >
                    <i class="fa fa-plus"></i> Unggah
                  </button> -->
                <p v-if="dataDetail.bank">
                  Silahkan melakukan pembayaran melalui Bank
                  <span style="font-weight: 600"
                    >{{ dataDetail.bank.nama_bank }}
                    {{ dataDetail.bank.nomor_rekening }}</span
                  >
                  a/n
                  <span style="font-weight: 600">{{
                    dataDetail.bank.nama_pemilik
                  }}</span
                  >. Jika sudah melakukan pembayaran, silahkan unggah bukti
                  bayar dan tekan <b>Kirim</b>.
                </p>
              </div>
              <hr>
              <h5 v-if="tempImage || dataDetail.bukti_pembayaran" class="mb-3">Bukti Pembayaran</h5>
              <img
                :src="
                  tempImage ? tempImage : ApiUrl(dataDetail.bukti_pembayaran)
                "
                alt="bukti bayar"
                class="img-fluid w-100"
              />
            </div>
          </div>
          <div class="col-md-6 p-0">
            <h5>Detail Pemesanan</h5>
            <div class="bg-white p-4 mt-3">
              <div class="d-flex" v-if="dataDetail.produk">
                <div class="col-md-8 p-0">
                  <p class="mb-3">Kode Transaksi</p>
                  <p class="mb-3" v-text="dataDetail.produk.nama_produk"></p>
                  <p class="mb-3">Kode Unik</p>
                  <p class="m-0" style="color: #b0aeef;">Subtotal</p>
                </div>
                <div class="col-md-4 p-0 text-right" v-if="dataDetail.produk">
                  <p class="mb-3" v-text="dataDetail.kode"></p>
                  <p
                    class="mb-3"
                    v-text="'Rp ' + formatRupiah(dataDetail.harga_produk)"
                  ></p>
                  <p v-text="'Rp ' + formatRupiah(dataDetail.kode_unik)"></p>
                  <p
                    class="m-0"
                    style="color: #b0aeef; font-size: 20px"
                    v-text="'Rp ' + formatRupiah(dataDetail.total_harga)"
                  ></p>
                </div>
              </div>
              <div class="d-flex" v-else-if="dataDetail.mbti">
                <div class="col-md-8 p-0">
                  <p class="mb-3">Kode Transaksi</p>
                  <p class="mb-3" v-text="dataDetail.mbti.judul"></p>
                  <p class="mb-3">Kode Unik</p>
                  <p class="m-0" style="color: #b0aeef;">Subtotal</p>
                </div>
                <div class="col-md-4 p-0 text-right" v-if="dataDetail.mbti">
                  <p class="mb-3" v-text="dataDetail.kode"></p>
                  <p
                    class="mb-3"
                    v-text="'Rp ' + formatRupiah(dataDetail.harga_produk)"
                  ></p>
                  <p v-text="'Rp ' + formatRupiah(dataDetail.kode_unik)"></p>
                  <p
                    class="m-0"
                    style="color: #b0aeef; font-size: 20px"
                    v-text="'Rp ' + formatRupiah(dataDetail.total_harga)"
                  ></p>
                </div>
              </div>
              <div class="d-flex" v-else-if="dataDetail.kursus">
                <div class="col-md-8 p-0">
                  <p class="mb-3">Kode Transaksi</p>
                  <p class="mb-3" v-text="dataDetail.kursus.nama_kursus"></p>
                  <p class="mb-3">Kode Unik</p>
                  <p class="m-0" style="color: #b0aeef;">Subtotal</p>
                </div>
                <div class="col-md-4 p-0 text-right" v-if="dataDetail.kursus">
                  <p class="mb-3" v-text="dataDetail.kode"></p>
                  <p
                    class="mb-3"
                    v-text="'Rp ' + formatRupiah(dataDetail.harga_produk)"
                  ></p>
                  <p v-text="'Rp ' + formatRupiah(dataDetail.kode_unik)"></p>
                  <p
                    class="m-0"
                    style="color: #b0aeef; font-size: 20px"
                    v-text="'Rp ' + formatRupiah(dataDetail.total_harga)"
                  ></p>
                </div>
              </div>
              <div class="col-md-12 pr-0 text-right">
                <button
                  class="btn btn-primary mr-0 mt-5 d-inline-block"
                  type="submit"
                  :disabled="!tempFileName || loading"
                >
                  <b-spinner small v-if="loading" class="mr-1"></b-spinner>
                  Kirim Bukti Bayar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <b-modal
      id="modal-notif"
      hide-footer
      centered
      size="lg"
      modal-class="admin-modal"
      no-close-on-backdrop
      no-close-on-esc
      content-class="bg-primary--soft"
    >
      <template #modal-header>&nbsp;</template>
      <div class="dash-kelas p-4">
        <div class="col-md-12 px-5 text-center">
          <div>Konfirmasi berhasil dikirimkan!</div>
          <h3 class="mb-2" style="font-size: 22px;">
            Admin cek dulu ya pembayaranmu...
          </h3>
        </div>
        <div class="py-4">
          <div class="d-flex mt-4 px-5">
            <div class="col-md-6 p-0 text-right">
              <img src="/icon/cekpembayaran.png" alt="illustration image" />
            </div>
            <div class="col-md-6 p-0 text-left">
              <img src="/icon/cekpembyran.png" alt="illustration image" />
            </div>
          </div>
        </div>
      </div>
      <p class="text-center">
        Admin akan konfirmasi maksimal dalam 1 x 24 jam. <br />Sambil nunggu,
        kamu bisa cek dulu yang lainnya!
      </p>

      <div
        class="modal-footer pt-5"
        style="border: 0px; justify-content: center;"
      >
        <router-link
          class="btn btn-primary tambah px-4 py-2"
          style="border-radius: 25px; border:none;"
          role="button"
          to="/app/tryout/mine"
        >
          Halaman Utama
        </router-link>
        <router-link
          class="btn btn-outline-secondary px-4 "
          data-dismiss="modal"
          style="border-radius: 25px;"
          role="button"
          :to="`/app/payment`"
        >
          Riwayat Pembelian
        </router-link>
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
      dataDetail: {},
      tempFile: null,
      tempImage: "",
      tempFileName: "",
      onSubmitSuccess: false,
      dataDetail: {}
    };
  },
  mounted() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getDetail("transaksi", this.$route.params.id);
  },
  methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
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
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    handleUploadFile() {
      // console.log(this.$refs.file.$refs.input.files);
      this.tempFile = this.$refs.file.$refs.input.files[0];
      if (this.tempFile) {
        this.getBase64(this.tempFile, async result => {
          // console.log(result);
          this.tempImage = result;
          this.tempFileName = await this.uploadFile();
          // console.log(this.tempFileName);
        });
      }
    },
    async uploadFile() {
      let formData = new FormData();
      formData.append("image", this.tempFile);
      this.loading = true;
      const image_url = await this.$axios
        .$post("/api/upload/image", formData)
        .then(response => {
          // console.log(response.data)
          // this.tempFileName = response.data.image_url;
          return response.data.image_url;
        })
        .catch(err => this.catchError(err));
      this.loading = false;
      // console.log(image_url)
      return image_url;
    },
    async onSubmit() {
      // console.log(this.tempFile);
      if (!this.tempFile) {
        this.showToastMessage(
          "Mohon unggah bukti bayar terlebih dahulu!",
          "warning"
        );
        return;
      }

      if (!this.tempFileName) {
        this.tempFileName = await this.uploadFile();
      }
      this.loading = true;
      this.$axios
        .$put("/api/transaksi/upload/" + this.dataDetail.id, {
          bukti_pembayaran: this.tempFileName
        })
        .then(response => {
          this.dataDetail = response.data;
          this.onSubmitSuccess = true;
          this.$bvModal.show("modal-notif");
        })
        .catch(err => this.catchError(err));
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
    isPayable(detail, tipe) {
      if (detail) {
        if (tipe == "Bank Transfer") {
          const statusPayable = [
            "Menunggu Pembayaran",
            "Menunggu Verifikasi",
            "Ditolak"
          ];
          // console.log('aa',statusPayable.includes(detail.status));
          if (statusPayable.includes(detail.status)) {
            return true;
          }
          return false;
        } else if (tipe == "Pihak Ketiga") {
          const statusPayable = [
            "Menunggu Pembayaran",
            "Menunggu Verifikasi",
            "Ditolak"
          ];
          if (statusPayable.includes(detail.status)) {
            return true;
          }
        }
      }
      return false;
    }
  }
};
</script>
