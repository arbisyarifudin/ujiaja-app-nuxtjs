<template>
  <div class="container-fluid konten-editprofil">
    <div class="col-md-12 dash-kelas p-0 text-left pos-relative">
      <h2 class="pb-0">Dashboard</h2>
      <UILoading v-if="loading" />
      <h5 class="mt-2 mb-3">
        Halo {{ userDetail.nama_lengkap }}, selamat datang!
      </h5>

      <div class="col-md-12 dash-kelas p-0 text-left mb-5">
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
          </div>
        </div>
      </div>

      <div
        class="card mb-3 px-3 py-2 d-flex align-items-center justify-content-between flex-row"
      >
        <h4 class="mb-0 mr-2">Filter :</h4>
        <div class="d-flex align-items-center justify-content-between flex-row">
          <!-- <button type="button" class="btn btn-sm btn-primary px-2 square">
            <i class="fas fa-fw fa-filter"></i> Filter
          </button> -->
          <b-form-select
            :options="filterList.kategori"
            v-model="filter.kategori"
          ></b-form-select>
        </div>
        <!-- <span class="badge badge-primary">UTBK</span> -->
      </div>

      <div
        class="card mb-5"
        v-if="isDisplayBatteries && prodiSatu && filter.kategori == 'UTBK'"
      >
        <div class="card-body">
          <div class="row justify-content-around ">
            <div class="col-12">
              <h4>
                <i class="fas fa-fw fa-award mr-1"></i> PERSENTASE NILAI UTBK
              </h4>
            </div>
            <div class="col-12">
              <p class="mb-4 small">
                Yuk terus belajar, dan naikan score UTBK kamu untuk meningkatkan
                peluang masuk ke Perguruan Tinggi impianmu.
              </p>
            </div>
            <div class="col-md-3 col-6 text-center">
              <div class="h6">
                {{
                  prodiSatu.program_studi
                    ? prodiSatu.program_studi.nama_studi
                    : "-"
                }}
              </div>
              <div class="h6">
                Passing Grade {{ prodiSatu.passing_grade_prodi }}
              </div>
              <div class="battery my-3">
                <div class="battery-outline">
                  <div
                    class="battery-fill"
                    :class="bgColorClass(scoreData.pg1_percent)"
                    :style="{
                      height: 190 * (scoreData.pg1_percent / 100) + 'px'
                    }"
                  >
                    {{ scoreData.pg1_percent }}%
                  </div>
                </div>
              </div>
              <div class="h6">
                {{
                  prodiSatu.perguruan ? prodiSatu.perguruan.nama_perguruan : "-"
                }}
              </div>
            </div>
            <div class="col-md-3 col-6 text-center">
              <div class="h6">
                {{
                  prodiDua.program_studi
                    ? prodiDua.program_studi.nama_studi
                    : "-"
                }}
              </div>
              <div class="h6">
                Passing Grade {{ prodiDua.passing_grade_prodi }}
              </div>
              <div class="battery my-3">
                <div class="battery-outline">
                  <div
                    class="battery-fill"
                    :class="bgColorClass(scoreData.pg2_percent)"
                    :style="{
                      height: 190 * (scoreData.pg2_percent / 100) + 'px'
                    }"
                  >
                    {{ scoreData.pg2_percent }}%
                  </div>
                </div>
              </div>
              <div class="h6">
                {{
                  prodiDua.perguruan ? prodiDua.perguruan.nama_perguruan : "-"
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="card mb-5"
        v-if="isDisplayASPDBatteries && filter.kategori == 'ASPD'"
      >
        <div class="card-body">
          <div class="row justify-content-around">
            <div class="col-12">
              <h4>
                <i class="fas fa-fw fa-award mr-1"></i> PERSENTASE NILAI ASPD
              </h4>
            </div>
            <div class="col-12">
              <p class="mb-4 small">
                Yuk terus belajar, dan naikan score ASPD kamu untuk meningkatkan
                peluang masuk ke sekolah di Jenjang selanjutnya.
              </p>
            </div>
            <div class="col-md-3 col-6 text-center">
              <div class="h6">
                Nilai Sempurna ASPD {{ userDetail.nama_jenjang }} :
                {{ scoreASPDData.perpect_score }}
              </div>
              <div class="battery my-3">
                <div class="battery-outline">
                  <div
                    class="battery-fill"
                    :class="bgColorClass(scoreASPDData.percent_score)"
                    :style="{
                      height: 190 * (scoreASPDData.percent_score / 100) + 'px'
                    }"
                  >
                    {{ scoreASPDData.percent_score }}%
                  </div>
                </div>
              </div>
              <div class="h6">
                Nilai Rata-rata Kamu : {{ scoreASPDData.avg_score }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-4" v-if="!loading">
        <div class="card-body">
          <h4 class="mb-3 d-flex justify-content-between">
            Performa Kamu
            <span class="ml-2 text-muted"
              ><span
                :class="[
                  grafikPerformaKenaikan > 0
                    ? 'text-success'
                    : grafikPerformaKenaikan < 0
                    ? 'text-danger'
                    : 'text-primary'
                ]"
                ><i
                  class="fas fa-fw"
                  :class="
                    grafikPerformaKenaikan > 0
                      ? 'fa-arrow-up'
                      : grafikPerformaKenaikan < 0
                      ? 'fa-arrow-down'
                      : 'fa-equal'
                  "
                ></i>
                {{ grafikPerformaKenaikan }}%</span
              >
              vs tryout terakhir</span
            >
          </h4>
          <!-- <div style="height: 300px"></div> -->
          <highchart
            :options="grafikPerformaOptions"
            :update="['options.title', 'options.series']"
            :exporting="true"
          />
        </div>
      </div>

      <!-- <h5 class="info-kelas mt-5 mb-5">Kelas Les Privat</h5> -->
      <div class="kelas shadow-sm mt-5">
        <div class="col-md-8">
          <h4 class="m-0">Ikut Les Yuk!</h4>
          <p>Belajar asik, gurunya asik-asik.</p>
          <a href="/app/student/courses" class="btn btn-primary dashboard px-4">
            Temukan Guru Pilihanmu
          </a>
        </div>
      </div>
      <h5 class="info-kelas mt-5 mb-5">
        Atau coba deh, kamu pilih salah satu Tryout di bawah ini!
      </h5>
      <div class="row">
        <div class="col-md-6">
          <div
            class="card card-karir m-3 router-push"
            @click="$router.push('/app/tryout')"
          >
            <div class="card-body text-left p-0">
              <div class="card-content px-4">
                <h3
                  class="card-judul card-program mt-4 mb-2"
                  style="overflow: hidden; height: 60px"
                >
                  Tryout UTBK
                </h3>
                <p
                  class="card-text pb-0"
                  style="overflow: hidden; height: 60px"
                >
                  Temukan tryout UTBK pilihanmu disini. Dari SAINTEK, SOSHUM,
                  hingga CAMPURAN ada untukmu.
                </p>

                <a href="/app/tryout" class="karir-link"
                  >Detail <i class="fa fa-chevron-right ml-1"></i
                ></a>
              </div>
              <div class="d-flex justify-content-end pb-4 pr-4 m-0 bordered">
                <div class="icon-footer">
                  <h4 class="title">TRYOUT</h4>
                  <h5 class="subtitle single">
                    UTBK
                  </h5>
                  <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card card-karir m-3">
            <div
              class="card-body text-left p-0 router-push"
              @click="$router.push('/app/tryout')"
            >
              <div class="card-content px-4">
                <h3
                  class="card-judul card-program mt-4 mb-2"
                  style="overflow: hidden; height: 60px"
                >
                  Tryout ASPD
                </h3>
                <p
                  class="card-text pb-0"
                  style="overflow: hidden; height: 60px"
                >
                  Temukan tryout Asesmen Standar Pendidikan Daerah pilihanmu
                  disini.
                </p>

                <a href="/app/tryout" class="karir-link"
                  >Detail <i class="fa fa-chevron-right ml-1"></i
                ></a>
              </div>
              <div class="d-flex justify-content-end pb-4 pr-4 m-0 bordered">
                <div class="icon-footer">
                  <h4 class="title">TRYOUT</h4>
                  <h5 class="subtitle single">
                    ASPD
                  </h5>
                  <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 class="info-kelas mt-5 mb-5">
        Kamu Perlu Ketahui Minat dan Bakatmu Dengan Ikut Tes MBTI!
      </h5>
      <div class="kelas kelasdua mb-5 shadow-sm">
        <div class="col-md-8">
          <h4 class="m-0">Minatku Apa?</h4>
          <p>
            Siapa tau aku minat di<br />
            kampus itu...
          </p>
          <a class="btn btn-primary dashboard px-4" href="/app/mbti"
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
const dataTanggal = [
  "20-01-0000",
  "20-01-0000",
  "20-02-0000",
  "20-03-0000",
  "20-04-0000",
  "20-05-0000",
  "20-05-0000",
  "20-07-0000"
];
export default {
  data() {
    return {
      loading: true,
      isDisplayBatteries: false,
      isDisplayASPDBatteries: false,
      scoreData: {},
      scoreASPDData: {},
      prodiSatu: {},
      prodiDua: {},
      totalTryout: 0,
      totalKursus: 0,
      filter: {
        kategori: "UTBK",
        kelompok: "",
        id_penjurusan: null,
        id_jenjang: null,
        id_kelas: null
      },
      filterList: {
        kategori: ["UTBK", "ASPD", "PAS", "PAT"]
        // subKategori: ['ASPD SD']
      },
      grafikPerformaKenaikan: 0,
      grafikPerformaOptions: {
        title: {
          text: "Grafik Hasil Tryout"
        },

        // subtitle: {
        //   text: "Tentor: Arbi Syarifudin"
        // },

        yAxis: {
          title: {
            text: "Skor"
          }
        },

        xAxis: {
          accessibility: {
            rangeDescription: "Rentang: Januari s.d Desember"
          },
          categories: dataTanggal,
          title: {
            text: "Tanggal"
          }
        },

        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 0
          }
        },

        // tooltip: {
        //   headerFormat: "<b>{series.name} Bln. {point.x}</b><br />",
        //   // pointFormat: 'Rp {point.y}'
        //   pointFormatter: function() {
        //     return "Rp " + this.y.toLocaleString("id");
        //   }
        // },

        series: [
          {
            name: "Skor",
            type: "column",
            data: [200, 500, 300, 450, 400, 200, 100, 250]
          },
          {
            name: "Skor",
            type: "spline",
            data: [200, 500, 300, 450, 400, 200, 100, 250]
          }
          // {
          //   data: [
          //     ["Jan", 29.9],
          //     ["Feb", 71.5],
          //     ["Mar", 106.4]
          //   ]
          // }
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      }
    };
  },
  created() {
    this.getDashboardData();
    this.getHasilSatuanPengerjaan();
    this.getProfilLengkap();
    this.getPersentaseSkor();
    this.getPersentaseSkorASPD();
  },
  watch: {
    "filter.kategori": function(value) {
      if (value) {
        this.getHasilSatuanPengerjaan();
      }
    }
  },
  methods: {
    getDashboardData() {
      this.$axios.$get("/api/users/siswa/dashboard").then(response => {
        if (response.success) {
          this.totalTryout = response.data.total_tryout;
          this.totalKursus = response.data.total_kursus;
        }
      });
    },
    getHasilSatuanPengerjaan() {
      this.loading = true;
      this.$axios
        .$get("/api/tryout_user/grafik-hasil-satuan-pengerjaan", {
          params: {
            kategori: this.filter.kategori
          }
        })
        .then(response => {
          if (response.success) {
            this.grafikPerformaKenaikan = response.data.kenaikan;
            this.grafikPerformaOptions.series = [
              {
                name: "Skor",
                type: "column",
                color: "#DDDDDD",
                data: response.data.data
              },
              {
                name: "Skor",
                type: "spline",
                color: "#5D5FEF",
                data: response.data.data
              }
            ];
            this.grafikPerformaOptions.xAxis.categories = response.data.label;
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.grafikPerformaOptions.title.text =
            "Grafik Hasil Tryout " + this.filter.kategori;
          this.loading = false;
        });
    },
    getPersentaseSkor() {
      this.loading = true;
      this.$axios
        .$get("/api/tryout_user/rerata-persentase-hasil", {
          params: {}
        })
        .then(response => {
          if (
            response.success &&
            (this.userDetail.nama_jenjang == "SMA" ||
              ["SMA", "SMK", "MA"].includes(this.userDetail.nama_jenjang))
          ) {
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
    getPersentaseSkorASPD() {
      this.loading = true;
      this.$axios
        .$get("/api/tryout_user/rerata-persentase-hasil-aspd", {
          params: {}
        })
        .then(response => {
          if (response.success) {
            this.scoreASPDData = response.data;
            this.isDisplayASPDBatteries = true;
          }
        })
        .catch(error => {
          this.isDisplayASPDBatteries = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getProfilLengkap() {
      this.loading = true;
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
          this.isDisplayASPDBatteries = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    bgColorClass(score) {
      const _score = parseFloat(score);
      if (_score >= 76) {
        return "bg-success";
      } else if (_score >= 70) {
        return "bg-warning";
      } else {
        return "bg-danger";
      }
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
