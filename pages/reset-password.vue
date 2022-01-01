<template>
  <div>
    <Header class="headerdua no-bg mx-lg-5" :navData="navData" />
    <ContentWrapper>
      <div class="container">
        <div class="row d-flex justify-content-center" v-if="!submited">
          <div class="col-md-8 lp-password">
            <h4 class="text-center mb-5">Ganti Password Anda</h4>
            <form @submit.prevent="validateForm" class="form-user">
              <div class="form-group">
                <label for="password">Password Baru</label>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control pl-0"
                    id="password"
                    v-model="form.password"
                    placeholder="Masukkan password baru"
                    autocomplete="new-passowrd"
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
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control pl-0"
                    id="repassword"
                    v-model="form.repassword"
                    placeholder="Konfirmasi password baru"
                    autocomplete="new-passowrd"
                  />
                  <!-- <div class="input-group-append">
                    <span class="input-group-text bg-transparent"
                      ><i class="fa fa-eye-slash"></i
                    ></span>
                  </div> -->
                </div>
                <div v-html="showError('repassword')"></div>
              </div>
              <div class="button text-center">
                <button
                  class="btn btn-primary py-2 my-3"
                  type="submit"
                  :disabled="loading"
                >
                  <b-spinner small class="mr-2" v-if="loading"></b-spinner>
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="row d-flex justify-content-center" v-else>
          <div class="col-md-8 lp-password text-center">
            <img src="/gantisandi.png" class="img-fluid mb-4" />
            <h4 class="text-center mb-2">Selamat</h4>
            <p class="text-center mb-3 pb-0">
              Kamu sudah berhasil mengubah passwordmu. Silahkan masuk/login
              dengan menekan tombol dibawah.
            </p>

            <div class="button text-center">
              <button
                class="btn btn-primary btn-sm py-2"
                type="button"
                @click.prevent="$router.replace('/masuk')"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
    <Footer :footerData="footerData" />
  </div>
</template>

<script>
export default {
  middleware: "auth-guest",
  head() {
    return {
      title: 'Ganti Password',
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
      form: {
        password: "",
        repassword: "",
      },
      loading: false,
      showPassword: false,
      dataError: [],
      isValidForm: {},
      submited: false,
    };
  },
  watch: {
    showPassword: function (value) {
      console.log(value);
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
      if (this.form.repassword && value !== this.form.repassword) {
        this.$set(this.dataError, "repassword", [
          "Password tidak sama. Mohon pelan-pelan.",
        ]);
        this.isValidForm["repassword"] = false;
      } else {
        this.$set(this.dataError, "repassword", [""]);
        this.isValidForm["repassword"] = true;
      }
    },
    "form.repassword": function (value) {
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
    validateForm() {
      this.dataError = [];

      if (!this.form.password) {
        this.$set(this.dataError, "password", ["Masukkan password baru Anda."]);
        this.isValidForm["password"] = false;
      }

      if (!this.form.repassword) {
        this.$set(this.dataError, "repassword", [
          "Harap Konfirmasi password baru Anda.",
        ]);
        this.isValidForm["repassword"] = false;
      }

      if (this.form.repassword && this.form.repassword !== this.form.password) {
        this.$set(this.dataError, "repassword", [
          "Konfirmasi password tidak sama dengan Password Baru.",
        ]);
        this.isValidForm["repassword"] = false;
      }

      if (Object.values(this.isValidForm).includes(false)) {
        // this.$bvToast.toast("Mohon lengkapi form ubah password!", {
        //   title: "Peringatan",
        //   variant: "warning",
        //   solid: true,
        //   autoHideDelay: 3000,
        // });
        return;
      }

      console.log(this.isValidForm);

      this.onSubmit();
    },
    onSubmit() {
      this.loading = true;

      const dataSubmit = {
        token: this.$route.query.token,
        new_password: this.form.password,
      };

      this.$axios
        .$post(`/api/activePassword`, dataSubmit)
        .then((res) => {
          console.log(res);
          if (res.success) {
            // this.$root.$bvToast.toast(
            //   "Password baru berhasil disimpan! Silakan login.",
            //   {
            //     title: "Sukses",
            //     variant: "success",
            //     solid: true,
            //     autoHideDelay: 5000,
            //     toaster: "b-toaster-top-center",
            //   }
            // );
            this.submited = true;
            // this.$router.replace("/masuk");
          } else {
            this.$bvToast.toast("Password baru gagal disimpan!", {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000,
            });
          }
        })
        .catch((err) => {
          // console.log(err);
          if (
            (err.response && err.response.status == 422) ||
            (err.response && err.response.status == 400) ||
            (err.response && !err.response.data.success)
          ) {
            this.$root.$bvToast.toast(err.response.data.message, {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000,
            });
            this.$router.replace("/masuk");
            return;
          }
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>