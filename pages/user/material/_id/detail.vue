<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10;">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail
            Material
          </h2>
          <BackUrl url="/user/material" />
        </div>
      </div>
      <div class="col-md-12">
        <div
          class="header-detail bg-white my-4 px-5 py-4"
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div v-if="!loading">
            <h3 class="mb-2">{{ dataDetail.title }}</h3>
            <h4 class="h5">
              <small>Rp</small> {{ formatRupiah(dataDetail.price) }}
            </h4>
          </div>
          <div v-if="!loading">
            <router-link
              v-if="dataDetail.transaksi_user"
              :to="
                `/user/payment/${dataDetail.transaksi_user.id}/detail?ref=${$route.path}`
              "
              role="button"
              class="btn btn-primary btn-sm square py-1 mr-2"
            >
              <i class="far fa-credit-card mr-1"></i>
              Detail Pembayaran
            </router-link>
            <router-link
              v-else
              :to="`/user/material/${dataDetail.id}/enroll?ref=${$route.path}`"
              role="button"
              class="btn btn-primary btn-sm square py-1 mr-2"
            >
              <b-icon icon="cart"></b-icon>
              Beli Materi
            </router-link>
          </div>
        </div>
      </div>

      <div
        class="col-md-12 my-4"
        v-if="
          dataDetail.transaksi_user &&
            dataDetail.transaksi_user.status == 'Sudah Diverifikasi'
        "
      >
        <div class="bg-white p-5">
          <h3 class="h5 mb-3">Unduh Materi</h3>
          <div class="text-center">
            <a
              v-if="ApiUrl"
              target="_blank"
              :href="ApiUrl('storage/' + dataDetail.file_link)"
              class="btn btn-block btn-primary square"
            >
            <i class="fas fa-download fa-fw mr-1"></i> Klik untuk mengunduh
            </a>
          </div>
        </div>
      </div>

      <div class="col-md-12 my-4">
        <div class="bg-white p-5">
          <h3 class="h5 mb-3">Deskripsi</h3>
          <div class="row">
            <div class="col-md-4 mb-4 mb-md-0">
              <img
                v-if="ApiUrl"
                :src="ApiUrl('storage/' + dataDetail.cover_image_link)"
                :alt="dataDetail.cover_image_link"
                class="img-fluid"
              />
            </div>
            <div class="col-md-8 mb-4 mb-md-0">
              <div class="mb-2" v-html="dataDetail.desc"></div>
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
      loading: true,
      dataDetail: {}
    };
  },
  mounted() {
    if (!this.$route.params.id) return this.$router.push("/user/material");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Material",
        href: "/user/material"
      },
      {
        text: "Detail",
        active: true
      }
    ]);
    this.getDetail("material", this.$route.params.id);
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

<style></style>
