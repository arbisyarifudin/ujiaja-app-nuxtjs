<template>
  <div class="container-fluid konten-editprofil">
    <div class="col-md-12 dash-kelas p-0 text-left">
      <h2 class="pb-0">Dashboard</h2>
      <h5 class="mt-4">
        Halo {{ userDetail ? userDetail.nama_lengkap : '' }}, selamat datang!<i class=""></i>
      </h5>
    </div>
    <h3>Berikut ini adalah data analitik dari</h3>
    <div class="mb-4">
      <i class="fas fa-user fa-fw"></i> Ananda
      {{ userDetail.siswa ? userDetail.siswa.nama_lengkap : "" }}
    </div>
    <div class="col-md-12 dash-kelas p-0 text-left mb-4">
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
    <div v-if="showAnalytics">
      <div
        class="card mb-3 px-3 py-2 d-flex align-items-center justify-content-between flex-row"
      >
        <h4 class="mb-0 mr-2">Filter :</h4>
        <div
          class="d-flex align-items-center justify-content-end flex-row"
          style="min-width: 400px; max-width: 100%"
        >
          <!-- <button type="button" class="btn btn-sm btn-primary px-2 square">
            <i class="fas fa-fw fa-filter"></i> Filter
          </button> -->
          <b-form-select
            class="mr-1"
            style="width: 100px"
            :options="filterList.kategori"
            v-model="filter.kategori"
            :disabled="loading"
          ></b-form-select>
          <b-form-select
            class="mr-1"
            style="width: 150px"
            v-if="filter.kategori != 'UTBK' || filter.kategori != 'SM'"
            :options="filterList.sub_kategori"
            v-model="filter.id_jenjang"
            :disabled="loading"
          ></b-form-select>
          <b-form-select
            class="mr-1"
            style="width: 150px"
            v-if="
              !['UTBK', 'ASPD', 'SM'].includes(filter.kategori) &&
                filter.id_jenjang != ''
            "
            :options="filterList.kelas"
            v-model="filter.id_kelas"
            :disabled="loading"
          ></b-form-select>
          <b-form-select
            class="mr-1"
            style="width: 150px"
            v-if="
              !['UTBK', 'ASPD', 'SM'].includes(filter.kategori) &&
                filter.id_kelas != '' &&
                filterList.penjurusan &&
                filterList.penjurusan.length > 0
            "
            :options="filterList.penjurusan"
            v-model="filter.id_penjurusan"
            :disabled="loading"
          ></b-form-select>

          <button
            class="btn btn-sm btn-primary square px-3 py-2 ml-2"
            @click.prevent="filterData"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
        <!-- <span class="badge badge-primary">UTBK</span> -->
      </div>
      <div
        class="card mb-5"
        v-if="isDisplayBatteries && prodiSatu && (filter.kategori == 'UTBK' || filter.kategori == 'SM')"
      >
        <div class="card-body">
          <div class="row justify-content-around ">
            <div class="col-12">
              <h4>
                <i class="fas fa-fw fa-award mr-1"></i> PERSENTASE NILAI UTBK
              </h4>
            </div>
            <!-- <div class="col-12">
              <p class="mb-4 small">
                Yuk terus belajar, dan naikan score UTBK kamu untuk meningkatkan
                peluang masuk ke Perguruan Tinggi impianmu.
              </p>
            </div> -->
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

          <div style="background-color: #eee" class="mt-3 px-3 py-3">
            <div class="mb-2">Keterangan:</div>
            <ul
              class="d-flex list-unstyled mb-0 text-muted justify-content-start"
            >
              <li class="d-flex align-items-center mr-3">
                <span :class="circleBagdeSkorClass(80)"></span> Berpeluang
                Tinggi
              </li>
              <li class="d-flex align-items-center mr-3">
                <span :class="circleBagdeSkorClass(70)"></span> Berpeluang
                Sedang
              </li>
              <li class="d-flex align-items-center mr-3">
                <span :class="circleBagdeSkorClass(50)"></span> Berpeluang
                Rendah
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="card mb-5"
        v-if="isDisplayBatteries && prodiSatu && (filter.kategori == 'UTBK' || filter.kategori == 'SM')"
      >
        <div class="card-body">
          <div class="h4">Potensi Lain</div>
          <div style="font-size: 16px">
            Anak Anda juga memiliki potensi untuk masuk di
            <select
              class="form-control d-inline-block ml-2"
              style="max-width: 200px"
              v-model="filter.jenis_potensi"
            >
              <option value="Perguruan Tinggi">Perguruan Tinggi</option>
              <option value="Program Studi">Program Studi</option>
              <option value="Rumpun Ilmu">Rumpun Ilmu</option>
            </select>
          </div>

          <div class="row potency mt-4">
            <div
              class="col-xl-3 col-lg-3 col-md-4 col-6 mb-3"
              v-for="(potency, pIndex) in potencyData"
              :key="'pot-' + pIndex"
            >
              <div
                class="potency-item"
                v-if="filter.jenis_potensi == 'Perguruan Tinggi'"
              >
                <div class="title">{{ potency.nama_perguruan }}</div>
                <div class="subtitle">
                  PG: {{ potency.passing_grade_prodi }}
                </div>
              </div>
              <div
                class="potency-item"
                v-if="filter.jenis_potensi == 'Program Studi'"
              >
                <div class="title">{{ potency.nama_studi }}</div>
                <div class="subtitle">
                  PG: {{ potency.passing_grade_prodi }}
                </div>
              </div>
              <div
                class="potency-item"
                v-if="filter.jenis_potensi == 'Rumpun Ilmu'"
              >
                <div class="title">{{ potency.nama_perguruan }}</div>
                <div class="title2">- {{ potency.nama_studi }}</div>
                <div class="subtitle">
                  PG: {{ potency.passing_grade_prodi }}
                </div>
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
            <!-- <div class="col-12">
              <p class="mb-4 small">
                Yuk terus belajar, dan naikan score ASPD kamu untuk meningkatkan
                peluang masuk ke sekolah di Jenjang selanjutnya.
              </p>
            </div> -->
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

          <div style="background-color: #eee" class="mt-3 px-3 py-3">
            <div class="mb-2">Keterangan:</div>
            <ul
              class="d-flex list-unstyled mb-0 text-muted justify-content-start"
            >
              <li class="d-flex align-items-center mr-3">
                <span :class="circleBagdeSkorClass(80)"></span> Berpeluang
                Tinggi
              </li>
              <li class="d-flex align-items-center mr-3">
                <span :class="circleBagdeSkorClass(70)"></span> Berpeluang
                Sedang
              </li>
              <li class="d-flex align-items-center mr-3">
                <span :class="circleBagdeSkorClass(50)"></span> Berpeluang
                Rendah
              </li>
            </ul>
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

      <div class="row" v-if="!loading">
        <template v-if="filter.kategori == 'UTBK' || filter.kategori == 'SM'">
          <div
            class="col-md-6 mb-4"
            v-for="(grafikData, gKey) in grafikNilaiMapel"
            :key="'gNm-' + gKey"
          >
            <div class="card mt-4">
              <div class="card-body">
                <!-- <h4 class="mb-3 d-flex justify-content-between">
                  Grafik Nilai {{gKey}}
                </h4> -->
                <highchart
                  :options="grafikData"
                  :update="['options.title', 'options.yAxis', 'options.series']"
                  :exporting="true"
                />
              </div>
            </div>

            <h3 class="h5 mt-5 mb-4">
              Tingkat Capaian Penguasan Mata Pelajaran
            </h3>
            <ul class="list-unstyled">
              <li
                v-for="(mapelLabel, m) in mapelLabelData[gKey]"
                :key="'m-' + m"
                class="mb-3 d-flex align-items-center"
              >
                <span :class="circleBagdeClass(mapelLabel.persentase)"></span>
                {{ mapelLabel.nama }}
              </li>
            </ul>
          </div>
          <div class="col-md-6 mb-3">
            <div style="background-color: #eee" class="px-3 py-3">
              <ul
                class="d-flex list-unstyled mb-0 text-muted justify-content-between"
              >
                <li class="d-flex align-items-center">
                  <span :class="circleBagdeClass(80)"></span> &gt; 75%
                </li>
                <li class="d-flex align-items-center">
                  <span :class="circleBagdeClass(60)"></span> &gt; 50% - 75%
                </li>
                <li class="d-flex align-items-center">
                  <span :class="circleBagdeClass(40)"></span> &gt; 25% - 50%
                </li>
                <li class="d-flex align-items-center">
                  <span :class="circleBagdeClass(10)"></span> &lt; 25%
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="col-md-6 mb-4">
            <div class="card mt-4">
              <div class="card-body">
                <h4 class="mb-3 d-flex justify-content-between">
                  Performa Kamu
                </h4>
                <highchart
                  :options="grafikNilaiMapelNonUTBK"
                  :update="['options.title', 'options.yAxis', 'options.series']"
                  :exporting="true"
                />
              </div>
            </div>
            <h3 class="h5 mt-5 mb-4">
              Tingkat Capaian Penguasan Mata Pelajaran
            </h3>
            <ul
              class="list-unstyled"
              v-if="mapelLabelData && mapelLabelData.length > -1"
            >
              <li
                v-for="(mapelLabel, m) in mapelLabelData[0]"
                :key="'m-' + m"
                class="mb-3 d-flex align-items-center"
              >
                <span :class="circleBagdeClass(mapelLabel.persentase)"></span>
                {{ mapelLabel.nama }}
              </li>
            </ul>
            <div class="" v-else>No data.</div>
          </div>
          <div class="col-md-6 mb-4">
            <div class="card mt-4">
              <div class="card-body">
                <h4 class="mb-3 d-flex justify-content-between">
                  Peringkat Nilai Mata Pelajaran
                </h4>
                <highchart
                  :options="grafikRangkingNilaiNonUTBK"
                  :update="['options.title', 'options.yAxis', 'options.series']"
                  :exporting="true"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div style="background-color: #eee" class="px-3 py-3">
              <ul
                class="d-flex list-unstyled mb-0 text-muted justify-content-between"
              >
                <li class="d-flex align-items-center">
                  <span :class="circleBagdeClass(80)"></span> &gt; 75%
                </li>
                <li class="d-flex align-items-center">
                  <span :class="circleBagdeClass(60)"></span> &gt; 50% - 75%
                </li>
                <li class="d-flex align-items-center">
                  <span :class="circleBagdeClass(40)"></span> &gt; 25% - 50%
                </li>
                <li class="d-flex align-items-center">
                  <span :class="circleBagdeClass(10)"></span> &lt; 25%
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>

      <div class="row" v-if="!loading">
        <template v-if="filter.kategori == 'UTBK' || filter.kategori == 'SM'">
          <div
            class="col-md-6 mb-4"
            v-for="(grafikData, gKey) in grafikRangkingNilai"
            :key="'gRn-' + gKey"
          >
            <div class="card mt-4">
              <div class="card-body">
                <h4 class="mb-3 d-flex justify-content-between">
                  Peringkat Nilai {{ gKey }}
                </h4>
                <highchart
                  :options="grafikData"
                  :update="['options.title', 'options.yAxis', 'options.series']"
                  :exporting="true"
                />
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="row mt-4" v-if="!loading && (filter.kategori == 'UTBK' || filter.kategori == 'SM')">
        <div class="col-12 mb-4">
          <div class="card">
            <div class="card-body">
              <h4 class="mb-3 d-flex justify-content-between">
                Grafik Nilai Perumpun
              </h4>
              <highchart
                :options="grafikNilaiPerumpunData"
                :update="['options.title', 'options.yAxis', 'options.series']"
                :exporting="true"
              />
            </div>
          </div>
        </div>
        <div class="col-12 mb-4">
          <div class="card">
            <div class="card-body">
              <h4 class="mb-3 d-flex justify-content-between">
                Peringkat Rumpun
              </h4>
              <ol>
                <li
                  v-for="(nppData, nppIndex) in nilaiPerumpunPeringkat"
                  :key="'npp-' + nppIndex"
                  class="mb-2"
                >
                  {{ nppData.kode + " - " + nppData.nama }}
                </li>
              </ol>
            </div>
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
const dataMapelKode = ["PU", "PK", "PPU", "PBM", "BING"];
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
      loading: true,
      showAnalytics: true,
      isDisplayBatteries: false,
      isDisplayASPDBatteries: false,
      scoreData: {},
      scoreASPDData: {},
      prodiSatu: {},
      prodiDua: {},
      totalTryout: 0,
      totalKursus: 0,
      totalTransaksi: 0,
      filter: {
        kategori: "UTBK",
        sub_kategori: "",
        kelas: "",
        kelompok: "",
        jenis_potensi: "Perguruan Tinggi",
        id_penjurusan: null,
        id_jenjang: null,
        id_kelas: null
      },
      kategoriTOData: [],
      filterList: {
        kategori: ["UTBK", "ASPD", "PAS", "PAT"],
        // subKategori: ['ASPD SD']
        // jenjang or jenjang + penjurusan
        sub_kategori: [],
        kelas: [],
        penjurusan: []
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
            rangeDescription: ""
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
            data: []
          },
          {
            name: "Skor",
            type: "spline",
            data: []
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
      },
      grafikNilaiMapel: {
        TPS: {
          title: {
            // text: "Grafik Nilai TPS"
            text: null
          },

          yAxis: {
            title: {
              text: "Nilai"
            }
          },

          xAxis: {
            accessibility: {
              rangeDescription: ""
            },
            categories: dataMapelKode,
            title: {
              text: "Mapel"
            }
          },

          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },

          plotOptions: {
            series: {
              lineWidth: 1,
              label: {
                connectorAllowed: false
              },
              pointStart: 0
            }
          },

          // plotOptions: {
          //   series: {
          //     label: {
          //       connectorAllowed: false
          //     },
          //     pointStart: 0,
          //     borderWidth: 0,
          //     dataLabels: {
          //       enabled: true,
          //       format: "{point.y}"
          //     }
          //   }
          // },

          // tooltip: {
          //   headerFormat: "<b>{series.name} Bln. {point.x}</b><br />",
          //   // pointFormat: 'Rp {point.y}'
          //   pointFormatter: function() {
          //     return "Rp " + this.y.toLocaleString("id");
          //   }
          // },

          series: [
            {
              name: "Capaian Tertinggi",
              type: "column",
              color: "#5D5FEF",
              data: []
            },
            {
              name: "Rata-rata",
              type: "column",
              color: "#DDDDDD",
              data: []
            }
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
        },
        TKA: {
          title: {
            // text: "Grafik Nilai TKA"
            text: null
          },

          yAxis: {
            title: {
              text: "Nilai"
            }
          },

          xAxis: {
            accessibility: {
              rangeDescription: ""
            },
            categories: dataMapelKode,
            title: {
              text: "Mapel"
            }
          },

          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },

          plotOptions: {
            series: {
              lineWidth: 1,
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
              name: "Capaian Tertinggi",
              type: "column",
              color: "#5D5FEF",
              data: []
            },
            {
              name: "Rata-rata",
              type: "column",
              color: "#DDDDDD",
              data: []
            }
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
      },
      grafikNilaiMapelNonUTBK: {
        title: {
          text: "Grafik Nilai Mata Pelajaran"
        },

        yAxis: {
          title: {
            text: "Nilai"
          }
        },

        xAxis: {
          accessibility: {
            rangeDescription: ""
          },
          categories: dataMapelKode,
          title: {
            text: "Mapel"
          }
        },

        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },

        plotOptions: {
          series: {
            lineWidth: 1,
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
            name: "Capaian Tertinggi",
            type: "column",
            color: "#5D5FEF",
            data: []
          },
          {
            name: "Rata-rata",
            type: "column",
            color: "#DDDDDD",
            data: []
          }
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
      },

      mapelLabelData: {
        TKA: {},
        TPS: {},
        "0": {}
      },

      grafikRangkingNilai: {
        TPS: {
          chart: {
            type: "column",
            inverted: true
          },
          title: {
            text: null
          },
          subtitle: {
            text: null
          },
          accessibility: {
            announceNewData: {
              enabled: true
            }
          },
          xAxis: {
            type: "category"
          },
          yAxis: {
            title: {
              text: null
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: "{point.y:.1f}%"
              }
            }
          },

          // tooltip: {
          //   headerFormat:
          //     '<span style="font-size:11px">{series.name}</span><br>',
          //   pointFormat:
          //     '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
          // },

          series: [
            {
              name: "Persentase",
              // colorByPoint: true,
              data: [
                {
                  name: "No Data",
                  y: 0
                }
              ]
            }
          ]
        },
        TKA: {
          chart: {
            type: "column",
            inverted: true
          },
          title: {
            text: null
          },
          subtitle: {
            text: null
          },
          accessibility: {
            announceNewData: {
              enabled: true
            }
          },
          xAxis: {
            type: "category"
          },
          yAxis: {
            title: {
              text: null
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: "{point.y:.1f}%"
              }
            }
          },

          // tooltip: {
          //   headerFormat:
          //     '<span style="font-size:11px">{series.name}</span><br>',
          //   pointFormat:
          //     '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
          // },

          series: [
            {
              name: "Persentase",
              // colorByPoint: true,
              data: [
                {
                  name: "No Data",
                  y: 0
                }
              ]
            }
          ]
        }
      },

      grafikRangkingNilaiNonUTBK: {
        chart: {
          type: "column",
          inverted: true
        },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          title: {
            text: null
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f}%"
            }
          }
        },

        // tooltip: {
        //   headerFormat:
        //     '<span style="font-size:11px">{series.name}</span><br>',
        //   pointFormat:
        //     '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        // },

        series: [
          {
            name: "Persentase",
            // colorByPoint: true,
            data: [
              {
                name: "No Data",
                y: 0
              }
            ]
          }
        ]
      },

      grafikNilaiPerumpunData: {
        chart: {
          type: "column"
        },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          title: {
            text: null
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f}"
            }
          }
        },

        series: [
          {
            name: "Nilai",
            // colorByPoint: true,
            data: [
              {
                name: "No Data",
                y: 0
              }
            ]
          }
        ]
      },
      nilaiPerumpunPeringkat: []
    };
  },
  created: async function() {
    // await this.isUserHasProdi();
    await this.getDashboardData();
    await this.getProfilLengkap();
    await this.getKategoriTO();
    await this.filterData();
  },
  watch: {
    "filter.kategori": function(value) {
      this.filterList.penjurusan = [];
      this.filter.id_penjurusan = null;
      this.filterList.kelas = [];
      this.filter.id_kelas = null;
      this.filterList.sub_kategori = [];
      this.filter.id_jenjang = null;
      if (value) {
        // this.getHasilSatuanPengerjaan();
        // this.getHasilNilaiPerMapel();
        // if (value == "UTBK") {
        //   this.getPersentaseSkor();
        // } else {
        //   this.getPersentaseSkorASPD();
        // }

        if (value == "ASPD") {
          this.filterList.sub_kategori = this.kategoriTOData
            .filter(item => {
              return item.kategori == "ASPD";
            })
            .map(item => {
              return {
                value: item.id_jenjang,
                text: `ASPD ${item.jenjang}`
              };
            });

          if (
            this.filterList.sub_kategori &&
            this.filterList.sub_kategori.length > -1
          ) {
            // this.filter.id_jenjang = this.filterList.sub_kategori[0].value;
          }
        } else if (value == "PAT" || value == "PAS") {
          let tempArray = this.kategoriTOData
            .filter(item => {
              return item.kategori == value;
            })
            .map(item => {
              return {
                value: item.id_jenjang,
                // text: `${value} ${item.jenjang}${
                //   item.penjurusan ? " " + item.penjurusan : ""
                // }`
                text: `${value} ${item.jenjang}`
              };
            });


          const key = "text";
          this.filterList.sub_kategori = [
            ...new Map(tempArray.map(item => [item[key], item])).values()
          ];

          if (
            this.filterList.sub_kategori &&
            this.filterList.sub_kategori.length > -1
          ) {
            // this.filter.id_jenjang = this.filterList.sub_kategori[0].value;
          }
        }
      }
    },
    "filter.id_jenjang": function(value) {
      this.filterList.penjurusan = [];
      this.filter.id_penjurusan = "";
      this.filterList.kelas = [];
      this.filter.id_kelas = "";
      if (value) {
        let tempArray = this.kategoriTOData
          .filter(item => {
            return (
              item.kategori == this.filter.kategori && item.id_jenjang == value
            );
          })
          .map(item => {
            return {
              value: item.id_kelas,
              text: item.kelas
            };
          });

        const key = "text";
        this.filterList.kelas = [
          ...new Map(tempArray.map(item => [item[key], item])).values()
        ];

        if (this.filterList.kelas && this.filterList.kelas.length > -1) {
          // this.filter.id_kelas = this.filterList.kelas[0].value;
        }
      }
    },
    "filter.id_kelas": function(value) {
      this.filterList.penjurusan = [];
      this.filter.id_penjurusan = null;
      if (value) {
        let tempArray = this.kategoriTOData
          .filter(item => {
            return (
              item.kategori == this.filter.kategori &&
              item.id_jenjang == this.filter.id_jenjang &&
              item.id_kelas == value
            );
          })
          .map(item => {
            return {
              value: item.id_penjurusan,
              text: item.penjurusan
            };
          });


        if (tempArray && tempArray.length > 0 && tempArray[0].text !== null) {
          const key = "text";
          this.filterList.penjurusan = [
            ...new Map(tempArray.map(item => [item[key], item])).values()
          ];

          if (
            this.filterList.penjurusan &&
            this.filterList.penjurusan.length > -1
          ) {
            // this.filter.id_kelas = this.filterList.kelas[0].value;
          }
        } else {
          this.filterList.penjurusan = [];
        }
      }
    }
  },
  methods: {

    async filterData() {
      await this.getHasilSatuanPengerjaan();
      await this.getHasilNilaiPerMapel();
      if (this.filter.kategori == "UTBK") {
        await this.getPersentaseSkor();
        this.getHasilNilaiPerumpun();
      } else {
        this.getPersentaseSkorASPD();
      }
    },
    async getKategoriTO() {
      this.loading = true;
      this.$axios
        .$get("/api/kategori-to/list")
        .then(response => {

          if (response.success) {
            this.kategoriTOData = response.data;
          }
        })
        .catch(err => {})
        .finally(() => {
          this.loading = false;
        });
    },
    async getDashboardData() {
      this.loading = true;
      this.$axios
        .$get("/api/users/siswa/dashboard")
        .then(response => {
          if (response.success) {
            this.totalTryout = response.data.total_tryout;
            this.totalKursus = response.data.total_kursus;
          }
        })
        .catch(err => {})
        .finally(() => {
          this.loading = false;
        });
    },
    async getHasilSatuanPengerjaan() {
      this.loading = true;
      this.$axios
        .$get("/api/tryout_user/grafik-hasil-satuan-pengerjaan", {
          params: {
            kategori: this.filter.kategori,
            id_jenjang: this.filter.id_jenjang,
            id_kelas: this.filter.id_kelas,
            id_penjurusan: this.filter.id_penjurusan
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
    async getHasilNilaiPerMapel() {
      this.loading = true;
      this.$axios
        .$get("/api/tryout_user/grafik-hasil-nilai-permapel", {
          params: {
            kategori: this.filter.kategori,
            id_jenjang: this.filter.id_jenjang,
            id_kelas: this.filter.id_kelas,
            id_penjurusan: this.filter.id_penjurusan
          }
        })
        .then(response => {
          if (response.success) {
            if (this.filter.kategori == "UTBK") {
              for (const jenisKey in response.data) {
                if (!this.mapelLabelData[jenisKey]) {
                  this.mapelLabelData[jenisKey] = {};
                }
                if (Object.hasOwnProperty.call(response.data, jenisKey)) {
                  const data = response.data[jenisKey];
                  this.mapelLabelData[jenisKey] = data.mapels;
                  this.grafikRangkingNilai[
                    jenisKey
                  ].series[0].data = data.mapels.map((item, index) => {
                    return {
                      y: item.persentase,
                      name: item.kode == "N/A" ? "N/A" + index : item.kode,
                      color: "#5D5FEF"
                    };
                  });
                  this.grafikNilaiMapel[jenisKey].series = [
                    {
                      name: "Capaian Tertinggi",
                      type: "column",
                      color: "#5D5FEF",
                      data: data.nilai_tertinggi
                    },
                    {
                      name: "Rata-rata",
                      type: "column",
                      color: "#DDDDDD",
                      data: data.rerata
                    },
                    {
                      name: "Total Soal",
                      type: "spline",
                      color: "rgb(255, 29, 29)",
                      data: data.total_soal
                    }
                  ];
                  this.loading = true;
                  this.grafikNilaiMapel[jenisKey].xAxis.categories = data.label;
                  this.grafikNilaiMapel[jenisKey].title.text =
                    "Grafik Nilai " + jenisKey;
                  this.$nextTick(() => {
                    this.loading = false;
                  });
                }
              }
            } else {
              const data = response.data[0] ?? [];
              this.mapelLabelData[0] = data.mapels ?? [];
              this.grafikRangkingNilaiNonUTBK.series[0].data = data.mapels
                ? data.mapels.map((item, index) => {
                    return {
                      y: item.persentase,
                      name: item.kode == "N/A" ? "N/A" + index : item.kode,
                      color: "#5D5FEF"
                    };
                  })
                : [];
              this.grafikNilaiMapelNonUTBK.series = [
                {
                  name: "Capaian Tertinggi",
                  type: "column",
                  color: "#5D5FEF",
                  data: data.nilai_tertinggi
                },
                {
                  name: "Rata-rata",
                  type: "column",
                  color: "#DDDDDD",
                  data: data.rerata
                },
                {
                  name: "Total Soal",
                  type: "spline",
                  color: "rgb(255, 29, 29)",
                  data: data.total_soal
                }
              ];
              this.loading = true;
              this.grafikNilaiMapelNonUTBK.xAxis.categories = data.label;
              this.$nextTick(() => {
                this.loading = false;
              });
            }
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async getPersentaseSkor() {
      this.loading = true;
      this.$axios
        .$get("/api/tryout_user/rerata-persentase-hasil", {
          params: {
            id_jenjang: this.filter.id_jenjang,
            id_kelas: this.filter.id_kelas,
            id_penjurusan: this.filter.id_penjurusan,
            id_user: this.userDetail.id_orang_tua
          }
        })
        .then(response => {
          if (
            response.success
            // &&
            // (this.userDetail.nama_jenjang == "SMA" ||
            //   ["SMA", "SMK", "MA"].includes(this.userDetail.nama_jenjang))
          ) {
            this.scoreData = response.data;
            this.potencyData = response.data.potencies.univ;
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
          params: {
            id_jenjang: this.filter.id_jenjang,
            id_kelas: this.filter.id_kelas,
            id_penjurusan: this.filter.id_penjurusan,
            id_user: this.userDetail.id_orang_tua
          }
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
    getHasilNilaiPerumpun() {
      this.loading = true;
      this.$axios
        .$get("/api/tryout_user/grafik-hasil-nilai-perumpun", {
          params: {
            kategori: this.filter.kategori,
            id_jenjang: this.filter.id_jenjang,
            id_kelas: this.filter.id_kelas,
            id_penjurusan: this.filter.id_penjurusan
          }
        })
        .then(response => {
          if (response.success) {
            this.grafikNilaiPerumpunData.series = [
              {
                name: "Nilai",
                type: "column",
                color: "#5D5FEF",
                data: response.data.grafik.value
              }
              // {
              //   name: "Nilai",
              //   type: "spline",
              //   color: "#F7685A",
              //   ddata: response.data.grafik.value
              // }
            ];
            this.grafikNilaiPerumpunData.xAxis.categories =
              response.data.grafik.code;
            this.nilaiPerumpunPeringkat = response.data.rank;
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
    async getProfilLengkap() {
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
    },
    circleBagdeSkorClass(persentase) {
      const _persentase = parseFloat(persentase);
      if (persentase >= 76) {
        return "mr-2 circle-badge bg-success";
      } else if (persentase >= 70) {
        return "mr-2 circle-badge bg-warning";
      } else return "mr-2 circle-badge bg-danger";
    },
    circleBagdeClass(persentase) {
      const _persentase = parseFloat(persentase);
      if (persentase >= 75) {
        return "mr-2 circle-badge bg-success";
      } else if (persentase >= 50 && persentase < 75) {
        return "mr-2 circle-badge bg-warning";
      } else if (persentase >= 25 && persentase < 50) {
        return "mr-2 circle-badge bg-danger";
      } else {
        return "mr-2 circle-badge bg-dark";
      }
    }
  }
};
</script>
