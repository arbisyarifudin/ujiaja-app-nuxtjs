<template>
  <div class="container-fluid">
    <UILoading v-if="loading"/>
    <no-ssr>
      <SectionPersonalityTestResult :data="dataDetail" :result="dataHasil" v-if="!loading && dataDetail && dataDetail.transaksi && dataDetail.transaksi.status == 'Sudah Diverifikasi' && dataHasil"/>
      <SectionPersonalityTestEmpty :data="dataDetail" v-else-if="!loading"/>
    </no-ssr>
  </div>
</template>

<script>
export default {
  layout: "app",
  data () {
    return {
      loading: true,
      dataDetail: {},
      dataHasil: null,
    }
  },
  mounted () {
    this.getMBTIActive()
  },
  methods: {
    getMBTIActive() {
      this.loading = true;
      this.$axios
        .$get(`/api/mbti/active`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
          }
        })
        .catch(() => {
          this.$router.push("/app/mbti");
        })
        .finally(() => (this.loading = false));
    },
  }
};
</script>
