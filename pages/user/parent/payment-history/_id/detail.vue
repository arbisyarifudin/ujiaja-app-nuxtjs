<template>
  <div>
    <div class="dash-kelas mandiri-detail p-0">
      <h2 class="pb-0 mb-5">
        <BackUrl
          :title="null"
          :url="$route.query.ref ? $route.query.ref : '/app/parent/payment-history'"
          class="py-1 px-2 mr-3"
        />
        <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail Pembayaran
      </h2>
    </div>
    <div class="container-fluid">
      <div class="row ">
        <div class="col-lg-8 col-md-12 dashboard">
          <h2
            class="dash-label mb-4"
            v-if="dataDetail.status == 'Menunggu Pembayaran'"
          >
            Yuk, selesaikan pembayaranmu!
          </h2>
          <h2
            class="dash-label mb-4"
            v-if="dataDetail.status == 'Menunggu Verifikasi'"
          >
            Mohon tunggu verifikasi dari kami ya!
          </h2>
          <h2
            class="dash-label mb-4 d-block"
            v-if="dataDetail.status == 'Sudah Diverifikasi'"
          >
            Selamat, pembelian 
            <span v-if="dataDetail.mbti">Tes MBTI</span>
            <span v-else-if="dataDetail.kursus">Kelas Kursus</span>
            <span v-else>Tryout</span>
             kamu berhasil!
          </h2>
          <p v-if="dataDetail.status == 'Sudah Diverifikasi'">
            Terima kasih sudah mempercayakan Uji Aja untuk memenuhi kebutuhan
            belajarmu. Berikut detail transaksimu :
          </p>
          <p v-else>Berikut detail pembelian kamu :</p>
          <div
            class="row px-5 py-4 mt-5 pos-relative"
            :style="
              `background: #FDFDFD; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5); border-radius: 4px;`
            "
          >
            <div class="col-md-6 p-0" v-if="dataDetail.produk || dataDetail.mbti">
              <p class="mb-1" style="color: #9490A4;">Produk</p>
              <p class="" v-if="dataDetail.produk" v-text="dataDetail.produk.nama_produk"></p>
              <p class="" v-if="dataDetail.mbti" v-text="dataDetail.mbti.judul"></p>
              <p class="mb-1" style="color: #9490A4;">Batas Waktu Pembayaran</p>
              <p class="">
                {{
                  formatTanggal(
                    dataDetail.batas_pembayaran
                      ? dataDetail.batas_pembayaran
                      : dataDetail.xendit.expiry_date,
                    "dddd, DD MMMM YYYY HH:mm"
                  )
                }}
                WIB
              </p>
              <p class="mb-1" style="color: #9490A4;">No.Invoice</p>
              <p class="">{{ dataDetail.kode }}</p>
            </div>
            <div class="col-md-6 p-0" v-else-if="dataDetail.kursus">
              <p class="mb-1" style="color: #9490A4;">Produk</p>
              <p class="" v-text="dataDetail.kursus.nama_kursus"></p>
              <p class="mb-1" style="color: #9490A4;">Batas Waktu Pembayaran</p>
              <p class="">
                {{
                  formatTanggal(
                    dataDetail.batas_pembayaran
                      ? dataDetail.batas_pembayaran
                      : dataDetail.xendit.expiry_date,
                    "dddd, DD MMMM YYYY HH:mm"
                  )
                }}
                WIB
              </p>
              <p class="mb-1" style="color: #9490A4;">No.Invoice</p>
              <p class="">{{ dataDetail.kode }}</p>
            </div>
            <div class="col-md-6 p-0" v-if="dataDetail.produk || dataDetail.mbti || dataDetail.kursus">
              <p class="mb-1" style="color: #9490A4;">Total Pembayaran</p>
              <p class="">Rp {{ formatRupiah(dataDetail.total_harga) }}</p>
              <p class="mb-1" style="color: #9490A4;">Metode Pembayaran</p>
              <p class="" v-if="dataDetail.tipe == 'Bank Transfer'">
                Bank Transfer - {{ dataDetail.bank.nama_bank }}
              </p>
              <p class="" v-if="dataDetail.tipe == 'Pihak Ketiga'">
                Pembayaran Instan
              </p>
              <p class="mb-1" style="color: #9490A4;">Status Pembayaran</p>
              <p class="" v-text="dataDetail.status"></p>
            </div>
            <div class="col-12" v-if="dataDetail.status == 'Ditolak' || dataDetail.status == 'Dibatalkan'" style="font-size: 13px">
              <hr />
              <div class=" alert alert-danger mb-0" v-if="dataDetail.status == 'Ditolak'">
                <h6 style="font-size: 15px" class="m-0">Alasan Penolakan</h6>
                <hr />
                {{ dataDetail.alasan_penolakan }}
              </div>
              <div class=" alert alert-danger mb-0" v-if="dataDetail.status == 'Dibatalkan'">
                <h6 style="font-size: 15px" class="m-0">Alasan Pembatalan</h6>
                <hr />
                {{ dataDetail.alasan_pembatalan }}
              </div>
            </div>
            <div class="col-12 px-0" v-if="!loading">
              <hr />
              <router-link :to="`/app/tryout/${dataDetail.id_produk}/detail`" v-if="dataDetail.produk"
                >Lihat Produk</router-link>
              <router-link :to="`/app/mbti/`" v-else-if="dataDetail.mbti"
                >Lihat Produk</router-link>
              <router-link :to="`/app/student/courses/${dataDetail.id_produk}/detail`" v-else-if="dataDetail.kursus"
                >Lihat Produk</router-link>
            </div>
            <div class="col-12" v-if="loading">
              <UILoading style="min-height: unset" />
            </div>
          </div>
        </div>

        <div class="col-md-12 dashboard my-4">
          <!-- <h5>Ikuti langkah-langkah pembayaran ini!</h5>
          <div
            class=" px-5 py-4 mt-4"
            style="background: #FDFDFD;
                                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
                                border-radius: 4px;"
          >
            <p style="color: #9490A4;">
              * Apabila Anda masih memiliki tagihan transfer BCA yang belum
              dibayar, maka transaksi sebelumnya <br />
              akan kami batalkan secara otomatis.
            </p>
            <p class="mb-0">Langkah-langkah pembayaran Transfer BCA:</p>
            <p>ATM BCA</p>
            <p style="color: #9490A4;">
              1. Masukkan kartu anda. <br />
              2. Pilih Bahasa. <br />
              3. Masukkan PIN ATM anda. <br />
              4. Pilih “Menu Lainnya”. <br />
              5. Pilih “Transfer”. <br />
              6. Pilih “Rekening Tabungan”. <br />
              7. Pilih “Ke Rekening BCA”. <br />
              8. Masukkan nomor rekening tujuan XXX-XXXXXXX a/n PT. SSC
              Intersolusi. <br />
              9. Masukkan nominal transfer sesuai tagihan atau kewajiban Anda.
              Nominal yang berbeda tidak dapat <br />
              &nbsp;&nbsp;&nbsp; diproses. <br />
              10. Konfirmasi, apabila telah sesuai, lanjutkan transaksi. <br />
              11. Transaksi telah selesai.
            </p>
          </div> -->

          <h5
            class="my-4"
            v-if="
              dataDetail.status &&
                dataDetail.status == 'Menunggu Pembayaran' &&
                dataDetail.tipe == 'Bank Transfer'
            "
          >
            Sudah bayar? Klik tombol di bawah:
          </h5>
          <h5
            class="my-4"
            v-if="
              dataDetail.status &&
                dataDetail.status != 'Sudah Diverifikasi' &&
                dataDetail.tipe == 'Bank Transfer'
            "
          >
            Ingin konfirmasi ulang? Klik tombol di bawah:
          </h5>
          <h5
            class="my-4"
            v-if="
              dataDetail.status &&
                dataDetail.status != 'Sudah Diverifikasi' &&
                dataDetail.tipe == 'Pihak Ketiga'
            "
          >
            Yuk selesaikan pembayaran kamu! Klik tombol di bawah untuk melihat
            instruksi pembayarannya:
          </h5>
          <div class="row align-items-center" v-if="dataDetail.status">
            <div
              class="col mb-3"
              v-if="
                isPayable(dataDetail, dataDetail.tipe) &&
                  dataDetail.tipe == 'Bank Transfer'
              "
            >
              <router-link
                class="btn btn-primary btn-block py-2"
                :to="`/app/parent/payment-history/${dataDetail.id}/confirm`"
              >
                Konfirmasi Pembayaran
              </router-link>
            </div>
            <div
              class="col mb-3"
              v-if="
                isPayable(dataDetail, dataDetail.tipe) &&
                  dataDetail.tipe == 'Pihak Ketiga'
              "
            >
              <a
                target="_blank"
                class="btn btn-primary btn-block py-2"
                :href="dataDetail.xendit.invoice_url"
              >
                Selesaikan Pembayaran
              </a>
            </div>
            <div
              class="col mb-3"
              v-if="dataDetail.status != 'Sudah Diverifikasi'"
            >
              <button
                class="btn btn-outline-primary btn-block py-2"
                type="button"
                @click.prevent="checkStatus"
              >
                <b-spinner class="mr-1" small v-if="loading"></b-spinner>
                Cek Status Pembayaran
              </button>
            </div>
          </div>
          <hr />

          <!-- <h5 class="my-4">Ada masalah? Kami siap membantu kamu.</h5>
          <div
            class="d-flex my-5 pb-5"
            style="justify-content: space-around; border-bottom: 2px solid #E3E3E3;"
          >
            <div class=" text-center">
              <span class="fa-stack fa-lg" style="color:#D3CEF8">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-phone fa-stack-1x fa-inverse"></i>
              </span>
              <p style="color: #9490A4;">Call Center</p>
            </div>
            <div class=" text-center">
              <span class="fa-stack fa-lg" style="color:#D3CEF8">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-envelope fa-stack-1x fa-inverse"></i>
              </span>
              <p style="color: #9490A4;">Email</p>
            </div>
            <div class=" text-center">
              <span class="fa-stack fa-lg" style="color:#D3CEF8">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fas fa-ticket-alt fa-stack-1x fa-inverse"></i>
              </span>
              <p style="color: #9490A4;">Layanan Pengaduan</p>
            </div>
            <div class=" text-center">
              <span class="fa-stack fa-lg" style="color:#D3CEF8">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-question fa-stack-1x fa-inverse"></i>
              </span>
              <p style="color: #9490A4;">FAQ</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: true,
      dataDetail: {}
    };
  },
  mounted() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getDetail("transaksi", this.$route.params.id);
  },
  methods: {
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
    checkStatus() {
      this.loading = true;
      this.$axios
        .$get(`/api/transaksi/find/${this.$route.params.id}`)
        .then(res => {
          if (res.success) {
            this.dataDetail = {};
            this.dataDetail = res.data;
            this.showToastMessage("Berhasil ambil status terbaru!", "success");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
