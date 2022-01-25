<template>
  <div class="container-fluid crud px-md-4 px-0 bg-white py-4">
    <div class="dash-kelas p-0 text-left">
      <h3>
        <BackUrl
          :title="null"
          ::url="!$route.query.ref ? `/app/tryout/${dataResult.detail.id_produk}/review` :  $route.query.ref"
          class="py-1 px-2 mr-3"
        />
        Kunci Jawaban dan Pembahasan
      </h3>
      <h2 class="pb-0 mb-5">
        {{
          detailProduk.nama_produk
            ? detailProduk.nama_produk
            : "-"
        }}
      </h2>
    </div>
    <UILoading v-if="loading" />
    <b-tabs @input="updateTab">
      <b-tab :active="tab == t_index" :title="`${tryout.judul_edit} ${tryout.kelompok_soal ? `(${tryout.kelompok_soal})` : ''}`" v-for="(tryout, t_index) in dataResult.tryout" :key="'t-'+t_index" :id="'section-'+t_index">
        <div class="soal mt-4 mb-4 px-2 py-1">
          <div class="mb-4 d-flex justify-content-between">
            <!-- <div class="h4">{{tryout.judul_edit}}</div> -->
            <div class="h5">Soal dan Jawaban Kamu</div>
          </div>
          <ol>
            <li class="pl-2 mb-4" v-for="(soal, s_index) in tryout.soal" :key="'s'+s_index">
              <div class="row">
                <div class="col-md-5">
                  <div class="h6 text-dark soal-pertanyaan" v-html="soal.soal_pertanyaan"></div>
                    <ul class="list-unstyled">
                      <li v-for="(opsi, o_index) in soal.opsi_pertanyaan" :key="'o'+o_index">
                        <label :for="`${t_index}-${s_index}-${o_index}`"
                          ><input :id="`${t_index}-${s_index}-${o_index}`" type="radio" :name="`radio_${t_index}_${s_index}_${o_index}`" disabled :value="opsi.uuid" :checked="opsi.uuid == soal.jawaban_user"/>
                          <span v-html="opsi.option" :class="optionColor(soal, opsi)" class="option-text"></span>
                          </label
                        >
                      </li>
                    </ul>
                    <div class="mt-2">
                      <div class="badge badge-info px-2" style="border-radius: 10px; font-weight: 500; font-size: 12px" v-for="(bab, b_index) in soal.bab" :key="'b'+b_index">{{bab}}</div>
                    </div>
                </div>
                <div class="col-md-7">
                  <div class="h6">Pembahasan</div>
                  <div v-html="soal.pembahasan_pertanyaan"></div>
                  <div class="h6 mt-3">Jawaban: <span>{{opsiBenar(soal)}}</span></div>
                </div>
              </div>
            </li>
          </ol>
          <hr>
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
  border-top: none!important;
  .soal-pertanyaan {
    color: #47415b!important;
     margin-bottom: 10px;
     p {
       color: #47415b!important;
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
      tab: 0,
    };
  },
  created() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getDetail("produk", this.$route.params.id);
    this.getResult(this.$route.params.id)
  },
  methods: {
    updateTab(tabIndex) {
      if(this.$route.query.tab) {
        this.tab =  parseInt(this.$route.query.tab)
      }
    },
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
        .$get(`/api/tryout_user/riwayat-pengerjaan?id_produk=${id}`)
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
      if(opsi.uuid == soal.jawaban_pertanyaan && soal.koreksi_jawaban == 'Benar') {
          return 'text-success font-weight-bold'
      } else if(opsi.uuid == soal.jawaban_user && soal.koreksi_jawaban == 'Salah') {
        return 'text-danger font-weight-bold'
      }
      // if (soal.koreksi_jawaban == 'Benar') {
      //   return 'text-success font-weight-bold';
      // } else if (soal.koreksi_jawaban == 'Salah') {
      //   return 'text-danger font-weight-bold';
      // }
    },
    opsiBenar(soal) {  
      const opsiLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
      const foundIndex = soal.opsi_pertanyaan.findIndex(item => item.uuid == soal.jawaban_pertanyaan)
      if(foundIndex > -1) {
        return opsiLetter[foundIndex]
      }
      return '-'
      // let result;
      // for (let i = 0; i < soal.opsi_pertanyaan.length; i++) {
      //   const opsi = soal.opsi_pertanyaan[i];
      //   if(opsi.uuid == soal.jawaban_pertanyaan) {
      //     result = opsiLetter[i]
      //     break
      //   } 
      // }
      // return result;
    }
  
  }
};
</script>
