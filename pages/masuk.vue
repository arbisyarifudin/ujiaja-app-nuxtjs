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
                        <img src="/login-siswa.png" />
                        <h4 class="judul">Belajar Efektif Bersama UjiAja</h4>
                        <p>
                          Nikmati bebas akses dan bebas biaya untuk pembahasan soal tryout, kunci jawaban, analisa serta rekomendasi belajar dan pilihan jurusan.
                        </p>
                      </div>
                      <div class="text-center">
                        <img src="/login-siswa.png" />
                        <h4 class="judul">Belajar Efektif Bersama UjiAja</h4>
                        <p>
                          Dapatkan layanan prima dari tutor yang profesional, ramah, bersahabat, asyik dan terpercaya. 
                        </p>
                      </div>
                    </vue-tiny-slider>
                  </no-ssr>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="kanan mx-5 my-5">
                <div class="d-flex align-items-center">
                  <img
                    :src="ApiUrl(navData.logo)"
                    class="img-fluid my-4"
                    style="width: 12%"
                  />
                  <!-- <img src="/ujiAja.png" class="img-fluid" style="width: 7%" /> -->
                </div>
                <h3 class="masuk-akun mb-4">Masuk Akun</h3>
                <form
                  action=""
                  class="form-user"
                  @submit.prevent="validateForm"
                >
                  <div class="form-group">
                    <label for="username">Email/Username</label>
                    <input
                      type="text"
                      class="form-control pl-0"
                      id="username"
                      placeholder="Email/Username terdaftar"
                      autocomplete="false"
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
                  <div class="form-group d-flex justify-content-between">
                    <label
                      ><a href="/lupa-password" class="lupa"
                        >Lupa Password?</a
                      ></label
                    >
                    <label
                      >Belum Punya Akun?
                      <a href="/registrasi" class="masuk-daftar">
                        Daftar</a
                      ></label
                    >
                  </div>
                  <div class="button">
                    <button
                      class="btn btn-outline-primary py-2 my-3 btn-block"
                      type="submit"
                      :disabled="loading"
                    >
                      <b-spinner small class="mr-2" v-if="loading"></b-spinner>
                      Masuk
                    </button>
                  </div>
                </form>
                <!-- <div class="text-center px-4 pt-2">
                  <p class="small">
                    Dengan masuk ke UjiAja, saya menyetujui <br />
                    <span style="color: #baadff">Ketentuan Pengguna</span> serta
                    <span style="color: #baadff">Kebijakan Privasi</span>
                     yang berlaku.
                  </p>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </b-container>
    </ContentWrapper>
    <Footer :footerData="footerData"/>
  </div>
</template>

<script>
import ContentWrapper from "@/components/Layout/ContentWrapper";
export default {
  middleware: "auth-guest",
  components: { ContentWrapper },
  head() {
    return {
      title: 'Masuk',
      bodyAttrs: {
        class: "bg-soft"
      }
    }
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
  data() {
    return {
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
      showPassword: false,
      loading: false,
      form: {
        username: "",
        email: "",
        password: "",
      },
      dataError: [],
      isValidForm: {},
    };
  },
  watch: {
    showPassword: function (value) {
      console.log(value);
    },
    "form.username": function (value) {
      return;
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
      // if (value && value.length < 6) {
      //   this.$set(this.dataError, "password", ["Password terlalu pendek."]);
      //   this.isValidForm["password"] = false;
      // } else {
      //   this.$set(this.dataError, "password", [""]);
      //   this.isValidForm["password"] = true;
      // }
    },

    "form.email": function (value) {
      return;
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
  },
  methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
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

      if (!this.form.password || !this.form.username) {
        this.$bvToast.toast("Mohon lengkapi form masuk!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000,
        });
        return;
      }

      if (Object.values(this.isValidForm).includes(false)) {
        this.$bvToast.toast("Mohon lengkapi form masuk dengan benar!", {
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

      this.$axios
        .$post(`/api/users/login`, this.form)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$bvToast.toast(
              "Login berhasil! Anda akan segera dialihkan ke halaman dashboard aplikasi kami.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000,
              }
            );
            if (res.data) {
              // let role = res.data.user.role_user;
              // if (role == "siswa") {
              //   role = "student";
              // } else if (role == "teacher") {
              //   role = "partner";
              // }
              this.$cookiz.set("_ujiaja", res.data.token, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
              });
              this.$store.commit("SET_IS_AUTH", true);
              this.$store.commit("set", ["dataUser", res.data]);
              // this.$router.replace(`/app/${role}/dashboard`);
              // this.$router.replace("/app/dashboard");
              window.location.href = window.origin + "/app/dashboard";
            }
          } else {
            this.$bvToast.toast("Login gagal! Kredensial tidak valid.", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000,
            });
          }
        })
        .catch((err) => {
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    catchError(error) {
      console.log("catchError", error);
      if (error.response && !error.response.data.success) {
        if (
          (error.response.status == 400 || error.response.status == 422) &&
          error.response.data.message.includes("belum di verifikasi")
        ) {
          this.$bvToast.toast("Login gagal! Email belum diverifikasi.", {
            title: "Error",
            variant: "danger",
            solid: true,
            autoHideDelay: 3000,
          });
          return;
        } else if (error.response.status == 422) {
          this.$bvToast.toast("Login gagal! Kredensial tidak valid.", {
            title: "Error",
            variant: "danger",
            solid: true,
            autoHideDelay: 3000,
          });
        return;
        }
      }
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
};
</script>