<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10;">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail
            Bundling Produk
          </h2>
          <BackUrl url="/app/bundling" />
        </div>
      </div>
      <div class="col-md-12">
        <div
          class="header-detail bg-white my-4 px-5 py-4"
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div v-if="!loading">
            <h3 class="mb-0">{{ dataDetail.name }}</h3>
            <h4 class="h5" v-if="dataDetail.price > 0">
              <small>Rp</small> {{ formatRupiah(dataDetail.price) }}
            </h4>
            <h4 class="h5" v-else>
              <span class="badge badge-primary">GRATIS</span>
            </h4>
          </div>
          <div v-if="!loading">
            <router-link
              v-if="dataDetail.transaksi_user"
              :to="
                `/app/payment/${dataDetail.transaksi_user.id}/detail?ref=${$route.path}`
              "
              role="button"
              class="btn btn-primary btn-sm square py-1 mr-2"
            >
              <i class="far fa-credit-card mr-1"></i>
              Detail Pembayaran
            </router-link>
            <div v-else>
              <router-link
                v-if="
                  dataDetail.price > 0 ||
                    (dataDetail.transaksi &&
                      (dataDetail.transaksi.status == 'Kadaluarsa' ||
                        dataDetail.transaksi.status == 'Dibatalkan'))
                "
                :to="`/app/bundling/${dataDetail.id}/enroll?ref=${$route.path}`"
                role="button"
                class="btn btn-primary btn-sm square py-1 mr-2"
              >
                <b-icon icon="cart"></b-icon>
                Beli Bundling
              </router-link>
              <button
                v-else
                class="btn btn-primary btn-sm dashboard mb-4"
                @click.prevent="claimFreeProduct"
                :disabled="submitting"
              >
                <b-spinner small class="mr-1" v-if="submitting"></b-spinner>
                <i class="fas fa-fw fa-shopping-cart" v-else></i>
                Klaim Bundle Gratis
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 my-4">
        <div class="bg-white p-5">
          <h3 class="h5 mb-0">Deskripsi</h3>
          <p class="mb-2" v-html="dataDetail.desc"></p>
        </div>
      </div>

      <div class="col-md-12 my-4">
        <div class="card card-header bg-white pt-4 pb-3">
          <h3 class="h4 mb-0">Daftar Produk dari Bundling Ini</h3>
        </div>
        <div class="card-body bg-white">
          <div class="row">
            <div
              class="col-xl-4 col-lg-6 col-md-6 col-sm-6"
              v-for="(item, i) in dataDetail.products"
              :key="i"
            >
              <div class="card card-karir m-2 router-push" @click="$router.push(`/app/tryout/${item.id}/detail?ref=${$route.path}`)">
                <!-- style="width: 350px; max-width: 100%" -->
                <div class="card-body text-left p-0">
                  <div class="" style="display: flex; justify-content: flex-end;">
                  <p
                    class="label-event mb-2 px-4 py-1"
                    :class="[item.transaksi_user_product_bundling &&
                      item.transaksi_user_product_bundling.status != 'Ditolak' &&
                      item.transaksi_user_product_bundling.status != 'Kadaluarsa' ? '' : 'draft']"
                  >
                    {{ item.transaksi_user_product_bundling &&
                      item.transaksi_user_product_bundling.status != 'Ditolak' &&
                      item.transaksi_user_product_bundling.status != 'Kadaluarsa' ? "Sudah Dibeli" : "Belum Dibeli" }}
                  </p>
                </div>
                  <div class="card-content px-4">
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="height: 60px"
                  >
                    {{ item.nama_produk }}
                  </h3>
                  <!-- <h5>TPS</h5> -->
                  <div
                    class="d-flex justify-content-between mb-2"
                    v-if="item.tipe_paket == 'Reguler'"
                  >
                    <p class="mb-2">
                      <i class="far fa-clock fa-fw"></i> {{ item.waktu }} Menit
                    </p>
                    <p class="mb-2">
                      <i class="far fa-file-alt fa-fw"></i>
                      {{ item.jumlah_soal }} Soal
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <p class="">
                      <i class="fas fa-tags fa-fw"></i>
                      {{ item.harga_produk > 0 ? item.harga_label : "GRATIS" }}
                    </p>
                    <p v-if="item.jenis_produk == 'Masal'">
                      {{ item.tanggal_mulai_label }}
                    </p>
                    <p
                      class="beda"
                      v-if="
                        item.kategori_produk == 'ASPD' ||
                          item.kategori_produk == 'Asmenas'
                      "
                    >
                      {{ item.penjurusan[0] }}
                    </p>
                    <p
                      class="beda"
                      v-if="
                        item.kategori_produk == 'UTBK' &&
                          item.tipe_paket == 'Bundling'
                      "
                    >
                      Bundling
                    </p>
                  </div>
                  <div
                    v-if="item.tipe_paket == 'Bundling'"
                    class="package-getlist mb-3"
                    v-html="item.deskripsi_produk"
                  ></div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/administrator/product/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer center">
                    <h4 class="title">TRYOUT</h4>
                    <h5 class="subtitle">
                      <span class="mr-0">{{ item.kategori_produk }}</span
                      ><span
                        class="ml-0"
                        v-if="
                          item.jenis_tryout[0] && item.tipe_paket !== 'Bundling'
                        "
                      >
                        - {{ item.jenis_tryout[0] }}</span
                      ><span
                        class="ml-0"
                        v-if="
                          item.kategori_produk == 'UTBK' &&
                            item.kelompok_soal[0]
                        "
                      >
                        {{ item.kelompok_soal[0] }}</span
                      >
                      <span
                        class="ml-0"
                        v-if="
                          item.kategori_produk == 'ASPD' ||
                            item.kategori_produk == 'Asmenas'
                        "
                      >
                        - {{ item.penjurusan[0] }}</span
                      >
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <UILoading
            tag="div"
            style="position: static; width: 100%;"
            v-if="loading"
          />
        </div>
        <!-- <UILoading v-if="loading" />
        <div
          v-else
          class="bg-white p-5"
          v-for="(bp, p) in dataDetail.bundling_products"
          :key="'p-' + p"
        >
          <div
            class="header-detail d-flex justify-content-between align-items-center"
          >
            <div class="">
              <h5 class="mb-3">
                {{ bp.product.nama_produk }}
                <small
                  class="badge badge-success small blink blinker"
                  style="font-size: 12px!important"
                  v-if="
                    bp.product.transaksi_user &&
                      bp.product.transaksi_user.status != 'Ditolak' &&
                      bp.product.transaksi_user.status != 'Kadaluarsa'
                  "
                  >Sudah Dibeli</small
                >
              </h5>
            </div>
            <div>
              <router-link
                class="btn btn-outline-primary btn-sm py-1 square"
                :to="`/app/tryout/${bp.product.id}/detail`"
                >Lihat Produk</router-link
              >
            </div>
          </div>
          <ul class="pl-4">
            <li class="mb-3">Kategori : {{ bp.product.kategori_produk }}</li>
            <li class="mb-3">Pengerjaan : {{ bp.product.jenis_produk }}</li>
            <li class="mb-3" v-if="bp.product.jenis_produk == 'Masal'">
              {{ formatTanggal(bp.product.tanggal_mulai) }} s/d
              {{ formatTanggal(bp.product.tanggal_berakhir) }}
            </li>
          </ul>
        </div> -->
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
      submitting: false,
      dataDetail: {
        produk: {},
        tryout: []
      }
    };
  },
  mounted() {
    if (!this.$route.params.id) return this.$router.push("/app/bundling");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Bundling Product",
        href: "/app/bundling"
      },
      {
        text: "Detail",
        active: true
      }
    ]);
    this.getDetail("bundling", this.$route.params.id);
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    }
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
    },
    claimFreeProduct() {
      this.submitting = true;
      let dataSave;

      dataSave = {
        id_user: this.user.id,
        id_produk: this.dataDetail.id,
        id_bank: null,
        tanggal_transaksi: new Date(),
        tipe: "Free Claim",
        harga_produk: 0,
        kode_unik: null,
        biaya_adm: null,
        total_harga: 0,
        jenis_transaksi: "Bundling"
      };

      // console.log(dataSave)
      // return;

      this.$axios
        .$post(`/api/transaksi/create`, dataSave)
        .then(res => {
          if (res.success) {
            this.showToastMessage("Bundle berhasil diklaim!", "success");
            window.location.reload();
            return true;
          }
        })
        .then(() => {
          this.getNotif();
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        });
      // .finally(() => (this.submitting = false));
    }
  }
};
</script>

<style></style>
