<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah Data Tryout</h2>
          <!-- <p>
           Ayo, buat data master soal & jawaban sekarang juga untuk merelasikan data tryout.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="judul_tryout">Judul Tryout <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="judul_tryout"
                name="judul_tryout"
                placeholder="Misal: Soal Tryout UTBK TPS 2022"
                v-model="form.judul"
              />
            </div>
            <div class="form-group reg-siswa">
              <label for="deskripsi_tryout"
                >Deskripsi Tryout <code>*</code></label
              >
              <input
                type="text"
                class="form-control"
                id="deskripsi_tryout"
                name="deskripsi_tryout"
                placeholder="Isi Deskripsi Tryout"
                v-model="form.deskripsi"
              />
            </div>
            <div class="row">
              <div class="col form-group reg-siswa">
                <label for="alokasi_waktu"
                  >Alokasi Waktu Pengerjaan (Menit) <code>*</code></label
                >
                <input
                  type="number"
                  class="form-control"
                  id="alokasi_waktu"
                  name="alokasi_waktu"
                  placeholder="Misal: 60"
                  v-model="form.alokasi_waktu"
                />
              </div>
              <div class="col form-group reg-siswa">
                <label for="jeda_waktu"
                  >Jeda Waktu Perpindahan (Detik) <code>*</code></label
                >
                <input
                  type="number"
                  class="form-control"
                  id="jeda_waktu"
                  name="jeda_waktu"
                  placeholder="Misal: 5"
                  v-model="form.jeda_waktu"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group reg-siswa">
                  <label for="kategori_tryout"
                    >Kategori Tryout <code>*</code></label
                  >
                  <b-form-select
                    id="kategori_tryout"
                    name="kategori_tryout"
                    class="form-control"
                    v-model="form.kategori"
                    :options="[
                      { text: '-- Pilih --', value: null },
                      { text: 'UTBK', value: 'UTBK' },
                      { text: 'ASPD', value: 'ASPD' },
                      { text: 'PAT', value: 'PAT' },
                      { text: 'PAS', value: 'PAS' }
                    ]"
                    @change="
                      () => {
                        form.jenis_soal = null;
                        form.kelompok_soal = null;
                        form.template_soal = null;
                        form.id_penjurusan = null;
                        if (form.kategori != 'Asmenas') {
                          form.template_soal = 'Pilihan Ganda';
                        }
                      }
                    "
                  >
                    <!-- { text: 'Asesmen Nasional', value: 'Asmenas' } -->
                  </b-form-select>
                </div>
              </div>
              <div
                class="col-md-6"
                v-if="form.kategori == null || form.kategori == 'UTBK'"
              >
                <div class="form-group reg-siswa">
                  <label for="jenis_soal">Jenis Soal <code>*</code></label>
                  <b-form-select
                    id="jenis_soal"
                    name="jenis_soal"
                    class="form-control"
                    v-model="form.jenis_soal"
                    :options="[
                      { text: '-- Pilih --', value: null },
                      { text: 'TKA', value: 'TKA' },
                      { text: 'TPS', value: 'TPS' }
                    ]"
                  >
                    <!-- { text: 'Campuran', value: 'Campuran' } -->
                  </b-form-select>
                </div>
              </div>
              <div class="col-md-6" v-else-if="form.kategori == 'ASPD'">
                <div class="form-group reg-siswa">
                  <label for="jenjang">Jenjang <code>*</code></label>
                  <b-form-select
                    id="jenjang"
                    name="jenjang"
                    class="form-control"
                    v-model="form.id_penjurusan"
                    :options="dataMaster.jenjang"
                  >
                  </b-form-select>
                </div>
              </div>
              <!-- <div class="col-md-6" v-else-if="form.kategori == 'Asmenas'">
                <div class="form-group reg-siswa">
                  <label for="kelas">Kelas <code>*</code></label>
                  <b-form-select
                    id="kelas"
                    name="kelas"
                    class="form-control"
                    v-model="form.id_penjurusan"
                    :options="dataMaster.kelas"
                  >
                  </b-form-select>
                </div>
              </div> -->
              <div
                class="col-md-6"
                v-else-if="form.kategori == 'PAT' || form.kategori == 'PAS'"
              >
                <div class="form-group reg-siswa">
                  <label for="kelas">Jenjang <code>*</code></label>
                  <b-form-select
                    id="kelas"
                    name="kelas"
                    class="form-control"
                    v-model="form.id_penjurusan"
                    :options="dataMaster.kelas"
                  >
                  </b-form-select>
                </div>
              </div>
              <div class="col-md-6" v-if="form.jenis_soal == 'TKA'">
                <div class="form-group reg-siswa">
                  <label for="kelompok_soal"
                    >Kelompok Soal <code>*</code></label
                  >
                  <b-form-select
                    id="kelompok_soal"
                    name="kelompok_soal"
                    class="form-control"
                    v-model="form.kelompok_soal"
                    :options="[
                      { text: '-- Pilih --', value: null },
                      { text: 'SAINTEK', value: 'SAINTEK' },
                      { text: 'SOSHUM', value: 'SOSHUM' }
                    ]"
                  >
                  </b-form-select>
                </div>
              </div>
              <div class="col-md-6" v-if="form.kategori != 'Asmenas'">
                <div class="form-group reg-siswa">
                  <label for="template_soal"
                    >Template Soal <code>*</code></label
                  >
                  <b-form-select
                    id="template_soal"
                    name="template_soal"
                    class="form-control"
                    v-model="form.template_soal"
                    :disabled="form.kategori != 'Asmenas'"
                    :options="[
                      { text: '-- Pilih --', value: null },
                      { text: 'Pilihan Ganda', value: 'Pilihan Ganda' },
                      { text: 'Essay', value: 'Essay' },
                      {
                        text: 'Pilihan Ganda Kompleks',
                        value: 'Pilihan Ganda Kompleks'
                      },
                      { text: 'Isian Singkat', value: 'Isian Singkat' },
                      { text: 'Menjodohkan', value: 'Menjodohkan' }
                    ]"
                  >
                  </b-form-select>
                </div>
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
        penjurusan: [],
        jenjang: [],
        kelas: [],
        mapel: []
      },
      form: {
        judul: "",
        deskripsi: "",
        kategori: null,
        jenis_soal: null,
        kelompok_soal: null,
        template_soal: null,
        id_penjurusan: null,
        panduan_pengerjaan: null,
        alokasi_waktu: 0,
        jeda_waktu: 0
      }
    };
  },
  mounted() {
    this.getData("mapel");
    this.getData("penjurusan");
  },
  methods: {
    validateForm() {
      // console.log(this.form);
      if (!this.form.judul || !this.form.deskripsi || !this.form.kategori) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }

      if (this.form.kategori != "Asmenas" && !this.form.template_soal) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }

      if (this.form.kategori == "UTBK") {
        if (
          (this.form.jenis_soal == "TKA" && !this.form.kelompok_soal) ||
          !this.form.jenis_soal
        ) {
          this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
            title: "Peringatan",
            variant: "warning",
            solid: true,
            autoHideDelay: 2000
          });
          return;
        }
      } else if (
        this.form.kategori == "ASPD" ||
        this.form.kategori == "Asmenas"
      ) {
        if (!this.form.id_penjurusan) {
          this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
            title: "Peringatan",
            variant: "warning",
            solid: true,
            autoHideDelay: 2000
          });
          return;
        }
      }

      if (
        !this.form.alokasi_waktu ||
        !this.form.jeda_waktu ||
        this.form.alokasi_waktu < 1 ||
        this.form.jeda_waktu < 1
      ) {
        this.$bvToast.toast("Alokasi dan jeda waktu diperlukan!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }

      this.submitData("tryout");
    },
    submitData(type) {
      console.log(this.form);
      this.loading = true;
      let tryoutCreated;
      this.$axios
        .$post(`/api/${type}/create`, this.form)
        .then(res => {
          console.log("tryout berhasil ditambah!!!", res);
          if (res.success) {
            return {
              success: true,
              data: res.data,
              next: "tryout/soal"
            };
          }
          return false;
        })
        .then(res => {
          if (res.success) {
            console.log("res.data", res.data);
            tryoutCreated = res.data
            let dataSoal;
            if (this.form.kategori === "UTBK") {
              // if (this.form.kategori === "UTBK" && this.form.jenis_soal === "TKA") {
              if (this.form.jenis_soal === "Campuran") {
                dataSoal = [
                  {
                    id_tryout: res.data.id,
                    jenis_soal: "TPS",
                    kelompok_soal: null,
                    id_mapel: null
                  },
                  {
                    id_tryout: res.data.id,
                    jenis_soal: "TKA",
                    kelompok_soal: "SAINTEK",
                    id_mapel: null
                  },
                  {
                    id_tryout: res.data.id,
                    jenis_soal: "TKA",
                    kelompok_soal: "SOSHUM",
                    id_mapel: null
                  }
                ];
              } else {
                dataSoal = [
                  {
                    id_tryout: res.data.id,
                    jenis_soal: res.data.jenis_soal,
                    kelompok_soal: res.data.kelompok_soal,
                    id_mapel: null
                  }
                ];
              }
            } else if (this.form.kategori === "ASPD") {
              const mapel_bindo = this.dataMaster.mapel.find(item =>
                item.nama_mapel.includes("Indonesia")
              );
              const mapel_bingg = this.dataMaster.mapel.find(item =>
                item.nama_mapel.includes("Inggris")
              );
              const mapel_matematika = this.dataMaster.mapel.find(item =>
                item.nama_mapel.includes("Matematika")
              );
              const mapel_ipa = this.dataMaster.mapel.find(item =>
                item.nama_mapel.includes("IPA")
              );

              dataSoal = [
                {
                  id_tryout: res.data.id,
                  jenis_soal: res.data.jenis_soal,
                  kelompok_soal: null,
                  id_mapel:
                    mapel_bindo && mapel_bindo.id
                      ? mapel_bindo.id
                      : "Bahasa Indonesia"
                },
                {
                  id_tryout: res.data.id,
                  jenis_soal: res.data.jenis_soal,
                  kelompok_soal: null,
                  id_mapel:
                    mapel_bingg && mapel_bingg.id
                      ? mapel_bingg.id
                      : "Bahasa Inggris"
                },
                {
                  id_tryout: res.data.id,
                  jenis_soal: res.data.jenis_soal,
                  kelompok_soal: null,
                  id_mapel:
                    mapel_matematika && mapel_matematika.id
                      ? mapel_matematika.id
                      : "Matematika"
                },
                {
                  id_tryout: res.data.id,
                  jenis_soal: res.data.jenis_soal,
                  kelompok_soal: null,
                  id_mapel: mapel_ipa && mapel_ipa.id ? mapel_ipa.id : "IPA"
                }
              ];
            } else if (this.form.kategori === "Asmenas") {
              dataSoal = [
                {
                  id_tryout: res.data.id,
                  jenis_soal: res.data.jenis_soal,
                  kelompok_soal: res.data.kelompok_soal,
                  id_mapel: null
                }
              ];
            }

            // console.log("dataSoal", dataSoal);
            // return;

            this.$axios
              .$post(`/api/${res.next}/create/multiple`, dataSoal)
              .then(res => {
                console.log(res);
                if (res.success) {
                  this.$root.$bvToast.toast(
                    "Data " + type + " berhasil ditambah.",
                    {
                      title: "Sukses",
                      variant: "success",
                      solid: true,
                      autoHideDelay: 3000
                    }
                  );
                  if (dataSoal && dataSoal[0]) {
                    this.$router.replace(
                      `/administrator/tryout/${dataSoal[0].id_tryout}/soal/create`
                    );
                  } else {
                    this.$router.replace(
                      `/administrator/tryout/${tryoutCreated.id}/soal/create`
                    );
                  }
                }
              })
              .catch(err => {
                console.log(err);
                this.catchError(err);
              })
              .finally(() => (this.loading = false));
          }
          return false;
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
          console.log(res);
          if (res.success) {
            if (type == "mapel") {
              this.dataMaster.mapel = res.data.data;
              return;
            }
            let jenjangs = [{ text: "-- Pilih --", value: null }];
            let kelass = [{ text: "-- Pilih --", value: null }];
            res.data.data.forEach(item => {
              if (item.kelas && item.kelas.jenjang) {
                let k = item.kelas.nama_kelas;
                let j = item.kelas.jenjang.nama_jenjang;
                if (!jenjangs[j]) {
                  jenjangs[j] = {
                    value: item.id,
                    text: j
                  };
                }
                let pj =
                  item.nama_penjurusan && item.nama_penjurusan != "-"
                    ? " - " + item.nama_penjurusan
                    : "";
                kelass.push({
                  value: item.id,
                  text: k + " - " + j + pj
                });
                let textField = k + " - " + j;
                textField = item.nama_penjurusan ? item.nama_penjurusan : "";
                this.dataMaster.penjurusan.push({
                  value: item.id,
                  text: textField
                });
              }
            });
            this.dataMaster.kelas = kelass;
            for (const key in jenjangs) {
              if (Object.hasOwnProperty.call(jenjangs, key)) {
                const element = jenjangs[key];
                this.dataMaster.jenjang.push(element);
              }
            }
            // console.log(this.dataMaster.jenjang);
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
