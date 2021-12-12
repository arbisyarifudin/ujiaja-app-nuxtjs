<template>
  <div class="container-fluid crud px-md-4 px-0">
    <div class="col-md-12 dash-kelas p-0 text-left">
      <h3>
        <BackUrl
          :title="null"
          :url="$route.query.ref ? $route.query.ref : '/app/partner/uktt'"
          class="py-1 px-2 mr-3"
        />
        Hasil Ujian
      </h3>
      <h2 class="pb-0">
        {{
          detailProduk.nama_produk
            ? detailProduk.nama_produk
            : "Tes Kompetensi UjiAja"
        }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: true,
      detailProduk: {}
    };
  },
  created() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getDetail("produk", this.$route.params.id);
  },
  methods: {
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.detailProduk = res.data;
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
