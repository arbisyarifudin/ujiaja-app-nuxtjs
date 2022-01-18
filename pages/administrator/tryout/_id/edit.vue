<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Data
            Tryout
          </h2>
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
              <div class="col form-group reg-siswa">
                <label for="alokasi_waktu"
                  >Alokasi Waktu Per Mata Pelajaran (Menit)
                  <code>*</code></label
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
                  >Jeda Waktu Antar Mata Pelajaran (Menit) <code>*</code></label
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
                  <label for="select">Kategori Tryout <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    v-model="form.kategori"
                    :options="[
                      { text: '-- Pilih --', value: null },
                      { text: 'UTBK', value: 'UTBK' },
                      { text: 'ASPD', value: 'ASPD' }
                    ]"
                    @change="
                      () => {
                        form.jenis_soal = null;
                        form.kelompok_soal = null;
                        form.template_soal = null;
                        form.id_penjurusan = null;
                      }
                    "
                    :disabled="true"
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
                  <label for="select">Jenis Soal <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    v-model="form.jenis_soal"
                    :options="[
                      { text: '-- Pilih --', value: null },
                      { text: 'TKA', value: 'TKA' },
                      { text: 'TPS', value: 'TPS' }
                    ]"
                    :disabled="true"
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
                    :disabled="true"
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
                    :disabled="true"
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
                      { text: 'SOSHUM', value: 'SOSHUM' }
                    ]"
                    :disabled="true"
                  >
                    <!-- { text: 'Campuran', value: 'Campuran' } -->
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
                    :disabled="true"
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
        kelas: []
      },
      form: {
        judul: "",
        deskripsi: "",
        kategori: null,
        jenis_soal: null,
        kelompok_soal: null,
        template_soal: null,
        id_penjurusan: null,
        panduan_pengerjaan: "-",
        alokasi_waktu: 0,
        jeda_waktu: 0
      },
      dataDetail: {}
    };
  },
  mounted() {
    this.getData("penjurusan");
    if (!this.$route.params.id)
      return this.$router.push("/administrator/tryout");
    
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Tryout",
        href: "/administrator/tryout",
      },
      {
        text: "Edit",
        active: true
      }
    ]);
    this.getDetail("tryout", this.$route.params.id);
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
        .$put(`/api/${type}/update/${this.$route.params.id}`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast(
              "Data " + type + " berhasil diperbarui.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.$router.replace("/administrator/tryout");
          }
          false;
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
    },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            this.form = this.dataDetail;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status == 404) {
            return this.$router.push("/administrator/tryout");
          }
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
