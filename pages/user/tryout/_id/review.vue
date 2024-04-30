<template>
  <div class="container-fluid crud px-md-4 px-0 bg-white py-4">
    <div class="dash-kelas p-0 text-left">
      <h3>
        <BackUrl
          :title="null"
          ::url="$route.query.ref ? $route.query.ref : `/user/tryout/${dataResult.detail.id_produk}/detail`"
          class="py-1 px-2 mr-3"
        />
        Review Tryout
      </h3>
      <h2 class="pb-0 mb-5">
        {{ detailProduk.nama_produk ? detailProduk.nama_produk : "-" }}
      </h2>
    </div>
    <UILoading v-if="loading" />
    <b-tabs v-model="tab">
      <b-tab
        :title="
          `${tryout.judul_edit} ${
            tryout.kelompok_soal ? `(${tryout.kelompok_soal})` : ''
          }`
        "
        v-for="(tryout, t_index) in dataResult.tryout"
        :key="'t-' + t_index"
        :id="'section-' + t_index"
      >
        <div class="soal mt-4 mb-4 px-2 py-1">
          <div class="mb-4 d-flex justify-content-between">
            <div class="h4">Riwayat Jawaban Kamu</div>
            <nuxt-link
              class="btn btn-primary square"
              :to="
                `/user/tryout/${dataResult.detail.id_produk}/answers?tab=${tab}&code=${$route.query.code}`
              "
              ><b-icon icon="key" class="mr-2"></b-icon> Lihat Kunci Jawaban /
              Pembahasan</nuxt-link
            >
          </div>
          <ol>
            <li
              class="pl-2 mb-4"
              v-for="(soal, s_index) in tryout.soal"
              :key="'s' + s_index"
            >
              <div
                class="h6 text-dark soal-pertanyaan"
                v-html="soal.soal_pertanyaan"
              ></div>
              <ul class="list-unstyled">
                <li
                  v-for="(opsi, o_index) in soal.opsi_pertanyaan"
                  :key="'o' + o_index"
                >
                 <div class="question-option">
                   <span class="question-option-letter" :class="letterColorClass(soal, opsi)" v-text="letterLabel(o_index)"></span>
                    <span
                      v-html="opsi.option"
                      class="question-option-text"
                    ></span>
                 </div>
                </li>
              </ul>
              <div class="mt-3" v-if="soal.koreksi_jawaban && (soal.koreksi_jawaban == 'Salah' || soal.koreksi_jawaban == 'Kosong')">
                <div  style="font-size: 12px; font-weight: 600;">Pelajari lagi tentang Bab:</div>
                <div
                  class="badge badge-danger px-2 mr-2"
                  style="border-radius: 2px; font-weight: 500; font-size: 12px"
                  v-for="(bab, b_index) in soal.bab"
                  :key="'b' + b_index"
                >
                  {{ bab }}
                </div>
              </div>
            </li>
          </ol>
        </div>
      </b-tab>
    </b-tabs>
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
.soal {
  border-top: none !important;
  .soal-pertanyaan {
    color: #47415b !important;
    margin-bottom: 10px;
    p {
      color: #47415b !important;
    }
  }
}
// label.opsi-pertanyaan {
//   display: flex;
//   align-items: start;
//   p {
//     margin-bottom: 0;
//     padding-left: 10px;
//   }
// }
</style>

<script>
export default {
  layout: "app",
  fetchOnServer: false,
  data() {
    return {
      loading: true,
      submitting: false,
      detailProduk: {},
      dataResult: {
        detail: {},
        soal: [],
        pencocokan: [],
        skor: {
          skor_akhir: 0
        }
      },
      tab: 0
    };
  },
  created() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getDetail("produk", this.$route.params.id);
    this.getResult(this.$route.params.id);
  },
  computed: {
   user() {
     return this.$store.state.dataUser.user
   },
   userDetail() {
     return this.$store.state.dataUser.detail
   }
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
    },
    getResult(id) {
      this.loading = true;
      this.$axios
        .$get(`/api/tryout_user/riwayat-pengerjaan?id_produk=${id}&id_user=${this.user.id}&referensi=${this.$route.query.code}`)
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
    optionColor(soal, opsi) {
      if (
        opsi.uuid == soal.jawaban_pertanyaan &&
        opsi.uuid == soal.jawaban_user
      ) {
        return "text-success font-weight-bold";
      }
      if (
        opsi.uuid == soal.jawaban_user &&
        soal.jawaban_user != soal.jawaban_pertanyaan
      ) {
        return "text-danger font-weight-bold";
      }
    },
    letterLabel(index) {
      const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      return letters[index] ?? '-';
    },
    letterColorClass(soal, opsi) {
      if (
        opsi.uuid == soal.jawaban_pertanyaan &&
        opsi.uuid == soal.jawaban_user
      ) {
        return "correct font-weight-bold";
      }
      if (
        opsi.uuid == soal.jawaban_user &&
        soal.jawaban_user != soal.jawaban_pertanyaan
      ) {
        return "wrong font-weight-bold";
      }
      return ''
    }
  }
};
</script>
