<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah Produk UKTT</h2>
          <p>
            Ayo, buat produk dari data UKTT yang sudah dibuat.
          </p>
        </div>
        <div class="col-md-12 crud-body mt-4">
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="nama_uktt">Nama Produk <code>*</code></label>
              <b-form-input
                id="nama_uktt"
                name="nama_uktt"
                v-model="form.nama_produk"
                type="text"
                placeholder="Misal: Tes Kompetensi Tentor SUPER"
              >
              </b-form-input>
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-user">
              <label for="deskripsi_uktt">Deskripsi <code>*</code></label>
              <client-only>
                <VueEditor
                  id="deskripsi_uktt"
                  v-model="form.deskripsi_produk"
                  :editor-toolbar="customToolbar"
                />
              </client-only>
            </div>
          </div>
          <div class="row form-user mt-3">
            <div class="col-md-12">
              <b-row>
                <b-col class="col-md-3 col-12">
                  <div class="form-group reg-siswa">
                    <label for="status_produk"
                      >Status Produk <code>*</code></label
                    >
                    <b-form-radio-group
                      id="status_produk"
                      name="status_produk"
                      v-model="form.status_produk"
                      :options="[
                        { text: 'Aktif', value: 'Aktif' },
                        { text: 'Nonaktif', value: 'Tidak' }
                      ]"
                    ></b-form-radio-group>
                  </div>
                </b-col>
                <b-col class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="perhitungan">Perhitungan <code>*</code></label>
                    <b-row>
                      <b-col class="mb-3">
                        <label class="small">Benar</label>
                        <b-form-input
                          v-model="form.perhitungan.correct"
                          placeholder="Nilai Benar"
                        ></b-form-input>
                      </b-col>
                      <b-col class="mb-3">
                        <label class="small">Salah</label>
                        <b-form-input
                          v-model="form.perhitungan.wrong"
                          placeholder="Nilai Salah"
                        ></b-form-input>
                      </b-col>
                      <b-col class="mb-3">
                        <label class="small">Tidak Diisi</label>
                        <b-form-input
                          v-model="form.perhitungan.unfilled"
                          placeholder="Nilai Tidak Diisi"
                        ></b-form-input>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
                <b-col class="col-md-3">
                  <div class="form-user">
                    <div class="form-group reg-siswa">
                      <label for="harga_uktt">Harga Produk <code>*</code></label>
                      <b-form-input
                        id="harga_uktt"
                        name="harga_uktt"
                        v-model="form.harga_produk"
                        type="number"
                      >
                      </b-form-input>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <h4 class="mb-4 mt-4">Persyaratan:</h4>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="id_uktt"
                      >Lulus Ujian UKTT Minimal <code>[opsional]</code></label
                    >
                    <b-form-select
                      id="id_uktt"
                      name="id_uktt"
                      class="form-control"
                      v-model="form.id_uktt"
                      :options="dataMaster.produk"
                      text-field="nama_produk"
                      value-field="id"
                    >
                    </b-form-select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="uktt_level">Level UKTT <code>*</code></label>
                    <b-form-select
                      id="uktt_level"
                      name="uktt_level"
                      class="form-control"
                      v-model="form.uktt_level"
                      :options="levelOptions"
                    >
                    </b-form-select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="nilai_minimal_uktt"
                      >Standar Nilai Minimal <code>*</code></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="nilai_minimal_uktt"
                      name="nilai_minimal_uktt"
                      placeholder="Isi Standar Nilai Minimal"
                      v-model="form.uktt_nilai_minimal"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="id_level"
                      >Level Tentor Minimal <code>*</code></label
                    >
                    <b-form-select
                      id="id_level"
                      name="id_level"
                      class="form-control"
                      v-model="form.uktt_id_level"
                      :options="dataMaster.level"
                    >
                    </b-form-select>
                  </div>
                </div>
              </div>
              <h4 class="mb-4 mt-4">Soal UKTT:</h4>
              <div class="form-group reg-siswa">
                <!-- <label for="perhitungan">Soal Tryout <code>*</code></label> -->
                <v-select
                  :options="dataTryout"
                  label="label"
                  placeholder="Pilih tryout"
                  v-model="form.tryout_reguler"
                  :reduce="item => item.id"
                >
                  <template #option="{ judul, kategori, jenjang }">
                    <h5 class="mb-0">{{ judul }}</h5>
                    <div class="small text-italic">
                      <span>{{ kategori }}</span>
                      <span>- {{ jenjang ? jenjang.nama_jenjang : "-" }}</span>
                    </div>
                  </template>
                  <template #selected-option="{ judul, kategori, jenjang }">
                    <div style="display: flex; align-items: baseline">
                      <strong class="mb-0 mr-2">{{ judul }} :</strong>
                      <div class="small text-italic">
                        <span>{{ kategori }}</span>
                        <span
                          >- {{ jenjang ? jenjang.nama_jenjang : "-" }}</span
                        >
                      </div>
                    </div>
                  </template>
                  <template #no-options="{ search, /* searching, loading */ }">
                    <div class="small py-2" v-if="search">
                      <em class="text-muted">{{ search }}</em> tidak ditemukan
                    </div>
                    <div class="small py-2" v-else>
                      Tidak ada data tryout pada kategori ini
                    </div>
                  </template>
                </v-select>
                <div class="small text-info mt-2" v-if="fetching">
                  Mengambil data...
                </div>
              </div>
              <!-- {{ form.tryout_reguler }} -->
              <!-- {{ form.tryout_bundling }} -->
            </div>
          </div>
        </div>
        <div
          class="crud-footer d-flex justify-content-end mt-5"
          style="z-index: 5"
        >
          <nuxt-link
            to="/administrator/uktt/product"
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  layout: "admin",
  components: { vSelect },
  data() {
    return {
      loading: false,
      fetching: false,
      dataTryout: [],
      form: {
        nama_produk: null,
        deskripsi_produk: "",
        kategori_produk: "UKTT",
        jenis_produk: "",
        tipe_paket: "",
        harga_produk: 10000,
        pakai_sertifikat: null,
        pakai_perankingan: null,
        status_produk: "Aktif",
        tanggal_mulai: null,
        tanggal_berakhir: null,
        perhitungan: { correct: 2, wrong: -1, unfilled: 0 },
        tryout_reguler: "",
        tryout_bundling: [],
        tryout: [],
        bonus_mbti: null,
        bonus: null,
        maksimal_peserta: null,
        // UKTT
        // id_jenjang: 1,
        kategori_produk: "UKTT",
        id_uktt: "",
        uktt_level: "Dasar",
        uktt_nilai_minimal: 70,
        uktt_id_level: 1
      },
      customToolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
      templateDeskripsiPaket: `
         <p><strong style="color: rgb(71, 65, 91);">Apa yang akan kamu dapatkan?</strong></p><ul><li><span style="color: rgb(148 144 164);">Item 1</span></li><li><span style="color: rgb(148 144 164);">Item 2</span></li><li><span style="color: rgb(148 144 164);">Item 3</span></li></ul>
        `,
      dataMaster: {
        produk: [],
        level: [],
        jenjang: []
      },
      levelOptions: [
        { text: "Dasar", value: "Dasar" },
        { text: "Lanjutan 1.0", value: "Lanjutan 1.0" },
        { text: "Lanjutan 2.0", value: "Lanjutan 2.0" },
        { text: "Lanjutan 3.0", value: "Lanjutan 3.0" }
      ]
    };
  },
  mounted() {
    this.getData("tryout");
    this.getMaster("jenjang");
    this.getMaster("produk", { kategori_produk: "UKTT" });
    this.getMaster("level");
  },
  computed: {
    filteredTryout() {
      return this.dataTryout.filter(
        item => item.kategori == this.form.kategori
      );
    }
  },
  watch: {},
  methods: {
    validateForm() {
      // console.log(this.form);
      if (
        !this.form.nama_produk ||
        !this.form.kategori_produk ||
        !this.form.status_produk ||
        !this.form.perhitungan ||
        !this.form.uktt_level ||
        !this.form.uktt_id_level ||
        !this.form.tryout_reguler
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }

      if (this.form.tipe_paket == "Bundling") {
        this.form.id_tryout = [...this.form.tryout_bundling];
      } else {
        this.form.id_tryout = [this.form.tryout_reguler];
      }
      if (this.form.jenis_produk == "Perorangan") {
        this.form.tanggal_mulai = null;
        this.form.tanggal_berakhir = null;
      }

      if (this.form.bonus_mbti == "Ya") {
        this.form.bonus = { mbti: true };
      } else {
        this.form.bonus = null;
      }

      console.log(this.form);
      this.submitData("produk");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/create`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data produk UKTT berhasil dibuat.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/uktt/product");
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
      this.fetching = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: { filter: this.form.kategori_produk }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataTryout = res.data.data;
            this.dataTryout = this.dataTryout.map(item => {
              return {
                ...item,
                label: `${item.judul}`
              };
            });
            // if (this.dataTryout[0]) {
            // }
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.fetching = false));
    },
    getMaster(type, params = {}) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: params.keyword ?? "",
            paginate: params.perPage ?? 99,
            page: params.page ?? 1,
            kategori_produk: params.kategori_produk ?? ""
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            if (type == "produk") {
              this.dataMaster[type] = [
                { id: "", nama_produk: "--- Pilih UKTT --" },
                ...res.data.data
              ];
            } else if (type == "level") {
              const levelWithoutLegend = res.data.filter(
                item => item.nama_level !== "LEGEND"
              );
              this.dataMaster.level = levelWithoutLegend.map(item => {
                return {
                  text: item.nama_level,
                  value: item.id
                };
              });
              if (this.dataMaster.level[0]) {
                this.form.uktt_id_level = this.dataMaster.level[0].value;
              }
            } else {
              this.dataMaster[type] = res.data.data;
            }
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

<style>
.vs__state-disabled-bg {
  background-color: red !important;
}
.vs__dropdown-toggle .vs__selected {
  background: white;
  padding: 5px 20px;
}
</style>
