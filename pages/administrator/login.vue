<template>
  <div class="wrapper super-admin">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mb-4 px-md-5 order-md-1 order-2">
          <h2 class="text-primary mb-5 form-login__title">Login</h2>
          <div class="mr-md-5">
            <form @submit.prevent="validateForm" class="form-login">
              <div class="form-group">
                <label for="username">Email/Username</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  autocomplete="false"
                  v-model="form.username"
                />
                <!-- <div v-html="showError('username')"></div> -->
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    id="password"
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
                          showPassword ? 'fa-eye-slash' : 'fa-eye'
                        ]"
                        style="pointer-events: none"
                      ></i
                    ></span>
                  </div>
                </div>
                <!-- <div v-html="showError('password')"></div> -->
              </div>
              <div class="button">
                <button
                  class="btn btn-primary btn-block"
                  type="submit"
                  :disabled="loading"
                >
                  <b-spinner small class="mr-2" v-if="loading"></b-spinner>
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          class="
            col-md-6
            mb-4
            px-md-5
            mt-n5
            order-md-2 order-1
            d-none d-sm-block
          "
        >
          <div
            class="
              d-md-block d-flex
              align-items-center
              justif-content-center
              form-login__kanan
            "
          >
            <img :src="ApiUrl(navData.logo)" class="img-fluid pb-md-5 logo" style="width: 200px"/>
            <div>
              <h2 class="text-primary mess-title">Selamat datang!</h2>
              <p class="mess-subtitle">
                Jangan lupa untuk kelola data dengan bijak ya...
              </p>
              <p class="mess-subtitle d-md-block d-none">Butuh bantuan?</p>
              <a
                target="_blank"
                href="https://wa.me/6281329756856?text=Halo%2C+saya+dari+ujiaja.com+memiliki+masalah+pada+bagian+login+Administrator."
                class="
                  btn btn-outline-warning
                  fill
                  btn-sm
                  px-3
                  py-2
                  d-md-inline d-none
                "
                role="button"
                >Hubungi Developer</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth-guest",
  layout: "plain",
  head() {
    return {
      title: 'Login'
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
      seo_web_name: getSetting('seo_web_name'),
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
      showPassword: false,
      form: {
        username: "",
        password: ""
      },
      loading: false,
      dataError: [],
      isValidForm: {}
    };
  },
  watch: {
    showPassword: function(value) {
      console.log(value);
    },
    "form.username": function(value) {
      return;
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
    "form.password": function(value) {
      // var passwordRegex =
      //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
      // var test = value.match(passwordRegex);
      // if (value && test === null) {
      //   this.$set(this.dataError, "password", [
      //     "Password minimal 8 - 20 karakter. Dengan setidaknya terdapat 1 huruf kapital, 1 angka dan 1 karakter spesial.",
      //   ]);
      //   this.isValidForm["password"] = false;
      // } else {
      //   this.$set(this.dataError, "password", [""]);
      //   this.isValidForm["password"] = true;
      // }
      if (value && value.length < 6) {
        this.$set(this.dataError, "password", ["Password terlalu pendek."]);
        this.isValidForm["password"] = false;
      } else {
        this.$set(this.dataError, "password", [""]);
        this.isValidForm["password"] = true;
      }
    },

    "form.email": function(value) {
      return;
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var test = value.match(emailRegex);
      if (value && test === null) {
        this.$set(this.dataError, "email", ["Mohon masukkan email valid."]);
        this.isValidForm["email"] = false;
      } else {
        this.$set(this.dataError, "email", [""]);
        this.isValidForm["email"] = true;
      }
    }
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
    validateForm() {
      this.dataError = [];

      if (!this.form.password || !this.form.username) {
        this.$bvToast.toast("Mohon lengkapi form login terlebih dahulu!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000
        });
        return;
      }

      //   if (Object.values(this.isValidForm).includes(false)) {
      //     this.$bvToast.toast("Mohon lengkapi form login dengan benar!", {
      //       title: "Peringatan",
      //       variant: "warning",
      //       solid: true,
      //       autoHideDelay: 3000,
      //     });
      //     return;
      //   }

      this.onSubmit();
    },
    onSubmit() {
      console.log(this.form);
      this.loading = true;

      this.$axios
        .$post(`/api/users/login`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast(
              "Login berhasil! Anda akan segera dialihkan ke halaman dashboard.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
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
                maxAge: 60 * 60 * 24 * 7
              });
              this.$store.commit("SET_IS_AUTH", true);
              this.$store.commit("set", ["dataUser", res.data]);
              // this.$router.replace(`/app/${role}/dashboard`);
              // this.$router.replace("/administrator/dashboard");
              window.location.href = window.origin + "/administrator/dashboard";
            }
          } else {
            this.$bvToast.toast("Login gagal! Kredensial tidak valid.", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000
            });
          }
        })
        .catch(err => {
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    catchError(error) {
      console.log("catchError", error);
      if (error.response && !error.response.data.success) {
        if (error.response.status == 400) {
          this.$bvToast.toast("Login gagal! Email belum diverifikasi.", {
            title: "Error",
            variant: "danger",
            solid: true,
            autoHideDelay: 3000
          });
          return;
        } else if (error.response.status == 422) {
          this.$bvToast.toast("Login gagal! Kredensial tidak valid.", {
            title: "Error",
            variant: "danger",
            solid: true,
            autoHideDelay: 3000
          });
          return;
        }
      }
      if (error.response && error.response.status == 401) {
        this.$bvToast.toast("Akses dilarang!", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000
        });
      } else if (
        error.response &&
        (error.response.status == 500 || error.response.status == 400)
      ) {
        this.$bvToast.toast("Ups! Terjadi kesalahan di sisi server.", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000
        });
      } else if (error.response && error.response.status == 504) {
        this.$bvToast.toast("Ups! Mohon periksa koneksi Anda.", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000
        });
      } else if (error.response && error.response.status == 422) {
        for (let key in error.response.data.messages) {
          this.$set(this.dataError, key, [error.response.data.messages[key]]);
          // store.commit("putError", [key, [error.response.data.messages[key]]]);
          this.$bvToast.toast(error.response.data.messages[key][0], {
            title: "Info",
            variant: "info",
            solid: true,
            autoHideDelay: 3000
          });
        }
      } else {
        this.$bvToast.toast("Ups! Terjadi kesalahan. Mohon ulangi kembali.", {
          title: "Error",
          variant: "warning",
          solid: true,
          autoHideDelay: 3000
        });
      }
      // store.commit("set", ["loading", false]);
      // return "error";
    }
  }
};
</script>

<style>
@import url("@/assets/ano/admin.css");
@import url("@/assets/admin.css");
</style>
