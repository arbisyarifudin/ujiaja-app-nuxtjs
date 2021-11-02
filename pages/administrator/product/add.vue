<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah Produk/Event</h2>
          <p>
            Ayo, buat produk dari data Tryout yang sudah dibuat.
          </p>
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="nama_produk">Nama Produk/Event <code>*</code></label>
              <b-form-input
                id="nama_produk"
                name="nama_produk"
                v-model="form.nama_produk"
                type="text"
                placeholder="Misal: Paket/Event Tryout UTBK 2022"
              >
              </b-form-input>
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-user">
              <label for="nama_produk">Deskripsi Produk <code>*</code></label>
              <client-only>
                <VueEditor
                  id="deskripsi_produk"
                  v-model="form.deskripsi_produk"
                  :editor-toolbar="customToolbar"
                />
              </client-only>
            </div>
            <div class="small text-danger">
              *Tuliskan deskripsi paket (disarankan maksimal 3 point saja)
            </div>
          </div>
          <div class="row form-user mt-3">
            <div class="col-md-6">
              <div class="form-group reg-siswa">
                <label for="kategori_produk"
                  >Kategori Tryout <code>*</code></label
                >
                <b-form-select
                  id="kategori_produk"
                  class="form-control"
                  v-model="form.kategori_produk"
                  :options="[
                    { text: '-- Pilih --', value: null },
                    { text: 'UTBK', value: 'UTBK' },
                    { text: 'ASPD', value: 'ASPD' },
                  ]"
                >
                    <!-- { text: 'Asesmen Nasional', value: 'Asmenas' } -->
                </b-form-select>
              </div>
              <div class="form-group reg-siswa">
                <label for="tipe_paket">Paket <code>*</code></label>
                <b-form-select
                  id="tipe_paket"
                  class="form-control"
                  v-model="form.tipe_paket"
                  :options="[
                    { text: '-- Pilih --', value: null },
                    { text: 'Reguler', value: 'Reguler' },
                    { text: 'Bundling', value: 'Bundling' }
                  ]"
                >
                </b-form-select>
              </div>
              <div class="form-group reg-siswa">
                <label for="jenis_produk">Event <code>*</code></label>
                <b-form-select
                  id="jenis_produk"
                  class="form-control"
                  v-model="form.jenis_produk"
                  :options="[
                    { text: '-- Pilih --', value: null },
                    { text: 'Perorangan', value: 'Perorangan' },
                    { text: 'Masal', value: 'Masal' }
                  ]"
                  :disabled="form.tipe_paket == 'Bundling'"
                >
                </b-form-select>
              </div>
              <div
                class="form-group reg-siswa"
                v-if="form.jenis_produk == 'Masal'"
              >
                <label for="tanggal_mulai"
                  >Tanggal dan Waktu Mulai <code>*</code></label
                >
                <b-form-input
                  id="tanggal_mulai"
                  class="form-control"
                  v-model="form.tanggal_mulai"
                  type="datetime-local"
                >
                </b-form-input>
              </div>
              <div
                class="form-group reg-siswa"
                v-if="form.jenis_produk == 'Masal'"
              >
                <label for="tanggal_berakhir"
                  >Tanggal dan Waktu Selesai <code>*</code></label
                >
                <b-form-input
                  id="tanggal_berakhir"
                  class="form-control"
                  v-model="form.tanggal_berakhir"
                  type="datetime-local"
                >
                </b-form-input>
              </div>
              <div class="form-group reg-siswa">
                <label for="harga_produk">Biaya (Rp) <code>*</code></label>
                <b-form-input
                  id="harga_produk"
                  v-model="form.harga_produk"
                  type="number"
                  min="1"
                >
                </b-form-input>
              </div>
            </div>
            <div class="col-md-6">
              <b-row>
                <b-col class="col-md-6" v-if="form.jenis_produk == 'Masal'">
                  <div class="form-group reg-siswa">
                    <label for="pakai_perankingan"
                      >Sistem Perankingan <code>*</code></label
                    >
                    <b-form-radio-group
                      id="pakai_perankingan"
                      name="pakai_perankingan"
                      v-model="form.pakai_perankingan"
                      :options="[
                        { text: 'Ya', value: 'Ya' },
                        { text: 'Tidak', value: 'Tidak' }
                      ]"
                    ></b-form-radio-group>
                  </div>
                </b-col>
                <b-col class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="pakai_sertifikat"
                      >Pakai Sertifikat <code>*</code></label
                    >
                    <b-form-radio-group
                      id="pakai_sertifikat"
                      name="pakai_sertifikat"
                      v-model="form.pakai_sertifikat"
                      :options="[
                        { text: 'Ya', value: 'Ya' },
                        { text: 'Tidak', value: 'Tidak' }
                      ]"
                    ></b-form-radio-group>
                  </div>
                </b-col>
                <b-col class="col-md-6">
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
                    <label for="bonus"
                      >Bonus Tes Kepribadian <code>*</code></label
                    >
                    <b-form-radio-group
                      id="bonus"
                      name="bonus"
                      v-model="form.bonus_mbti"
                      :options="[
                        { text: 'Ya', value: 'Ya' },
                        { text: 'Tidak', value: 'Tidak' }
                      ]"
                    ></b-form-radio-group>
                  </div>
                </b-col>
              </b-row>

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
                <div class="small text-danger">
                  Hanya berlaku untuk perhitungan Pilihan Ganda & Pilgan
                  Kompleks
                </div>
              </div>

              <div class="form-group reg-siswa">
                <label for="perhitungan">Soal Tryout <code>*</code></label>
                <v-select
                  v-if="form.tipe_paket == 'Reguler'"
                  :options="dataTryout"
                  label="label"
                  placeholder="Pilih tryout"
                  v-model="form.tryout_reguler"
                  :reduce="item => item.id"
                >
                  <!-- form.tipe_paket == 'Reguler'
                      ? item => form.tryout.length < 1
                      : item => form.tryout && !form.tryout.includes(item.id) -->
                  <!-- eslint-disable-next-line vue/no-unused-vars  -->
                  <template
                    #option="{ judul, kategori, jenis_soal, kelompok_soal, template_soal, penjurusan }"
                  >
                    <h5 class="mb-0">{{ judul }}</h5>
                    <div class="small text-italic">
                      <span>{{
                        kategori == "Asmenas" ? "Asesmen Nasional" : kategori
                      }}</span>
                      <span v-if="jenis_soal">- {{ jenis_soal }}</span>
                      <span v-if="kelompok_soal">- {{ kelompok_soal }}</span>
                      <span
                        v-if="
                          penjurusan &&
                            penjurusan.kelas &&
                            penjurusan.kelas.jenjang
                        "
                        >-
                        {{
                          penjurusan.kelas.jenjang.nama_jenjang +
                            " " +
                            penjurusan.kelas.nama_kelas
                        }}</span
                      >
                      <span v-if="template_soal">- {{ template_soal }}</span>
                    </div>
                  </template>
                  <template
                    #selected-option="{ judul, kategori, jenis_soal, kelompok_soal, template_soal, penjurusan }"
                  >
                    <div style="display: flex; align-items: baseline">
                      <strong class="mb-0 mr-2">{{ judul }} :</strong>
                      <div class="small text-italic">
                        <span>{{
                          kategori == "Asmenas" ? "Asesmen Nasional" : kategori
                        }}</span>
                        <span v-if="jenis_soal">- {{ jenis_soal }}</span>
                        <span v-if="kelompok_soal">- {{ kelompok_soal }}</span>
                        <span
                          v-if="
                            penjurusan &&
                              penjurusan.kelas &&
                              penjurusan.kelas.jenjang
                          "
                          >-
                          {{
                            penjurusan.kelas.jenjang.nama_jenjang +
                              " " +
                              penjurusan.kelas.nama_kelas
                          }}</span
                        >
                        <span v-if="template_soal">- {{ template_soal }}</span>
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
                <v-select
                  v-else
                  :options="dataTryout"
                  label="label"
                  multiple
                  placeholder="Pilih tryout"
                  v-model="form.tryout_bundling"
                  :reduce="item => item.id"
                  :selectable="
                    item =>
                      form.tryout_bundling &&
                      !form.tryout_bundling.includes(item.id)
                  "
                >
                  <!-- form.tipe_paket == 'Reguler'
                      ? item => form.tryout.length < 1
                      : item => form.tryout && !form.tryout.includes(item.id) -->
                  <!-- eslint-disable-next-line vue/no-unused-vars  -->
                  <template
                    #option="{ judul, kategori, jenis_soal, kelompok_soal, template_soal, penjurusan }"
                  >
                    <h5 class="mb-0">{{ judul }}</h5>
                    <div class="small text-italic">
                      <span>{{
                        kategori == "Asmenas" ? "Asesmen Nasional" : kategori
                      }}</span>
                      <span v-if="jenis_soal">- {{ jenis_soal }}</span>
                      <span v-if="kelompok_soal">- {{ kelompok_soal }}</span>
                      <span
                        v-if="
                          penjurusan &&
                            penjurusan.kelas &&
                            penjurusan.kelas.jenjang
                        "
                        >-
                        {{
                          penjurusan.kelas.jenjang.nama_jenjang +
                            " " +
                            penjurusan.kelas.nama_kelas
                        }}</span
                      >
                      <span v-if="template_soal">- {{ template_soal }}</span>
                    </div>
                  </template>
                  <template
                    #selected-option="{ judul, kategori, jenis_soal, kelompok_soal, template_soal, penjurusan }"
                  >
                    <div style="display: flex; align-items: baseline">
                      <strong class="mb-0 mr-2">{{ judul }} :</strong>
                      <div class="small text-italic">
                        <span>{{
                          kategori == "Asmenas" ? "Asesmen Nasional" : kategori
                        }}</span>
                        <span v-if="jenis_soal">- {{ jenis_soal }}</span>
                        <span v-if="kelompok_soal">- {{ kelompok_soal }}</span>
                        <span
                          v-if="
                            penjurusan &&
                              penjurusan.kelas &&
                              penjurusan.kelas.jenjang
                          "
                          >-
                          {{
                            penjurusan.kelas.jenjang.nama_jenjang +
                              " " +
                              penjurusan.kelas.nama_kelas
                          }}</span
                        >
                        <span v-if="template_soal">- {{ template_soal }}</span>
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
        <div class="crud-footer d-flex justify-content-end mt-5" style="z-index: 5">
          <nuxt-link
            to="/administrator/product"
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
        kategori_produk: "UTBK",
        jenis_produk: "Perorangan",
        tipe_paket: "Reguler",
        harga_produk: 25000,
        pakai_sertifikat: "Ya",
        pakai_perankingan: null,
        status_produk: "Aktif",
        tanggal_mulai: null,
        tanggal_berakhir: null,
        perhitungan: { correct: 2, wrong: -1, unfilled: 0 },
        tryout_reguler: "",
        tryout_bundling: [],
        tryout: [],
        bonus_mbti: "Tidak",
        bonus: null
      },
      customToolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
      templateDeskripsiPaket: `
         <p><strong style="color: rgb(71, 65, 91);">Apa yang akan kamu dapatkan?</strong></p><ul><li><span style="color: rgb(148 144 164);">Item 1</span></li><li><span style="color: rgb(148 144 164);">Item 2</span></li><li><span style="color: rgb(148 144 164);">Item 3</span></li></ul>
        `
    };
  },
  mounted() {
    this.getData("tryout");
  },
  computed: {
    filteredTryout() {
      return this.dataTryout.filter(
        item => item.kategori == this.form.kategori
      );
    }
  },
  watch: {
    "form.jenis_produk": function(value) {
      // if (value == "Perorangan") {
      //   this.form.tanggal_mulai = null;
      //   this.form.tanggal_berakhir = null;
      // }
    },
    "form.tipe_paket": function(value) {
      // this.form.tryout = [];
      if (value == "Bundling") {
        this.form.jenis_produk = "Perorangan";
        this.form.deskripsi_produk = this.templateDeskripsiPaket;
      } else {
        this.form.deskripsi_produk = "";
      }
    },
    "form.kategori_produk": function(value) {
      this.form.tryout = [];
      this.form.tryout_reguler = "";
      this.form.tryout_bundling = [];
      this.getData("tryout");
    }
  },
  methods: {
    validateForm() {
      // console.log(this.form);
      if (
        !this.form.nama_produk ||
        !this.form.kategori_produk ||
        !this.form.jenis_produk ||
        !this.form.tipe_paket ||
        !this.form.harga_produk ||
        !this.form.pakai_sertifikat ||
        !this.form.status_produk ||
        !this.form.perhitungan
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }

      if (
        this.form.jenis_produk == "Masal" &&
        (!this.form.pakai_perankingan ||
          !this.form.tanggal_mulai ||
          !this.form.tanggal_berakhir)
      ) {
        this.$bvToast.toast(
          "Untuk event masal diperlukan tanggal mulai dan selesai.",
          {
            title: "Peringatan",
            variant: "warning",
            solid: true,
            autoHideDelay: 2000
          }
        );
        return;
      }

      if (
        this.form.tipe_paket == "Bundling" &&
        this.form.tryout_bundling.length < 2
      ) {
        this.$bvToast.toast("Untuk paket bundling setidaknya pilih 2 produk.", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      } else if (
        this.form.tipe_paket == "Reguler" &&
        !this.form.tryout_reguler
      ) {
        this.$bvToast.toast("Mohon pilih soal tryout terlebih dahulu.", {
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

      if(this.form.bonus_mbti == 'Ya') {
        this.form.bonus = {mbti: true}
      } else {
        this.form.bonus = null
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
            this.$root.$bvToast.toast("Data " + type + " berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/product");
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
