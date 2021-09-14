<template>
  <div>
    <Header class="headerdua no-bg mx-lg-5" />
    <ContentWrapper>
      <div class="container">
        <div class="row d-flex justify-content-center" v-if="!submited">
          <div class="col-md-8 lp-password">
            <h4 class="text-center mb-5">Atur Ulang Kata Sandi</h4>
            <form @submit.prevent="validateForm" class="form-user">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control pl-0"
                  id="email"
                  placeholder="ujiaja@gmail.com"
                />
                <div v-html="showError('email')"></div>
              </div>
              <div class="button text-center">
                <button
                  class="btn btn-primary py-2 my-3"
                  type="submit"
                  :disabled="loading"
                >
                  <b-spinner small class="mr-2" v-if="loading"></b-spinner>
                  Kirim Email Verifikasi
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="row d-flex justify-content-center" v-else>
          <div class="col-md-8 lp-password text-center">
            <img src="/say-reset.png" class="img-fluid mb-4" />
            <h4 class="text-center mb-2">Periksa emailmu!</h4>
            <p class="text-center mb-3 pb-0">
              Kami telah mengirimkan permintaan perubahan kata sandi ke alamat
              emailmu.
            </p>
            <div class="button text-center">
              <button
                class="btn btn-primary btn-sm py-2"
                type="button"
                @click.prevent="$router.replace('/masuk')"
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
      },
      loading: false,
      dataError: [],
      isValidForm: {},
      submited: false,
    };
  },
  watch: {
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

      if (!this.form.email) {
        this.$set(this.dataError, "email", [
          "Mohon masukkan email Anda terlebih dahulu.",
        ]);
        this.isValidForm["email"] = false;
      }

      if (Object.values(this.isValidForm).includes(false)) {
        // this.$bvToast.toast("Mohon lengkapi form lupa password dengan benar!", {
        //   title: "Peringatan",
        //   variant: "warning",
        //   solid: true,
        //   autoHideDelay: 3000,
        // });
        return;
      }

      this.onSubmit();
    },
    onSubmit() {
      this.loading = true;

      this.$axios
        .$post(`/api/resetPassword`, this.form)
        .then((res) => {
          console.log(res);
          if (res.success) {
            // this.$root.$bvToast.toast(
            //   "Permintaan berhasil dikirimkan. Silakan cek email Anda untuk lakukan proses ubah password.",
            //   {
            //     title: "Sukses",
            //     variant: "success",
            //     solid: true,
            //     autoHideDelay: 5000,
            //     toaster: "b-toaster-top-center",
            //   }
            // );
            this.submited = true;
            // this.$router.push("/masuk");
          } else {
            this.$bvToast.toast("Permintaan gagal dikirim!", {
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
            (err.response && !err.response.data.success)
          ) {
            this.$bvToast.toast(err.response.data.message, {
              title: "Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000,
            });
            // this.$router.replace("/masuk");
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