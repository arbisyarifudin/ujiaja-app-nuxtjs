<template>
  <div>
    <div class="p-0 text-left">
      <h2 class="pb-0">Edit Profil</h2>
      <h5 class="mt-4">Lengkapi profilmu sekarang juga!</h5>
      <form action="" class="form-user" @submit.prevent="onSubmit">
        <div class="mt-4 mb-5">
          <b-tabs pills nav-wrapper-class="mb-4">
            <b-tab title="Identitas Diri" active>
              <b-row>
                <b-col>
                  <div class="form-group reg-siswa">
                    <label for="nama_lengkap">Nama Lengkap</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="nama_lengkap"
                      placeholder="Nama Lengkap"
                      v-model="formSiswa.nama_lengkap"
                    />
                  </div>
                  <div class="form-group reg-siswa">
                    <label for="tempat_lahir">Tempat Lahir</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="tempat_lahir"
                      placeholder="Tempat Lahir"
                      v-model="formSiswa.tempat_lahir"
                    />
                  </div>
                  <div class="form-group reg-siswa">
                    <label for="nomor_handphone">No. Telp/WA</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="nomor_handphone"
                      placeholder="No. Telp/WA"
                      v-model="formSiswa.nomor_telephone"
                    />
                  </div>
                  <div class="form-group reg-siswa">
                    <label for="penjurusan">Saya Belajar di Kelas</label>
                    <b-form-select
                      class="form-control"
                      id="penjurusan"
                      v-model="formSiswa.id_penjurusan"
                      :options="dataOption['penjurusan']"
                      value-field="id"
                      text-field="textField"
                    >
                    </b-form-select>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group reg-siswa">
                    <label for="jenis_kelamin">Jenis Kelamin</label>
                    <select
                      class="form-control"
                      id="jenis_kelamin"
                      v-model="formSiswa.jenis_kelamin"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div class="form-group reg-siswa">
                    <label for="tanggal_lahir">Tanggal Lahir</label>
                    <input
                      type="date"
                      class="form-control pl-0 pr-0"
                      id="tanggal_lahir"
                      placeholder="DD-MM-YYYY"
                      v-model="formSiswa.tgl_lahir"
                    />
                  </div>
                  <!-- <div class="form-group reg-siswa">
                    <label for="seorang">Saya Seorang</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="seorang"
                      placeholder="Saya Seorang..."
                    />
                  </div> -->
                  <div class="row">
                    <div class="form-group col-md-3">
                      <img
                        src="/chance.png"
                        alt="foto"
                        class="img-fluid"
                        style="width: 100%; object-fit: contain"
                      />
                    </div>
                    <div class="col-md-8 form-group reg-siswa">
                      <label>Unggah Foto</label>
                      <input type="file" class="form-control" />
                    </div>
                  </div>
                  <!-- <div class="container unggah">
                    <div class="row">
                      <div class="form-group">
                        <label class="control-label">Foto</label>
                        <div>
                          <button
                            type="submit"
                            class="btn btn-outline-primary pull-right"
                            style="border-radius: 10px"
                          >
                            Unggah
                          </button>
                        </div>
                        <div class="d-flex">
                          <input
                            type="text"
                            class="form-control pl-0"
                            id="text"
                            placeholder="Nama File"
                          />
                        </div>
                        <div class="preview-zone hidden">
                          <div class="box box-solid">
                            <div class="box-body mt-4"></div>
                          </div>
                        </div>
                        <div class="dropzone-wrapper">
                          <div class="dropzone-desc">
                            <img src="/icon/unggah.png" alt="" />
                            <p class="mt-2 p-0" style="font-size: 22px">
                              Seret dan lepas file
                            </p>
                            <p class="p-0 mb-1">
                              atau <a href="">telusuri</a> untuk memilih file
                            </p>
                            <p style="color: red">
                              Disarankan dengan foto 469 x 625 pixel
                            </p>
                          </div>
                          <input type="file" name="img_logo" class="dropzone" />
                        </div>
                      </div>
                    </div>
                  </div> -->
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="Alamat">
              <b-row>
                <b-col>
                  <div class="form-group reg-siswa">
                    <label for="alamat">Alamat</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="alamat"
                      placeholder="Klik Untuk Isi Alamat"
                      v-model="formSiswa.alamat"
                    />
                  </div>
                  <div class="form-group reg-siswa">
                    <label for="provinsi">Provinsi</label>
                    <b-form-select
                      class="form-control"
                      id="provinsi"
                      v-model="formSiswa.id_provinsi"
                      :options="dataOption['provinsi']"
                      value-field="id"
                      text-field="nama"
                      @change="
                        () => {
                          getAPI('kota_kabupaten');
                          dataOption['kecamatan'] = [];
                        }
                      "
                    >
                    </b-form-select>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group reg-siswa">
                    <label for="kota">Kota</label>
                    <b-form-select
                      class="form-control"
                      id="kota"
                      v-model="formSiswa.id_kota"
                      :options="dataOption['kota_kabupaten']"
                      value-field="id"
                      text-field="nama"
                      @change="
                        () => {
                          getAPI('kecamatan');
                        }
                      "
                    >
                    </b-form-select>
                  </div>
                  <div class="form-group reg-siswa">
                    <label for="kecamatan">Kecamatan</label>
                    <b-form-select
                      class="form-control"
                      id="kecamatan"
                      v-model="formSiswa.id_kecamatan"
                      :options="dataOption['kecamatan']"
                      value-field="id"
                      text-field="nama"
                    >
                    </b-form-select>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="Akun">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="Username">Username</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="Username"
                      placeholder="Username"
                      autocomplete="false"
                      v-model="formSiswa.username"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="email"
                      placeholder="email"
                      autocomplete="false"
                      v-model="formSiswa.email"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="password">Password</label>
                    <div class="input-group">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control pl-0"
                        id="password"
                        placeholder="Password"
                        autocomplete="new-password"
                        v-model="formSiswa.password"
                      />
                      <div
                        class="input-group-append"
                        style="cursor: pointer"
                        @click.prevent="showPassword = !showPassword"
                      >
                        <span
                          class="input-group-text bg-transparent"
                          style="pointer-events: none"
                          ><i
                            :class="[
                              'fa',
                              showPassword ? 'fa-eye-slash' : 'fa-eye',
                            ]"
                            style="pointer-events: none"
                          ></i
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group reg-siswa">
                    <label for="repassword">Konfirmasi Password</label>
                    <div class="input-group">
                      <input
                        type="password"
                        class="form-control pl-0"
                        id="repassword"
                        placeholder="Ulangi Password"
                        autocomplete="new-password"
                        v-model="formSiswa.repassword"
                      />
                      <!-- <div class="input-group-append">
                        <span class="input-group-text bg-transparent"
                          ><i class="fa fa-eye-slash"></i
                        ></span>
                      </div> -->
                    </div>
                  </div>
                </div>
                <div
                  class="col-md-6 d-flex tambah-akun align-items-center mt-3"
                  v-if="akun.role_user == 'siswa' && !profil.parent"
                  v-b-modal.modal-ortu
                >
                  <button
                    class="btn btn-primary tambah-akun px-3"
                    type="button"
                  >
                    <i class="fa fa-plus"></i>
                  </button>
                  <p class="pb-0 pl-3 mb-0" style="font-size: 14px">
                    Tambah Akun Untuk Orangtuamu
                  </p>
                </div>
              </div>
            </b-tab>
            <b-tab title="Data Orangtua" v-if="profil && profil.parent">
              <b-row>
                <b-col>
                  <div class="form-group reg-siswa">
                    <label for="ortu_name">Nama Lengkap</label>
                    <input
                      type="text"
                      class="form-control"
                      id="ortu_name"
                      placeholder="Nama Lengkap"
                      v-model="formOrtu.nama_lengkap"
                    />
                  </div>
                  <div class="form-group reg-siswa">
                    <label for="ortu_phone">No.Telp</label>
                    <input
                      type="text"
                      class="form-control"
                      id="ortu_phone"
                      placeholder="No.Telp"
                      v-model="formOrtu.nomor_telephone"
                    />
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group reg-siswa">
                    <label for="ortu_email">Email</label>
                    <input
                      type="text"
                      class="form-control"
                      id="ortu_email"
                      placeholder="Email"
                      autocomplete="false"
                      v-model="formOrtu.email"
                      disabled
                    />
                  </div>
                  <div class="form-group reg-siswa">
                    <label for="ortu_username">Username</label>
                    <input
                      type="text"
                      class="form-control form-control-karir"
                      id="ortu_username"
                      placeholder="Username"
                      autocomplete="false"
                      v-model="formOrtu.username"
                      disabled
                    />
                  </div>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </div>
        <div class="d-flex">
          <b-button type="submit" variant="primary" :disabled="loading">
            <b-spinner small class="mr-1" v-if="loading"></b-spinner>
            <i class="fas fa-save fa-fw mr-1" v-else></i>
            Simpan Perubahan</b-button
          >
        </div>
      </form>
    </div>

    <div
      class="modal fade"
      id="tambahakun"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="text-right">
            <button
              type="button"
              class="close mt-2 mr-2"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body p-5">
            <div class="text-center">
              <h3 class="modal-title mt-1 mb-3" id="exampleModalLongTitle">
                Masuka Alamat
              </h3>
            </div>
            <div class="form-group reg-siswa">
              <label for="select">Kecamatan/Kelurahan</label>
              <select class="form-control pl-0" id="select">
                <option selected="">Klik Untuk Isi Kecamatan/Kelurahan</option>
                <option value="1">Kecamatan A</option>
                <option value="2">Kecamatan B</option>
                <option value="3">Kecamatan C</option>
              </select>
            </div>
            <div class="form-group reg-siswa">
              <label for="select">Kabupaten/Kota</label>
              <select class="form-control pl-0" id="select">
                <option selected="">Klik Untuk Isi Kabupaten/Kota</option>
                <option value="1">Kota A</option>
                <option value="2">Kota B</option>
                <option value="3">Kota C</option>
              </select>
            </div>
            <div class="form-group reg-siswa">
              <label for="select">Provinsi</label>
              <select class="form-control pl-0" id="select">
                <option selected="">Klik Untuk Isi Provinsi</option>
                <option value="1">Provinsi A</option>
                <option value="2">Provinsi B</option>
                <option value="3">Provinsi C</option>
              </select>
            </div>
            <div
              class="modal-footer justify-content-center"
              style="border: 0px"
            >
              <button type="button" class="btn btn-outline-primary">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="modal-ortu" title="Tambah Orang Tua" hide-footer>
      <div class="p-3">
        <!-- <div class="text-center">
          <h3 class="modal-title mt-1 mb-3" id="exampleModalLongTitle">
            Tambah Akun Orang Tua
          </h3>
        </div> -->
        <form class="form-user" @submit.prevent="validateFormOrtu">
          <div class="form-group reg-siswa">
            <label for="ortu_name">Nama Lengkap</label>
            <input
              type="text"
              class="form-control"
              id="ortu_name"
              placeholder="Nama Lengkap"
              v-model="formOrtu.nama_lengkap"
            />
          </div>
          <div class="form-group reg-siswa">
            <label for="ortu_phone">No.Telp</label>
            <input
              type="text"
              class="form-control"
              id="ortu_phone"
              placeholder="No.Telp"
              v-model="formOrtu.nomor_telephone"
            />
            <div v-html="showError('nomor_telephone')"></div>
          </div>
          <div class="form-group reg-siswa">
            <label for="ortu_email">Email</label>
            <input
              type="text"
              class="form-control"
              id="ortu_email"
              placeholder="Email"
              autocomplete="false"
              v-model="formOrtu.email"
            />
            <div v-html="showError('email')"></div>
          </div>
          <div class="form-group reg-siswa">
            <label for="ortu_username">Username</label>
            <input
              type="text"
              class="form-control form-control-karir"
              id="ortu_username"
              placeholder="Username"
              autocomplete="false"
              v-model="formOrtu.username"
            />
            <div v-html="showError('username')"></div>
          </div>

          <div class="form-group reg-siswa">
            <label for="ortu_password">Password</label>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control pl-0"
                id="password"
                placeholder="Password"
                autocomplete="new-password"
                v-model="formOrtu.password"
              />
              <div
                class="input-group-append"
                style="cursor: pointer"
                @click.prevent="showPassword = !showPassword"
              >
                <span
                  class="input-group-text bg-transparent"
                  style="pointer-events: none"
                  ><i
                    :class="['fa', showPassword ? 'fa-eye-slash' : 'fa-eye']"
                    style="pointer-events: none"
                  ></i
                ></span>
              </div>
            </div>
            <div v-html="showError('password')"></div>
          </div>
          <div class="modal-footer justify-content-center" style="border: 0px">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <b-spinner small class="mr-1" v-if="loading"></b-spinner>
              <i class="fas fa-save fa-fw mr-1" v-else></i>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      // showTabOrtu: false,
      showPassword: false,
      loading: false,
      formSiswa: {
        username: "",
        nama_lengkap: "",
        email: "",
        nomor_telephone: "",
        info: "",
        tempat_lahir: "",
        tgl_lahir: "",
        jenis_kelamin: "",
        alamat: "",
        id_provinsi: null,
        id_kota: null,
        id_kecamatan: null,
        id_penjurusan: null,
        password: "",
        repassword: "",
      },
      formOrtu: {
        nama_lengkap: "",
        username: "",
        email: "",
        nomor_telephone: "",
        password: "",
      },
      dataMaster: {
        penjurusan: [],
      },
      dataAPI: {
        provinsi: [],
        kota_kabupaten: [],
        kecamatan: [],
      },
      dataOption: {
        penjurusan: [],
        provinsi: [],
        kota_kabupaten: [],
        kecamatan: [],
      },
      isValidForm: {
        username: null,
        password: null,
        email: null,
        nomor_telephone: null,
      },
      dataError: [],
    };
  },
  watch: {
    "formOrtu.username": function (value) {
      if (!value) return;
      var usernameRegex = /^[a-zA-Z0-9]+$/;
      var test = value.match(usernameRegex);
      if (test === null) {
        this.$set(this.dataError, "username", [
          "Username hanya boleh mengandung huruf dan angka tanpa spasi.",
        ]);
        this.isValidForm["username"] = false;
      } else {
        this.$set(this.dataError, "username", [""]);
        this.isValidForm["username"] = true;
      }
    },
    "formOrtu.password": function (value) {
      if (!value) return;
      var passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
      var test = value.match(passwordRegex);
      if (value && test === null) {
        this.$set(this.dataError, "password", [
          "Password minimal 8 - 20 karakter. Dengan setidaknya terdapat 1 huruf kapital, 1 angka dan 1 karakter spesial.",
        ]);
        this.isValidForm["password"] = false;
      } else {
        this.$set(this.dataError, "password", [""]);
        this.isValidForm["password"] = true;
      }
      if (this.repassword && value !== this.repassword) {
        this.$set(this.dataError, "repassword", [
          "Password tidak sama. Mohon pelan-pelan.",
        ]);
        this.isValidForm["repassword"] = false;
      } else {
        this.$set(this.dataError, "repassword", [""]);
        this.isValidForm["repassword"] = true;
      }
    },
    "formOrtu.repassword": function (value) {
      if (!value) return;
      if (value && value !== this.form.password) {
        this.$set(this.dataError, "repassword", [
          "Password tidak sama. Mohon pelan-pelan.",
        ]);
        this.isValidForm["repassword"] = false;
      } else {
        this.$set(this.dataError, "repassword", [""]);
        this.isValidForm["repassword"] = true;
      }
    },
    "formOrtu.email": function (value) {
      if (!value) return;
      var emailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var test = value.match(emailRegex);
      if (value && test === null) {
        this.$set(this.dataError, "email", ["Mohon masukkan email valid."]);
        this.isValidForm["email"] = false;
      } else {
        this.$set(this.dataError, "email", [""]);
        this.isValidForm["email"] = true;
      }
    },
    "formOrtu.nomor_telephone": function (value) {
      if (!value) return;
      var phoneRegex =
        /\(?(?:\+62|62|0)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}$/;
      var test = value.match(phoneRegex);
      if (value && test === null) {
        this.$set(this.dataError, "nomor_telephone", [
          "Mohon masukkan nomor HP valid.",
        ]);
        this.isValidForm["nomor_telephone"] = false;
      } else {
        this.$set(this.dataError, "nomor_telephone", [""]);
        this.isValidForm["nomor_telephone"] = true;
      }
    },
  },
  computed: {
    akun() {
      return this.$store.state.dataUser.user;
    },
    profil() {
      return this.$store.state.dataUser.detail;
    },
  },
  created() {
    this.formSiswa = {
      username: this.akun.username,
      nama_lengkap: this.profil.nama_lengkap,
      email: this.akun.email,
      nomor_telephone: this.profil.nomor_telephone,
      info: this.profil.info,
      tempat_lahir: this.profil.tempat_lahir,
      tgl_lahir: this.profil.tgl_lahir,
      jenis_kelamin: this.profil.jenis_kelamin ?? "Laki-laki",
      alamat: this.profil.alamat,
      nomor_telephone: this.profil.nomor_telephone,
      id_provinsi: this.profil.id_provinsi,
      id_kota: this.profil.id_kota,
      id_kecamatan: this.profil.id_kecamatan,
      id_penjurusan: this.profil.id_penjurusan,
      password: "",
      repassword: "",
    };
    if (this.profil && this.profil.parent) {
      this.formOrtu = {
        nama_lengkap: this.profil.parent.nama_lengkap,
        username:
          this.profil.parent.username ?? this.profil.parent.nama_lengkap,
        email: this.profil.parent.email,
        nomor_telephone: this.profil.parent.nomor_telephone,
      };
    }
    this.getMaster("penjurusan");
    if (this.$cookiz.get("provinsi")) {
      this.dataOption["provinsi"] = this.$cookiz.get("provinsi");
      if (this.$cookiz.get("kota_kabupaten"))
        this.dataOption["kota_kabupaten"] = this.$cookiz.get("kota_kabupaten");
      if (this.$cookiz.get("kecamatan"))
        this.dataOption["kecamatan"] = this.$cookiz.get("kecamatan");
    } else {
      this.getAPI("provinsi");
    }
  },
  methods: {
    resetForm() {
      this.isValidForm = {
        username: null,
        password: null,
        email: null,
        nomor_telephone: null,
      };
      this.dataError = [];
    },
    showError(field) {
      if (
        this.dataError[field] !== undefined &&
        this.dataError[field].length > 0
      ) {
        let html = `<div class="form-error__info">
                        ${this.dataError[field][0]}
                        </div>`;
        return html;
      }
      return "";
    },
    validateFormOrtu() {
      this.dataError = [];

      if (
        !this.formOrtu.nama_lengkap ||
        !this.formOrtu.username ||
        !this.formOrtu.password ||
        !this.formOrtu.email ||
        !this.formOrtu.nomor_telephone
      ) {
        this.$bvToast.toast("Mohon lengkapi formulir terlebih dahulu!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000,
        });
        return;
      }

      // if (
      //   this.formOrtu.repassword &&
      //   this.formOrtu.repassword !== this.formOrtu.password
      // ) {
      //   this.$set(this.dataError, "repassword", [
      //     "Password tidak sama. Mohon pelan-pelan.",
      //   ]);
      //   return;
      // }

      if (Object.values(this.isValidForm).includes(false)) {
        this.$bvToast.toast("Mohon lengkapi formulir dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000,
        });
        return;
      }

      this.onSubmitOrtu();
    },
    getMaster(type) {
      this.loading = true;
      this.$axios.defaults.headers.Authorization =
        "Bearer " + this.$cookiz.get("_ujiaja");
      this.$axios.defaults.withCredentials = true;
      this.$axios
        .$get(`/api/${type}`)
        .then((res) => {
          console.log(res);
          this.dataMaster[type] = res.data.data;
          if (type == "penjurusan") {
            this.dataOption[type] = this.dataMaster[type].map((item) => {
              let textField = item.kelas.jenjang.nama_jenjang;
              textField += " - " + item.kelas.nama_kelas;
              if (item.nama_penjurusan && item.nama_penjurusan != "-") {
                textField += " - " + item.nama_penjurusan;
              }
              return {
                ...item,
                textField,
              };
            });
          } else if (type == "kelas") {
            //
          }
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getAPI(type) {
      this.loading = true;

      let params = {};

      if (type == "kota_kabupaten" || type == "kota") {
        params = "/" + this.formSiswa.id_provinsi;
      } else if ("kecamatan") {
        params = "/" + this.formSiswa.id_kota;
      }

      this.$axios.defaults.headers = {};
      this.$axios.defaults.withCredentials = false;

      this.$axios
        .$get(`/api/${type}${params}`)
        .then((res) => {
          console.log(res);
          if (type == "kota") {
            type = "kota_kabupaten";
          }
          this.dataOption[type] = res.data[type];
          this.$cookiz.set(type, this.dataOption[type]);
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    onSubmit() {
      this.loading = true;

      // const dataSave = {
      //   ...this.formSiswa
      // }
      this.$axios.defaults.headers.Authorization =
        "Bearer " + this.$cookiz.get("_ujiaja");
      this.$axios.defaults.withCredentials = true;
      this.$axios
        .$put(`/api/users/siswa/update/${this.akun.id}`, this.formSiswa)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$bvToast.toast("Profil berhasil diperbarui!", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000,
            });
            this.$router.push(
              {
                path: this.$route.path,
                force: true,
              },
              () => {
                this.$router.app.refresh();
              }
            );
            return true;
          } else {
            this.$bvToast.toast("Permintaan gagal!", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000,
            });
            return false;
          }
        })
        .then((success) => {
          if (
            success &&
            this.profil.parent &&
            this.profil.parent.id_orang_tua
          ) {
            this.$axios
              .$put(
                `/api/users/parent/update/${this.profil.parent.id_orang_tua}`,
                this.formOrtu
              )
              .then((res) => {
                console.log("update ortu", res);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    onSubmitOrtu() {
      this.loading = true;

      this.$axios.defaults.headers.Authorization =
        "Bearer " + this.$cookiz.get("_ujiaja");
      this.$axios.defaults.withCredentials = true;
      this.$axios
        .$post(`/api/users/parent/create`, this.formOrtu)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$bvToast.toast("Data orangtua berhasil ditambahkan.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000,
            });
            this.$router.push(
              {
                path: this.$route.path,
                force: true,
              },
              () => {
                this.$router.app.refresh();
              }
            );
          } else {
            this.$bvToast.toast("Permintaan gagal!", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>