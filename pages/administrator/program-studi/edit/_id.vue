<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div
        class="row d-flex no-gutters"
        style="position: relative; z-index; 10"
      >
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Program
            Studi
          </h2>
          <!-- <p>
            Ayo, buat data master program studi sekarang juga untuk merelasikan
            data siswa.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-user mt-3">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group reg-siswa">
                      <label for="nama_studi"
                        >Program Studi <code>*</code></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="nama_studi"
                        placeholder="Tulis Program Studi"
                        v-model="form.nama_studi"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group reg-siswa">
                      <label for="icon_prodi"
                      >Ikon Program Studi <code>[opsional]</code></label
                    >
                      <div class="row">
                        <div class="col-md-3">
                          <client-only>
                            <img
                              v-if="dataDetail && dataDetail.icon_prodi"
                              :alt="dataDetail.nama_studi"
                              :src="ApiUrl(dataDetail.icon_prodi)"
                              class="img-fluid"
                              id="icon_prodi_preview"
                            />
                          </client-only>
                        </div>
                        <div class="col-md-8">
                          <div class="custom-file mb-3">
                            <input
                              type="file"
                              class="custom-file-input"
                              id="icon_prodi"
                              ref="icon_prodi"
                              @change="handleUploadedFile('icon_prodi')"
                            />
                            <label class="custom-file-label" for="icon_prodi"
                              >Pilih file atau drag kesini</label
                            >
                            <div class="small text-danger mt-1">
                              <small
                                >Disarankan dengan foto ukuran 469 x 625
                                piksel</small
                              >
                            </div>
                          </div>
                        </div>
                      </div>
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
                  <label for="rumpun">Rumpun <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    id="rumpun"
                    v-model="form.id_rumpun"
                    :options="dataOption['rumpun']"
                  >
                    <template #first>
                      <b-form-select-option :value="null"
                        >-- Pilih Rumpun --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </div>
                <div class="form-group reg-siswa">
                  <label for="mapel"
                    >Mata Pelajaran Terkait <code>*</code></label
                  >
                  <b-form-tags
                    id="tags-component-select"
                    v-model="mapelSelected"
                    size="md"
                    class="mb-2"
                    add-on-change
                    no-outer-focus
                  >
                    <template
                      v-slot="{
                        tags,
                        inputAttrs,
                        inputHandlers,
                        disabled,
                        removeTag
                      }"
                    >
                      <ul
                        v-if="tags.length > 0"
                        class="list-inline d-inline-block mb-2"
                      >
                        <li
                          v-for="tag in tags"
                          :key="tag"
                          class="list-inline-item"
                        >
                          <b-form-tag
                            @remove="removeTag(tag)"
                            :title="tag"
                            :disabled="disabled"
                            variant="info"
                            >{{ tag }}</b-form-tag
                          >
                        </li>
                      </ul>
                      <b-form-select
                        v-bind="inputAttrs"
                        v-on="inputHandlers"
                        :disabled="disabled || availableMapels.length === 0"
                        :options="availableMapels"
                        @change="changeMapel"
                      >
                        <template #first>
                          <!-- This is required to prevent bugs with Safari -->
                          <option disabled value="">--Pilih Mapel--</option>
                        </template>
                      </b-form-select>
                    </template>
                  </b-form-tags>
                </div>
              </div>
            </div>
            <div class="col-lg-7"></div>
          </div>
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="perguruanTinggi" class="d-md-none d-block"
                >Perguruan Tinggi & Akreditasi:</label
              >
              <div
                class="row"
                v-for="(item, i) in form.program_studi_dan_perguruan_tinggi"
                :key="i"
              >
                <div class="col-md-4 col-12">
                  <div class="form-group reg-siswa">
                    <label for="perguruanTinggi" class="d-md-block d-none"
                      >Perguruan Tinggi <code>*</code></label
                    >
                    <b-form-select
                      class="form-control"
                      id="perguruanTinggi"
                      v-model="item.id_perguruan_tinggi"
                      :options="dataOption['perguruanTinggi']"
                      value-field="id"
                      text-field="textField"
                      required
                    >
                      <template #first>
                        <b-form-select-option :value="null"
                          >-- Pilih --</b-form-select-option
                        >
                      </template>
                    </b-form-select>
                  </div>
                </div>
                <div class="col-md-4 col-5">
                  <div class="form-group reg-siswa">
                    <label
                      for="akreditasi_program_studi"
                      class="d-md-block d-none"
                      >Akreditasi <code>*</code></label
                    >
                    <select
                      type="text"
                      class="form-control"
                      id="akreditasi_program_studi"
                      v-model="item.akreditasi_program_studi"
                      required
                    >
                      <option :value="null">-- Pilih --</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3 col-5">
                  <div class="form-group reg-siswa">
                    <label for="passing_grade" class="d-md-block d-none"
                      >Passing Grade <code>*</code></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="passing_grade"
                      placeholder="Ex: 780.55"
                      v-model="item.passing_grade_prodi"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-1 col-2">
                  <button
                    type="button"
                    class="btn btn-sm btn-danger px-3"
                    v-if="i != 0"
                    @click.prevent="deleteData(item.id_bind, i)"
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
                      id_bind: null,
                      id_perguruan_tinggi: null,
                      akreditasi_program_studi: null,
                      passing_grade_prodi: null
                    });
                  }
                "
              >
                +
              </button>
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
                <VueEditor id="editor2" v-model="form.alasan" />
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
                <VueEditor id="editor3" v-model="form.prospek" />
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
        mapel: [],
        rumpun: []
      },
      dataOption: {
        perguruanTinggi: [],
        penjurusan: [],
        mapel: [],
        rumpun: []
      },
      form: {
        nama_studi: "",
        passing_grade: "",
        id_penjurusan: null,
        // id_mapel: null,
        icon_prodi: null,
        deskripsi: "",
        alasan: "",
        prospek: "",
        mapels: [],
        id_rumpun: null,
        rumpun: "",
        kelompok: "",
        program_studi_dan_perguruan_tinggi: [
          {
            id_perguruan_tinggi: null,
            akreditasi_program_studi: null,
            passing_grade_prodi: null
          }
        ]
      },
      dataDetail: {},
      files: {
        icon_prodi: null
      },
      dataMapels: [],
      mapelSelected: []
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/program-studi");

    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Program Studi",
        href: "/administrator/program-studi"
      },
      {
        text: "Edit",
        active: true
      }
    ]);
    this.getDetail("programStudi", this.$route.params.id);
    this.getData("perguruanTinggi", { params: { paginate: 9999 } });
    this.getData("penjurusan", { params: { paginate: 99 } });
    this.getData("mapel", { params: { paginate: 99 } });
    this.getData("rumpun", { params: { paginate: 999 } });
    console.log(this.form.mapels);
  },
  computed: {
    availableMapels() {
      return this.dataMapels.filter(
        opt => this.mapelSelected.indexOf(opt) === -1
      );
    }
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
    changeMapel(mapel) {
      const search = this.dataMaster.mapel.find(
        item => item.nama_mapel == mapel
      );
      if (search) {
        this.form.mapels.push({
          id_mapel: search.id
        });
      }
    },
    validateForm() {
      console.log(this.form);
      if (
        !this.form.nama_studi ||
        !this.form.id_penjurusan ||
        // !this.form.id_mapel ||
        !this.form.deskripsi ||
        !this.form.alasan ||
        !this.form.prospek ||
        !this.form.id_rumpun ||
        !this.form.program_studi_dan_perguruan_tinggi[0].id_perguruan_tinggi ||
        !this.form.program_studi_dan_perguruan_tinggi[0].passing_grade_prodi ||
        !this.form.program_studi_dan_perguruan_tinggi[0]
          .akreditasi_program_studi ||
        (this.form.mapels && this.form.mapels.length == 0)
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
      const findPenjurusan = this.dataOption["penjurusan"].find(
        item => item.id_penjurusan == this.form.id_penjurusan
      );
      if (findPenjurusan) {
        this.form.kelompok = findPenjurusan == "IPA" ? "SAINTEK" : "SOSHUM";
      }

      const findRumpun = this.dataMaster["rumpun"].find(
        item => item.id == this.form.id_rumpun
      );
      if (findRumpun) {
        console.log(findRumpun)
        this.form.rumpun = findRumpun.nama
        this.form.kelompok = findRumpun.kategori ? findRumpun.kategori.kelompok : null
      }

      this.loading = true;
      this.$axios
        .$put(`/api/${type}/update/multiple/${this.dataDetail.id}`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data program studi berhasil ditambah.", {
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
    getData(type, params) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, params)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataMaster[type] = res.data.data;
            this.dataOption[type] = [];
            if (type == "penjurusan") {
              this.dataMaster[type].forEach((item, index) => {
                if (item.nama_penjurusan != "-" && item.nama_penjurusan) {
                  if (
                    !this.dataOption[type].find(
                      opt => opt.nama_penjurusan == item.nama_penjurusan
                    )
                  ) {
                    this.dataOption[type].push({
                      ...item,
                      textField: item.nama_penjurusan
                    });
                  }
                }
              });
            } else if (type == "mapel") {
              // this.dataOption[type] = this.dataMaster[type].map(item => {
              //   let textField = item.nama_mapel;
              //   return {
              //     ...item,
              //     textField
              //   };
              // });
              this.dataMapels = this.dataMaster[type].map(item => {
                let text = item.nama_mapel;
                return text;
              });
            } else if (type == "perguruanTinggi") {
              this.dataOption[type] = this.dataMaster[type].map(item => {
                let textField = item.nama_perguruan;
                return {
                  ...item,
                  textField
                };
              });
            } else if (type == "rumpun") {
              let dataRumpunOption = [];

              for (let x = 0; x < this.dataMaster.rumpun.length; x++) {
                const item = this.dataMaster.rumpun[x];
                let text = item.nama;
                if (item.kategori) {
                  if (item.kategori.kategori) {
                    text += " - " + item.kategori.kategori;
                  }
                  if (item.kategori.kelompok) {
                    text += " - " + item.kategori.kelompok;
                  }
                  if (item.kategori.jenjang) {
                    text += " - " + item.kategori.jenjang;
                  }
                  if (item.kategori.penjurusan) {
                    text += " - " + item.kategori.penjurusan;
                  }
                }
                dataRumpunOption.push({
                  value: item.id,
                  text: text
                });
              }
              // console.log(dataRumpunOption);
              this.dataOption['rumpun'] = dataRumpunOption;
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
    },
    handleUploadedFile(param) {
      this.files[param] = this.$refs[param].files[0];
      console.log(this.files[param]);
      this.$refs[param].closest(
        ".custom-file"
      ).children[1].textContent = this.files[param].name;

      let reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById(param + "_preview").src = e.target.result;
      };
      reader.readAsDataURL(this.files[param]); // convert to base64 string

      let formData = new FormData();

      formData.append("image", this.files[param]);
      // console.log(formData);

      if (this.files[param] != null) {
        this.loading = true;
        this.$axios
          .$post(`/api/upload/image`, formData)
          .then(res => {
            console.log(res);
            if (res) {
              this.form.icon_prodi = res.data.image_url;
            }
            return;
          })
          .catch(err => {
            console.log(err);
            this.catchError(err);
          })
          .finally(() => (this.loading = false));
      }
    },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            this.form = {
              nama_studi: this.dataDetail.nama_studi,
              passing_grade: this.dataDetail.passing_grade,
              id_penjurusan: this.dataDetail.id_penjurusan,
              // id_mapel: this.dataDetail.id_mapel,
              icon_prodi: this.dataDetail.icon_prodi,
              deskripsi: this.dataDetail.deskripsi,
              alasan: this.dataDetail.alasan,
              prospek: this.dataDetail.prospek,
              id_rumpun: this.dataDetail.id_rumpun,
              rumpun: this.dataDetail.rumpun,
              program_studi_dan_perguruan_tinggi: this.dataDetail.listperguruan.map(
                item => {
                  return {
                    id_bind: item.id,
                    id_perguruan_tinggi: item.id_perguruan_tinggi,
                    akreditasi_program_studi: item.akreditasi_program_studi,
                    passing_grade_prodi: item.passing_grade_prodi
                  };
                }
              ),
              mapels: this.dataDetail.list_mapel.map(item => {
                return {
                  id_mapel: item.id_mapel
                };
              })
            };
            this.mapelSelected = this.dataDetail.list_mapel.map(item => {
              return item.mapel.nama_mapel;
            });
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    deleteData(id_bind, index) {
      this.loading = true;
      this.$axios
        .$delete(`/api/tranStudiPerguruan/delete/${id_bind}`)
        .then(res => {
          console.log(res);
          if (
            res &&
            this.form.program_studi_dan_perguruan_tinggi[index] &&
            this.form.program_studi_dan_perguruan_tinggi[index].id_bind != null
          ) {
            this.form.program_studi_dan_perguruan_tinggi.splice(index, 1);
          }
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
