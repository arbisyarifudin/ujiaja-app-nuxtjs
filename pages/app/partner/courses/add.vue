<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div
          class="col-md-12 dashboard d-flex justify-content-between align-items-center"
        >
          <h2 class="dash-label">Tambah Kelas</h2>
          <BackUrl />
        </div>
        <p>
          Yuk, buat kelas les privat-mu sendiri!
        </p>
        <div class="col-md-12 crud-body">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-user mt-3">
                <div class="form-group reg-siswa">
                  <label for="nama_kursus">Nama Kelas <code>*</code></label>
                  <input
                    type="text"
                    class="form-control"
                    id="nama_kursus"
                    placeholder="Tulis Nama Kelas"
                    v-model="form.nama_kursus"
                  />
                </div>
                <div class="form-group reg-siswa">
                  <label for="mapel">Mata Pelajaran <code>*</code></label>
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
                        >-- Pilih Mapel --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </div>
                <div class="form-group reg-siswa">
                  <label for="jenjang">Jenjang Sekolah <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    id="jenjang"
                    v-model="form.id_jenjang"
                    :options="dataOption['jenjang']"
                    value-field="id"
                    text-field="textField"
                  >
                    <template #first>
                      <b-form-select-option :value="null"
                        >-- Pilih Jenjang --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </div>
                <div class="form-group reg-siswa">
                  <label for="penjurusan"
                    >Penjurusan Sekolah <code>[opsional]</code></label
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
                  <label for="harga_kursus">Harga Kelas</label>
                  <b-form-select
                    class="form-control"
                    id="harga_kursus"
                    v-model="form.harga_kursus"
                    :options="dataOption['harga_kursus']"
                  >
                    <template #first>
                      <b-form-select-option :value="null"
                        >-- Pilih Harga --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-user mt-3">
                <!-- <div class="form-group reg-siswa">
                  <label for="file_kursus"
                    >File Kelas <code>[opsional]</code></label
                  >
                  <div class="custom-file mb-3">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="file_kursus"
                      ref="file_kursus"
                      @change="handleUploadedFile('file_kursus')"
                    />
                    <label class="custom-file-label" for="file_kursus"
                      >Pilih file atau drag kesini</label
                    >
                    <div class="small text-info mt-1">
                      <small
                        >File yang diizinkan .pdf, .doc, .docx, .zip, .xls,
                        .xlsx, .ppt</small
                      >
                    </div>
                  </div>
                </div> -->
                <div class="form-group reg-siswa">
                  <label for="file_kursus"
                    >Link Youtube Video <code>*</code></label
                  >
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control mr-3"
                      placeholder="www.youtube.com/watch?v=G7QRSjeIIH8"
                      name="youtube_video_url"
                      id="youtube_video_url"
                      v-model="youtubeVideoUrl"
                      :disabled="appliedVideo"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-primary btn-sm square"
                        type="button"
                        :disabled="!youtubeVideoUrl"
                        @click.prevent="applyVideo"
                      >
                        {{ appliedVideo ? "Ganti" : "Pasang" }}
                      </button>
                    </div>
                  </div>
                  <div class="media-box media-box--youtube">
                    <div class="media-box__icon" v-if="!appliedVideo">
                      <i class="fab fa-youtube"></i>
                    </div>
                    <iframe
                      v-else
                      :src="
                        `https://www.youtube.com/embed/${youtubeVideoId}?controls=0`
                      "
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-user mt-3 row">
            <div class="form-group reg-siswa col-lg-12">
              <label for="deskripsi_kursus"
                >Deskripsi Kelas <code>*</code></label
              >
              <client-only>
                <VueEditor id="editor1" v-model="form.deskripsi_kursus" />
              </client-only>
            </div>
            <div class="form-group reg-siswa col-lg-12">
              <label for="perguruanTinggi" class="d-md-none d-block"
                >Jadwal Kelas:</label
              >
              <div class="row" v-for="(item, i) in form.jadwals" :key="i">
                <div class="col-md-2 col-2">
                  <label for="jadwal_hari" class="d-md-block d-none"
                    >Buka/Tutup</label
                  >
                  <b-form-radio-group
                    class="btn-radio-toggle"
                    :id="'btn-radio-' + i"
                    v-model="item.is_tutup"
                    :options="[
                      { text: 'Buka', value: 0 },
                      { text: 'Tutup', value: 1 }
                    ]"
                    button-variant="outline-primary"
                    size="sm"
                    :name="'is_tutup-' + i"
                    buttons
                  ></b-form-radio-group>
                </div>
                <div class="col-md-3 col-12">
                  <div class="form-group reg-siswa">
                    <label for="jadwal_hari" class="d-md-block d-none"
                      >Hari</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="hari"
                      :readonly="true"
                      v-model="item.hari_jadwal"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-3 col-5">
                  <div class="form-group reg-siswa">
                    <label for="jadwal_jam_mulai" class="d-md-block d-none"
                      >Jam Mulai <code>*</code></label
                    >
                    <input
                      type="time"
                      class="form-control"
                      id="jadwal_jam_mulai"
                      :disabled="item.is_tutup == 1"
                      v-model="item.jam_mulai_jadwal"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-3 col-5">
                  <div class="form-group reg-siswa">
                    <label for="jadwal_jam_akhir" class="d-md-block d-none"
                      >Jam Akhir <code>*</code></label
                    >
                    <input
                      type="time"
                      class="form-control"
                      id="jadwal_jam_akhir"
                      :disabled="item.is_tutup == 1"
                      v-model="item.jam_akhir_jadwal"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/app/partner/courses"
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
  layout: "app",
  data() {
    return {
      loading: false,
      appliedVideo: false,
      youtubeVideoUrl: "",
      youtubeVideoId: "",
      dataMaster: {
        mapel: [],
        jenjang: [],
        penjurusan: []
      },
      dataOption: {
        mapel: [],
        jenjang: [],
        penjurusan: [],
        hari: ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"],
        harga_kursus: [
          {
            text: "Rp 50.000 / 90 mnt",
            value: 50000
          }
        ]
      },
      form: {
        nama_kursus: "",
        harga_kursus: 50000,
        deskripsi_kursus: "",
        id_penjurusan: null,
        id_jenjang: null,
        id_mapel: null,
        file_kursus: "",
        video_kursus: "",
        sampul_kelas: "",
        jadwals: [
          {
            hari_jadwal: "Senin",
            jam_mulai_jadwal: "09:00",
            jam_akhir_jadwal: "15:00",
            is_tutup: 0
          },
          {
            hari_jadwal: "Selasa",
            jam_mulai_jadwal: "09:00",
            jam_akhir_jadwal: "15:00",
            is_tutup: 0
          },
          {
            hari_jadwal: "Rabu",
            jam_mulai_jadwal: "09:00",
            jam_akhir_jadwal: "15:00",
            is_tutup: 0
          },
          {
            hari_jadwal: "Kamis",
            jam_mulai_jadwal: "09:00",
            jam_akhir_jadwal: "15:00",
            is_tutup: 0
          },
          {
            hari_jadwal: "Jum'at",
            jam_mulai_jadwal: "09:00",
            jam_akhir_jadwal: "15:00",
            is_tutup: 0
          },
          {
            hari_jadwal: "Sabtu",
            jam_mulai_jadwal: "09:00",
            jam_akhir_jadwal: "15:00",
            is_tutup: 0
          },
          {
            hari_jadwal: "Minggu",
            jam_mulai_jadwal: null,
            jam_akhir_jadwal: null,
            is_tutup: 1
          }
        ]
      },
      files: {
        file_kursus: null
      }
    };
  },
  mounted() {
    this.getData("penjurusan", { params: { paginate: 99 } });
    this.getData("mapel");
    this.getData("jenjang");
    this.getPriceOption();
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (
        !this.form.nama_kursus ||
        !this.form.harga_kursus ||
        !this.form.deskripsi_kursus ||
        !this.form.video_kursus ||
        !this.form.id_mapel ||
        !this.form.id_jenjang
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData();
    },
    submitData(type) {
      this.loading = true;
      const dataCreate = {
        ...this.form,
        id_tentor: this.$store.state.dataUser.user.id
      };
      this.$axios
        .$post(`/api/kursus/create`, dataCreate)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data kelas berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/app/partner/courses");
          }
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
              this.dataOption[type] = this.dataMaster[type].map(item => {
                let textField = item.nama_mapel;
                return {
                  ...item,
                  textField
                };
              });
            } else if (type == "jenjang") {
              this.dataOption[type] = this.dataMaster[type].map(item => {
                let textField = item.nama_jenjang;
                return {
                  ...item,
                  textField
                };
              });
            } else {
              this.dataOption[type] = res.data.data;
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
    getPriceOption() {
      this.loading = true;
      this.$axios
        .$get('/api/kursus/price-option')
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataOption['harga_kursus'] = res.data;
          }
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

      let formData = new FormData();

      formData.append("file", this.files[param]);

      if (this.files[param] != null) {
        this.loading = true;
        this.$axios
          .$post(`/api/upload/file`, formData)
          .then(res => {
            console.log(res);
            if (res) {
              this.form[param] = res.data.file_url;
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
    applyVideo() {
      if (this.youtubeVideoUrl && !this.appliedVideo) {
        this.form.video_kursus = this.youtubeVideoUrl;
        this.youtubeVideoId = this.generateYoutubeVideoId(this.youtubeVideoUrl);
        this.appliedVideo = true;
      } else {
        this.form.video_kursus = "";
        this.appliedVideo = false;
      }
    },
    generateYoutubeVideoId(url) {
      if (!url) return;
      const youtubeUrlSplit = url.split("?v=");
      if (youtubeUrlSplit[1]) {
        return youtubeUrlSplit[1];
      }
      return;
    }
  }
};
</script>
