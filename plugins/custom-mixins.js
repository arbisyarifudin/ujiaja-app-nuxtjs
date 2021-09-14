import Vue from "vue";

Vue.mixin({
  methods: {
    showError(field) {
      //   this.$translate.setLang("id_ID");
      if (
        this.$store.state.dataError[field] !== undefined &&
        this.$store.state.dataError[field].length > 0
      ) {
        let html = `<div class="form-error__info">
                     ${this.$store.state.dataError[field][0]}
                    </div>`;
        return html;
      }
      return "";
    },
    inputError(field) {
      if (
        this.$store.state.dataError[field] !== undefined &&
        this.$store.state.dataError[field].length > 0
      ) {
        return "form-control form-error";
      }
      return "form-control";
    },
    catchError(error) {
      console.log("catchError", error.response);
      if (error.response && error.response.status == 401) {
        this.$bvToast.toast("Unauthorized!", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000
        });
      } else if (error.response && error.response.status == 403) {
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
});
