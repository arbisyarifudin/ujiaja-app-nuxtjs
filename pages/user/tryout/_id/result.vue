<template>
  <div class="container-fluid crud px-md-4 px-0 py-4 bg-white">
    <div class="dash-kelas p-0 text-left">
      <h3>
        <BackUrl
          :title="null"
          :url="
            $route.query.ref
              ? $route.query.ref
              : `/user/tryout/${dataResult.detail.id_produk}/detail`
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
            <i class="fas fa-calendar fa-fw mr-1"></i>
            {{ formatTanggal(dataResult.detail.waktu_selesai) }}
          </div>
          <div class="mb-3">
            <i class="fas fa-clock fa-fw mr-1"></i>
            {{ formatTanggal(dataResult.detail.waktu_selesai, "HH:mm") }} WIB
          </div>
        </div>
      </div>
      <div class="col-md-4" v-if="dataResult.detail.kategori_produk == 'UTBK'">
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
          <div
            class="h5 skor-val"
            v-else-if="dataResult.detail.tipe_event == 'Perorangan'"
          >
            <small>dari</small> {{ dataResult.detail.jsp }}
            <small>orang peserta</small>
          </div>
        </div>
      </div>
      <div class="col-md-4" v-if="dataResult.detail.kategori_produk == 'ASPD' ||dataResult.detail.kategori_produk == 'PAT' ||dataResult.detail.kategori_produk == 'PAS'  ">
        <div class="text-center skor-box">
          <div class="mb-2">Skor</div>
          <div class="h3 skor-val">
            {{ dataResult.detail.rerata_nilai_label }}
          </div>
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
            <td v-if="dataResult.detail.kategori_produk == 'UTBK'">
              {{ mapel.ceeb }}
            </td>
            <td v-if="dataResult.detail.kategori_produk == 'ASPD' ||dataResult.detail.kategori_produk == 'PAT' ||dataResult.detail.kategori_produk == 'PAS' ">
              {{ mapel.nilai }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Peluang Masuk -->
      <table
        class="table table-borderless"
        v-if="
          dataResult.detail.kategori_produk == 'UTBK' &&
            userDetail.nama_jenjang == 'SMA'
        "
      >
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

      <div class="d-flex justify-content-between">
        <!-- v-if="dataResult.detail.kategori_produk == 'UTBK'" -->
        <div class="d-flex">
          <button
            class="btn btn-primary square"
            :disabled="generating"
            @click.prevent="generatePDF(false)"
          >
            <b-spinner v-if="generating" small></b-spinner>
            <i class="fas fa-award fa-fw mr-1" v-else></i>
            Lihat Sertifikat
          </button>
          <button
            class="btn btn-outline-primary square ml-2"
            :disabled="sending || !resultAccessible"
            @click.prevent="generatePDF(true)"
            v-b-tooltip.hover title="Kirim sertifikat ke emailmu"
          >
            <b-spinner v-if="sending" small></b-spinner>
            <i class="fas fa-envelope fa-fw mr-1" v-else></i>
            Kirim Email Sertifikat
          </button>
        </div>
        <nuxt-link
          class="btn btn-outline-primary square ml-3"
          :to="
            `/user/tryout/${dataResult.detail.id_produk}/review?code=${$route.query.code}`
          "
          ><i class="fas fa-file-alt fa-fw mr-1"></i> Review Tryout</nuxt-link
        >
      </div>
      <div v-if="!resultAccessible" class="mt-1 text-danger">
        <small v-if="dataResult.detail.tipe_event === 'Perorangan'">* Sertifikat hanya dapat diunduh pada {{ resultAccessibleAt }}</small>
        <small v-if="dataResult.detail.tipe_event === 'Masal'">* Sertifikat hanya dapat diunduh setelah Tryout berakhir pada {{resultAccessibleAt}}</small>
      </div>
    </div>
    <UILoading v-if="loading" />

    <!-- preview pdf modal -->
    <b-modal
      id="modal-preview"
      title="Preview Sertifikat"
      modal-class="admin-modal"
      hide-footer
      centered
      size="xl"
    >
      <div>
        <iframe
          :src="pdfUrl + '#toolbar=0'"
          width="100%"
          height="600"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </b-modal>

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
      sending: false,
      dataResult: {
        detail: {},
        tryout: []
      },

      detailUser: {},
      pdfUrl: ''
    };
  },
  created() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getResult(this.$route.params.id);
    this.getProfile();

  },
  mounted() {
    if (this.$route.query.code && this.$route.query.reset) {
      this.resetTO();
    }
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    },
    resultAccessible() {
      const kategori = this.dataResult.detail.kategori_produk;
      const tipeEvent = this.dataResult.detail.tipe_event;
      if (kategori == "UTBK" && tipeEvent == "Masal") {
        const eventEnd = new Date(this.dataResult.detail.berakhir_event);
        const now = new Date();
        return now > eventEnd;
      } else if (kategori == "UTBK" && tipeEvent == "Perorangan") {
        // count 3 days from tryout end
        const tryoutEnd = new Date(this.dataResult.detail.waktu_selesai);
        tryoutEnd.setDate(tryoutEnd.getDate() + 3);
        const now = new Date();
        return now > tryoutEnd;
      } else if (kategori == "ASPD" || kategori == "PAT" || kategori == "PAS") {
        return true;
      } else {
        return false;
      }
    },
    resultAccessibleAt () {
      // output "25 Mei 2024 (-2 hari)"
      const kategori = this.dataResult.detail.kategori_produk;
      const tipeEvent = this.dataResult.detail.tipe_event;
      if (kategori == "UTBK" && tipeEvent == "Masal") {
        return this.formatTanggal(this.dataResult.detail.berakhir_event);
      } else if (kategori == "UTBK" && tipeEvent == "Perorangan") {
        const tryoutEnd = new Date(this.dataResult.detail.waktu_selesai);
        tryoutEnd.setDate(tryoutEnd.getDate() + 3);
        return this.formatTanggal(tryoutEnd);
      } else {
        return '';
      }
    }
  },
  methods: {
    getProfile() {
      this.loading = true;
      this.$axios
        .$get(`/api/users/siswa/find/${this.user.id}`)
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
    getResult(id) {
      var kategori = "";
      if(this.$route.query.category == "ASPD"){
        kategori = "-aspd"
      }else if(this.$route.query.category == "PAT"|| this.$route.query.category == "PAS"){
        kategori = "-pat-pas"
      }

      this.loading = true;
      this.$axios
        .$get(
          `/api/tryout_user/hasil-pengerjaan${kategori}?id_produk=${id}&id_user=${this.user.id}&referensi=${this.$route.query.code}`
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
          if (
            err.response &&
            err.response.status == 400 &&
            err.response.data &&
            err.response.data.message
          ) {
            return this.showToastMessage(err.response.data.message);
          }
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
    generatePDF(is_send_to_email = false) {

      if (is_send_to_email) {
        this.sending = true;
      } else {
        this.generating = true;
      }
      this.$axios
        .$post(`/api/tryout_user/generate-certificate`, {

          id_produk: this.dataResult.detail.id_produk,
          id_user: this.dataResult.detail.id_user,
          referensi: this.$route.query.code,
          kategori: this.dataResult.detail.kategori_produk,
          send_to_email: is_send_to_email
        })
        .then(res => {

          console.log(res);
          if (res.success) {
            if (is_send_to_email == false) {
              // const pdfUrl = res.data;
              // let anchor = document.createElement("a");
              // anchor.setAttribute("target", "_blank");
              // anchor.setAttribute("href", pdfUrl);
              // anchor.setAttribute("download", true);
              // // console.log(anchor);
              // anchor.click();

              this.pdfUrl = res.data;
              this.$bvModal.show("modal-preview");

            } else {
              this.showToastMessage(
                "Sertifikat berhasil dikirim ke emailmu!",
                "success"
              );
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => {
          if (is_send_to_email) {
            this.sending = false;
          } else {
            this.generating = false;
          }
        });
    },
    resetTO() {
      console.log("resetting tryOut..");
      const password = window.prompt('Masukkan password:')
      this.$axios
        .$post("/api/tryout_user/to-reset", {
          referensi: this.$route.query.code,
          id_user: this.user.id,
          password
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            console.log("resetting tryOut success!");
            window.alert("Reset TO berhasil!");
            window.location.href = "/user/tryout/mine";
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => {});
    }
  }
};
</script>
