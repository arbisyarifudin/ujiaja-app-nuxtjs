<template>
  <div class="container-fluid konten-editprofil">
    <div class="col-md-12 dash-kelas p-0 text-left">
      <h2 class="pb-0">Dashboard</h2>
      <h5 class="mt-4">
        Halo {{ userDetail.nama_lengkap }}, selamat datang!<i class=""></i>
      </h5>
    </div>
    <div class="col-md-12 dash-kelas p-0 text-left">
      <div class="dash-content text-center">
        <div class="row">
          <div class="col-md-4 d-flex">
            <div>
              <img src="/dashboard/dashboard1.png" class="img-fluid mr-3" />
            </div>
            <div class="text-left">
              <h4 class="list-dash mt-1">Tryout</h4>
              <p class="total m-0">Total {{ totalTryout }}</p>
            </div>
          </div>
          <div class="col-md-4 d-flex">
            <div>
              <img src="/dashboard/dashboard2.png" class="img-fluid mr-3" />
            </div>
            <div class="text-left">
              <h4 class="list-dash mt-1">Kelas Kursus</h4>
              <p class="total m-0">Total {{ totalKursus }}</p>
            </div>
          </div>
          <div class="col-md-4 d-flex">
            <div>
              <img src="/dashboard/dashboard3.png" class="img-fluid mr-3" />
            </div>
            <div class="text-left">
              <h4 class="list-dash mt-1">Transaksi</h4>
              <p class="total m-0">Total {{ totalTransaksi }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 dash-kelas p-0 text-left">
      <hr />
      <UILoading v-if="loading" />
      <h5 class="mt-4" v-if="isDisplayBatteries">
        Skor UTKB siswa:
      </h5>
      <div class="mb-4"><i class="fas fa-user fa-fw"></i> Ananda {{userDetail.siswa ? userDetail.siswa.nama_lengkap : ''}}</div>
      <div class="row justify-content-around" v-if="isDisplayBatteries">
        <div class="col-md-3 col-6 text-center">
          <div class="h5">
            {{
              prodiSatu.program_studi ? prodiSatu.program_studi.nama_studi : "-"
            }}
          </div>
          <div class="h6">
            Passing Grade {{ prodiSatu.passing_grade_prodi }}
          </div>
          <div class="battery my-3">
            <div class="battery-outline">
              <div
                class="battery-fill"
                :style="{ height: 190 * (scoreData.pg1_percent / 100) + 'px' }"
              >
                {{ scoreData.pg1_percent }}%
              </div>
              <div class="battery-fill px-1" style="opacity: 0.5; font-size: 10px; height: 40%" v-if="scoreData.avg_score < 1">Siswa belum mengerjakan tryout.</div>
            </div>
          </div>
          <div class="h6">
            {{ prodiSatu.perguruan ? prodiSatu.perguruan.nama_perguruan : "-" }}
          </div>
        </div>
        <div class="col-md-3 col-6 text-center">
          <div class="h5">
            {{
              prodiDua.program_studi ? prodiDua.program_studi.nama_studi : "-"
            }}
          </div>
          <div class="h6">Passing Grade {{ prodiDua.passing_grade_prodi }}</div>
          <div class="battery my-3">
            <div class="battery-outline">
              <div
                class="battery-fill"
                :style="{ height: 190 * (scoreData.pg2_percent / 100) + 'px' }"
              >
                {{ scoreData.pg2_percent }}%
              </div>
              <div class="battery-fill px-1" style="opacity: 0.5; font-size: 10px; height: 40%" v-if="scoreData.avg_score < 1">Siswa belum mengerjakan tryout.</div>
            </div>
          </div>
          <div class="h6">
            {{ prodiDua.perguruan ? prodiDua.perguruan.nama_perguruan : "-" }}
          </div>
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
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    }
  },
  data() {
    return {
      loading: false,
      isDisplayBatteries: false,
      scoreData: {},
      prodiSatu: {},
      prodiDua: {},
      totalTryout: 0,
      totalTransaksi: 0,
      totalKursus: 0,
    };
  },
  created() {
    this.getDashboardData()
    this.getProfilLengkap();
    this.getPersentaseSkor();
  },
  methods: {
    getDashboardData() {
      this.$axios.$get('/api/users/parent/dashboard')
      .then(response => {
        if(response.success) {
          this.totalTryout = response.data.total_tryout
          this.totalKursus = response.data.total_kursus
          this.totalTransaksi = response.data.total_transaksi
        }
      })
    },
    getPersentaseSkor() {
      this.loading = true;
      this.$axios
        .$get("/api/tryout_user/rerata-persentase-hasil", {
          params: {
            id_user: this.userDetail.id_orang_tua
          }
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
          this.loading = false;
        });
    },
    getProfilLengkap() {
      this.loading = true;
      this.$axios
        .$get("/api/users/siswa/find/" + this.userDetail.id_orang_tua, {
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
          this.loading = false;
        });
    }
  }
};
</script>
