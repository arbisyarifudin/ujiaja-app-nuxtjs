import Vue from "vue";

Vue.mixin({
  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: true
      },
    }
  },
  methods: {
    arrayCompare(a1, a2) {
      if (a1.length != a2.length) return false;
      var length = a2.length;
      for (var i = 0; i < length; i++) {
        if (a1[i] !== a2[i]) return false;
      }
      return true;
    },
    inArray(needle, haystack) {
      var length = haystack.length;
      for (var i = 0; i < length; i++) {
        if (typeof haystack[i] == "object") {
          if (this.arrayCompare(haystack[i], needle)) return true;
        } else {
          if (haystack[i] == needle) return true;
        }
      }
      return false;
    },
    getBase64(file, callback, callbackError) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        callback(reader.result);
      };
      reader.onerror = function(error) {
        callbackError(error);
      };
    },

    downloadURI(uri, name) {
      const link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    formatRupiah(nominal) {
      if (nominal) {
        nominal = parseFloat(nominal);
        return nominal.toLocaleString("id-ID");
      }
      return 0;
    },
    moment(param) {
      const moment = require("moment");
      moment.locale("id");
      return moment(param);
    },
    formatTanggal(date, format) {
      if (!date) {
        return "?";
      }
      // this.moment.locale("id");
      if (!format) {
        format = "Do MMMM YYYY";
      }
      const formatted = this.moment(date).format(format);
      return formatted;
    },
    formatSelisih(startDate, endDate, unit = "days") {
      let start = this.moment(startDate);
      let end = this.moment(endDate);
      return end.diff(start, unit);
    },
    isPayable(detail, tipe) {
      if (detail) {
        if (tipe == "Bank Transfer") {
          const statusPayable = [
            "Menunggu Pembayaran",
            "Menunggu Verifikasi",
            "Ditolak"
          ];
          console.log(statusPayable.includes(detail.status));
          if (statusPayable.includes(detail.status)) {
            return true;
          }
          return false;
        } else if (tipe == "Pihak Ketiga") {
          const statusPayable = [
            "Menunggu Pembayaran",
            "Menunggu Verifikasi",
            "Ditolak"
          ];
          console.log(statusPayable.includes(detail.status));
          if (statusPayable.includes(detail.status)) {
            return true;
          }
        }
      }
      return false;
    },
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
    isHavePermission(moduleName, actionName) {
      // console.log(this.perms);
      const userRole = this.$store.state.user.role_user
      // console.log('userRole',userRole)
      if(userRole == 'superAdmin') return true
      const userPermissions = this.$store.state.userPermissions;
      if(!userPermissions) return false
      const moduleFound = userPermissions.find(module => moduleName.includes(module.label));
      if (moduleFound) {
        // console.log('moduleFound', moduleFound)
        const actionFound = moduleFound.actions.find(
          action => action.label == actionName
        );
        if (actionFound) {
          // console.log("actionFound", actionFound);
          if (actionFound.allow) {
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    },
    getLevelName(id) {
      // console.log(id)
      const levels = ['BASE', 'SUPER', 'ELITE', 'MASTER', 'LEGEND', ''];
      return levels[id-1];
    },
    getHadiahLevelName(id) {
      // console.log(id)
      const levels = ['BASE', 'SUPER', 'ELITE', 'MASTER', 'LEGEND'];
      return levels[id];
    },
    getSetting(key) {
      const settings = this.$store.state.dataSetting;
      const foundSetting = settings.find(item => item.key == key);
      if(foundSetting) {
        return foundSetting.isi;
      }
      return '';
    },
    getNotif() {
      this.$axios
        .$get("/api/notification", {
          params: {}
        })
        .then(response => {
          if (response.success) {
            this.$store.commit("set", ["notifData", response.data.data]);
            this.$store.commit("set", ["notifTotal", response.data.total]);
          }
        });
    },
    appLogout() {
      const role =
        this.$store.state.dataUser &&
        this.$store.state.dataUser.user &&
        this.$store.state.dataUser.user.role_user;
      let path;
      switch (role) {
        case "siswa":
          path = "/masuk";
          break;
        case "parent":
          path = "/masuk";
          break;
        case "teacher":
          path = "/masuk";
          break;
        case "superAdmin":
          path = "/administrator/login";
          break;
        case "admin":
          path = "/administrator/login";
          break;
        default:
          path = "/masuk";
          break;
      }
      // this.$router.replace(path);
      window.location.href = window.origin + path;
      this.$cookiz.remove("_ujiaja");
      this.$store.commit("SET_IS_AUTH", false);
      // this.$store.commit("set", ["dataUser", {}]);
    },
    ApiUrl(param, no_separator = false) {
      if(no_separator)  {
        return process.env.apiUrl + param;
      }
      return process.env.apiUrl + "/" + param;
    },
    BaseUrl(param, no_separator = false) {
      if(no_separator)  {
        return process.env.baseUrl + param;
      }
      return process.env.baseUrl + "/" + param;
    },
    isHavePermission(param, no_separator = false) {
      if(no_separator)  {
        return process.env.baseUrl + param;
      }
      return process.env.baseUrl + "/" + param;
    },
    noImage(event) {
      event.target.src = `${window.origin}/logo-baru.png`;
    },
    noAvatar(event) {
      event.target.src = `${window.origin}/avatar.jpg`;
    },
    showToastMessage(message = "Pesan", type = "danger", duration = 3000) {
      this.$root.$bvToast.toast(message, {
        title: "Pesan",
        variant: type,
        solid: true,
        autoHideDelay: duration
      });
    },
    encrypt(text) {
      if(typeof text !== 'string') {
        text = text.toString();
      }
      const CryptoJS = require("crypto-js");
      const passphrase = "123";
      return CryptoJS.AES.encrypt(text, passphrase).toString();
    },
    decrypt(ciphertext) {
      const CryptoJS = require("crypto-js");
      const passphrase = "123";
      const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText;
    },
    catchError(error) {
      console.log("catchError", error, error.response);
      if (error.response && error.response.status == 401) {
        this.$root.$bvToast.toast("Anda belum login!", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000
        });
        this.appLogout();
        return;
      } else if (error.response && error.response.status == 403) {
        this.$root.$bvToast.toast("Akses dilarang!", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000
        });
        // this.appLogout();
        const userRole = this.$store.state.dataUser ? this.$store.state.dataUser.user.role_user : null;
        if(userRole.includes('teacher') || userRole.includes('siswa')) {
          this.$router.replace("/app/dashboard");
        } else {
          this.$router.replace("/administrator/dashboard");
        }
        return;
      } else if (
        error.response &&
        (error.response.status == 500 || error.response.status == 400)
      ) {
        this.$root.$bvToast.toast("Ups! Terjadi kesalahan di sisi server.", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000
        });
      } else if (error.response && error.response.status == 504) {
        this.$root.$bvToast.toast("Ups! Mohon periksa koneksi Anda.", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000
        });
      } else if (error.response && error.response.status == 422) {
        for (let key in error.response.data.messages) {
          if(key == 'soal') {
            this.$cookiz.remove("_ujiaja_temp_mbti_user");
          }
          // console.log(key, error.response.data);
          // this.$set(this.dataError, key, [error.response.data.messages[key]]);
          this.$store.commit("putError", [
            key,
            [error.response.data.messages[key]]
          ]);
          this.$root.$bvToast.toast(error.response.data.messages[key][0], {
            title: "Peringatan",
            variant: "warning",
            solid: true,
            autoHideDelay: 3000
          });
        }
      } else if (error.response && error.response.status == 404) {
        this.$root.$bvToast.toast("Data yang diminta tidak ditemukan!", {
          title: "Error 404",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000
        });
      } else {
        this.$root.$bvToast.toast(
          "Ups! Terjadi kesalahan. Mohon ulangi kembali.",
          {
            title: "Error",
            variant: "warning",
            solid: true,
            autoHideDelay: 3000
          }
        );
      }
      // store.commit("set", ["loading", false]);
      // return "error";
    }
  }
});
