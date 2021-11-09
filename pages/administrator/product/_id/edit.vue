<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Produk /
            Event
          </h2>
          <!-- <p>
            Ayo, buat produk dari data Tryout yang sudah dibuat.
          </p> -->
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
                placeholder="Tulis nama produk"
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
                  disabled
                  :options="[
                    { text: '-- Pilih --', value: null },
                    { text: 'UTBK', value: 'UTBK' },
                    { text: 'ASPD', value: 'ASPD' },
                    { text: 'Asesmen Nasional', value: 'Asmenas' }
                  ]"
                >
                </b-form-select>
              </div>
              <div class="form-group reg-siswa">
                <label for="tipe_paket">Paket <code>*</code></label>
                <b-form-select
                  id="tipe_paket"
                  class="form-control"
                  v-model="form.tipe_paket"
                  disabled
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
                      >Bonus Tes MBTI <code>*</code></label
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
                <b-col class="col-md-6" v-if="form.jenis_produk == 'Masal'">
                  <div class="form-group reg-siswa">
                    <label for="pakai_perankingan"
                      >Maksimal Peserta <code>*</code></label
                    >
                    <b-input-group append="Orang">
                      <b-form-input
                      type="number"
                        id="maksimal_peserta"
                        name="maksimal_peserta"
                        v-model="form.maksimal_peserta"
                        min="2"
                        />
                    </b-input-group>
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
                <label for="perhitungan"
                  >Tambah Soal Tryout <code>[opsional]</code></label
                >
                <v-select
                  v-if="form.tipe_paket == 'Reguler'"
                  :options="dataTryout"
                  label="label"
                  placeholder="Pilih tryout"
                  v-model="form.tryout_reguler"
                  :reduce="item => item.id"
                  :selectable="
                    item => form.tryout && !form.tryout.includes(item.id)
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
                      !form.tryout_bundling.includes(item.id) &&
                      form.tryout &&
                      !form.tryout.includes(item.id)
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
              <!-- {{ form.tryout }} -->
              <!-- - -->
              <!-- {{ form.tryout_reguler }} - -->
              <!-- {{ form.tryout_bundling }} -->
            </div>
            <div class="col-md-12">
              <hr />
              <h3 class="mb-3">Daftar Tryout dari Produk Ini</h3>
              <div
                class="card card-body shadow-none mb-3 flex-row d-flex align-items-center justify-content-between"
                v-for="(item, index) in listTryout"
                :key="index"
              >
                <div class="px-3">
                  <h3 class="mb-2">{{ item.judul }}</h3>
                  <div class="text-italic">
                    <span>{{
                      item.kategori == "Asmenas"
                        ? "Asesmen Nasional"
                        : item.kategori
                    }}</span>
                    <span v-if="item.jenis_soal">- {{ item.jenis_soal }}</span>
                    <span v-if="item.kelompok_soal"
                      >- {{ item.kelompok_soal }}</span
                    >
                    <span
                      v-if="
                        item.penjurusan &&
                          item.penjurusan.kelas &&
                          item.penjurusan.kelas.jenjang
                      "
                      >-
                      {{
                        item.penjurusan.kelas.jenjang.nama_jenjang +
                          " " +
                          item.penjurusan.kelas.nama_kelas
                      }}</span
                    >
                    <span v-if="item.template_soal"
                      >- {{ item.template_soal }}</span
                    >
                  </div>
                </div>
                <button
                  type="button"
                  @click.prevent="
                    selectedId = item.id;
                    $bvModal.show('modal-delete');
                  "
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="crud-footer d-flex justify-content-end mt-4"
          style="z-index: 5"
        >
          <nuxt-link
            :to="`/administrator/product/${$route.params.id}/detail`"
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
    <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus"
      hide-footer
      centered
      modal-class="admin-modal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus tryout dari produk ini? ID:
          {{ selectedId }}
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btnutline-secondary"
            type="button"
            @click="$bvModal.hide('modal-delete')"
          >
            Tidak
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="deleteData('produk/paket')"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Ya
          </button>
        </div>
      </div>
    </b-modal>
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
      dataDetail: {},
      form: {
        nama_produk: null,
        deskripsi_produk: "",
        kategori_produk: "UTBK",
        jenis_produk: "Perorangan",
        tipe_paket: "Bundling",
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
        bonus: null,
        maksimal_peserta: 100
      },
      listTryout: [],
      selectedId: null,
      selectedIndex: null,
      customToolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]]
    };
  },
  async mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/product");
    await this.getData("tryout");
    this.getDetail("produk", this.$route.params.id);
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
        !this.form.status_produk
        // ||
        // !this.form.perhitungan
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
        (this.form.tryout_reguler && this.form.tryout_reguler !== null) ||
        (this.form.tryout_bundling && this.form.tryout_bundling.length > 0)
      ) {
        if (this.form.tipe_paket == "Bundling") {
          this.form.id_tryout = [...this.form.tryout_bundling];
        } else {
          this.form.id_tryout = [this.form.tryout_reguler];
        }
      } else {
        this.form.id_tryout = "";
      }

      if(this.form.bonus_mbti == 'Ya') {
        this.form.bonus = {mbti: true}
      } else {
        this.form.bonus = null
      }

      console.log(this.form);
      // return;
      this.submitData("produk");
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
            this.$router.replace(`/administrator/product/${this.$route.params.id}/detail`);
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
    async getDetail(type, id) {
      this.loading = true;
      await this.$axios
        .$get(`/api/${type}/find/${id}/detail`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data.produk;
            this.listTryout = res.data.tryout;
            this.form = {
              ...this.dataDetail,
              tryout_reguler: "",
              tryout_bundling: [],
              tryout: this.listTryout.map(item => item.id)
            };
            if(this.dataDetail.bonus && this.dataDetail.bonus.mbti == 1) {
              this.form.bonus_mbti = "Ya";
            } else {
              this.form.bonus_mbti = "Tidak";
            }
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    deleteData(type) {
      this.loading = true;
      this.$axios
        .$delete(`/api/${type}/delete/${this.selectedId}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.listTryout.splice(this.selectedIndex, 1);
            this.$root.$bvToast.toast("Data " + type + " berhasil dihapus.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$bvModal.hide("modal-delete");
            // this.$router.replace("/administrator/product");
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
