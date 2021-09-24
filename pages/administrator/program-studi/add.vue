<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah Program Studi</h2>
          <p>
            Ayo, buat data master program studi sekarang juga untuk merelasikan
            data siswa.
          </p>
        </div>
        <div class="col-md-12 crud-body">
          <div class="row">
            <div class="col-lg-5">
              <div class="form-user mt-3">
                <div class="form-group reg-siswa">
                  <label for="nama_studi">Program Studi <code>*</code></label>
                  <input
                    type="text"
                    class="form-control"
                    id="nama_studi"
                    placeholder="Tulis Program Studi"
                    v-model="form.nama_studi"
                  />
                </div>
                <div class="form-group reg-siswa">
                  <label for="icon_studi"
                    >Ikon Program Studi <code>*</code></label
                  >
                  <div class="custom-file mb-3">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="icon_studi"
                    />
                    <label class="custom-file-label" for="icon_studi"
                      >Pilih file atau drag kesini</label
                    >
                    <div class="small text-danger mt-1">
                      <small
                        >Disarankan dengan foto ukuran 469 x 625 piksel</small
                      >
                    </div>
                  </div>
                </div>
                <div class="form-group reg-siswa">
                  <label for="penjurusan"
                    >Penjurusan Sekolah <code>*</code></label
                  >
                  <b-form-select
                    class="form-control"
                    id="penjurusan"
                    v-model="form.id_penjurusan"
                    :options="dataOption['penjurusan']"
                    value-field="id"
                    text-field="textField"
                  >
                    <template #first>
                      <b-form-select-option :value="null"
                        >-- Pilih Penjurusan --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </div>
                <div class="form-group reg-siswa">
                  <label for="mapel"
                    >Mata Pelajaran Terkait <code>*</code></label
                  >
                  <b-form-select
                    class="form-control"
                    id="mapel"
                    v-model="form.id_mapel"
                    :options="dataOption['mapel']"
                    value-field="id"
                    text-field="textField"
                  >
                    <template #first>
                      <b-form-select-option :value="null"
                        >-- Pilih Mata Pelajaran --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </div>
                <div class="form-group reg-siswa">
                  <label for="passing_grade"
                    >Passing Grade <code>*</code></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="passing_grade"
                    placeholder="Ex: 780.55"
                    v-model="form.passing_grade"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-7">
              <div class="form-user mt-3">
                <div class="form-group reg-siswa">
                  <label for="perguruanTinggi"
                    >Perguruan Tinggi & Akreditasi:</label
                  >
                  <div
                    class="row"
                    v-for="(item, i) in form.program_studi_dan_perguruan_tinggi"
                    :key="i"
                  >
                    <div class="col-md-7 col-6">
                      <div class="form-group reg-siswa">
                        <!-- <label for="perguruanTinggi"
                          >Perguruan Tinggi <code>*</code></label
                        > -->
                        <b-form-select
                          class="form-control"
                          id="perguruanTinggi"
                          v-model="item.id_perguruan_tinggi"
                          :options="dataOption['perguruanTinggi']"
                          value-field="id"
                          text-field="textField"
                        >
                          <template #first>
                            <b-form-select-option :value="null"
                              >-- Pilih --</b-form-select-option
                            >
                          </template>
                        </b-form-select>
                      </div>
                    </div>
                    <div class="col-md-4 col-4">
                      <div class="form-group reg-siswa">
                        <!-- <label for="akreditasi_program_studi"
                          >Akreditasi <code>*</code></label
                        > -->
                        <select
                          type="text"
                          class="form-control"
                          id="akreditasi_program_studi"
                          v-model="item.akreditasi_program_studi"
                        >
                          <option :value="null">-- Pilih --</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="-">-</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-1 col-2">
                      <button
                        type="button"
                        class="btn btn-sm btn-danger px-3"
                        v-if="i != 0"
                        @click.prevent="
                          () => {
                            form.program_studi_dan_perguruan_tinggi.splice(
                              i,
                              1
                            );
                          }
                        "
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-sm btn-primary px-3"
                    v-if="
                      form.program_studi_dan_perguruan_tinggi.length <
                        dataOption['perguruanTinggi'].length
                    "
                    @click.prevent="
                      () => {
                        form.program_studi_dan_perguruan_tinggi.push({
                          id_perguruan_tinggi: null,
                          akreditasi_program_studi: null
                        });
                      }
                    "
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="deskripsi"
                >Pengertian Program Studi <code>*</code></label
              >
              <!-- <textarea
                class="form-control"
                id="deskripsi"
                v-model="form.deskripsi"
              ></textarea> -->
              <client-only>
                <VueEditor id="editor1" v-model="form.deskripsi" />
              </client-only>
            </div>
            <div class="form-group reg-siswa">
              <label for="alasan_memilih"
                >Alasan Memilih Program Studi <code>*</code></label
              >
              <!-- <textarea
                class="form-control"
                id="alasan_memilih"
                v-model="form.alasan_memilih"
              ></textarea> -->
              <client-only>
                <VueEditor id="editor2" v-model="form.alasan_memilih" />
              </client-only>
            </div>
            <div class="form-group reg-siswa">
              <label for="prospek_kerja"
                >Prospek Kerja Program Studi <code>*</code></label
              >
              <!-- <textarea
                class="form-control"
                id="prospek_kerja"
                v-model="form.prospek_kerja"
              ></textarea> -->
              <client-only>
                <VueEditor id="editor3" v-model="form.prospek_kerja" />
              </client-only>
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/program-studi"
            class="btn btn-outline-secondary mr-2"
          >
            Kembali
          </nuxt-link>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <b-spinner small class="mr-1" v-if="loading"></b-spinner>
            Simpan
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
      dataMaster: {
        perguruanTinggi: [],
        penjurusan: [],
        mapel: []
      },
      dataOption: {
        perguruanTinggi: [],
        penjurusan: [],
        mapel: []
      },
      form: {
        nama_studi: "",
        passing_grade: "",
        id_penjurusan: null,
        id_mapel: null,
        icon_studi: null,
        deskripsi: "",
        alasan_memilih: "",
        prospek_kerja: "",
        program_studi_dan_perguruan_tinggi: [
          { id_perguruan_tinggi: null, akreditasi_program_studi: null }
        ]
      }
    };
  },
  mounted() {
    this.getData("perguruanTinggi");
    this.getData("penjurusan");
    this.getData("mapel");
  },
  methods: {
    onTest(range, oldRange, source) {
      //   if (range.index) {
      //     console.log(range);
      //     let text = this.form.deskripsi.split("");
      //     const start = range.index + 3;
      //     const end = range.length;
      //     const test = this.form.deskripsi.substr(start, end);
      //     text[start] = "{{1";
      //     // text += test;
      //     console.log(test);
      //     text[start + 1] = test;
      //     text[start + 2] = "}}";
      //     console.log(text);
      //   }
    },
    validateForm() {
      console.log(this.form);
      if (
        !this.form.nama_studi ||
        !this.form.passing_grade ||
        !this.form.id_penjurusan ||
        !this.form.id_mapel ||
        !this.form.deskripsi ||
        !this.form.alasan_memilih ||
        !this.form.prospek_kerja ||
        !this.form.program_studi_dan_perguruan_tinggi[0].id_perguruan_tinggi ||
        !this.form.program_studi_dan_perguruan_tinggi[0]
          .akreditasi_program_studi
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("programStudi");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/create/multiple`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data " + type + " berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/program-studi");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataMaster[type] = res.data.data;
            this.dataOption[type] = [];
            if (type == "penjurusan") {
              this.dataMaster[type].forEach(item => {
                if (item.nama_penjurusan != "-" && item.nama_penjurusan) {
                  this.dataOption[type].push({
                    ...item,
                    textField: item.nama_penjurusan
                  });
                }
              });
            } else if (type == "mapel") {
              this.dataOption[type] = this.dataMaster[type].map(item => {
                let textField = item.nama_mapel;
                return {
                  ...item,
                  textField
                };
              });
            } else if (type == "perguruanTinggi") {
              this.dataOption[type] = this.dataMaster[type].map(item => {
                let textField = item.nama_perguruan;
                return {
                  ...item,
                  textField
                };
              });
            }
            // console.log(this.dataOption[type]);
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
