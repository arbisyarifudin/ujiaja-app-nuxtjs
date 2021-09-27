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
              <label for="text">Judul Tryout <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Isi Judul Tryout"
                v-model="form.judul"
              />
            </div>
            <div class="form-group reg-siswa">
              <label for="text">Deskripsi Tryout <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Isi Deskripsi Tryout"
                v-model="form.deskripsi"
              />
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group reg-siswa">
                  <label for="select">Kategori Tryout <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    v-model="form.kategori"
                    :options="[
                      { text: '-- Pilih --', value: null },
                      { text: 'UTBK', value: 'UTBK' },
                      { text: 'ASPD', value: 'ASPD' },
                      { text: 'Asesmen Nasional', value: 'Asmenas' }
                    ]"
                    @change="
                      () => {
                        form.jenis_soal = null;
                        form.kelompok_soal = null;
                        form.template_soal = null;
                        form.id_penjurusan = null;
                      }
                    "
                  >
                  </b-form-select>
                </div>
              </div>
              <div
                class="col-md-6"
                v-if="form.kategori == null || form.kategori == 'UTBK'"
              >
                <div class="form-group reg-siswa">
                  <label for="select">Jenis Soal <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    v-model="form.jenis_soal"
                    :options="[
                      { text: '-- Pilih --', value: null },
                      { text: 'TKA', value: 'TKA' },
                      { text: 'TPS', value: 'TPS' }
                    ]"
                  >
                  </b-form-select>
                </div>
              </div>
              <div class="col-md-6" v-else-if="form.kategori == 'ASPD'">
                <div class="form-group reg-siswa">
                  <label for="select">Jenjang <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    v-model="form.id_penjurusan"
                    :options="dataMaster.jenjang"
                  >
                  </b-form-select>
                </div>
              </div>
              <div class="col-md-6" v-else-if="form.kategori == 'Asmenas'">
                <div class="form-group reg-siswa">
                  <label for="select">Kelas <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    v-model="form.id_penjurusan"
                    :options="dataMaster.kelas"
                  >
                  </b-form-select>
                </div>
              </div>
              <div class="col-md-6" v-if="form.jenis_soal == 'TKA'">
                <div class="form-group reg-siswa">
                  <label for="select">Kelompok Soal <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    v-model="form.kelompok_soal"
                    :options="[
                      { text: '-- Pilih --', value: null },
                      { text: 'SAINTEK', value: 'SAINTEK' },
                      { text: 'SOSHUM', value: 'SOSHUM' },
                      { text: 'Campuran', value: 'Campuran' }
                    ]"
                  >
                  </b-form-select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group reg-siswa">
                  <label for="select">Template Soal <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    v-model="form.template_soal"
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
        panduan_pengerjaan: "-"
      }
    };
  },
  mounted() {
    this.getData("mapel");
    this.getData("penjurusan");
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (
        !this.form.judul ||
        !this.form.deskripsi ||
        !this.form.kategori ||
        !this.form.template_soal
      ) {
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
      this.submitData("tryout");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/create`, this.form)
        .then(res => {
          console.log(res);
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
            let dataSoal = [];
            if ((res.data.kategori = "UTKB" && res.data.jenis_soal == "TKA")) {
              if (res.data.kelompok_soal == "Campuran") {
                dataSoal = [
                  {
                    id_tryout: res.data.id,
                    jenis_soal: res.data.jenis_soal,
                    kelompok_soal: "SAINTEK",
                    id_mapel: null
                  },
                  {
                    id_tryout: res.data.id,
                    jenis_soal: res.data.jenis_soal,
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
            } else if ((res.data.kategori = "ASPD")) {
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
            } else {
              dataSoal.push({
                id_tryout: res.data.id,
                jenis_soal: res.data.jenis_soal,
                kelompok_soal: res.data.kelompok_soal,
                id_mapel: null
              });
            }
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
                  this.$router.replace("/administrator/tryout");
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
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`)
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
                kelass.push({
                  value: item.id,
                  text: k + " - " + j
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
            // console.log(this.dataMaster.kelas);
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
