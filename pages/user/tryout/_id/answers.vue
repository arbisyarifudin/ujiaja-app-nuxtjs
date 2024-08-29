<template>
  <div class="container-fluid crud px-md-4 px-0 bg-white py-4">
    <div class="dash-kelas p-0 text-left">
      <h3>
        <BackUrl
          :title="null"
          ::url="!$route.query.ref ? `/user/tryout/${detailProduk.id}/review` :  $route.query.ref"
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
    <b-tabs v-model="tab" lazy>
      <b-tab :active="tab == t_index" :title="`${tryout.judul_edit} ${tryout.kelompok_soal ? `(${tryout.kelompok_soal})` : ''}`" v-for="(tryout, t_index) in dataResult.tryout" :key="'t-'+t_index" :id="'section-'+t_index">
        <div class="soal mt-4 mb-4 px-2 py-1">
          <div class="mb-4 d-flex justify-content-between">
            <!-- <div class="h4">{{tryout.judul_edit}}</div> -->
            <div class="h5">Soal dan Jawaban Kamu</div>
          </div>

          <UILoading style="margin-top: 160px;" v-if="loadingSoal && !dataResult.tryoutSoal.length" text="Memuat soal..." />

          <!-- v-for="(soal, s_index) in tryout.soal" -->
          <ol v-if="!loadingSoal && dataResult.tryoutSoal.length"class="soal-list">
            <li
              class="soal-item mb-4"
              v-for="(soal, s_index) in dataResult.tryoutSoal"
              :key="'s' + s_index"
            >
            <div class="row">
              <div class="col-md-7">
                <div
                  class="h6 text-dark soal-pertanyaan"
                  v-html="soal.soal_pertanyaan"
                ></div>

                <ul class="list-unstyled" v-if="soal.template_pertanyaan === 'Pilihan Ganda' || soal.template_pertanyaan === 'Pilihan Ganda Kompleks (Model 1)'">
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

              <table class="table table-bordered" v-else-if="soal.template_pertanyaan === 'Pilihan Ganda Kompleks (Model 2)'">
                    <thead>
                      <tr>
                        <th colspan="2">Pilihan</th>
                        <th width="15%" class="text-center">{{ soal.opsi_jawaban_pertanyaan ? soal.opsi_jawaban_pertanyaan[0] : 'Ya' }}</th>
                        <th width="15%" class="text-center">{{ soal.opsi_jawaban_pertanyaan ? soal.opsi_jawaban_pertanyaan[1] : 'Tidak' }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(opsi, o) in soal.opsi_pertanyaan" :key="'opsi' + o">
                        <td width="10px"><span class="question-option-letter" :class="letterColorClass2(soal, o)">{{ letterLabel(o) }}</span></td>
                        <td class="td-1">
                          <div v-html="opsi.option"></div>
                        </td>
                        <td class="td-2" v-for="pil in 2">
                          <div v-if="soal.jawaban_user?.[o]" class="d-flex justify-content-center form-check">
                            <b-form-checkbox :id="'opsi_' + s_index + '_' + o + '_' + pil"
                                :name="'opsi_' + s_index + '_' + o + '_' + pil"
                                class="d-inline form-check-input" disabled :value="opsi.uuid + '___' + pil" v-model="soal.jawaban_user[o]"></b-form-checkbox>
                          </div>
                          <div v-else class="d-flex justify-content-center form-check">
                            <b-form-checkbox :id="'opsi_' + s_index + '_' + o + '_' + pil"
                                :name="'opsi_' + s_index + '_' + o + '_' + pil"
                                class="d-inline form-check-input" disabled></b-form-checkbox>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                <div class="mt-5" v-if="soal.koreksi_jawaban == 'Salah' || soal.koreksi_jawaban == 'Kosong'">
                  <hr />
                  <div  style="font-size: 12px; font-weight: 600;">Pelajari lagi tentang Bab:</div>
                    <div
                      class="badge badge-danger px-2 mr-2"
                      style="border-radius: 2px; font-weight: 500; font-size: 12px"
                      v-for="(bab, b_index) in soal.bab"
                      :key="'b' + b_index"
                      >
                      {{ bab }}
                    </div>
                  <hr />
                </div>
              </div>
              <div class="col-md-5">
                  <div v-if="soal.pembahasan_pertanyaan">
                    <div class="h6">Pembahasan</div>
                    <div class="soal-pembahasan" v-html="soal.pembahasan_pertanyaan"></div>
                  </div>
                  <div class="h6 mt-3" v-if="soal.template_pertanyaan === 'Pilihan Ganda' || soal.template_pertanyaan === 'Pilihan Ganda Kompleks (Model 1)'">Jawaban Benar: <span class="font-weight-bold text-success ml-2">{{ opsiBenar(soal) }}</span></div>
                  <div class="mt-3" v-else-if="soal.template_pertanyaan === 'Pilihan Ganda Kompleks (Model 2)'">
                    <div class="h6">Jawaban Benar:</div>
                    <ul class="list-unstyled">
                      <li v-for="(jawaban, j) in opsiBenar(soal)" :key="'jawaban' + j" class="mr-2">
                        <div class="d-flex align-items-center">
                          <div class="mr-2">{{ jawaban.opsi }}.</div>
                          <div>{{ jawaban.pilihan }}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="mt-3" v-else-if="soal.template_pertanyaan === 'Isian Singkat'">
                    <div class="h6">Jawaban Benar:</div>
                    <ul class="list-unstyled">
                      <li v-for="(jawaban, j) in soal.jawaban_pertanyaan" :key="'jawaban' + j" class="mr-2">
                        <div class="d-flex align-items-center">
                          <div class="mr-2">{{ j + 1 }}.</div>
                          <div>{{ jawaban }}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
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

  &-list {
    padding-left: 10px;
  }

  &-item {
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    padding: 15px 20px;
    margin-bottom: 30px;
    background-color: #f9f9f9;
  }

  .soal-pertanyaan {
    color: #47415b!important;
     margin-bottom: 10px;
     p {
       color: #47415b!important;
     }
  }

  .soal-pembahasan {
    font-size: 12px;
    p {
      font-size: 12px;
    }
  }

  .ql-inputfield {
    display: inline-block;
    position: relative;
    input {
      outline: none;
      border: none;
      // border-bottom: 1px solid #ccc;
      border: 1px solid #9e8df3;
      text-align: center;
      // padding: 0 5px;
      padding: 5px 5px;
      margin: 0 5px;
      font-size: 12px;
      // font-weight: 600;
      // color: blue;
      color: #47415b;
      max-width: 120px;
      letter-spacing: 2px;

      &.correct {
        // border: 3px solid #d4edda;
        // background-color: #d4edda;
        background-color: rgba(212, 237, 218, 0.4);
      }

      &.wrong {
        // border: 3px solid #f8d7da;
        // background-color: #f8d7da;
        background-color: rgba(248, 215, 218, 0.4);
      }
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
      loadingSoal: false,
      submitting: false,
      detailProduk: {},
      dataResult: {
        detail: {},
        tryout: [],
        tryoutSoal: []
      },
      tab: -1,
    };
  },
  async created() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getDetail("produk", this.$route.params.id);
    await this.getResult()

    // this.tab = this.$route.query?.tab ? parseInt(this.$route.query?.tab) : 0

    this.handleInputIsianSingkat();
  },
  computed: {
   user() {
     return this.$store.state.dataUser.user
   },
   userDetail() {
     return this.$store.state.dataUser.detail
   }
  },
  watch: {
    async tab(newValue) {
      console.log('tab', newValue)
      if (newValue >= 0) {
        this.dataResult.tryoutSoal = []
        this.loadingSoal = true
        const res = await this.getRiwayatPengerjaan()
        if (!!res) {
          this.dataResult.tryoutSoal = res.soal
        }
        this.loadingSoal = false
      }
    }
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

    async getResult () {
      this.loading = true
      // const produk = await this.getProduk()
      // if (!!produk) {
      //   this.dataResult.detail = produk
      // }
      const tryouts = await this.getListTryout()
      if (!!tryouts) {
        this.dataResult.tryout = tryouts
      }
      this.loading = false
    },

    async getProduk () {
      const id = this.$route.params.id
      return await this.$axios
        .$get(`/api/v2/student/tryout-user/produk-detail/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            // this.dataResult = res.data;
            return res.data
          }
          return false;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
          return false
        })
    },

    async getListTryout () {
      const id = this.$route.params.id
      return await this.$axios
        .$get('/api/v2/student/tryout-user/list-tryout', {
          params: {
            id_produk: id,
            id_user: this.user.id,
            referensi: this.$route.query.code,
            id_tryout: this.tabSelected
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            // this.dataResult = res.data;
            return res.data
          }
          return false;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
          return false
        })
    },

    async getRiwayatPengerjaan () {
      const id = this.$route.params.id
      const tryout = this.dataResult.tryout[this.tab]
      return await this.$axios
        .$get('/api/v2/student/tryout-user/riwayat-pengerjaan', {
          params: {
            id_produk: id,
            id_user: this.user.id,
            referensi: this.$route.query.code,
            id_tryout: tryout.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            // this.dataResult.tryoutSoal = res.data.soal;
            return res.data
          }
          return false;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
          return false
        })
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
      const opsiLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      if (soal.template_pertanyaan === 'Pilihan Ganda') {
        const foundIndex = soal.opsi_pertanyaan.findIndex(item => item.uuid == soal.jawaban_pertanyaan)
        if(foundIndex > -1) {
          return opsiLetter[foundIndex]
        }
      } else if (soal.template_pertanyaan === 'Pilihan Ganda Kompleks (Model 1)') {
        const jawabanKunci = soal.jawaban_pertanyaan ?? [] // example: [0, 1]
        if (!jawabanKunci) return '-'

        // console.log('jawabanKunci', jawabanKunci)

        const opsiIndexes = jawabanKunci.map(jawaban => {
          const foundIndex = soal.opsi_pertanyaan.findIndex(item => item.uuid == jawaban)
          return foundIndex
        })

        // console.log('opsiIndexes', opsiIndexes)

        const opsiLetters = opsiIndexes.map(index => {
          return opsiLetter[index]
        })

        // console.log('opsiLetters', opsiLetters)

        return opsiLetters.join(', ')
      } else if (soal.template_pertanyaan === 'Pilihan Ganda Kompleks (Model 2)') {
        // expected output:
        // array = [{opsi: 'A', pilihan: '1'}, {opsi: 'B', pilihan: '2'}]

        const jawabanKunci = soal.jawaban_pertanyaan ?? [] // example: [opsi1___1, opsi2___2] <-- opsi1 is correct, opsi2 is wrong
        let jawabanUser = soal.jawaban_user ?? [] // example: [opsi1___2, opsi2___2] <-- opsi1 is wrong, opsi2 is correct. so the answer is wrong

        if (!jawabanKunci || !jawabanUser) return []

        // if jawabanUser is not array, convert to array
        if (!Array.isArray(jawabanUser)) {
          jawabanUser = [jawabanUser]
        }

        const result = jawabanKunci.map((jawaban, index) => {
          const jawabanSplit = jawaban.split('___')
          const opsiUuid = jawabanSplit[0]
          const pilihanIndex = jawabanSplit[1] ?? 1

          const foundIndex = soal.opsi_pertanyaan.findIndex(item => item.uuid == opsiUuid)

          if (foundIndex < 0) return null;

          const opsiLetter = foundIndex > -1 ? this.letterLabel(foundIndex) : '-'
          const pilihanLabel = soal.opsi_jawaban_pertanyaan ? soal.opsi_jawaban_pertanyaan[pilihanIndex-1] : 'Ya'

          return {
            opsi: opsiLetter,
            pilihan: pilihanLabel
          }
        })
        .filter(item => item !== null)

        // console.log('result', result)

        return result
      } else if (soal.template_pertanyaan === 'Isian Singkat') {
        return soal.jawaban_pertanyaan && Array.isArray(soal.jawaban_pertanyaan) ? soal.jawaban_pertanyaan : []
      }
      return '-'
    },
    letterLabel(index) {
      const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      return letters[index] ?? '-';
    },
    letterColorClass(soal, opsi) {
      let className = ''

      if (soal.template_pertanyaan === 'Pilihan Ganda') {
        if (
          opsi.uuid == soal.jawaban_pertanyaan &&
          opsi.uuid == soal.jawaban_user
        ) {
          className = 'correct font-weight-bold';
        }

        if (
          opsi.uuid == soal.jawaban_user &&
          soal.jawaban_user != soal.jawaban_pertanyaan
        ) {
          className = 'wrong font-weight-bold';
        }
      } else if (soal.template_pertanyaan === 'Pilihan Ganda Kompleks (Model 1)') {
        // multiple check answer
        const jawabanKunci = soal.jawaban_pertanyaan ?? [] // example: [0, 1]
        let jawabanUser = soal.jawaban_user ?? [] // example: [0, 2] <-- one is correct, one is wrong

        if (!jawabanKunci || !jawabanUser) return className
        if (!Array.isArray(jawabanKunci)) return className

        // if jawabanUser is not array, convert to array
        if (!Array.isArray(jawabanUser)) {
          jawabanUser = [jawabanUser]
        }

        if (jawabanKunci.includes(opsi.uuid)) {
          if (jawabanUser.includes(opsi.uuid)) {
            className = 'correct font-weight-bold'
          } else {
            className = 'wrongx font-weight-bold'
          }
        } else {
          if (jawabanUser.includes(opsi.uuid)) {
            className = 'wrong font-weight-bold'
          }
        }
      } else if (soal.template_pertanyaan === 'Isian Singkat') {
        // do nothing
      }

      return className
    },
    letterColorClass2 (soal, opsiIndex) {
      if (soal.jawaban_user) {
        if (this.jawabanKompleksModel2Check(soal, opsiIndex, 1) || this.jawabanKompleksModel2Check(soal, opsiIndex, 2)) {
          return 'correct font-weight-bold'
        }

        return 'wrong font-weight-bold'
      }
    },
    jawabanKompleksModel2Check(soal, opsiIndex, pilihanIndex) {
      const jawabanUser = soal.jawaban_user[opsiIndex] ?? null
      if (!jawabanUser) return false
      // console.log('jawabanUser', jawabanUser)

      const jawabanKunci = soal.jawaban_pertanyaan[opsiIndex] ?? null
      // console.log('jawabanKunci', jawabanKunci)

      const jawabanUserSplit = jawabanUser.split('___')
      const jawabanUserTerpilih = jawabanUserSplit.length > 0 ? jawabanUserSplit[1] : null

      if (!jawabanUserTerpilih) return false

      const jawabanKunciSplit = jawabanKunci.split('___')
      const jawabanKunciBenar = jawabanKunciSplit.length > 0 ? jawabanKunciSplit[1] : null

      if (!jawabanKunciBenar) return false

      return jawabanUserTerpilih === pilihanIndex.toString() && jawabanKunciBenar === pilihanIndex.toString()
    },
    handleInputIsianSingkat() {
      // example of soal.soal_pertanyaan
      /* <div class="h6 text-dark soal-pertanyaan"><p> lorem ipsum <span class="ql-inputfield" contenteditable="false"><input type="text" name="soal-2-0" data-soal-id="2" data-index="2" placeholder="1"></span> </p><p>222222  </p><p><span class="ql-inputfield" contenteditable="false"></span></p><p>33333333<span class="ql-inputfield" contenteditable="false"></span>  aw   asassas asa<span class="ql-inputfield" contenteditable="false"><input type="text" name="soal-2-0" data-soal-id="2" data-index="0" placeholder="2"></span> </p></div> */

      const tabSelected = this.tab
      // console.log('tabSelected', tabSelected)
      if (tabSelected < 0) return

      // const subtestSelected = this.dataResult.tryout[tabSelected]
      // console.log('subtestSelected', subtestSelected)

      // if (!subtestSelected) return

      // const soalIsianSingkatList = this.dataResult.tryout[tabSelected].soal.filter(v => v.template_pertanyaan === 'Isian Singkat')
      const soalIsianSingkatList = this.dataResult.tryoutSoal.filter(v => v.template_pertanyaan === 'Isian Singkat')
      // console.log('soalIsianSingkatList', soalIsianSingkatList)

      const inputFieldElements = document.querySelectorAll('.ql-inputfield input')

      if (inputFieldElements.length) {
        Array.from(inputFieldElements).forEach((input, index) => {
          // console.log('input', input)

          // make all input readonly & disable
          // input.setAttribute('disabled', true)
          input.setAttribute('readonly', true)

          // get data-index of each input
          const inputIndex = input.getAttribute('data-index')
          const inputSoalId = input.getAttribute('data-soal-id')

          const soalItem = soalIsianSingkatList.find(v => v.id_soal_pertanyaan === parseInt(inputSoalId))
          // console.log('soalItem', soalItem)

          if (!soalItem) return

          // fill value with soal jawaban_user[inputIndex]
          const jawabanUser = soalItem.jawaban_user ? soalItem.jawaban_user[inputIndex] : null
          // console.log('jawabanUser', jawabanUser)

          if (!jawabanUser) return

          input.value = jawabanUser

          // get jawaban benar dari soalItem.jawaban_pertanyaan[inputIndex]
          const jawabanPertanyaan = soalItem.jawaban_pertanyaan ? soalItem.jawaban_pertanyaan[inputIndex] : null
          // console.log('jawabanPertanyaan', jawabanPertanyaan)

          // add class to input based on jawabanUser & jawabanPertanyaan
          if (jawabanUser === jawabanPertanyaan) {
            input.classList.add('correct')
          } else {
            input.classList.add('wrong')
          }

        })


      }
    }

  }
};
</script>
