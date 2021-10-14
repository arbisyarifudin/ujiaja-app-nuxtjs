<template>
  <div class="container-fluid crud">
    <div class="col-md-12 dash-kelas p-0 text-left">
      <div
        class="col-md-12 dash-kelas mandiri-detail p-0"
        v-if="!$route.query.status"
      >
        <h2 class="pb-0 mb-5">
          <BackUrl
            :title="null"
            :url="`/app/tryout/${dataDetail.produk.id}/detail`"
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
                      v-b-toggle="'accordion-1'"
                    >
                      <a
                        class="card-link d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <p class="text-card mb-1">
                            Bank Transfer (Verifikasi Manual)
                          </p>
                          <p class="small mb-0" style="font-size: 13px">
                            Verifikasi membutuhkan waktu maksimal 1x24 jam.
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
                      :id="'accordion-1'"
                      :visible="true"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body class="px-4 py-2">
                        <ul class="list-unstyled">
                          <li
                            class="d-flex justify-content-between align-items-center pt-4 pb-2"
                            style="border-bottom: 1px solid #555"
                            v-for="(bank, b) in banks"
                            :key="b"
                          >
                            <label
                              class="d-flex align-items-center w-100 h-100"
                              :for="`radio-${b}`"
                            >
                              <img
                                :src="bank.icon"
                                alt="bca"
                                class="mr-3 img-fluid"
                                style="width: 60px; object-fit: contain"
                              />
                              <span
                                style="font-size: 16px; font-weight: 500"
                                v-text="bank.text"
                              ></span>
                            </label>
                            <input
                              type="radio"
                              :id="`radio-${b}`"
                              name="radio"
                              :value="bank.value"
                              v-model="bankTerpilih"
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
                  <h5>{{ dataDetail.produk.nama_produk }}</h5>
                  <p class="mb-2 mt-3">Harga Tryout</p>
                  <h5 class="mb-0 text-primary">
                    {{ dataDetail.produk.harga_label }}
                  </h5>
                </div>
              </div>
              <div class="col-md-12 mb-4">
                <h5>Ringkasan Pembelian</h5>
                <div class="bg-white p-4 mt-3">
                  <div class="d-flex d-flex justify-content-between">
                    <div class="mr-5 pr-5">
                      <p class="mb-3">Harga Tryout</p>
                      <p class="mb-3 small">Kode Unik</p>
                      <p class="m-0 text-primary ">Subtotal</p>
                    </div>
                    <div class="ml-5 pl-5">
                      <p class="mb-3 text-right">
                        {{ dataDetail.produk.harga_label }}
                      </p>
                      <p class="mb-3 small text-right">
                        Rp 235
                      </p>
                      <h5 class="m-0 text-primary text-right">
                        Rp 25.235
                      </h5>
                    </div>
                  </div>
                  <div class="col-md-12 text-right">
                    <button
                      class="btn btn-primary mr-0 mt-5"
                      v-b-modal.modal-konfirmasi
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
      <div class="col-md-12 dash-kelas mandiri-detail p-0" v-else>
        <h2 class="pb-0 mb-5">
          <BackUrl
            :title="null"
            :url="`/app/tryout/${dataDetail.produk.id}/detail`"
            class="py-1 px-2 mr-3"
          />
          <b-spinner type="grow" class="mr-2" v-if="loading" /> Konfirmasi
          Pembayaran
        </h2>
        <div class="row flex-wrap">
          <div class="col-md-6 p-0">
            <h5>Tata Cara Pembayaran</h5>
            <div class="bg-white p-4 mr-2 mt-3">
              <div class="d-flex">
                <div class="col-md-7 p-0"><h5>Sisa Waktu Pembayaran</h5></div>
                <div class="col-md-5 p-0 text-right">
                  <b-badge
                    variant="warning"
                    class="text-white py-2 px-3"
                    style="font-size: 14px; letter-spacing: 1px"
                  >
                    <i class="far fa-clock mr-2"></i> 03:17:51</b-badge
                  >
                </div>
              </div>
              <div
                class="m-3 px-4 py-3"
                style="background: #F5EFFF;
                                    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
                                    border-radius: 2px;"
              >
                <img src="/icon/bca.png" alt="" />
                <form class="form-group my-3" @submit.prevent>
                  <!-- <input
                    type="file"
                    class="form-control"
                    placeholder="Pilih File"
                  /> -->
                  <b-form-file
                    browse-text="Jelajahi"
                    class="cursor-pointer"
                    accept=".jpg, .png, .gif, .pdf"
                  ></b-form-file>
                  <!-- <button
                    class="btn btn-primary unggah py-1"
                    style="border-radius: 5px; position: absolute; right: 74px; top: 171px;"
                  >
                    <i class="fa fa-plus"></i> Unggah
                  </button> -->
                </form>
                <p>
                  Silahkan melakukan pembayaran melalui Bank BCA XXX-XXXXXXX a/n
                  PT. SSC Intersolusi. Jika sudah melakukan pembayaran, silahkan
                  tekan Bayar Sekarang dan mengisi form yang tersedia.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 p-0">
            <h5>Detail Pemesanan</h5>
            <div class="bg-white p-4 mt-3">
              <div class="d-flex">
                <div class="col-md-8 p-0">
                  <p class="mb-3">Tryout UTBK TPS SBMPTN 2022</p>
                  <p class="mb-3">Kode Unik</p>
                  <p class="m-0" style="color: #b0aeef;">Subtotal</p>
                </div>
                <div class="col-md-4 p-0 text-right">
                  <p class="mb-3">Rp 20.000,-</p>
                  <p>Rp. 22,-</p>
                  <p class="m-0" style="color: #b0aeef;">Rp 20.022,-</p>
                </div>
              </div>
              <div class="col-md-12 pr-0 text-right">
                <button
                  class="btn btn-primary mr-0 mt-5 d-inline-block"
                  v-b-modal.modal-notif
                >
                  Konfirmasi
                </button>
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
      <div class="bg-white py-4" style="border-radius: 15px;">
        <div class="d-flex mt-4 px-5">
          <div
            class="col-md-6 p-0 text-left"
            style="border-bottom: 1px solid #4787;"
          >
            <img src="/icon/bca.png" alt="" />
          </div>
          <div
            class="col-md-6 p-0 text-right"
            style="border-bottom: 1px solid #4787;"
          >
            <p>Terpilih <i class="fa fa-check-circle text-success"></i></p>
          </div>
        </div>
        <h5 class="mt-3 px-5">Ringkasan Pembelian</h5>
        <div class="d-flex pb-3 px-5">
          <div
            class="col-md-6 p-0 text-left"
            style="border-bottom: 1px solid #4787;"
          >
            <p class="m-0">Subtotal</p>
            <p class="">Kode Unik</p>
          </div>
          <div
            class="col-md-6 p-0 text-right"
            style="border-bottom: 1px solid #4787;"
          >
            <p class="m-0">Rp. 20.000,-</p>
            <p class="">Rp. 22,-</p>
          </div>
        </div>
        <div class="d-flex px-5 pb-4">
          <div
            class="col-md-6 p-0 text-left"
            style="border-bottom: 1px solid #4787;"
          >
            <p class="">Total Tagihan</p>
          </div>
          <div
            class="col-md-6 p-0 text-right"
            style="border-bottom: 1px solid #4787;"
          >
            <p class="font-weight-bold">Rp. 20.022,-</p>
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
        >
          Kembali
        </button>
        <button
          class="btn btn-primary tambah px-4 py-2"
          style="border-radius: 25px; border: 1px solid transparent;"
          type="button"
          @click.prevent
        >
          Konfirmasi
        </button>
      </div>
    </b-modal>
    <b-modal
      id="modal-notif"
      hide-footer
      centered
      size="lg"
      modal-class="admin-modal"
      content-class="bg-primary--soft"
    >
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
        <button
          class="btn btn-primary tambah px-4 py-2"
          style="border-radius: 25px; border:none;"
          type="button"
        >
          Halaman Utama
        </button>
        <button
          class="btn btn-outline-secondary px-4 "
          data-dismiss="modal"
          style="border-radius: 25px;"
          type="button"
        >
          Riwayat Pembelian
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
      banks: [
        { text: "BCA", value: "bca", icon: "/icon/bca.png" },
        { text: "BNI", value: "bni", icon: "/icon/bni.png" },
        { text: "BRI", value: "bri", icon: "/icon/bri.png" }
      ],
      bankTerpilih: "bca"
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/product");
    this.getDetail("produk", this.$route.params.id);
  },
  methods: {
    resetModal() {},
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}/detail`)
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
    formatRupiah(num) {
      if (num) {
        return num.toLocaleString("ID-id");
      }
      return 0;
    }
  }
};
</script>
