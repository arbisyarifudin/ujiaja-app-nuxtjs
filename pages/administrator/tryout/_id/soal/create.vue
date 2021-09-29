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
              <b-spinner type="grow" class="mr-2" v-if="loading" /> Buat Soal
              Tryout
            </h2>
            <nuxt-link
              to="/administrator/tryout"
              class="btn btn-outline-secondary mr-2"
            >
              <b-icon icon="arrow-left" class="mr-1"></b-icon>
              Kembali
            </nuxt-link>
          </div>
          <p>
            <i class="far fa-file-alt fa-fw mr-1"></i>
            <span class="font-weight-bold">{{ dataDetail.judul }}</span> -
            <span>{{ dataDetail.jenis_soal }}</span>
            <span v-if="dataDetail.kelompok_soal">{{
              dataDetail.kelompok_soal
            }}</span>
            <span
              v-if="
                dataDetail.penjurusan &&
                  dataDetail.penjurusan.kelas &&
                  dataDetail.penjurusan.kelas.jenjang
              "
              >{{ dataDetail.penjurusan.kelas.jenjang.nama_jenjang }}
              {{
                dataDetail.kategori == "Asmenas"
                  ? "- " + dataDetail.penjurusan.kelas.nama_kelas
                  : ""
              }}</span
            >
          </p>
          <div class="alert small alert-light border-1">
            <h3 class="h6 small">Tentang:</h3>
            {{ dataDetail.deskripsi }}
          </div>
        </div>
        <div class="col-md-12 crud-body">
          <div class="row">
            <div class="col-md-12 buat-soal mt-4">
              <p>Panduan Pengerjaan</p>
              <!-- <textarea
                name=""
                id="textarea"
                cols="30"
                rows="10"
                class="w-100"
                v-model="formTryout.panduan_pengerjaan"
              ></textarea> -->
              <client-only>
                <VueEditor
                  id="panduan_pengerjaan"
                  @blur="onBlurPanduan"
                  v-model="formTryout.panduan_pengerjaan"
                />
              </client-only>
              <UISaveStatus :data="onSubmit.panduan" />
            </div>
            <div class="col-md-12 accordion">
              <div id="accordion" role="tab-list">
                <b-card
                  no-body
                  class="mb-1"
                  v-for="(soal, a) in formSoal"
                  :key="'A' + a"
                >
                  <b-card-header header-tag="header" role="tab" class="p-0">
                    <a
                      class="card-link"
                      href="#"
                      v-b-toggle="'accordion-' + a"
                      style="padding: 30px;"
                    >
                      <p class="text-card m-0 text-h5">
                        Soal
                        <span v-if="dataDetail.kategori != 'ASPD'">{{
                          soal.jenis_soal
                        }}</span>
                        <span v-else-if="dataDetail.kategori == 'ASPD'">{{
                          soal.mapel.nama_mapel
                        }}</span>
                        <span
                          v-if="
                            dataDetail.jenis_soal == 'Campuran' &&
                              soal.kelompok_soal
                          "
                          >- {{ soal.kelompok_soal }}</span
                        >
                      </p>
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
                      <div
                        :class="[
                          dataDetail.kategori != 'ASPD'
                            ? 'card-body-content'
                            : 'mt-n3 px-3'
                        ]"
                      >
                        <div class="col-md-12 text-right p-0">
                          <button
                            type="button"
                            class="btn btn-danger py-1"
                            @click.prevent=""
                            v-if="
                              soal.pertanyaan.length > 0 &&
                                a != 0 &&
                                dataDetail.kategori != 'ASPD'
                            "
                          >
                            Hapus Mata Pelajaran
                          </button>
                        </div>
                        <div
                          class="col-md-12 form-user form-pilih-kelas p-0 mt-3"
                        >
                          <div
                            class="form-group reg-siswa"
                            v-if="dataDetail.kategori != 'ASPD'"
                          >
                            <label for="select">Mata Pelajaran</label>
                            <select
                              class="form-control pl-0"
                              id="select"
                              v-model="soal.id_mapel"
                              @change="onUpdateSoal(soal)"
                            >
                              <option :value="null">-- Pilih --</option>
                              <option
                                :value="mapel.id"
                                v-for="(mapel, m) in dataMaster['mapel']"
                                :key="m"
                                >{{ mapel.nama_mapel }}</option
                              >
                            </select>
                            <UISaveStatus
                              :data="onSubmit.soal[soal.id]"
                              v-if="onSubmit.soal[soal.id]"
                            />
                          </div>
                          <button
                            v-if="soal.pertanyaan.length == 0"
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="createBab(soal.id, soal)"
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
                        <template v-for="(soalp, b) in soal.pertanyaan">
                          <div class="card-body-content-dua" :key="'B' + b">
                            <div class="col-md-12 dashboard soal mt-2">
                              <div class="header-soal">
                                <label>Bab Mata Pelajaran</label>
                                <button
                                  type="button"
                                  class="btn btn-danger py-1"
                                  v-if="b != 0"
                                  :disabled="loading"
                                  @click.prevent="
                                    deleteBabMapel(soal.pertanyaan, b)
                                  "
                                >
                                  <b-spinner
                                    v-if="loading"
                                    type="grow"
                                    small
                                    class="mr-1"
                                  ></b-spinner>
                                  Hapus Bab Mata Pelajaran
                                </button>
                              </div>
                              <div class="form-user">
                                <div class="form-group reg-siswa mb-4">
                                  <!-- <input
                                  type="text"
                                  class="form-control pl-0"
                                  id="text"
                                  placeholder="Isi Bab Mata Pelajaran"
                                /> -->
                                  <b-form-tags
                                    :input-id="'bab-' + b"
                                    separator=","
                                    remove-on-delete
                                    placeholder="Isi Bab Mata Pelajaran"
                                    v-model="soalp.bab_mapel"
                                    duplicate-tag-text="Bab sudah ada"
                                    @input="onUpdatePertanyaan(soalp)"
                                  ></b-form-tags>
                                  <UISaveStatus
                                    :data="onSubmit.pertanyaan[soalp.id]"
                                    v-if="onSubmit.pertanyaan[soalp.id]"
                                  />
                                </div>
                              </div>
                              <label>Teks Untuk Beberapa Soal</label>
                              <!-- <textarea
                                name=""
                                id="textarea"
                                cols="30"
                                rows="10"
                                class="w-100"
                                v-model="soalp.penjelasan_pertanyaan"
                              ></textarea> -->
                              <VueEditor
                                :id="'penjelasan_pertanyaan-' + b"
                                v-model="soalp.penjelasan_pertanyaan"
                                @blur="onUpdatePertanyaan(soalp)"
                              />
                              <UISaveStatus
                                :data="onSubmit.pertanyaan[soalp.id]"
                                v-if="onSubmit.pertanyaan[soalp.id]"
                              />
                            </div>
                            <div class="card-body-content-dua dua">
                              <div class="col-md-12 px-4 py-2 soal mt-2">
                                <div class="header-soal">
                                  <p>Pertanyaan 1</p>
                                  <button
                                    type="button"
                                    class="btn btn-danger dua py-1"
                                    v-if="b + 1 != 1"
                                    @click.prevent="
                                      deleteQuestion(soal.pertanyaan, b)
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

                                <!-- <textarea
                                  name=""
                                  id="textarea"
                                  cols="30"
                                  rows="10"
                                  class="w-100"
                                  v-model="soalp.soal"
                                ></textarea> -->
                                <VueEditor
                                  :id="'soal-' + b"
                                  v-model="soalp.soal"
                                  @blur="onUpdatePertanyaan(soalp)"
                                />
                                <UISaveStatus
                                  :data="onSubmit.pertanyaan[soalp.id]"
                                  v-if="onSubmit.pertanyaan[soalp.id]"
                                />
                              </div>
                              <div
                                class="opsi px-4 d-flex align-items-center py-4"
                              >
                                <p class="mb-0">Opsi Jawaban</p>
                                <button
                                  type="button"
                                  class="btn btn-primary py-1 ml-4"
                                  @click.prevent="addOption(soalp)"
                                >
                                  Tambah Opsi
                                </button>
                              </div>

                              <!-- OPSI JAWABAN -->
                              <div class="px-4 soal">
                                <!-- {{ soalp.opsi_pertanyaan }} -->
                                <div
                                  class="input-group mb-3"
                                  v-for="(opsi, c) in soalp.opsi_pertanyaan"
                                  :key="'C' + c"
                                >
                                  <div class="input-group-prepend">
                                    <div class="input-group-text">
                                      <input
                                        type="radio"
                                        :name="'opsi' + b"
                                        :value="opsi"
                                        v-model="soalp.jawaban_pertanyaan"
                                        @change="
                                          onUpdatePertanyaanOpsi(soalp, c)
                                        "
                                      />
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="opsi.option"
                                    @change="onUpdatePertanyaan(soalp)"
                                  />
                                  <div class="input-group-prepend">
                                    <button
                                      type="button"
                                      class="btn btn-danger"
                                      v-if="c > 3 && opsi.correct === false"
                                      @click.prevent="deleteOption(soalp, c)"
                                    >
                                      <i class="fa fa-times"></i>
                                    </button>
                                  </div>
                                  <!-- {{ opsi }} -->
                                </div>
                                <UISaveStatus
                                  :data="onSubmit.pertanyaan[soalp.id]"
                                  v-if="onSubmit.pertanyaan[soalp.id]"
                                />

                                <p class="mt-4">Pembahasan</p>
                                <!-- <textarea
                                  name=""
                                  id="textarea"
                                  cols="30"
                                  rows="10"
                                  class="w-100"
                                  v-model="soalp.pembahasan_pertanyaan"
                                ></textarea> -->
                                <VueEditor
                                  :id="'pembahasan-' + b"
                                  v-model="soalp.pembahasan_pertanyaan"
                                  @blur="onUpdatePertanyaan(soalp)"
                                />
                                <UISaveStatus
                                  :data="onSubmit.pertanyaan[soalp.id]"
                                  v-if="onSubmit.pertanyaan[soalp.id]"
                                />

                                <button
                                  type="button"
                                  class="btn btn-success py-1 mt-3"
                                  @click.prevent="addQuestion(soalp)"
                                  v-if="soalp.pertanyaan_child.length == 0"
                                  :disabled="loading"
                                >
                                  <b-spinner
                                    small
                                    type="grow"
                                    class="mr-1"
                                    v-if="loading"
                                  ></b-spinner>
                                  Tambah Pertanyaan
                                </button>
                              </div>
                              <!-- ./OPSI JAWABAN -->
                            </div>

                            <!-- SOAL PERTANYAAN - CHILD -->
                            <div
                              class="card-body-content-dua dua"
                              v-for="(child, d) in soalp.pertanyaan_child"
                              :key="'D' + d"
                            >
                              <div class="col-md-12 px-4 py-2 soal mt-2">
                                <div class="header-soal">
                                  <p>Pertanyaan {{ 3 - 1 + d }}</p>
                                  <!-- <button
                                    type="button"
                                    class="btn btn-danger dua py-1"
                                  >
                                    Hapus Pertanyaan
                                  </button> -->
                                  <button
                                    type="button"
                                    class="btn btn-danger dua py-1"
                                    @click.prevent="
                                      deleteQuestion(soalp.pertanyaan_child, d)
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
                                <!-- <textarea
                                  name=""
                                  id="textarea"
                                  cols="30"
                                  rows="10"
                                  class="w-100"
                                  v-model="child.soal"
                                ></textarea> -->
                                <VueEditor
                                  :id="'soal-' + b + ' - ' + d"
                                  v-model="child.soal"
                                  @blur="onUpdatePertanyaanChild(child)"
                                />
                                <UISaveStatus
                                  :data="onSubmit.perchild[child.id]"
                                  v-if="onSubmit.perchild[child.id]"
                                />
                              </div>

                              <!-- CHILD OPSI JAWABAN -->
                              <div
                                class="opsi px-4 d-flex align-items-center py-4"
                              >
                                <p class="mb-0">Opsi Jawaban</p>
                                <button
                                  type="button"
                                  class="btn btn-primary py-1 ml-4"
                                  @click.prevent="addChildOption(child)"
                                >
                                  Tambah Opsi
                                </button>
                              </div>

                              <div class="px-4 soal">
                                <div
                                  class="input-group mb-3"
                                  v-for="(opsi_child,
                                  d) in child.opsi_pertanyaan"
                                  :key="'D' + d"
                                >
                                  <div class="input-group-prepend">
                                    <div class="input-group-text">
                                      <input
                                        type="radio"
                                        :name="'opsi' + b + '-' + d"
                                        :value="opsi_child"
                                        v-model="child.jawaban_pertanyaan"
                                        @change="
                                          onUpdatePertanyaanOpsi(child, d)
                                        "
                                      />
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="opsi_child.option"
                                    @change="onUpdatePertanyaan(child)"
                                  />
                                  <div class="input-group-prepend">
                                    <button
                                      type="button"
                                      class="btn btn-danger"
                                      v-if="
                                        d > 3 && opsi_child.correct === false
                                      "
                                      @click.prevent="deleteOption(child, d)"
                                    >
                                      <i class="fa fa-times"></i>
                                    </button>
                                  </div>
                                </div>
                                <UISaveStatus
                                  :data="onSubmit.perchild[child.id]"
                                  v-if="onSubmit.perchild[child.id]"
                                />

                                <p class="mt-4">Pembahasan</p>
                                <!-- <textarea
                                  name=""
                                  id="textarea"
                                  cols="30"
                                  rows="10"
                                  class="w-100"
                                  v-model="child.pembahasan_pertanyaan"
                                ></textarea> -->
                                <VueEditor
                                  :id="'pembahasan-' + b + '-' + d"
                                  v-model="child.pembahasan_pertanyaan"
                                  @blur="onUpdatePertanyaan(child)"
                                />
                                <UISaveStatus
                                  :data="onSubmit.perchild[child.id]"
                                  v-if="onSubmit.perchild[child.id]"
                                />

                                <button
                                  type="button"
                                  class="btn btn-success py-1 mt-3"
                                  v-if="soalp.pertanyaan_child.length == d + 1"
                                  @click.prevent="addQuestion(soalp)"
                                  :disabled="loading"
                                >
                                  <b-spinner
                                    small
                                    type="grow"
                                    class="mr-1"
                                    v-if="loading"
                                  ></b-spinner>
                                  Tambah Pertanyaan
                                </button>
                              </div>
                              <!-- ./ CHILD - OPSI JAWABAN -->
                            </div>
                            <!-- / SOAL PERTANYAAN - CHILD -->

                            <div class="dashboard soal pt-0">
                              <button
                                type="button"
                                class="btn btn-info py-1 mt-4"
                                @click.prevent="
                                  addBabMapel(soalp, soal.pertanyaan)
                                "
                                v-if="b == soal.pertanyaan.length - 1"
                                :disabled="loading"
                              >
                                <b-spinner
                                  small
                                  type="grow"
                                  class="mr-1"
                                  v-if="loading"
                                ></b-spinner>

                                Tambah Bab Mata Pelajaran
                              </button>
                            </div>
                          </div>
                        </template>
                        <!-- ./SOAL PERTANYAAN -->

                        <button
                          type="button"
                          class="btn btn-warning tambah py-1 mt-4"
                          v-if="
                            soal.pertanyaan.length > 0 &&
                              dataDetail.kategori != 'ASPD'
                          "
                          :disabled="loading"
                        >
                          <b-spinner
                            small
                            type="grow"
                            class="mr-1"
                            v-if="loading"
                            @click.prevent="addMapel()"
                          ></b-spinner>
                          Tambah Mata Pelajaran
                        </button>
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
export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      formTryout: {
        panduan_pengerjaan: "",
        kategori: "",
        deskripsi: "",
        judul: ""
      },
      formSoal: [],
      dataDetail: {},
      dataMaster: { mapel: [] },
      onSubmit: {
        panduan: {
          loading: false,
          submitted: false,
          success: false
        },
        soal: [{ loading: false, submitted: false, success: false }],
        pertanyaan: [{ loading: false, submitted: false, success: false }],
        perchild: [{ loading: false, submitted: false, success: false }]
      }
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/tryout");
    this.getDetail("tryout", this.$route.params.id);
    this.getData("mapel");

    // if (this.dataDetail.jenis_soal == "TPS") {
    // this.formSoal = [
    //   {
    //     id_tryout: this.$route.params.id,
    //     jenis_soal: "TPS",
    //     kelompok_soal: "",
    //     id_mapel: null,
    //     pertanyaan: [
    //       {
    //         id: 1,
    //         bab_mapel: ["Bab 1", "Bab 2"],
    //         penjelasan_pertanyaan: "penjelasan pertanyaan ..",
    //         template_pertanyaan: "Pilihan Ganda",
    //         soal: "Soal 1",
    //         gambar: null,
    //         opsi_pertanyaan: [
    //           {
    //             option: "Opsi A",
    //             correct: false
    //           },
    //           {
    //             option: "Opsi B",
    //             correct: true
    //           },
    //           {
    //             option: "Opsi C",
    //             correct: true
    //           }
    //         ],
    //         pembahasan_pertanyaan: "asaasasas",
    //         parent_soal_pertanyaan: null,
    //         pertanyaan_child: []
    //       }
    //     ]
    //   }
    // ];
    // }
  },
  methods: {
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}/detail`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            this.formSoal = res.data.soal;
            this.formTryout = { ...this.dataDetail };
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getData(type, params = {}) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: params.keyword ?? "",
            paginate: params.perPage ?? 99,
            page: params.page ?? 1
          }
        })
        .then(res => {
          console.log("getMaster" + type, res);
          if (res.success) {
            this.dataMaster[type] = res.data.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    validateForm() {
      console.log(this.formTryout);
      console.log(this.formSoal);
      return;
      // if (!this.form.nama_mapel) {
      //   this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
      //     title: "Peringatan",
      //     variant: "warning",
      //     solid: true,
      //     autoHideDelay: 2000
      //   });
      //   return;
      // }
      this.submitData("mapel");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/create`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data " + type + " berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/master_mapel");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    createBab(id_soal, ref) {
      if (!ref.id_mapel || !this.formTryout.panduan_pengerjaan) {
        this.showToastMessage(
          "Mohon isi panduan pengerjaan dan mapel terlebih dahulu!"
        );
        return;
      }
      const dataSoalTryout = {
        id_soal_tryout: id_soal,
        bab_mapel: ["Bab Test"],
        penjelasan_pertanyaan: "Penjelasan Untuk Beberapa Pertanyaan....",
        template_pertanyaan: this.dataDetail.template_soal,
        soal: "Apa arti kehidupan di dunia ini?",
        opsi_pertanyaan: [
          {
            option: "Opsi 1",
            correct: true
          },
          {
            option: "Opsi 2",
            correct: false
          },
          {
            option: "Opsi 3",
            correct: false
          },
          {
            option: "Opsi 4",
            correct: false
          }
        ],
        // jawaban_pertanyaan: {
        //   option: "Opsi 4",
        //   correct: false
        // },
        pembahasan_pertanyaan: "Ini Pembahasan Pertanyaan....",
        parent_soal_pertanyaan: null
      };
      this.loading = true;
      this.$axios
        .$post(`/api/soal/pertanyaan/create`, dataSoalTryout)
        .then(res => {
          console.log("createBab", res);
          if (res.success) {
            ref.pertanyaan.push({ ...res.data, pertanyaan_child: [] });
            this.showToastMessage("Pertanyaan berhasil dibuat!", "success");
            this.$axios
              .$put(`/api/tryout/update/${this.dataDetail.id}`, this.formTryout)
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
    addOption(pertanyaan) {
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
            pertanyaan.opsi_pertanyaan.push({
              option: "Opsi Baru",
              correct: false
            });
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
    addChildOption(perchild) {
      console.log(perchild);
      if (!this.onSubmit.perchild[perchild.id]) {
        this.onSubmit.perchild[perchild.id] = {};
      }
      this.onSubmit.perchild[perchild.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${perchild.id}`, perchild)
        .then(res => {
          if (res.success) {
            this.onSubmit.perchild[perchild.id].submitted = true;
            this.onSubmit.perchild[perchild.id].success = true;
            this.onSubmit.perchild[perchild.id].loading = false;
            perchild.opsi_pertanyaan.push({
              option: "Opsi Baru",
              correct: false
            });
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.perchild[perchild.id].submitted = true;
          this.onSubmit.perchild[perchild.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.perchild[perchild.id].loading = false;
        });
    },
    deleteOption(pertanyaan, index) {
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
            pertanyaan.opsi_pertanyaan.splice(index, 1);
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
        template_pertanyaan: this.dataDetail.template_soal,
        soal: "Pertanyaaaannya???",
        gambar: null,
        opsi_pertanyaan: [
          {
            option: "Opsi 1",
            correct: true
          },
          {
            option: "Opsi 2",
            correct: false
          },
          {
            option: "Opsi 3",
            correct: false
          },
          {
            option: "Opsi 4",
            correct: false
          }
        ],
        pembahasan_pertanyaan: "Pembahasan pertanyaan...",
        parent_soal_pertanyaan: pertanyaan.id,
        pertanyaan_child: []
      };

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
    addBabMapel(pertanyaan, pertanyaan_parent) {
      // console.log(pertanyaan);
      // return;
      const dataSave = {
        id_soal_tryout: pertanyaan.id_soal_tryout,
        bab_mapel: ["Bab Test"],
        penjelasan_pertanyaan: "Penjelasan pertanyaan ..",
        template_pertanyaan: this.dataDetail.template_soal,
        soal: "Pertanyaaaannya???",
        gambar: null,
        opsi_pertanyaan: [
          {
            option: "Opsi 1",
            correct: true
          },
          {
            option: "Opsi 2",
            correct: false
          },
          {
            option: "Opsi 3",
            correct: false
          },
          {
            option: "Opsi 4",
            correct: false
          }
        ],
        pembahasan_pertanyaan: "Pembahasan pertanyaan...",
        parent_soal_pertanyaan: null,
        pertanyaan_child: []
      };

      this.loading = true;
      this.$axios
        .$post(`/api/soal/pertanyaan/create`, dataSave)
        .then(res => {
          console.log("res add data mapel", res);
          if (res.success) {
            pertanyaan_parent.push({ ...dataSave, id: res.data.id });
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
    deleteBabMapel(items, index) {
      if (!items[index]) {
        return;
      }
      const r = confirm(
        "Apakah anda yakin ingin menghapus Bab Mata Pelajaran ini beserta data yang berelasi padanya? Data yang dihapus tidak dapat dikembalikan."
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
        .$put(`/api/tryout/update/${this.dataDetail.id}`, this.formTryout)
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
    onUpdateSoal(soal) {
      if (!this.onSubmit.soal[soal.id]) {
        this.onSubmit.soal[soal.id] = {};
      }
      this.onSubmit.soal[soal.id].loading = true;
      this.$axios
        .$put(`/api/tryout/soal/update/${soal.id}`, soal)
        .then(res => {
          if (res.success) {
            this.onSubmit.soal[soal.id].submitted = true;
            this.onSubmit.soal[soal.id].success = true;
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.soal[soal.id].submitted = true;
          this.onSubmit.soal[soal.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.soal[soal.id].loading = false;
          // console.log(this.onSubmit.soal[soal.id]);
        });
    },
    onUpdatePertanyaan(pertanyaan) {
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${pertanyaan.id}`, pertanyaan)
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
    },
    onUpdatePertanyaanChild(perchild) {
      if (!this.onSubmit.perchild[perchild.id]) {
        this.onSubmit.perchild[perchild.id] = {};
      }
      this.onSubmit.perchild[perchild.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${perchild.id}`, perchild)
        .then(res => {
          if (res.success) {
            this.onSubmit.perchild[perchild.id].submitted = true;
            this.onSubmit.perchild[perchild.id].success = true;
            this.onSubmit.perchild[perchild.id].loading = false;
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.perchild[perchild.id].submitted = true;
          this.onSubmit.perchild[perchild.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.perchild[perchild.id].loading = false;
        });
    },
    onUpdatePertanyaanOpsi(pertanyaan, index) {
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      // const newPertanyaan = { ...pertanyaan };
      for (let i = 0; i < pertanyaan.opsi_pertanyaan.length; i++) {
        pertanyaan.opsi_pertanyaan[i] = {
          ...pertanyaan.opsi_pertanyaan[i],
          correct: false
        };
      }
      pertanyaan.opsi_pertanyaan[index] = {
        option: pertanyaan.opsi_pertanyaan[index].option,
        correct: true
      };
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
            // pertanyaan = { ...res.data };
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
