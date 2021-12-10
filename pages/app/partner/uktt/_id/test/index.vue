<template>
  <div class="container pos-relative ujian">
    <div class="ujian-wrapper bg-white" v-if="loading">
      <div class="row">
        <UILoading />
      </div>
    </div>
    <div class="ujian-wrapper" v-else>
      <div class="card ujian-guide-box">
        <div class="card-header">
          <h2 class="card-title">Petunjuk Pengerjaan</h2>
          <p class="mb-0">{{ tryout.judul }}</p>
        </div>
        <div class="card-body" v-html="tryout.panduan_pengerjaan"></div>
        <div class="card-footer d-flex justify-content-end">
          <a
            :href="`/app/tryout/${productId}/detail`"
            class="btn btn-outline-dark"
            >Kembali</a
          >
          <button class="btn btn-primary ml-3" v-b-modal.modal-confirm-start>
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-confirm-start"
      title="Konfirmasi Mulai Ujian"
      hide-footer
      centered
      :no-close-on-backdrop="loading"
      :no-close-on-esc="loading"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin memulai Ujian ini? Waktu mulai akan berjalan.
          Harap persiapkan diri kamu sebelum mulai ya!
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-confirm-start')"
            v-if="!loading"
          >
            Batal
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="onConfirmStartTest"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Ya, Saya
            Yakin
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  layout: "plain",
  // middleware: [
  //   function({ redirect }) {
  //     redirect("/app/tryout/mine");
  //   }
  // ]
  head() {
    return {
      bodyAttrs: {
        class: "bg-ujian"
      }
    };
  },
  data() {
    return {
      loading: true,
      tryout: {}
    };
  },
  async mounted() {
    if (!this.$route.params.id && !this.$route.query.tryout)
      return this.$router.go(-1);
    await this.getDetailUjian();
    this.getDetailTryout();
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.onCloseWindow);
    clearInterval(this.countdownTimer);
  },
  computed: {
    productId() {
      const encryptedProductIdSafe = decodeURIComponent(this.$route.params.id);
      const encryptedProductId = this.decrypt(encryptedProductIdSafe);
      return encryptedProductId;
    },
    tryoutId() {
      const encryptedTryoutIdSafe = decodeURIComponent(
        this.$route.query.tryout
      );
      const encryptedTryoutId = this.decrypt(encryptedTryoutIdSafe);
      return encryptedTryoutId;
    },
    user() {
      return this.$store.state.dataUser.user;
    }
  },
  methods: {
    resetModal() {},
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
    async getDetailUjian() {
      this.loading = true;
      await this.$axios
        .$get(`/api/tryout_user/per-tryout-produk/`, {
          params: {
            id_produk: this.productId,
            id_tryout: this.tryoutId
          }
        })
        .then(res => {
          if (res.success) {
            this.toTryoutTestPage();
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          // this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetailTryout() {
      this.loading = true;
      this.$axios
        .$get(`/api/tryout/find/${this.tryoutId}/detail`)
        .then(res => {
          console.log("tryout", res);
          if (res.success) {
            this.tryout = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    onConfirmStartTest() {
      this.loading = true;
      const dataSave = {
        id_user: null,
        id_produk: this.productId,
        id_tryout: this.tryoutId
      };
      this.$axios
        .post(`/api/tryout_user/create`, dataSave)
        .then(response => {
          console.log(response);
          this.$cookiz.remove("_ujiaja_temp_uktt_user");
          this.toTryoutTestPage();
        })
        .catch(error => console.log(error))
        .finally(() => {});
    },
    toTryoutTestPage() {
      const encryptedProductId = this.encrypt(this.productId);
      const encryptedProductIdSafe = encodeURIComponent(encryptedProductId);
      const encryptedTryoutId = this.encrypt(this.tryoutId);
      const encryptedTryoutIdSafe = encodeURIComponent(encryptedTryoutId);
      window.location.replace(
        `/app/partner/uktt/${encryptedProductIdSafe}/test/${encryptedTryoutIdSafe}`
      );
    },
    onCloseWindow(event) {
      console.log("unload", event);
      event.preventDefault();
      event.returnValue = "";
    }
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
</style>
