<template>
  <div class="container pos-relative ujian">
    <div class="ujian-wrapper bg-white" v-if="loading">
      <div class="row">
        <UILoading />
      </div>
    </div>
    <div class="ujian-wrapper" v-else>
      <div class="card ujian-guide-box">
        <div class="timer-box">
          <h3 class="timer-title">Istirahat dulu ya!</h3>
          <div
            class="timer-countdown d-flex align-items-center justify-content-center"
          >
            <!-- <i class="far fa-clock fa-fw mr-1" style="font-size: 60%"></i>  -->
            00:00
          </div>
          <p>
            Tunggu sampai jeda waktu selesai dan kita akan lanjut ke sesi
            berikutnya...
          </p>
          <p class="small text-danger">
            * Dimohon untuk tidak keluar dari halaman ini
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "plain",
  head() {
    return {
      bodyAttrs: {
        class: "bg-ujian"
      }
    };
  },
  data() {
    return {
      loading: false,
      tryout: {},
      countdownTimer: null,
      newUjian: {}
    };
  },
  computed: {
    productId() {
      const encryptedProductIdSafe = decodeURIComponent(this.$route.params.id);
      const encryptedProductId = this.decrypt(encryptedProductIdSafe);
      return encryptedProductId;
    },
    tryoutId() {
      const encryptedTryoutIdSafe = decodeURIComponent(
        this.$route.params.tryout
      );
      const encryptedTryoutId = this.decrypt(encryptedTryoutIdSafe);
      return encryptedTryoutId;
    },
    user() {
      return this.$store.state.dataUser.user;
    }
  },
  async mounted() {
    window.addEventListener("beforeunload", this.onCloseWindow);
    await this.getDetailTryout();
    this.startTimer();
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.onCloseWindow);
    clearInterval(this.countdownTimer);
  },
  methods: {
    encrypt(text) {
      if (typeof text !== "string") {
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
    toTryoutTestPage(productID, tryoutID) {
      const encryptedProductId = this.encrypt(productID);
      const encryptedProductIdSafe = encodeURIComponent(encryptedProductId);
      const encryptedTryoutId = this.encrypt(tryoutID);
      const encryptedTryoutIdSafe = encodeURIComponent(encryptedTryoutId);
      window.location.replace(
        `/user/tryout/${encryptedProductIdSafe}/test/${encryptedTryoutIdSafe}?kode=${this.$route.query.kode}${this.$route.query.id_mapel ? '&id_mapel=' + this.$route.query.id_mapel : ''}`
      );
    },
    onCloseWindow(event) {
      console.log("unload", event);
      event.preventDefault();
      event.returnValue = "";
    },
    async getDetailTryout() {
      this.loading = true;
      await this.$axios
        .$get(`/api/tryout/find/${this.tryoutId}/detail`)
        .then(res => {
          console.log("tryout", res);
          if (res.success) {
            this.tryout = res.data;
            console.log("hasil detail tryout", res);
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    startTimer() {
      // if(){

      // }
      
      const moment = require("moment");
      // const jeda_waktu = (this.tryout.jeda_waktu) * 1000 * 60; // Minute
      // const jeda_waktu = (this.tryout.jeda_waktu) * 1000; // Second
      const encryptedJedaWaktuSafe = decodeURIComponent(this.$route.query.jedasubtes);
      const encryptedJedaWaktu = this.decrypt(encryptedJedaWaktuSafe);
      const jeda_waktu =  encryptedJedaWaktu;//second from query
      let duration = moment.duration(jeda_waktu, "milliseconds");
      console.log(jeda_waktu);
      const interval = 1000;
      const countdownElement = document.querySelector(".timer-countdown");
      // const countdownElement = boardTimer.children[1];

      console.log(duration.hours(), duration.minutes(), duration.seconds());
      // return;

      this.countdownTimer = setInterval(
        function() {
          duration = moment.duration(duration - interval, "milliseconds");
          const minutes =
            duration.minutes() >= 10
              ? duration.minutes()
              : "0" + duration.minutes();
          const seconds =
            duration.seconds() >= 10
              ? duration.seconds()
              : "0" + duration.seconds();
          // if (duration.minutes() < 2) {
          //   boardTimer.classList.add("text-danger");
          // }
          if (
            duration.minutes() >= 0 &&
            duration.seconds() > 0
          ) {
            console.log("time is running..");
            countdownElement.textContent = minutes + ":" + seconds;
          } else {
            console.log("> Jeda waktu selesai!");
            this.goToNext();
          }
          console.log(duration.hours(), duration.minutes(), duration.seconds());
        }.bind(this),
        interval
      );
    },
    async goToNext() {
      console.log("goToNext");
      this.loading = true;
      clearInterval(this.countdownTimer)
      if (!this.$route.query.id_mapel) {
        const newUjian = await this.createTryoutUser();
        console.log(newUjian)
        if(newUjian) {
          window.removeEventListener("beforeunload", this.onCloseWindow);
          this.toTryoutTestPage(this.productId, newUjian.id_tryout);
        } else {
          this.showToastMessage('Duplicate data!');
          // window.location.replace('/user/tryout/' + this.productId + '/detail')
        }
      } else {
          this.toTryoutTestPage(this.productId, this.tryoutId); 
      }
    },
    async createTryoutUser() {
      this.loading = true;
      const dataSave = {
        id_user: null,
        id_produk: this.productId,
        id_tryout: this.tryoutId,
        referensi: this.$route.query.kode
      };
      return await this.$axios
        .post(`/api/tryout_user/create`, dataSave)
        .then(response => {
          console.log(response);
          this.newUjian = response.data;
          return response.data.data;
        })
        .catch(error => {
          console.log(error)
          return false
        });
    },
  }
};
</script>

<style>
/* @import url("@/assets/ano/admin.css"); */
@import url("@/assets/admin.css");
</style>

<style scoped>
.btn-light {
  background-color: #f8f9fa !important;
}
.btn-light:hover {
  background-color: #f5f5f5 !important;
  color: #baadff;
}
.btn-light:active,
.btn-light:focus {
  background-color: #f5f5f5 !important;
  color: #baadff !important;
  border: 1px solid #f5f5f5;
}

.ujian-guide-box {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.timer-box {
  width: 350px;
  max-width: 100%;
}
.timer-title {
  font-size: 25px;
}
.timer-countdown {
  font-size: 50px;
  font-weight: 500;
  margin: 15px 0;
}
</style>
