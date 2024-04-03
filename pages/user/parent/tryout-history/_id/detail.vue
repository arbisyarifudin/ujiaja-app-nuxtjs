<template>
  <div class="container-fluid crud px-md-4 px-0 py-4 bg-white">
    <div class="dash-kelas p-0 text-left">
      <h3>
        <BackUrl
          :title="null"
          :url="
            $route.query.ref ? $route.query.ref : `/user/parent/tryout-history`
          "
          class="py-1 px-2 mr-3"
        />
        Hasil Tryout
      </h3>
      <h2 class="pb-0 mb-5">
        {{
          dataResult.detail.nama_produk ? dataResult.detail.nama_produk : "-"
        }}
      </h2>
    </div>
    <div class="row skor" v-if="!loading">
      <div class="col-md-8">
        <div class="skor-date">
          <div class="mb-3">
            <i class="fas fa-user fa-fw mr-1"></i> {{ detailUser.nama_lengkap }}
          </div>
          <div class="mb-3">
            <i class="fas fa-calendar fa-fw mr-1"></i>
            {{ formatTanggal(dataResult.detail.waktu_selesai) }}
          </div>
          <div class="mb-3">
            <i class="fas fa-clock fa-fw mr-1"></i>
            {{ formatTanggal(dataResult.detail.waktu_selesai, "HH:mm") }} WIB
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-center skor-box">
          <div class="mb-2">Skor</div>
          <div class="h3 skor-val">{{ dataResult.detail.ceeb_avg }}</div>
          <div
            class="h5 skor-val"
            v-if="dataResult.detail.tipe_event == 'Masal'"
          >
            <small>Peringkat</small> {{ dataResult.detail.ranking }}
            <small>dari</small> {{ dataResult.detail.jsp }}
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="hasil mt-4" v-if="!loading">
      <table
        class="table table-borderless"
        v-for="(tryout, t_index) in dataResult.tryout"
        :key="'t' + t_index"
      >
        <thead>
          <tr>
            <th>
              {{ tryout.judul_edit }}
              <small v-if="tryout.kelompok_soal" class="ml-1"
                >({{ tryout.kelompok_soal }})</small
              >
            </th>
            <th style="width: 150px; max-width: 50%">Skor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mapel, m_index) in tryout.mapel" :key="'m' + m_index">
            <td>{{ mapel.nama_mapel }}</td>
            <td>{{ mapel.ceeb }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Peluang Masuk -->
      <table class="table table-borderless">
        <thead>
          <tr>
            <th colspan="3">Peluang Masuk Program Studi Pilihan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="detailUser.prodi_satu">
            <td>
              <span v-if="detailUser.prodi_satu.perguruan">{{
                detailUser.prodi_satu.perguruan.nama_perguruan
              }}</span>
            </td>
            <td>
              <span v-if="detailUser.prodi_satu.program_studi">{{
                detailUser.prodi_satu.program_studi.nama_studi
              }}</span>
            </td>
            <td style="width: 150px; max-width: 50%">
              {{ peluangLabel(detailUser.prodi_satu) }}
            </td>
          </tr>
          <tr v-if="detailUser.prodi_dua">
            <td>
              <span v-if="detailUser.prodi_dua.perguruan">{{
                detailUser.prodi_dua.perguruan.nama_perguruan
              }}</span>
            </td>
            <td>
              <span v-if="detailUser.prodi_dua.program_studi">{{
                detailUser.prodi_dua.program_studi.nama_studi
              }}</span>
            </td>
            <td style="width: 150px; max-width: 50%">
              {{ peluangLabel(detailUser.prodi_dua) }}
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <div
        class="d-flex justify-content-end"
        style="position: relative; z-index: 9999"
      >
        <button
          class="btn btn-primary square"
          :disabled="generating"
          @click.prevent="generatePDF"
        >
          <b-spinner v-if="generating" small></b-spinner>
          <i class="fas fa-award fa-fw mr-1" v-else></i>
          Lihat Sertifikat
        </button>
        <nuxt-link
          class="btn btn-outline-primary square ml-3"
          :to="{
            path: `/user/parent/tryout-history/${dataResult.detail.referensi}/answer`,
            query: {
              idp: dataResult.detail.id_produk,
              idu: dataResult.detail.id_user,
              referensi: dataResult.detail.referensi
            }
          }"
          ><i class="fas fa-file-alt fa-fw mr-1"></i> Review Tryout</nuxt-link
        >
      </div>
    </div>
    <UILoading v-if="loading" />
  </div>
</template>

<style lang="scss">
.skor {
  &-box {
    border: 2px solid #9e8df3;
    background-color: #fcfbff;
    padding: 20px 40px;
    // color: white;
  }
  &-stamp {
    position: absolute;
    width: 80px;
    height: 80px;
    left: -25px;
    top: 10px;
    transform: rotate(-15deg);
  }
}
.hasil {
  table {
    th {
      font-weight: bold;
    }
    td {
      font-size: 13px;
    }
  }
}
</style>

<script>
export default {
  layout: "app",
  fetchOnServer: false,
  data() {
    return {
      loading: true,
      generating: false,
      dataResult: {
        detail: {},
        tryout: []
      },
      detailUser: {}
    };
  },
  created() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getResult(this.$route.query.idp, this.$route.query.idu, this.$route.query.referensi);
    this.getProfile();
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    }
  },
  methods: {
    getProfile() {
      this.loading = true;
      this.$axios
        .$get(`/api/users/siswa/find/${this.$route.query.idu}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.detailUser = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getResult(id_produk, id_user, referensi) {
      this.loading = true;
      this.$axios
        .$get(
          `/api/tryout_user/hasil-pengerjaan?id_produk=${id_produk}&id_user=${id_user}&referensi=${referensi}`
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataResult = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    peluangLabel(data) {
      const skorAkhir = parseFloat(this.dataResult.detail.ceeb_avg);
      const passingGrade = parseFloat(data.passing_grade_prodi);

      const batasBawah = passingGrade - passingGrade * 0.05;
      const batasAtas = passingGrade + passingGrade * 0.05;

      if (skorAkhir >= batasBawah && skorAkhir <= batasAtas) {
        return "Sedang";
      } else if (skorAkhir > batasAtas) {
        return "Tinggi";
      } else {
        return "Rendah";
      }
    },
    generatePDF() {
      this.generating = true;
      this.$axios
        .$post(`/api/tryout_user/generate-certificate`, {
          id_produk: this.dataResult.detail.id_produk,
          id_user: this.dataResult.detail.id_user,
          referensi: this.dataResult.detail.referensi,
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            const pdfUrl = res.data;
            let anchor = document.createElement("a");
            anchor.setAttribute("target", "_blank");
            anchor.setAttribute("href", pdfUrl);
            // console.log(anchor);
            anchor.click();
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.generating = false));
    }
  }
};
</script>
