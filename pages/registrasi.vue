<template>
  <div>
    <Header class="headerdua no-bg mx-lg-5" :navData="navData" />

    <ContentWrapper>
      <b-container>
        <div
          class="login-box"
          style="
            background: #fdfdfd;
            box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.08);
            border-radius: 4px;
          "
        >
          <div class="row mb-5 mt-5 jus align-items-stretch">
            <div class="col-md-5">
              <div class="kiri h-100 d-flex align-items-center px-5">
                <div id="kiri-slider" class="flex-none w-100">
                  <no-ssr>
                    <vue-tiny-slider
                      v-bind="tinySliderOptions"
                      class="flex-none"
                    >
                      <div class="text-center">
                        <img src="/reg-siswa.png" />
                        <h4 class="judul">Belajar Efektif Bersama UjiAja</h4>
                        <p>
                          Nikmati bebas akses dan bebas biaya untuk pembahasan
                          soal tryout dan kunci jawaban sesuai kurikulum.
                        </p>
                      </div>
                      <div class="text-center">
                        <img src="/reg-siswa.png" />
                        <h4 class="judul">Belajar Efektif Bersama UjiAja</h4>
                        <p>
                          Nikmati bebas akses dan bebas biaya untuk pembahasan
                          soal tryout dan kunci jawaban sesuai kurikulum.
                        </p>
                      </div>
                    </vue-tiny-slider>
                  </no-ssr>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="kanan mx-5 my-5">
                <div class="d-flex align-items-center mb-4">
                  <img src="/logo.png" class="img-fluid" style="width: 10%" />
                  <img
                    src="/logo-text.png"
                    class="img-fluid"
                    style="width: 10%"
                  />
                </div>
                <h3>Daftar Akun</h3>
                <!-- <button class="btn btn-outline-primary mr-2" type="button">
                  Siswa
                </button>
                <button class="btn btn-outline-primary" type="button">
                  Guru
                </button> -->
                <form
                  action=""
                  class="form-user"
                  @submit.prevent="validateForm"
                >
                  <b-form-group class="mt-3">
                    <b-form-radio-group
                      id="tipe-user"
                      :options="[
                        { text: 'Siswa', value: 'siswa' },
                        { text: 'Tentor', value: 'teacher' },
                      ]"
                      button-variant="outline-primary"
                      name="radio-btn-outline"
                      v-model="tipe_user"
                      buttons
                    ></b-form-radio-group>
                  </b-form-group>
                  <div class="form-group">
                    <label for="name">Nama Lengkap</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="name"
                      placeholder="Nama Lengkap"
                      v-model="form.nama_lengkap"
                    />
                  </div>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="Username"
                      placeholder="Username"
                      v-model="form.username"
                    />
                    <div v-html="showError('username')"></div>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <div class="input-group">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control pl-0"
                        id="password"
                        placeholder="Password"
                        autocomplete="new-password"
                        v-model="form.password"
                      />
                      <div
                        class="input-group-append"
                        @click.prevent="showPassword = !showPassword"
                        style="cursor: pointer"
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
                    <div v-html="showError('password')"></div>
                  </div>
                  <div class="form-group">
                    <label for="repassword">Konfirmasi Password</label>
                    <input
                      type="password"
                      class="form-control pl-0"
                      id="repassword"
                      placeholder="Password"
                      autocomplete="new-password"
                      v-model="repassword"
                    />
                    <div v-html="showError('repassword')"></div>
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="email"
                      placeholder="Email"
                      autocomplete="false"
                      v-model="form.email"
                    />
                    <div v-html="showError('email')"></div>
                  </div>
                  <div class="form-group">
                    <label for="select">Mendapat Informasi UjiAja Dari</label>
                    <select
                      class="form-control pl-0"
                      id="select"
                      v-model="form.info"
                    >
                      <option value="">Pilih Sumber</option>
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
                  <div class="form-group">
                    <label for="phone">No. HP/WA</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="phone"
                      placeholder="No. HP/WA"
                      v-model="form.nomor_telephone"
                    />
                    <div v-html="showError('nomor_telephone')"></div>
                  </div>
                  <div class="form-group">
                    <label
                      >Sudah Punya Akun?
                      <a href="/masuk" class="masuk-daftar"> Masuk</a></label
                    >
                  </div>
                  <div class="button">
                    <button
                      class="btn btn-outline-primary py-2 my-3 btn-block"
                      type="submit"
                      :disabled="loading"
                    >
                      <b-spinner small class="mr-2" v-if="loading"></b-spinner>
                      Registrasi
                    </button>
                  </div>
                </form>
                <div class="text-center px-4 pt-2">
                  <p class="small">
                    Dengan masuk ke UjiAja, saya menyetujui <br />
                    <a href="#" style="color: #baadff">Ketentuan Pengguna</a>
                    serta
                    <a href="#" style="color: #baadff">Kebijakan Privasi</a>
                    yang berlaku.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-container>
    </ContentWrapper>

    <Footer :footerData="footerData" />
  </div>
