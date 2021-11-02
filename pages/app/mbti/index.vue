<template>
  <div class="container-fluid">
    <UILoading v-if="loading" />
    <no-ssr>
      <SectionPersonalityTestResult
        :data="dataHasil"
        v-if="
          !loading &&
            dataDetail &&
            dataDetail.transaksi &&
            dataDetail.transaksi.status == 'Sudah Diverifikasi' &&
            dataHasil
        "
      />
      <SectionPersonalityTestEmpty :data="dataDetail" v-else-if="!loading" />
    </no-ssr>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: true,
      dataDetail: {},
      dataHasil: {}
    };
  },
  mounted() {
    this.getMBTIActive();
    this.getMBTIUser();
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
    getMBTIUser() {
      this.loading = true;
      this.$axios
        .$get(`/api/mbti/user`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataHasil = res.data;
            this.dataHasil.hitungan = [
              {
                label: 'Mind',
                bgClass: 'bg-info',
                dimensi: ["Introvert","Extrovert"],
                persentase: [72, 28],
              },
              {
                label: 'Energy',
                bgClass: 'bg-danger',
                dimensi: ["Intuitive","Sensing"],
                persentase: [60, 40],
              },
              {
                label: 'Nature',
                bgClass: 'bg-success',
                dimensi: ["Feeling","Thinking"],
                persentase: [71, 29],
              },
              {
                label: 'Tactics',
                bgClass: 'bg-primary',
                dimensi: ["Judging","Prospecting"],
                persentase: [63, 27],
              }
            ];
          }
        })
        .catch(() => {
          this.$router.push("/app/mbti");
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
