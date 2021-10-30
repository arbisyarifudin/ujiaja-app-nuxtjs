<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div
          class="col-md-12 dashboard"
          style="position: relative; z-index: 10"
        >
          <div class="d-flex align-items-center justify-content-between">
            <h2 class="dash-label">
              <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Soal
              MBTI
            </h2>
            <!-- <nuxt-link
              to="/administrator/tryout"
              class="btn btn-outline-secondary mr-2"
            >
              <b-icon icon="arrow-left" class="mr-1"></b-icon>
              Kembali
            </nuxt-link> -->
            <BackUrl url="/administrator/mbti" />
          </div>
          <!-- <p>
            <i class="far fa-file-alt fa-fw mr-1"></i>
            <span class="font-weight-bold">{{ dataDetail.judul }}</span>
          </p> -->
          <div class="d-flex align-items-center mb-3">
            <i class="far fa-file-alt fa-fw mr-1"></i>
            <b-form-input @change="onBlurPanduan" debounce="300" v-model="formMBTI.judul"></b-form-input>
          </div>
          <div class="alert small alert-light border-1">
            <h3 class="h6 small">Tentang:</h3>
            <!-- {{ dataDetail.deskripsi }} -->
            <b-form-textarea @change="onBlurPanduan" debounce="300" v-model="formMBTI.deskripsi" style="border: none;" class="p-0"></b-form-textarea>
          </div>
          <UISaveStatus :data="onSubmit.panduan" />
        </div>
        <div class="col-md-12 crud-body">
          <div class="row">
            <div class="col-md-12 buat-soal mt-4">
              <p>Panduan Pengerjaan <code>*</code></p>
              <!-- <textarea
                name=""
                id="textarea"
                cols="30"
                rows="10"
                class="w-100"
                v-model="formMBTI.panduan_pengerjaan"
              ></textarea> -->
              <client-only>
                <VueEditor
                  id="panduan_pengerjaan"
                  :editor-toolbar="[
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['image']
                  ]"
                  @blur="onBlurPanduan"
                  v-model="formMBTI.panduan"
                />
              </client-only>
              <UISaveStatus :data="onSubmit.panduan" />
            </div>
            <div class="col-md-12 accordion">
              <div id="accordion" role="tab-list">
                <b-card
                  no-body
                  class="mb-4"
                  v-for="(mdimensi, a) in formMBTI.mbti_dimensi"
                  :key="'A' + a"
                >
                  <b-card-header header-tag="header" role="tab" class="p-0">
                    <a
                      class="card-link"
                      href="#"
                      v-b-toggle="'accordion-' + a"
                      style="padding: 30px;"
                    >
                      <div>
                        <p class="text-card m-0 text-h4">
                          {{ mdimensi.dimensi.nama }}
                        </p>
                        <p
                          class="text-card m-0 text-h6 small text-muted"
                          style="font-size: 14px"
                        >
                          <i class="fas fa-award"></i>

                          {{ mdimensi.dimensi.psikologi_1 }} VS
                          {{ mdimensi.dimensi.psikologi_2 }}
                        </p>
                      </div>
                      <span class="collapsed"><i class="fas fa-plus"></i></span>
                      <span class="expanded"
                        ><i class="fas fa-minus"></i> Minimize</span
                      ></a
                    >
                  </b-card-header>
                  <b-collapse
                    :id="'accordion-' + a"
                    visible
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <div class="card-body">
                      <div class="card-body-content">
                        <div
                          class="col-md-12 form-user form-pilih-kelas p-0 mt-3"
                        >
                          <button
                            v-if="mdimensi.pertanyaan.length == 0"
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="
                              createPertanyaan(mdimensi.id, mdimensi)
                            "
                            :disabled="loading"
                          >
                            <b-spinner
                              v-if="loading"
                              type="grow"
                              small
                              class="mr-1"
                            ></b-spinner>
                            Buat Pertanyaan
                          </button>
                        </div>

                        <!-- SOAL PERTANYAAN -->
                        <template
                          v-for="(mpertanyaan, b) in mdimensi.pertanyaan"
                        >
                          <div class="card-body-content-dua" :key="'B' + b">
                            <div class="col-md-12 px-4 py-2 soal mt-2">
                              <div class="header-soal">
                                <!-- <p>Pertanyaan {{ a == 0 ? b + 1 : 0 }} <code>*</code></p> -->
                                <p>Pertanyaan {{ b + 1 }} <code>*</code></p>
                                <button
                                  type="button"
                                  class="btn btn-danger dua py-1"
                                  v-if="b + 1 != 1"
                                  @click.prevent="
                                    deleteQuestion(mpertanyaan, b)
                                  "
                                  :disabled="loading"
                                >
                                  <b-spinner
                                    v-if="loading"
                                    type="grow"
                                    small
                                    class="mr-1"
                                  ></b-spinner>
                                  Hapus Pertanyaan
                                </button>
                              </div>
                              <VueEditor
                                :id="'soal-' + b"
                                v-model="mpertanyaan.pertanyaan"
                                :editor-toolbar="[
                                  ['bold', 'italic', 'underline'],
                                  [{ list: 'ordered' }, { list: 'bullet' }]
                                ]"
                                @blur="onUpdatePertanyaan(mpertanyaan)"
                              />

                              <UISaveStatus
                                :data="onSubmit.pertanyaan[mpertanyaan.id]"
                                v-if="onSubmit.pertanyaan[mpertanyaan.id]"
                              />
                            </div>
                            <div
                              class="col-md-12 opsi px-4 py-4"
                              v-if="
                                mpertanyaan.opsi && mpertanyaan.opsi.length < 2
                              "
                            >
                              <p class="mb-0">Opsi Jawaban <code>*</code></p>
                              <p
                                class="small text-muted"
                                style="font-size: 14px"
                              >
                                Isi jawaban dan pilih psikologi dari Dimensi
                              </p>
                              <div
                                class="form-user card card-body p-4 bordered "
                              >
                                <div class="row flex-row align-items-center">
                                  <div class="form-group col-md-12">
                                    <label>Masukkan opsi jawaban</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="Misal: Saya lebih senang ada banyak orang disekitar saya."
                                      v-model="newOption.opsi"
                                    />
                                  </div>
                                  <div class="form-group col-md-6">
                                    <label>Pilih Psikologi</label>
                                    <b-form-select
                                      v-model="newOption.psikologi"
                                      :options="[
                                        {
                                          text: '-- Pilih --',
                                          value: null
                                        },
                                        {
                                          text: mdimensi.dimensi.psikologi_1,
                                          value: mdimensi.dimensi.psikologi_1
                                        },
                                        {
                                          text: mdimensi.dimensi.psikologi_2,
                                          value: mdimensi.dimensi.psikologi_2
                                        }
                                      ]"
                                      @change="
                                        onChangePsikologi(
                                          mpertanyaan,
                                          mdimensi.dimensi
                                        )
                                      "
                                    ></b-form-select>
                                  </div>
                                  <!-- <div class="form-group col-md-6">
                                    <label>Skor Persentase</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled
                                      :value="newOption.skor"
                                    />
                                  </div> -->
                                  <div class="form-group col-md-12">
                                    <label class="d-block">&nbsp;</label>
                                    <button
                                      type="button"
                                      class="btn btn-primary py-1"
                                      @click.prevent="
                                        addOption(mpertanyaan, mdimensi.dimensi)
                                      "
                                    >
                                      Tambahkan
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- OPSI JAWABAN -->
                            <div class="px-4 soal mt-3">
                              <!-- {{ mpertanyaan.opsi }} -->
                              <!-- {{ mpertanyaan.pertanyaan }} -->
                              <div
                                class="row mb-3"
                                v-for="(opsi, c) in mpertanyaan.opsi"
                                :key="'C' + c"
                              >
                                <div class="col-md-3">
                                  <input
                                    type="text"
                                    :value="opsi.psikologi"
                                    class="form-control"
                                    disabled
                                  />
                                </div>
                                <div class="col-md-6">
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="opsi.opsi"
                                    @change="onUpdatePertanyaan(mpertanyaan)"
                                  />
                                </div>
                                <!-- <div class="col-md-2">
                                  <b-form-input
                                    type="text"
                                    v-model="opsi.skor"
                                    class="form-control"
                                    :class="[
                                      opsi.psikologi ==
                                      mdimensi.dimensi.psikologi_1
                                        ? 'form-control-primary'
                                        : 'form-control-info'
                                    ]"
                                    :disabled="true"
                                  @input="
                                      onChangeSkor(
                                        opsi,
                                        mpertanyaan,
                                        mdimensi.dimensi
                                      )
                                    "
                                  />
                                </div> -->
                                <div class="col-md-1">
                                  <button
                                    type="button"
                                    class="btn btn-danger"
                                    v-if="c > 1"
                                    @click.prevent="
                                      deleteOption(
                                        mpertanyaan,
                                        c,
                                        mdimensi.dimensi
                                      )
                                    "
                                  >
                                    <i class="fa fa-times"></i>
                                  </button>
                                </div>
                                <!-- {{ opsi }} -->
                              </div>
                              <UISaveStatus
                                :data="onSubmit.pertanyaan[mpertanyaan.id]"
                                v-if="onSubmit.pertanyaan[mpertanyaan.id]"
                              />
                            </div>
                            <!-- ./OPSI JAWABAN -->
                          </div>
                        </template>
                        <!-- ./SOAL PERTANYAAN -->

                        <div class="mt-4">
                           <button
                            v-if="mdimensi.pertanyaan.length > 0"
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="
                              createPertanyaan(mdimensi.id, mdimensi)
                            "
                            :disabled="loading"
                          >
                            <b-spinner
                              v-if="loading"
                              type="grow"
                              small
                              class="mr-1"
                            ></b-spinner>
                            Tambah Pertanyaan
                          </button>
                        </div>

                      </div>
                    </div>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/tryout"
            class="btn btn-outline-secondary mr-2"
          >
            Kembali
          </nuxt-link>
          <!-- <button type="submit" class="btn btn-primary" :disabled="loading">
            <b-spinner small class="mr-1" v-if="loading"></b-spinner>
            Simpan Soal
          </button> -->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      formMBTI: {
        panduan_pengerjaan: "",
        kategori: "",
        deskripsi: "",
        judul: ""
      },
      formSoal: [],
      dataDetail: {},
      newOption: {
        id: null,
        psikologi: null,
        // opsi: "Saya...",
        opsi: "",
        skor: 0
      },
      dataMaster: { mapel: [] },
      onSubmit: {
        panduan: {
          loading: false,
          submitted: false,
          success: false
        },
        pertanyaan: [{ loading: false, submitted: false, success: false }]
      }
    };
  },
  async mounted() {
    if (!this.$route.params.id) return this.$router.push("/administrator/mbti");
    await this.getDetail("mbti", this.$route.params.id);
    // this.getData("mapel");
    // console.log(this.formMBTI);
    this.$store.commit("setBreadcrumb", [
      { text: "Dashboard", href: "/administrator/dashboard", icon: "house" },
      {
        text: "MBTI",
        href: "/administrator/mbti"
      },
      {
        text: "Soal",
        href: "#",
        active: true
      },
      {
        text: "Edit",
        href: "#",
        active: true
      },
    ]);
  },
  methods: {
    async getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            // this.formSoal = res.data.soal;
            this.formMBTI = { ...this.dataDetail };
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    createPertanyaan(id_dimensi, ref) {
      const dataPertanyaanBaru = {
        id_mbti_dimensi: id_dimensi,
        pertanyaan: "Pertanyaan Baru",
        opsi: [
          {
            id: uuidv4(),
            opsi: "Opsi 1",
            psikologi: ref.dimensi.psikologi_1,
            skor: 50
          },
          {
            id: uuidv4(),
            opsi: "Opsi 2",
            psikologi: ref.dimensi.psikologi_2,
            skor: 50
          }
        ]
      };
      this.loading = true;
      this.$axios
        .$post(`/api/mbti-pertanyaan/create`, dataPertanyaanBaru)
        .then(res => {
          console.log("createPertanyaan", res);
          if (res.success) {
            ref.pertanyaan.push({ ...res.data });
            this.showToastMessage("Pertanyaan berhasil dibuat!", "success");
            this.$axios
              .$put(`/api/mbti/update/${this.dataDetail.id}`, this.formMBTI)
              .catch(err => this.catchError(err));
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    onChangePsikologi(pertanyaan, dimensi) {
      let nilai_total = 100;
      let arrSkorFilter = [];
      let arrSkor = [];

      // console.log(this.newOption.psikologi);

      // if (pertanyaan.opsi) {
      //   arrSkor = pertanyaan.opsi.map(item => {
      //     return { p: item.psikolog, s: item.skor };
      //   });
      // }

      if (!pertanyaan.opsi || (pertanyaan.opsi && pertanyaan.opsi.length < 1)) {
        this.newOption.skor = 100;
      } else {
        if (
          pertanyaan.opsi.find(item => item.psikologi == dimensi.psikologi_1) &&
          pertanyaan.opsi.find(item => item.psikologi == dimensi.psikologi_2)
        ) {
          nilai_total = 50;
        }
        if (
          pertanyaan.opsi.find(
            item => item.psikologi == this.newOption.psikologi
          )
        ) {
          arrSkorFilter = pertanyaan.opsi.filter(
            item => item.psikologi == this.newOption.psikologi
          );

          arrSkor = arrSkorFilter.map(item => item.skor);
          // console.log(nilai_total);
          // console.log(arrSkor);

          this.newOption.skor = parseFloat(
            nilai_total / (arrSkor.length + 1)
          ).toFixed(3);
        } else {
          this.newOption.skor = 100;
        }

        // this.newOption.skor = 0;
      }
    },
    onChangeSkor(opsi, pertanyaan, dimensi) {
      // if (opsi.skor < 1) {
      //   opsi.skor = 1;
      // }
      let newSkor = parseFloat(opsi.skor);

      let arrSkor = pertanyaan.opsi
        .filter(item => item.psikologi == opsi.psikologi && item.id != opsi.id)
        .map(item => parseFloat(item.skor));

      console.log(arrSkor);

      let lowestSkor = Math.min(...arrSkor);

      let total =
        arrSkor.reduce((current, prev, index) => {
          return parseFloat(prev) + parseFloat(current);
        }, 0) + parseFloat(opsi.skor);

      let findIndex = pertanyaan.opsi.findIndex(
        item => item.skor == lowestSkor && item.id != opsi.id
      );

      console.log("opsi", newSkor);
      console.log("total", total);
      console.log("find", findIndex);

      if (findIndex > -1 && opsi.skor > 0) {
        if (total > 50) {
          pertanyaan.opsi[findIndex].skor =
            pertanyaan.opsi[findIndex].skor -
            (newSkor - pertanyaan.opsi[findIndex].skor);
        } else if (total < 50 && total > 0) {
          console.log(pertanyaan.opsi[findIndex].skor);
          pertanyaan.opsi[findIndex].skor =
            pertanyaan.opsi[findIndex].skor + (50 - total);
        }
      }
    },
    addOption(pertanyaan, dimensi) {
      // let nilai_total = 100,
      //   nilai_length = 0;
      // console.log(pertanyaan, dimensi);
      // return;
      if (!this.newOption.psikologi || !this.newOption.opsi) {
        this.showToastMessage(
          "Mohon lengkapi data yang diperlukan terlebih dahulu!",
          "warning"
        );
        return;
      }

      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      if (!pertanyaan.opsi) {
        pertanyaan.opsi = [];
      }
      pertanyaan.opsi.push({
        id: uuidv4(),
        psikologi: this.newOption.psikologi,
        opsi: this.newOption.opsi,
        skor: this.newOption.skor
      });
      // this.updateSkor(pertanyaan, dimensi);
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/mbti-pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
            // pertanyaan.opsi.push({
            //   id: uuidv4(),
            //   psikologi: this.newOption.psikologi,
            //   opsi: this.newOption.opsi,
            //   skor: this.newOption.skor
            // });
          }
          this.newOption.opsi = "";
          this.newOption.psikologi = null;
          this.newOption.skor = null;

          return true;
        })
        .catch(err => {
          this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
          this.onSubmit.pertanyaan[pertanyaan.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
        });
    },
    updateSkor(pertanyaan, dimensi, oldOpsi) {
      let nilai_total = 100,
        nilai_length = 0;
      if (
        pertanyaan.opsi.find(item => item.psikologi == dimensi.psikologi_1) &&
        pertanyaan.opsi.find(item => item.psikologi == dimensi.psikologi_2)
      ) {
        nilai_total = 50;
      }
      if (
        this.newOption.psikologi &&
        pertanyaan.opsi.find(item => item.psikologi == this.newOption.psikologi)
      ) {
        let arrSkor = pertanyaan.opsi
          .filter(item => item.psikologi == this.newOption.psikologi)
          .map(item => item.skor);

        nilai_length = arrSkor.length;

        // console.log(nilai_total);
        // console.log(arrSkor);

        let newskor = parseFloat(nilai_total / nilai_length).toFixed(3);

        for (let index = 0; index < pertanyaan.opsi.length; index++) {
          const item = pertanyaan.opsi[index];
          if (item.psikologi == this.newOption.psikologi) {
            item.skor = newskor;
          } else {
            let otherSkor = pertanyaan.opsi.filter(
              item => item.psikologi != this.newOption.psikologi
            );
            item.skor = parseFloat(50 / otherSkor.length).toFixed(3);
          }
        }
      } else if (this.newOption.psikologi == null) {
        let targetPsikologi = oldOpsi.psikologi;
        let arrSkor = pertanyaan.opsi
          .filter(item => item.psikologi == targetPsikologi)
          .map(item => item.skor);

        nilai_length = arrSkor.length;

        console.log(nilai_total);
        console.log(arrSkor);

        let newskor = parseFloat(nilai_total / nilai_length).toFixed(3);

        for (let index = 0; index < pertanyaan.opsi.length; index++) {
          const item = pertanyaan.opsi[index];
          if (item.psikologi == targetPsikologi) {
            item.skor = newskor;
          } else {
            let otherSkor = pertanyaan.opsi.filter(
              item => item.psikologi != targetPsikologi
            );
            item.skor = parseFloat(50 / otherSkor.length).toFixed(3);
          }
        }
      } else {
        this.newOption.skor = 100;
      }
    },
    deleteOption(pertanyaan, index, dimensi) {
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      const deletedOpsi = pertanyaan.opsi.splice(index, 1);
      // this.updateSkor(pertanyaan, dimensi, deletedOpsi[0]);
      this.$axios
        .$put(`/api/mbti-pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
            this.showToastMessage("Opsi jawaban berhasil dihapus!", "success");
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
          this.onSubmit.pertanyaan[pertanyaan.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
        });
    },
    addQuestion(pertanyaan) {
      // console.log(pertanyaan);
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;

      const dataSave = {
        id_soal_tryout: pertanyaan.id_soal_tryout,
        bab_mapel: ["Bab Test"],
        penjelasan_pertanyaan: null,
        template_pertanyaan: this.dataDetail.template_soal ?? "Pilihan Ganda",
        soal: "Pertanyaaaannya???",
        gambar: null,
        opsi_pertanyaan: [
          {
            uuid: uuidv4(),
            option: "Opsi 1"
          },
          {
            uuid: uuidv4(),
            option: "Opsi 2"
          },
          {
            uuid: uuidv4(),
            option: "Opsi 3"
          },
          {
            uuid: uuidv4(),
            option: "Opsi 4"
          }
        ],
        jawaban_pertanyaan: uuidv4(),
        pembahasan_pertanyaan: "Pembahasan pertanyaan...",
        parent_soal_pertanyaan: pertanyaan.id,
        pertanyaan_child: []
      };

      dataSave.jawaban_pertanyaan = dataSave.opsi_pertanyaan[0].uuid;

      this.loading = true;
      this.$axios
        .$post(`/api/soal/pertanyaan/create`, dataSave)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
            pertanyaan.pertanyaan_child.push({ ...dataSave, id: res.data.id });
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
          this.onSubmit.pertanyaan[pertanyaan.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
          this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
        });
    },
    deleteQuestion(items, index) {
      if (!items[index]) {
        return;
      }
      const r = confirm(
        "Apakah anda yakin ingin menghapus soal beserta data yang berelasi padanya? Data yang dihapus tidak dapat dikembalikan."
      );
      if (!r) return;

      const id = items[index].id;
      this.loading = true;
      this.$axios
        .$delete(`/api/soal/pertanyaan/delete/${id}`)
        .then(res => {
          if (res.success) {
            items.splice(index, 1);
          }
          return true;
        })
        .catch(err => {
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // on Update Input
    onBlurPanduan(quill) {
      this.onSubmit.panduan.loading = true;
      this.$axios
        .$put(`/api/mbti/update/${this.dataDetail.id}`, this.formMBTI)
        .then(res => {
          if (res.success) {
            this.onSubmit.panduan.submitted = true;
            this.onSubmit.panduan.success = true;
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.panduan.submitted = true;
          this.onSubmit.panduan.success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.panduan.loading = false;
          // console.log(this.onSubmit.panduan);
        });
    },
    onUpdatePertanyaan(pertanyaan) {
      // console.log(pertanyaan);
      // return;
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/mbti-pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
          this.onSubmit.pertanyaan[pertanyaan.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
        });
    }
  }
};
</script>
