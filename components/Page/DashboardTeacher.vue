<template>
  <div class="container-fluid konten-editprofil">
    <div class="col-md-12 dash-kelas p-0 text-left pos-relative">
      <h2 class="pb-0">Dashboard</h2>
      <UILoading v-if="loading"/>
      <h5 class="mt-4">
        Halo {{ userDetail.nama_lengkap }}, selamat datang!
      </h5>
      
      <h5 class="info-kelas mt-5 mb-5">Kelas Les Privat</h5>
      <div class="kelas shadow-sm mt-5 bg-buat-kelas">
        <div class="col-md-8">
          <h4 class="m-0">Buat Kelas Yuk!</h4>
          <p>Kamu dapat kelola kelasmu</p>
          <a href="/user/partner/courses" class="btn btn-primary dashboard px-4">
            Buat Kelas
          </a>
        </div>
      </div>
      <h5 class="info-kelas mt-5 mb-5">
        Ikuti Ujian Kenaikan Tingkat Tentor untuk naikan tarif mengajarmu! 
      </h5>
      <div class="kelas kelasdua mb-5 shadow-sm bg-uktt">
        <div class="col-md-8">
          <h4 class="m-0">Ujian UKTT itu <br> Perlu Gak Ya?</h4>
          <p>
           Lumayan kan,tarif les yang kubuat bisa naik.
          </p>
          <a class="btn btn-primary dashboard px-4" href="/user/partner/uktt"
            >Ikuti Ujian UKTT</a
          >
        </div>
      </div>
      <h5 class="info-kelas mt-5 mb-5">
        Ketahu Minat dan Bakatmu dengan mengikut Tes MBTI!
      </h5>
      <div class="kelas kelasdua mb-5 shadow-sm">
        <div class="col-md-8">
          <h4 class="m-0">Karakterku <br> Kaya Apa Ya?</h4>
          <p>
            Kalau ngajar ke siswa, <br> baiknya kayak gimana ya?
          </p>
          <a class="btn btn-primary dashboard px-4" href="/user/mbti"
            >Ikuti Tes MBTI</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.battery {
  &-outline {
    background-image: url("/dashboard/battery-outline.png");
    width: 125px;
    height: 250px;
    // max-width: 100%;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    margin: auto;
    position: relative;
    overflow: hidden;
  }
  &-fill {
    background-color: #a494fc;
    width: 105px;
    // height: 190px;
    height: 0;
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: absolute;
    bottom: 25px;
    left: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<script>
export default {
  data() {
    return {
      loading: true,
      isDisplayBatteries: false,
      scoreData: {},
      prodiSatu: {},
      prodiDua: {}
    };
  },
  created() {
    this.getProfilLengkap()
    this.getPersentaseSkor();
  },
  methods: {
    getPersentaseSkor() {
      this.loading = true
      this.$axios
        .$get("/api/tryout_user/rerata-persentase-hasil", {
          params: {}
        })
        .then(response => {
          if (response.success) {
            this.scoreData = response.data;
            this.isDisplayBatteries = true;
          }
        })
        .catch(error => {
          this.isDisplayBatteries = false;
        })
        .finally(() => {
          this.loading = false
        })
    },
    getProfilLengkap() {
      this.loading = true
      this.$axios
        .$get("/api/users/siswa/find/" + this.user.id, {
          params: {}
        })
        .then(response => {
          if (response.success) {
            this.prodiSatu = response.data.prodi_satu;
            this.prodiDua = response.data.prodi_dua;
          }
        })
        .catch(error => {
          this.isDisplayBatteries = false;
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    }
  }
};
</script>