</template>

<script>
import ContentWrapper from "@/components/Layout/ContentWrapper";
export default {
  middleware: "auth-guest",
  components: { ContentWrapper },
  head() {
    return {
      title: 'Registrasi',
    }
  },
  data() {
    return {
      showPassword: false,
      tinySliderOptions: {
        mouseDrag: false,
        autoplay: true,
        autoplayButtonOutput: false,
        loop: true,
        nav: true,
        controls: false,
        gutter: 20,
        swipeAngle: 45,
        items: 1,
      },
      loading: false,
      tipe_user: "siswa",
      repassword: "",
      form: {
        nama_lengkap: "",
        username: "",
        password: "",
        email: "",
        nomor_telephone: "",
        info: "",
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
    showPassword: function (value) {
      console.log(value);
    },
    "form.username": function (value) {
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
    "form.password": function (value) {
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
    repassword: function (value) {
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
    "form.email": function (value) {
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
    "form.nomor_telephone": function (value) {
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
  methods: {
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
    inputError(field) {
      if (
        this.dataError[field] !== undefined &&
        this.dataError[field].length > 0
      ) {
        return "form-control form-error";
      }
      return "form-control pl-0";
    },
    validateForm() {
      this.dataError = [];

      if (
        !this.form.nama_lengkap ||
        !this.form.username ||
        !this.form.password ||
        !this.form.email ||
        !this.form.nomor_telephone ||
        !this.form.info
      ) {
        this.$bvToast.toast("Mohon lengkapi form pendaftaran!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000,
        });
        return;
      }

      if (this.repassword && this.repassword !== this.form.password) {
        this.$set(this.dataError, "repassword", [
          "Password tidak sama. Mohon pelan-pelan.",
        ]);
        return;
      }

      if (Object.values(this.isValidForm).includes(false)) {
        this.$bvToast.toast("Mohon lengkapi form pendaftaran dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000,
        });
        return;
      }

      this.onSubmit();
    },
    onSubmit() {
      console.log(this.form);
      this.loading = true;

      //   this.$axios.defaults.headers.common["X-XSRF-TOKEN"] =
      //     this.getCookie("XSRF-TOKEN");

      this.$axios
        .$post(`/api/users/${this.tipe_user}`, this.form)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast(
              "Registrasi berhasil! Silakan cek email Anda untuk lakukan verifikasi.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000,
              }
            );
            this.$router.replace("/masuk");
          } else {
            this.$root.$bvToast.toast("Registrasi gagal!", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000,
            });
          }
        })
        .catch((err) => {
          // console.log(err);
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    catchError(error) {
      console.log("catchError", error.response);
      if (error.response && error.response.status == 401) {
        this.$bvToast.toast("Akses dilarang!", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      } else if (
        error.response &&
        (error.response.status == 500 || error.response.status == 400)
      ) {
        this.$bvToast.toast("Ups! Terjadi kesalahan di sisi server.", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      } else if (error.response && error.response.status == 504) {
        this.$bvToast.toast("Ups! Mohon periksa koneksi Anda.", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      } else if (error.response && error.response.status == 422) {
        // if (error.response.data.user_message) {
        //   this.$notify({
        //     text: error.response.data.user_message,
        //     position: "top-right",
        //     type: "warning",
        //   });
        // }
        for (let key in error.response.data.messages) {
          this.$set(this.dataError, key, [error.response.data.messages[key]]);
          // store.commit("putError", [key, [error.response.data.messages[key]]]);
          this.$bvToast.toast(error.response.data.messages[key][0], {
            title: "Info",
            variant: "info",
            solid: true,
            autoHideDelay: 3000,
          });
        }
      } else {
        this.$bvToast.toast("Ups! Terjadi kesalahan. Mohon ulangi kembali.", {
          title: "Error",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000,
        });
      }
      // store.commit("set", ["loading", false]);
      // return "error";
    },
  },
  asyncData(context) {
    function getSetting(key) {
      const settings = context.store.state.dataSetting;
      const foundSetting = settings.find(item => item.key == key);
      if(foundSetting) {
        return foundSetting.isi;
      }
      return '';
    }

    const navData = {
      logo: getSetting('logo'),
    }

    const footerData = {
      logo: getSetting('logo'),
      alamat_kantor: getSetting('alamat_kantor'),
      telp: getSetting('telp'),
      whatsapp: getSetting('whatsapp'),
      instagram: getSetting('instagram'),
      facebook: getSetting('facebook'),
      youtube: getSetting('youtube'),
      email: getSetting('email'),
    }

    return {
      navData,
      footerData
    }
  },
};
</script>