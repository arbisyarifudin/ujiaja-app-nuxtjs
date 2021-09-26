<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Buat Soal
            Tryout
          </h2>
          <p>
            <i class="far fa-file-alt fa-fw mr-1"></i>
            {{ dataDetail.judul }} - {{ dataDetail.jenis_soal }}
            {{ dataDetail.kelompok_soal ? dataDetail.kelompok_soal : "" }}
          </p>
        </div>
        <div class="col-md-12 crud-body">
          <div class="row">
            <div class="col-md-12 buat-soal mt-4">
              <p>Panduan Pengerjaan</p>
              <textarea
                name=""
                id="textarea"
                cols="30"
                rows="10"
                class="w-100"
              ></textarea>
            </div>
            <div class="col-md-12 accordion">
              <div id="accordion" role="tab-list">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" role="tab">
                    <a class="card-link" href="#" v-b-toggle="'accordion-1'">
                      <p class="text-card m-0 text-h5">Soal TPS</p>
                      <span class="collapsed"><i class="fas fa-plus"></i></span>
                      <span class="expanded"
                        ><i class="fas fa-minus"></i> Minimize</span
                      ></a
                    >
                  </b-card-header>
                  <b-collapse
                    id="accordion-1"
                    visible
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <div class="card-body">
                      <div class="card-body-content">
                        <div class="col-md-12 text-right p-0">
                          <button class="btn btn-danger py-1">
                            Hapus Mata Pelajaran
                          </button>
                        </div>
                        <div
                          class="col-md-12 form-user form-pilih-kelas p-0 mt-3"
                        >
                          <div class="form-group reg-siswa">
                            <label for="select">Mata Pelajaran</label>
                            <select class="form-control pl-0" id="select">
                              <option selected="">Mata Pelajaran</option>
                              <option value="1">Pelajaran A</option>
                              <option value="2">Pelajaran B</option>
                              <option value="3">Pelajaran C</option>
                            </select>
                          </div>
                        </div>

                        <div class="card-body-content-dua">
                          <div class="col-md-12 dashboard soal mt-2">
                            <div class="header-soal">
                              <label for="text">Bab Mata Pelajaran</label>
                              <button class="btn btn-danger py-1">
                                Hapus Bab Mata Pelajaran
                              </button>
                            </div>
                            <div class="form-user">
                              <div class="form-group reg-siswa mb-4">
                                <input
                                  type="text"
                                  class="form-control pl-0"
                                  id="text"
                                  placeholder="Isi Bab Mata Pelajaran"
                                />
                              </div>
                            </div>
                            <label>Teks Untuk Beberapa Soal</label>
                            <textarea
                              name=""
                              id="textarea"
                              cols="30"
                              rows="10"
                              class="w-100"
                            ></textarea>
                          </div>
                          <div class="card-body-content-dua dua">
                            <div class="col-md-12 px-4 py-2 soal mt-2">
                              <div class="header-soal">
                                <p>Pertanyaan 1</p>
                                <button class="btn btn-danger dua py-1">
                                  Hapus Pertanyaan
                                </button>
                              </div>
                              <textarea
                                name=""
                                id="textarea"
                                cols="30"
                                rows="10"
                                class="w-100"
                              ></textarea>
                            </div>
                            <div
                              class="opsi px-4 d-flex align-items-center py-4"
                            >
                              <p class="mb-0">Opsi Jawaban</p>
                              <button class="btn btn-primary py-1 ml-4">
                                Tambah Opsi
                              </button>
                            </div>

                            <div class="px-4 soal">
                              <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                  <div class="input-group-text">
                                    <input
                                      type="radio"
                                      aria-label="Checkbox for following text input"
                                    />
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  class="form-control"
                                  aria-label="Text input with checkbox"
                                />
                                <div class="input-group-prepend">
                                  <button class="btn btn-danger">
                                    <i class="fa fa-times"></i>
                                  </button>
                                </div>
                              </div>

                              <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                  <div class="input-group-text">
                                    <input
                                      type="radio"
                                      aria-label="Radio button for following text input"
                                    />
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  class="form-control"
                                  aria-label="Text input with radio button"
                                />
                                <div class="input-group-prepend">
                                  <button class="btn btn-danger">
                                    <i class="fa fa-times"></i>
                                  </button>
                                </div>
                              </div>

                              <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                  <div class="input-group-text">
                                    <input
                                      type="radio"
                                      aria-label="Radio button for following text input"
                                    />
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  class="form-control"
                                  aria-label="Text input with radio button"
                                />
                                <div class="input-group-prepend">
                                  <button class="btn btn-danger">
                                    <i class="fa fa-times"></i>
                                  </button>
                                </div>
                              </div>

                              <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                  <div class="input-group-text">
                                    <input
                                      type="radio"
                                      aria-label="Radio button for following text input"
                                    />
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  class="form-control"
                                  aria-label="Text input with radio button"
                                />
                                <div class="input-group-prepend">
                                  <button class="btn btn-danger">
                                    <i class="fa fa-times"></i>
                                  </button>
                                </div>
                              </div>

                              <p>Pembahasan</p>
                              <textarea
                                name=""
                                id="textarea"
                                cols="30"
                                rows="10"
                                class="w-100"
                              ></textarea>

                              <button class="btn btn-success py-1 mt-3">
                                Tambah Pertanyaan
                              </button>
                            </div>
                          </div>

                          <div class="dashboard soal pt-0">
                            <button class="btn btn-info py-1 mt-4">
                              Tambah Bab Mata Pelajaran
                            </button>
                          </div>
                        </div>
                        <button class="btn btn-warning tambah py-1 mt-4">
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
            to="/administrator/master_mapel"
            class="btn btn-outline-secondary mr-2"
          >
            Batal dan Kembali
          </nuxt-link>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <b-spinner small class="mr-1" v-if="loading"></b-spinner>
            Simpan Soal
          </button>
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
        panduan_pengerjaan: ""
      },
      formSoal: [],
      dataDetail: {}
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/tryout");
    this.getDetail("tryout", this.$route.params.id);

    if (this.dataDetail.jenis_soal == "TPS") {
      this.formSoal = [
        {
          id_tryout: this.$route.params.id,
          jenis_soal: "TPS",
          kelompok_soal: "",
          id_mapel: null,
          soal_pertanyaan: [
            {
              bab_mapel: ["Bab 1", "Bab 2"],
              penjelasan_pertanyaan: "penjelasan pertanyaan ..",
              template_pertanyaan: "Pilihan Ganda",
              soal: "Soal 1",
              gambar: null,
              opsi_pertanyaan: [
                {
                  option: "Opsi A",
                  correct: false
                },
                {
                  option: "Opsi B",
                  correct: true
                },
                {
                  option: "Opsi C",
                  correct: true
                }
              ],
              pembahasan_pertanyaan: "",
              parent_soal_pertanyaan: null
            }
          ]
        }
      ];
    }
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (!this.form.nama_mapel) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
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
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
