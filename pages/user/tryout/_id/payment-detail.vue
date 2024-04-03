<template>
  <div>
    <div class="col-md-12 dash-kelas mandiri-detail p-0">
      <h2 class="pb-0 mb-5">
        <!-- <BackUrl
          :title="null"
          :url="`/user/tryout/${dataDetail.produk.id}/detail`"
          class="py-1 px-2 mr-3"
        /> -->
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
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: false
    };
  }
};
</script>
