<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Tambah Produk
            UKTT
          </h2>
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
            <!-- <div class="col-md-12">
              <hr />
              <h3 class="mb-3">Daftar Soal UKTT dari Produk Ini</h3>
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
            </div> -->
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
        kategori_produk: "UKTT",
        jenis_produk: "",
        tipe_paket: "",
        harga_produk: 0,
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
        id_uktt: null,
        uktt_level: "Dasar",
        uktt_nilai_minimal: 5,
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
      ],
      listTryout: [],
      selectedId: null,
      selectedIndex: null
    };
  },
  async mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/product");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "UKTT",
        href: "/administrator/uktt",
      },
      {
        text: "Product",
        href: '/administrator/product'
      },
      {
        text: "Edit",
        active: true
      }
    ]);
    await this.getData("tryout");
    this.getDetail("produk", this.$route.params.id);
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
      console.log(this.form);
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

      this.submitData("produk");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$put(`/api/${type}/update/${this.$route.params.id}`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data produk UKTT berhasil diperbarui.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace(
              `/administrator/uktt/product/${this.$route.params.id}/detail`
            );
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
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

            if (res.data.tryout && res.data.tryout[0]) {
              this.form.tryout_reguler = res.data.tryout[0].id;
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
                { id: null, nama_produk: "--- Pilih UKTT --" },
                ...res.data.data
              ];
            } else if (type == "level") {
              this.dataMaster.level = res.data.map(item => {
                return {
                  text: item.nama_level,
                  value: item.id
                };
              });
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
    },
    deleteData(type) {
      this.loading = true;
      this.$axios
        .$delete(`/api/${type}/delete/${this.selectedId}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.listTryout.splice(this.selectedIndex, 1);
            this.$root.$bvToast.toast("Data produk UKTT berhasil dihapus.", {
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
