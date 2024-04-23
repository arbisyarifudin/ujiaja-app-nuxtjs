<template>
  <div>
    <div class="p-0 text-left">
      <h2 class="pb-0">Edit Profil</h2>
      <h5 class="mt-4">Lengkapi profilmu sekarang juga!</h5>
      <client-only>
        <form action="" class="form-user" @submit.prevent="onSubmit">
          <div class="mt-4 mb-5">
            <b-tabs pills nav-wrapper-class="mb-4" v-model="tabProfile">
              <b-tab title="Identitas Diri" active>
                <b-row>
                  <b-col>
                    <div class="form-group reg-siswa">
                      <label for="nama_lengkap">Nama Lengkap <code class="text-danger text-small">*</code></label>
                      <input type="text" class="form-control pl-0" id="nama_lengkap" name="nama_lengkap"
                        placeholder="Nama Lengkap" v-model="formSiswa.nama_lengkap" />
                    </div>
                    <div class="form-group reg-siswa" v-if="akun.role_user != 'parent'">
                      <label for="tempat_lahir">Tempat Lahir <code class="text-danger text-small">*</code></label>
                      <input type="text" class="form-control pl-0" id="tempat_lahir" name="tempat_lahir"
                        placeholder="Tempat Lahir" v-model="formSiswa.tempat_lahir" />
                    </div>
                    <div class="form-group reg-siswa">
                      <label for="nomor_handphone">No. Telp/WA <code class="text-danger text-small">*</code></label>
                      <input type="text" class="form-control pl-0" name="nomor_handphone" id="nomor_handphone"
                        placeholder="No. Telp/WA" v-model="formSiswa.nomor_telephone" />
                    </div>
                    <div class="row" v-if="akun.role_user == 'siswa'">
                      <div class="col-md-8">
                        <div class="form-group reg-siswa">
                          <label for="nama_sekolah">Nama Sekolah <code class="text-danger text-small">*</code></label>
                          <input type="text" class="form-control pl-0" id="nama_sekolah" name="nama_sekolah"
                            placeholder="Tulis nama sekolah kamu sekarang" v-model="formSiswa.nama_sekolah" />
                        </div>
                      </div>
                      <!-- <div class="col-md-3">
                        <div
                          class="form-group reg-siswa"
                        >
                          <label for="jenjang">Jenjang</label>
                          <select
                            class="form-control"
                            id="jenjang"
                            v-model="formSiswa.nama_jenjang"
                          >
                            <option value="SD">SD Sederajat</option>
                            <option value="SMP">SMP Sederajat</option>
                            <option value="SMA">SMA Sederajat</option>
                          </select>
                        </div>
                      </div> -->
                      <div class="col-md-4">
                        <div class="form-group reg-siswa">
                          <label for="jenjang">Jenjang <code class="text-danger text-small">*</code></label>
                          <b-form-select class="form-control" id="jenjang" v-model="formSiswa.id_jenjang"
                            :options="dataOption['jenjang']">
                          </b-form-select>
                        </div>
                      </div>
                    </div>
                    <div class="form-group reg-siswa" v-if="akun.role_user == 'teacher'">
                      <label for="pendidikan_terakhir">Pendidikan Terakhir</label>
                      <input type="text" class="form-control pl-0 pr-0" id="pendidikan_terakhir"
                        name="pendidikan_terakhir" placeholder="Misal: S1 Teknik Informatika - UGM" max="2020-01-01"
                        v-model="formSiswa.pendidikan_terakhir" />
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group reg-siswa" v-if="akun.role_user != 'parent'">
                      <label for="jenis_kelamin">Jenis Kelamin <code class="text-danger text-small">*</code></label>
                      <select class="form-control" id="jenis_kelamin" v-model="formSiswa.jenis_kelamin">
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div class="form-group reg-siswa" v-if="akun.role_user != 'parent'">
                      <label for="tanggal_lahir">Tanggal Lahir <code class="text-danger text-small">*</code></label>
                      <input type="date" class="form-control pl-0 pr-0" id="tanggal_lahir" placeholder="DD-MM-YYYY"
                        max="2020-01-01" v-model="formSiswa.tgl_lahir" />
                    </div>
                    <div class="row">
                      <div class="form-group col-md-3" v-if="akun.role_user != 'parent'">
                        <img v-if="apiUrl" :src="apiUrl(profil.foto)" @error="noImage" alt="foto" class="img-fluid"
                          id="fotoprofil_preview" style="width: 100%; height: 80px; object-fit: contain" />
                      </div>
                      <div class="col-md-8 form-group reg-siswa" v-if="akun.role_user != 'parent'">
                        <label>Unggah Foto</label>
                        <input type="file" id="fotoprofil" ref="fotoprofil"
                          @change="handleUploadedFile('fotoprofil')" />
                      </div>
                    </div>
                    <div class="form-group reg-siswa" v-if="akun.role_user != 'parent'">
                      <label for="info">Dapat informasi tentang UjiaAja melalui?</label>
                      <select class="form-control" id="info" v-model="formSiswa.info">
                        <option :value="null">--Pilih--</option>
                        <!-- <option value="Sosial Media">Sosial Media</option>
                        <option value="Mesin Pencari">Mesin Pencari</option>
                        <option value="Teman / Kenalan">Teman / Kenalan</option>
                        <option value="Mesin Pencari">Mesin Pencari</option>
                        -->
                        <!-- <option value="">Pilih  Sumber</option> -->
                        <option value="Internet & Mesin Pencari">Internet & Mesin Pencari</option>
                        <option value="Teman/Saudara">Teman/Saudara</option>
                        <option value="Medsos (FB, IG, dll)">
                          Medsos (FB, IG, dll)
                        </option>
                        <option value="Brosur/Iklan Digital">
                          Brosur/Iklan Digital
                        </option>
                        <option value="Iklan Media Cetak/TV/Radio">
                          Iklan Media Cetak/TV/Radio
                        </option>
                      </select>
                    </div>
                  </b-col>
                </b-row>
                <hr />
                <!-- <h4>Pilihan Program Studi</h4> -->
                <b-row v-if="
                  akun.role_user == 'siswa' && (formSiswa.nama_jenjang == 'SMA' || ['SMA', 'SMK', 'MA'].includes(formSiswa.nama_jenjang))
                ">
                  <b-col md="2">
                    <label><i class="fas fa-fw fa-graduation-cap"></i> Pilihan Prodi
                      1</label>
                  </b-col>
                  <b-col md="4">
                    <div class="form-group reg-siswa">
                      <label for="id_program_studi">Program Studi</label>
                      <!-- <b-form-select
                        class="form-control"
                        id="id_program_studi"
                        v-model="id_program_studi"
                        :options="dataOption['programStudi']"
                        @change="
                          optionProdiBindPerguruanDisabled = false;
                          formSiswa.id_prodi_bind_perguruan = null;
                          getProdiBindPerguruan(id_program_studi);
                        "
                        value-field="id"
                        text-field="nama_studi"
                      >
                      </b-form-select> -->
                      <v-select id="id_program_studi" :options="dataOption['programStudi']" v-model="id_program_studi"
                        label="nama_studi" @input="
                          optionProdiBindPerguruanDisabled = false;
                        selectNew = true;
                        getProdiBindPerguruan(id_program_studi);
                        " :getOptionKey="prodi => prodi.id" />
                      <!-- formSiswa.id_prodi_bind_perguruan = null; -->
                      <div style="font-size: 14px" class="text-info" v-if="loading">
                        Memuat...
                      </div>
                    </div>
                  </b-col>
                  <b-col md="6">
                    <div class="form-group reg-siswa">
                      <label for="prodi_bind_perguruan">Perguruan Tinggi</label>
                      <v-select id="prodi_bind_perguruan" v-model="formSiswa.id_prodi_bind_perguruan"
                        :options="dataOptionProdiBindPerguruan" label="textField" :reduce="item => item.id" />
                      <div style="font-size: 14px" class="text-info" v-if="loading">
                        Memuat...
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row v-if="
                  akun.role_user == 'siswa' && (formSiswa.nama_jenjang == 'SMA' || ['SMA', 'SMK', 'MA'].includes(formSiswa.nama_jenjang))
                ">
                  <b-col md="2">
                    <label><i class="fas fa-fw fa-graduation-cap"></i> Pilihan Prodi
                      2</label>
                  </b-col>
                  <b-col md="4">
                    <div class="form-group reg-siswa">
                      <label for="id_program_studi_2">Program Studi</label>
                      <v-select id="id_program_studi_2" :options="dataOption['programStudi']"
                        v-model="id_program_studi_2" label="nama_studi" @input="
                          optionProdiBindPerguruanDisabled_2 = false;
                        selectNew_2 = true;
                        getProdiBindPerguruan(id_program_studi_2, 2);
                        " :getOptionKey="prodi => prodi.id" />
                      <!-- formSiswa.id_prodi_bind_perguruan_2 = null; -->
                      <div style="font-size: 14px" class="text-info" v-if="loading">
                        Memuat...
                      </div>
                    </div>
                  </b-col>
                  <b-col md="6">
                    <div class="form-group reg-siswa">
                      <label for="prodi_bind_perguruan_2">Perguruan Tinggi</label>
                      <v-select id="prodi_bind_perguruan" v-model="formSiswa.id_prodi_bind_perguruan_2"
                        :options="dataOptionProdiBindPerguruan_2" label="textField" :reduce="item => item.id" />
                      <div style="font-size: 14px" class="text-info" v-if="loading">
                        Memuat...
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Dokumen Pendukung" v-if="akun.role_user == 'teacher'">
                <b-row>
                  <b-col md="6">
                    <div class="form-group reg-siswa" v-for="(doc, index) in userDocs" :key="'docIn' + index">
                      <label :for="doc.doc_type">{{ doc.doc_label }}
                        <code v-if="doc.doc_type == 'npwp'">[optional]</code>
                        <code v-else>*</code>
                      </label>
                      <input :disabled="doc.doc_type == 'Approved'" type="file" class="form-control pl-0"
                        :id="doc.doc_type" :ref="doc.doc_type" :name="doc.doc_type"
                        @change="handleUploadedFile(doc.doc_type)" />
                    </div>
                  </b-col>
                  <b-col md="6">
                    <b-row v-if="apiUrl && userDocs.length > 0">
                      <b-col md="4" v-for="(doc, index) in userDocs" :key="'docIm' + index">
                        <b-img fluid :id="doc.doc_type + '_preview'" :src="apiUrl(doc.doc_file)"></b-img>
                        <!-- <div class="text-center" v-if="doc.doc_file || (dataFiles[doc.doc_type] && dataFiles[doc.doc_type].file)">
                          Status Approval :
                          <span :class="badgeStatus(doc.doc_status)" v-text="doc.doc_status"></span>
                        </div> -->
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Alamat" v-if="akun.role_user != 'parent'">
                <b-row>
                  <b-col>
                    <div class="form-group reg-siswa">
                      <label for="alamat">Alamat</label>
                      <input type="text" class="form-control pl-0" id="alamat" placeholder="Klik Untuk Isi Alamat"
                        v-model="formSiswa.alamat" />
                    </div>
                    <div class="form-group reg-siswa">
                      <label for="provinsi">Provinsi</label>
                      <v-select id="provinsi" v-model="formSiswa.id_provinsi" :options="dataOption['provinsi']"
                        label="nama" @input="() => {
                            formSiswa.id_kecamatan = null;
                            formSiswa.id_kota = null;
                            getAPI('kota_kabupaten');
                            dataOption['kecamatan'] = [];
                          }
                          " :reduce="item => item.id" :getOptionKey="item => item.id" />
                      <div style="font-size: 14px" class="text-info" v-if="loading">
                        Memuat...
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group reg-siswa">
                      <label for="kota">Kota</label>
                      <v-select id="kota" v-model="formSiswa.id_kota" :options="dataOption['kota_kabupaten']"
                        label="nama" @input="() => {
                            formSiswa.id_kecamatan = null;
                            getAPI('kecamatan');
                          }
                          " :reduce="item => item.id" :getOptionKey="item => item.id" />
                      <div style="font-size: 14px" class="text-info" v-if="loading">
                        Memuat...
                      </div>
                    </div>
                    <div class="form-group reg-siswa">
                      <label for="kecamatan">Kecamatan</label>
                      <v-select id="kecamatan" v-model="formSiswa.id_kecamatan" :options="dataOption['kecamatan']"
                        label="nama" :reduce="item => item.id" :getOptionKey="item => item.id" />
                      <div style="font-size: 14px" class="text-info" v-if="loading">
                        Memuat...
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Akun">
                <div class="mb-3 alert alert-danger">
                  <i class="fas fa-exclamation fa-fw mr-1"></i> Kosongkan form
                  jika tidak diubah.
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group reg-siswa">
                      <label for="Username">Username</label>
                      <input type="text" class="form-control pl-0" id="Username" placeholder="Username"
                        autocomplete="false" v-model="formSiswa.username" disabled />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group reg-siswa">
                      <label for="email">Email</label>
                      <input type="text" class="form-control pl-0" id="email" placeholder="email" autocomplete="false"
                        v-model="formSiswa.email" disabled />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group reg-siswa">
                      <label for="password">Password</label>
                      <div class="input-group">
                        <input :type="showPassword ? 'text' : 'password'" class="form-control pl-0" id="password"
                          placeholder="Password" autocomplete="new-password" v-model="formSiswa.password" />
                        <div class="input-group-append" style="cursor: pointer"
                          @click.prevent="showPassword = !showPassword">
                          <span class="input-group-text bg-transparent" style="pointer-events: none"><i :class="[
                            'fa',
                            showPassword ? 'fa-eye-slash' : 'fa-eye'
                          ]" style="pointer-events: none"></i></span>
                        </div>
                      </div>
                      <div v-html="showError('password')"></div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group reg-siswa">
                      <label for="repassword">Konfirmasi Password</label>
                      <div class="input-group">
                        <input type="password" class="form-control pl-0" id="repassword" placeholder="Ulangi Password"
                          autocomplete="new-password" v-model="formSiswa.repassword" />
                        <!-- <div class="input-group-append">
                        <span class="input-group-text bg-transparent"
                          ><i class="fa fa-eye-slash"></i
                        ></span>
                      </div> -->
                      </div>
                      <div v-html="showError('nomor_telephone')"></div>
                    </div>
                  </div>
                  <div class="col-md-6 d-flex tambah-akun align-items-center mt-3"
                    v-if="akun.role_user == 'siswa' && !profil.parent" v-b-modal.modal-ortu>
                    <button class="btn btn-primary tambah-akun px-3" type="button">
                      <i class="fa fa-plus"></i>
                    </button>
                    <p class="pb-0 pl-3 mb-0" style="font-size: 14px">
                      Tambah Akun Untuk Orangtuamu
                    </p>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Data Orangtua" v-if="profil && profil.parent && akun.role_user == 'siswa'">
                <b-row>
                  <b-col>
                    <div class="form-group reg-siswa">
                      <label for="ortu_name">Nama Lengkap</label>
                      <input type="text" class="form-control" id="ortu_name" placeholder="Nama Lengkap"
                        v-model="formOrtu.nama_lengkap" />
                    </div>
                    <div class="form-group reg-siswa">
                      <label for="ortu_phone">No.Telp</label>
                      <input type="text" class="form-control" id="ortu_phone" placeholder="No.Telp"
                        v-model="formOrtu.nomor_telephone" />
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group reg-siswa">
                      <label for="ortu_email">Email</label>
                      <input type="text" class="form-control" id="ortu_email" placeholder="Email" autocomplete="false"
                        v-model="formOrtu.email" disabled />
                    </div>
                    <div class="form-group reg-siswa">
                      <label for="ortu_username">Username</label>
                      <input type="text" class="form-control form-control-karir" id="ortu_username"
                        placeholder="Username" autocomplete="false" v-model="formOrtu.username" disabled />
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
              Simpan Perubahan</b-button>
          </div>
        </form>
      </client-only>
    </div>

    <b-modal id="modal-ortu" title="Tambah Orang Tua" hide-footer @hidden="resetForm">
      <div class="p-3">
        <!-- <div class="text-center">
          <h3 class="modal-title mt-1 mb-3" id="exampleModalLongTitle">
            Tambah Akun Orang Tua
          </h3>
        </div> -->
        <form class="form-user" @submit.prevent="validateFormOrtu">
          <div class="form-group reg-siswa">
            <label for="ortu_name">Nama Lengkap</label>
            <input type="text" class="form-control" id="ortu_name" placeholder="Nama Lengkap"
              v-model="formOrtu.nama_lengkap" />
          </div>
          <div class="form-group reg-siswa">
            <label for="ortu_phone">No.Telp</label>
            <input type="text" class="form-control" id="ortu_phone" placeholder="No.Telp"
              v-model="formOrtu.nomor_telephone" />
            <div v-html="showError('nomor_telephone')"></div>
          </div>
          <div class="form-group reg-siswa">
            <label for="ortu_email">Email</label>
            <input type="text" class="form-control" id="ortu_email" placeholder="Email" autocomplete="false"
              v-model="formOrtu.email" />
            <div v-html="showError('email')"></div>
          </div>
          <div class="form-group reg-siswa">
            <label for="ortu_username">Username</label>
            <input type="text" class="form-control form-control-karir" id="ortu_username" placeholder="Username"
              autocomplete="false" v-model="formOrtu.username" />
            <div v-html="showError('username')"></div>
          </div>

          <div class="form-group reg-siswa">
            <label for="ortu_password">Password</label>
            <div class="input-group">
              <input :type="showPassword ? 'text' : 'password'" class="form-control pl-0" id="password"
                placeholder="Password" autocomplete="new-password" v-model="formOrtu.password" />
              <div class="input-group-append" style="cursor: pointer" @click.prevent="showPassword = !showPassword">
                <span class="input-group-text bg-transparent" style="pointer-events: none"><i
                    :class="['fa', showPassword ? 'fa-eye-slash' : 'fa-eye']" style="pointer-events: none"></i></span>
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
  //  middleware: [
  //   function(context) {
  //     const dataUser = context.store.state.dataUser
  //     if(dataUser.user && dataUser.user.role_user == 'teacher') {
  //       context.redirect("/user/profile/partner-edit");
  //     }
  //   }
  // ],
  layout: "app",
  data() {
    return {
      tabProfile: 0,
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
        nama_provinsi: "",
        id_kota: null,
        nama_kota: "",
        id_kecamatan: null,
        nama_kecamatan: "",
        id_penjurusan: null,
        nama_penjurusan: "",
        id_prodi_bind_perguruan: "",
        id_prodi_bind_perguruan_2: "",
        password: "",
        repassword: "",
        pendidikan_terakhir: "", // tentor
        nama_sekolah: "", // siswa,
        id_jenjang: null, // siswa
        nama_jenjang: "" // siswa
      },
      provinsi: {},
      kota: {},
      kecamatan: {},
      formOrtu: {
        nama_lengkap: "",
        username: "",
        email: "",
        nomor_telephone: "",
        password: ""
      },
      dataMaster: {
        penjurusan: [],
        jenjang: []
      },
      dataAPI: {
        provinsi: [],
        kota_kabupaten: [],
        kecamatan: []
      },
      dataOption: {
        penjurusan: [],
        provinsi: [],
        kota_kabupaten: [],
        kecamatan: [],
        programStudi: [],
        jenjang: []
      },
      id_program_studi: null,
      id_program_studi_2: null,
      dataOptionProdiBindPerguruan: [],
      dataOptionProdiBindPerguruan_2: [],
      optionProdiBindPerguruanDisabled: true,
      optionProdiBindPerguruanDisabled_2: true,
      selectNew: false,
      selectNew_2: false,
      isValidForm: {
        username: null,
        password: null,
        email: null,
        nomor_telephone: null
      },
      dataError: [],
      files: [],
      userDocs: [],
      dataFiles: {}
    };
  },
  watch: {
    "formSiswa.id_jenjang": function (value) {
      if (value) {
        const findNamaJenjang = this.dataMaster["jenjang"].find(
          item => item.id == this.formSiswa.id_jenjang
        );
        if (findNamaJenjang) {
          this.formSiswa.nama_jenjang = findNamaJenjang.nama_jenjang;
        }
      }
    },
    "formSiswa.nama_jenjang": function (value) {
      if (value && (['SMA', 'SMK', 'MA'].includes(value))) {
        this.getProdiBindPerguruan("");
        this.getProdiBindPerguruan("", 2);
      }
    },
    "formOrtu.username": function (value) {
      if (!value) return;
      var usernameRegex = /^[a-zA-Z0-9]+$/;
      var test = value.match(usernameRegex);
      if (test === null) {
        this.$set(this.dataError, "username", [
          "Username hanya boleh mengandung huruf dan angka tanpa spasi."
        ]);
        this.isValidForm["username"] = false;
      } else {
        this.$set(this.dataError, "username", [""]);
        this.isValidForm["username"] = true;
      }
    },
    "formOrtu.password": function (value) {
      if (!value) return;

      var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
      var test = value.match(passwordRegex);
      if (value && test === null) {
        this.$set(this.dataError, "password", [
          "Password minimal 8 - 20 karakter. Dengan setidaknya terdapat 1 huruf kapital, dan 1 angka"
        ]);
        this.isValidForm["password"] = false;
      } else {
        this.$set(this.dataError, "password", [""]);
        this.isValidForm["password"] = true;
      }
      if (this.repassword && value !== this.repassword) {
        this.$set(this.dataError, "repassword", [
          "Password tidak sama. Mohon pelan-pelan."
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
          "Password tidak sama. Mohon pelan-pelan."
        ]);
        this.isValidForm["repassword"] = false;
      } else {
        this.$set(this.dataError, "repassword", [""]);
        this.isValidForm["repassword"] = true;
      }
    },
    "formOrtu.email": function (value) {
      if (!value) return;
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      var phoneRegex = /\(?(?:\+62|62|0)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}$/;
      var test = value.match(phoneRegex);
      if (value && test === null) {
        this.$set(this.dataError, "nomor_telephone", [
          "Mohon masukkan nomor HP valid."
        ]);
        this.isValidForm["nomor_telephone"] = false;
      } else {
        this.$set(this.dataError, "nomor_telephone", [""]);
        this.isValidForm["nomor_telephone"] = true;
      }
    },
    "formSiswa.password": function (value) {
      if (!value) {
        this.$set(this.dataError, "password", [""]);
        this.$set(this.dataError, "repassword", [""]);
        return;
      }
      var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
      var test = value.match(passwordRegex);
      if (value && test === null) {
        this.$set(this.dataError, "password", [
          "Password minimal 8 - 20 karakter. Dengan setidaknya terdapat 1 huruf kapital, 1 angka dan 1 karakter spesial."
        ]);
        this.isValidForm["password"] = false;
      } else {
        this.$set(this.dataError, "password", [""]);
        this.isValidForm["password"] = true;
      }
      if (this.formSiswa.repassword && value !== this.formSiswa.repassword) {
        this.$set(this.dataError, "repassword", [
          "Password tidak sama. Mohon pelan-pelan."
        ]);
        this.isValidForm["repassword"] = false;
      } else {
        this.$set(this.dataError, "repassword", [""]);
        this.isValidForm["repassword"] = true;
      }
    },
    tabProfile(tab) {
      console.log(tab);
      if (tab) {
        if (tab === 1) {
          if (
            this.dataOption["kota_kabupaten"] &&
            this.dataOption["kota_kabupaten"].length < 1
          ) {
            this.getAPI("kota_kabupaten");
          }
          if (
            this.dataOption["kecamatan"] &&
            this.dataOption["kecamatan"].length < 1
          ) {
            this.getAPI("kecamatan");
          }
        }
      }
    }
  },
  computed: {
    akun() {
      return this.$store.state.dataUser.user;
    },
    profil() {
      return this.$store.state.dataUser.detail;
    },
    isProfilLengkap() {
      return this.$store.state.isProfilLengkap;
    }
  },
  created() {
    this.formSiswa = {
      username: this.akun.username,
      email: this.akun.email,
      foto: this.profil.foto,
      nama_lengkap: this.profil.nama_lengkap,
      nomor_telephone: this.profil.nomor_telephone,
      info: this.profil.info ?? null,
      tempat_lahir: this.profil.tempat_lahir,
      pendidikan_terakhir: this.profil.pendidikan_terakhir,
      tgl_lahir: this.profil.tgl_lahir ?? this.profil.tanggal_lahir,
      jenis_kelamin: this.profil.jenis_kelamin ?? "Laki-laki",
      alamat: this.profil.alamat ?? this.profil.alamat_lengkap,
      nomor_telephone: this.profil.nomor_telephone,
      id_provinsi: this.profil.id_provinsi,
      nama_provinsi: this.profil.nama_provinsi,
      id_kota: this.profil.id_kota,
      nama_kota: this.profil.nama_kota,
      id_kecamatan: this.profil.id_kecamatan,
      nama_kecamatan: this.profil.nama_kecamatan,
      id_penjurusan: this.profil.id_penjurusan,
      nama_penjurusan: this.profil.nama_penjurusan,
      nama_sekolah: this.profil.nama_sekolah,
      id_jenjang: this.profil.id_jenjang,
      nama_jenjang: this.profil.nama_jenjang ?? "",
      id_prodi_bind_perguruan: this.profil.id_prodi_bind_perguruan,
      id_prodi_bind_perguruan_2: this.profil.id_prodi_bind_perguruan_2,
      password: "",
      repassword: ""
    };

    if (!this.profil.id_prodi_bind_perguruan) {
      this.optionProdiBindPerguruanDisabled = false;
    }
    if (!this.profil.id_prodi_bind_perguruan_2) {
      this.optionProdiBindPerguruanDisabled_2 = false;
    }

    if (this.profil && this.profil.parent) {
      this.formOrtu = {
        nama_lengkap: this.profil.parent.nama_lengkap,
        username:
          this.profil.parent.username ?? this.profil.parent.nama_lengkap,
        email: this.profil.parent.email,
        nomor_telephone: this.profil.parent.nomor_telephone
      };
    }
    if (this.profil && this.profil.user_doc && this.profil.user_doc.length) {
      this.userDocs = this.profil.user_doc;
    } else {
      this.userDocs = [
        {
          doc_label: "KTP/Passport/SIM",
          doc_type: "idcard",
          doc_file: null,
          doc_status: "Pending"
        },
        {
          doc_label: "NPWP",
          doc_type: "npwp",
          doc_file: null,
          doc_status: "Pending"
        },
        {
          doc_label: "Ijazah Terakhir",
          doc_type: "ijazah",
          doc_file: null,
          doc_status: "Pending"
        }
      ];
    }
    // this.getMaster("penjurusan");
    // if (this.$cookiz.get("provinsi")) {
    //   this.dataOption["provinsi"] = this.$cookiz.get("provinsi");
    //   if (this.$cookiz.get("kota_kabupaten"))
    //     this.dataOption["kota_kabupaten"] = this.$cookiz.get("kota_kabupaten");
    //   if (this.$cookiz.get("kecamatan"))
    //     this.dataOption["kecamatan"] = this.$cookiz.get("kecamatan");
    // } else {
    //   this.getAPI("provinsi");
    // }
    this.getAPI("provinsi");
    this.getMaster("programStudi", { params: { paginate: 999 } });
    this.getMaster("jenjang", { params: { paginate: 999 } });
    if (this.profil.nama_jenjang === "SMA" || ['SMA', 'SMK', 'MA'].includes(this.profil.nama_jenjang)) {
      this.getProdiBindPerguruan("");
      this.getProdiBindPerguruan("", 2);
    }
  },
  methods: {
    apiUrl(param) {
      return process.env.apiUrl + "/" + param;
    },
    noImage(event) {
      event.target.src = `${window.origin}/logo2.png`;
    },
    resetForm() {
      this.isValidForm = {
        username: null,
        password: null,
        email: null,
        nomor_telephone: null
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
          autoHideDelay: 3000
        });
        return;
      }

      if (Object.values(this.isValidForm).includes(false)) {
        this.$bvToast.toast("Mohon lengkapi formulir dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000
        });
        return;
      }

      this.onSubmitOrtu();
    },
    getMaster(type, params = {}) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, params)
        .then(res => {
          console.log(res);
          this.dataMaster[type] = res.data.data;
          if (type == "penjurusan") {
            this.dataOption[type] = this.dataMaster[type].map(item => {
              let textField = item.kelas.jenjang.nama_jenjang;
              textField += " - " + item.kelas.nama_kelas;
              if (item.nama_penjurusan && item.nama_penjurusan != "-") {
                textField += " - " + item.nama_penjurusan;
              }
              return {
                ...item,
                textField
              };
            });
          } else if (type == "jenjang") {
            this.dataOption[type] = this.dataMaster[type].map(item => {
              let text = item.nama_jenjang;
              return {
                value: item.id,
                text
              };
            });
          } else {
            this.dataOption[type] = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getAPI(type) {
      this.loading = true;

      let params = "";

      if (type == "kota_kabupaten" || type == "kota") {
        params = "/" + this.formSiswa.id_provinsi;
      } else if (type == "kecamatan") {
        params = "/" + this.formSiswa.id_kota;
      }
      // console.log(type, params);

      this.$axios
        .$get(`/api/${type}${params}`)
        .then(res => {
          console.log(res);
          if (type == "kota") {
            type = "kota_kabupaten";
          }
          this.dataOption[type] = res.data[type];
          // this.$cookiz.set(type, this.dataOption[type]);
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getProdiBindPerguruan(id_program_studi_selected, nomor = 1) {
      const id_program_studi = id_program_studi_selected
        ? id_program_studi_selected.id
        : "";
      this.loading = true;

      console.log(
        "this.formSiswa.id_prodi_bind_perguruan",
        this.formSiswa.id_prodi_bind_perguruan
      );
      console.log(
        "this.formSiswa.id_prodi_bind_perguruan_2",
        this.formSiswa.id_prodi_bind_perguruan_2
      );
      const id_prodi_bind_perguruan =
        nomor == 1
          ? this.formSiswa.id_prodi_bind_perguruan
          : this.formSiswa.id_prodi_bind_perguruan_2;
      this.$axios
        .$get(`/api/tranStudiPerguruan`, {
          params: {
            paginate: 9999,
            id_program_studi: id_program_studi,
            id_prodi_bind_perguruan: id_prodi_bind_perguruan
          }
        })
        .then(async res => {
          console.log(res);
          if (res.success) {
            if (nomor == 2) {
              this.dataOptionProdiBindPerguruan_2 = await res.data.data
                .filter(item => item.program_studi !== null && item.perguruan !== nul)
                .map(
                  item => {
                    let textField =
                      item.perguruan && item.perguruan.nama_perguruan
                        ? item.perguruan.nama_perguruan
                        : "";
                    textField += " - " + item.program_studi.nama_studi;
                    textField += " (" + item.akreditasi_program_studi + ")";
                    // textField += " - PG: " + item.passing_grade_prodi;
                    return {
                      id: item.id,
                      id_prodi: item.program_studi.id,
                      textField
                    };
                  }
                );
              if (
                !this.id_program_studi_2 &&
                this.formSiswa.id_prodi_bind_perguruan_2
              ) {
                const found = res.data.data.find(
                  item => item.id == this.formSiswa.id_prodi_bind_perguruan_2
                );
                if (found) {
                  // this.id_program_studi_2 = found.id_program_studi;
                  this.id_program_studi_2 = found.program_studi;
                }
              }
              if (
                this.id_program_studi_2 &&
                this.formSiswa.id_prodi_bind_perguruan_2 &&
                this.selectNew_2 === true
              ) {
                const searchFound = this.dataOptionProdiBindPerguruan_2.find(
                  item => item.id_prodi == id_program_studi_selected.id
                );
                if (searchFound) {
                  this.formSiswa.id_prodi_bind_perguruan_2 = searchFound.id;
                }
              }
            } else {
              this.dataOptionProdiBindPerguruan = await res.data.data.map(
                item => {
                  let textField =
                    item.perguruan && item.perguruan.nama_perguruan
                      ? item.perguruan.nama_perguruan
                      : "";
                  textField += " - " + item.program_studi.nama_studi;
                  textField += " (" + item.akreditasi_program_studi + ")";
                  // textField += " - PG: " + item.passing_grade_prodi;
                  return {
                    id: item.id,
                    id_prodi: item.program_studi.id,
                    textField
                  };
                }
              );
              if (
                !this.id_program_studi &&
                this.formSiswa.id_prodi_bind_perguruan
              ) {
                const found = res.data.data.find(
                  item => item.id == this.formSiswa.id_prodi_bind_perguruan
                );
                if (found) {
                  // this.id_program_studi = found.id_program_studi;
                  this.id_program_studi = found.program_studi;
                }
              }

              if (
                this.id_program_studi &&
                this.formSiswa.id_prodi_bind_perguruan &&
                this.selectNew === true
              ) {
                const searchFound = this.dataOptionProdiBindPerguruan.find(
                  item => item.id_prodi == id_program_studi_selected.id
                );
                if (searchFound) {
                  this.formSiswa.id_prodi_bind_perguruan = searchFound.id;
                }
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    onSubmit() {
      // console.log(this.formSiswa.id_prodi_bind_perguruan)
      // console.log(this.formSiswa.id_prodi_bind_perguruan_2)
      // console.log(this.optionProdiBindPerguruanDisabled)
      // console.log(this.optionProdiBindPerguruanDisabled_2)
      if (
        this.akun.role_user == "siswa" &&
        (this.formSiswa.nama_jenjang === "SMA" || ['SMA', 'SMK', 'MA'].includes(this.profil.nama_jenjang))
      ) {
        if (
          (!this.optionProdiBindPerguruanDisabled &&
            !this.formSiswa.id_prodi_bind_perguruan) ||
          (!this.formSiswa.optionProdiBindPerguruanDisabled_2 &&
            !this.formSiswa.id_prodi_bind_perguruan_2)
        ) {
          return this.showToastMessage(
            "Program Studi wajib dipilih terlebih dahulu!",
            "warning"
          );
        }
      }

      if (this.formSiswa.password && !this.formSiswa.repassword) {
        return this.showToastMessage(
          "Mohon ulangi password untuk konfirmasi dari kesalahan pengetikan!"
        );
      } else if (this.formSiswa.password !== this.formSiswa.repassword) {
        return this.showToastMessage("Password tidak sama!");
      }

      if (Object.values(this.isValidForm).includes(false)) {
        this.$bvToast.toast("Mohon lengkapi formulir dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000
        });
        return this.showToastMessage(
          "Mohon lengkapi formulir yang belum valid!"
        );
      }

      let dataSave = {
        ...this.formSiswa
      };

      const findNamaProvinsi = this.dataOption["provinsi"].find(
        item => item.id == this.formSiswa.id_provinsi
      );
      if (findNamaProvinsi) {
        this.formSiswa.nama_provinsi = findNamaProvinsi.nama;
      }
      const findNamaKota = this.dataOption["kota_kabupaten"].find(
        item => item.id == this.formSiswa.id_kota
      );
      if (findNamaKota) {
        this.formSiswa.nama_kota = findNamaKota.nama;
      }
      const findNamaKecamatan = this.dataOption["kecamatan"].find(
        item => item.id == this.formSiswa.id_kecamatan
      );
      if (findNamaKecamatan) {
        this.formSiswa.nama_kecamatan = findNamaKecamatan
          ? findNamaKecamatan.nama
          : "";
      }

      // return;

      if (this.dataFiles["fotoprofil"] && this.dataFiles["fotoprofil"].file) {
        dataSave.foto = this.dataFiles["fotoprofil"].file;
      }

      if (this.akun.role_user == "teacher") {
        let userDocs = [];

        for (let i = 0; i < this.userDocs.length; i++) {
          const doc = this.userDocs[i];
          if (this.dataFiles[doc.doc_type]) {
            userDocs.push({
              ...doc,
              doc_type: this.dataFiles[doc.doc_type].type,
              doc_file: this.dataFiles[doc.doc_type].file
            });
          }
        }

        dataSave.user_docs = userDocs;
      }

      const role_type = this.akun.role_user;

      this.loading = true;
      this.$axios
        .$put(`/api/users/${role_type}/update/${this.akun.id}`, dataSave)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$bvToast.toast("Profil berhasil diperbarui!", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            // this.$router.push(
            //   {
            //     path: this.$route.path,
            //     force: true
            //   },
            //   () => {
            //     this.$router.app.refresh();
            //   }
            // );
            if (this.isProfilLengkap === false) {
              this.$axios
                .$get(`/api/users/${this.akun.role_user}/cek`)
                .then(res => {
                  console.log(res);
                  this.$store.commit("set", ["isProfilLengkap", res.success]);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          } else {
            this.$bvToast.toast("Permintaan gagal!", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000
            });
            return false;
          }
        })
        .then(success => {
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
              .then(res => {
                console.log("update ortu", res);
              });
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    onSubmitOrtu() {
      this.loading = true;
      this.$axios
        .$post(`/api/users/parent/create`, this.formOrtu)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$bvToast.toast("Data orangtua berhasil ditambahkan.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.push(
              {
                path: this.$route.path,
                force: true
              },
              () => {
                this.$router.app.refresh();
              }
            );
            this.$bvModal.hide("modal-ortu");
            window.location.reload();
          } else {
            this.$bvToast.toast("Permintaan gagal!", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    badgeStatus(status) {
      let badgeClass;
      switch (status) {
        case "Approved":
          badgeClass = "badge badge-success";
          break;
        case "Approved":
          badgeClass = "badge badge-success";
          break;
        default:
          badgeClass = "badge badge-secondary";
          break;
      }
      return badgeClass;
    },
    handleUploadedFile(param) {
      this.files[param] =
        this.$refs[param] && this.$refs[param].files
          ? this.$refs[param].files[0]
          : this.$refs[param][0].files[0];
      console.log(this.files[param]);
      // this.$refs[param].closest(
      //   ".custom-file"
      // ).children[1].textContent = this.files[param].name;

      let reader = new FileReader();
      reader.onload = function (e) {
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
              if (!this.dataFiles[param]) {
                this.dataFiles[param] = {
                  type: param,
                  file: res.data.image_url
                };
                // this.dataFiles[param].file = res.data.image_url;
                console.log(this.dataFiles[param]);
              }
            }
            return;
          })
          .catch(err => {
            console.log(err);
            this.catchError(err);
          })
          .finally(() => (this.loading = false));
      }
    }
  }
};
</script>
