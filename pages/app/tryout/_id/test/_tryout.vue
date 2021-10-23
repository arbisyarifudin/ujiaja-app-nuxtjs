<template>
  <div class="container pos-relative ujian">
    <div class="ujian-wrapper bg-white" v-if="loading">
      <div class="row">
        <UILoading />
      </div>
    </div>
    <div
      class="ujian-wrapper"
      v-else-if="!loading && detail.is_task_start && !detail.is_task_done"
    >
      <div class="row">
        <div class="col-md-8">
          <div class="question-board bg-white p-4">
            <div class="left-section">
              <h2 class="product-name">{{ tryout.judul }}</h2>
              <!-- <hr /> -->
              <div class="row no-gutters">
                <table class="col-sm-6 table table-borderless table-sm mb-1">
                  <tr>
                    <th width="130">Mata Pelajaran</th>
                    <td width="10">:</td>
                    <td v-text="currentNomor.nama_mapel"></td>
                  </tr>
                  <tr>
                    <th width="130">Jumlah Soal</th>
                    <td width="10">:</td>
                    <td>{{ currentNomor.jumlah_soal }} Soal</td>
                  </tr>
                </table>

                <table class="col-sm-6 table table-borderless table-sm mb-1">
                  <tr>
                    <th width="130">Bab Mapel</th>
                    <td width="10">:</td>
                    <td>
                      <span
                        v-for="(bab, b) in currentNomor.bab"
                        :key="'bab' + b"
                        v-text="bab"
                      ></span>
                    </td>
                  </tr>
                  <tr>
                    <th width="130">Dimulai Nomor</th>
                    <td width="10">:</td>
                    <td v-text="currentNomor.range_nomor"></td>
                  </tr>
                </table>
              </div>
              <hr />
              <div class="question-list">
                <div class="question-item">
                  <div
                    class="question-header-text"
                    v-if="currentNomor.penjelasan_pertanyaan"
                    v-html="currentNomor.penjelasan_pertanyaan"
                  ></div>
                  <div class="question-child-item">
                    <h3 class="question-header-title" :id="'question-1'">
                      Pertanyaan
                      <b-badge
                        variant="primary"
                        v-text="currentNomor.nomor"
                      ></b-badge>
                    </h3>
                    <p
                      class="question-main-text"
                      v-html="currentNomor.soal_pertanyaan"
                    ></p>
                    <ul class="list-unstyled option-list">
                      <li
                        class="option-item"
                        v-for="(opsi, o) in currentNomor.opsi_pertanyaan"
                        :key="'opsi' + o"
                      >
                        <label :for="'opsi-' + currentNomor.nomor + '-' + o"
                          ><input
                            type="radio"
                            :name="'opsi_' + currentNomor.nomor"
                            :id="'opsi-' + currentNomor.nomor + '-' + o"
                            class="mr-2"
                            :value="opsi.uuid"
                            @change="saveJawaban"
                            v-model="
                              jawabanUser[currentNomor.nomor].jawaban_user
                            "
                          />
                          {{ opsi.option }}</label
                        >
                      </li>
                      <li class="mt-4">
                        <button
                          type="button"
                          class="btn btn-sm btn-light px-3 square"
                          @click.prevent="
                            jawabanUser[currentNomor.nomor].jawaban_user = ''
                          "
                        >
                          <i class="fas fa-fa fa-times mr-1"></i>
                          Batal Jawab
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-md-block d-none">
          <div class="info-board bg-white p-4">
            <h2 class="board-timer d-flex align-items-center">
              <i class="far fa-clock fa-fw mr-1 small"></i>
              <span class="countdown">00:00:00</span>
            </h2>
            <hr />
            <h2 class="board-title mb-3">Nomor Soal</h2>
            <UjianNumberList
              @update="updateNomor"
              :jawaban="jawabanUser"
              :list="listNomorSoal"
              :active="currentNomor.nomor"
            />
            <hr />
            <h2 class="board-title mb-3">Keterangan</h2>
            <ul class="list-unstyled board-legend">
              <li><span class="active"></span> Posisi kamu saat ini</li>
              <li><span class="filled"></span> Soal yang sudah dijawab</li>
              <li><span class="unfilled"></span> Soal yang belum dijawab</li>
            </ul>
            <hr />
            <button
              type="button"
              class="btn btn-danger btn-block square"
              v-b-modal.modal-confirm-end
            >
              Selesai dan Serahkan
            </button>
            <!-- <h3 class="board-title mb-3">Panduan Pengerjaan:</h3>
    <div class="board-guide-text" v-html="dataTryout.panduan_pengerjaan"></div> -->
            <!-- {{ jawabanUser }} -->
          </div>
        </div>
      </div>
      <b-sidebar
        id="sidebar-board"
        bg-variant="white"
        text-variant="dark"
        shadow
        title="Nomor Soal"
        right
      >
        <div class="info-board bg-white p-4">
          <UjianNumberList
            @update="updateNomor"
            :jawaban="jawabanUser"
            :list="listNomorSoal"
            :active="currentNomor.nomor"
          />
        </div>
      </b-sidebar>
    </div>
    <div class="ujian-wrapper" v-else-if="!loading && !detail.is_task_start">
      <div class="card ujian-guide-box">
        <div class="card-header">
          <h2 class="card-title">Petunjuk Pengerjaan</h2>
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
    <div
      class="ujian-wrapper bg-white"
      v-else-if="!loading && detail.is_task_done"
    >
      <div class="row">
        <p>Kamus sudah menyelesaikan Tryout ini.</p>
      </div>
    </div>
    <b-modal
      id="modal-confirm-start"
      title="Konfirmasi Mulai Tryout"
      hide-footer
      centered
      :no-close-on-backdrop="loading"
      :no-close-on-esc="loading"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin memulai tryout ini? Waktu mulai akan berjalan.
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
    <b-modal
      id="modal-confirm-end"
      title="Konfirmasi Akhiri Tryout"
      hide-footer
      centered
      :no-close-on-backdrop="loading"
      :no-close-on-esc="loading"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah kamu yakin ingin menyelesaikan dan mengirim jawaban tryoutmu?
          Sistem akan langsung mengoreksi.
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-confirm-end')"
            v-if="!loading"
          >
            Batal
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="onConfirmEndTest"
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
      detail: {},
      tryout: {},
      detailUjian: {},
      listNomorSoal: [],
      currentNomor: {},
      jawabanUser: {},
      countdownTimer: null
    };
  },
  async mounted() {
    if (!this.$route.params.id) return this.$router.go(-1);
    await this.getDetailProduk();
    await this.getDetailTryout();
    await this.getDetailUjian();
    await this.getNomorSoal();
    window.addEventListener("beforeunload", this.onCloseWindow);
    document.addEventListener("keydown", this.onKeyDownNavigation);
    // this.checkLastSaved();
    this.startTimer();
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.onCloseWindow);
    document.removeEventListener("keydown", this.onKeyDownNavigation);
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
    checkLastSaved() {
      const lastSavedData = this.$cookiz.get("_ujiaja_temp_to_user");
      if (lastSavedData) {
        this.jawabanUser = lastSavedData.data;
        return lastSavedData;
      }
      return {};
    },
    startTimer() {
      const moment = require("moment");
      const lastSavedData = this.checkLastSaved();

      const waktuMulai = new Date(this.detailUjian.waktu_mulai).getTime();
      const waktuBatas = waktuMulai + (this.tryout.alokasi_waktu * 1000 * 60);

      let diffTime = 0, waktuSisa = 0;
      if (lastSavedData.time) {
        waktuSisa = lastSavedData.time - waktuMulai;
        diffTime = waktuBatas - waktuMulai - waktuSisa;
      } else {
        diffTime = waktuBatas - waktuMulai;
      }
      let duration = moment.duration(diffTime, "milliseconds");
      const interval = 1000;
      const boardTimer = document.querySelector(".board-timer");
      const countdownElement = boardTimer.children[1];

      // console.log(waktuSisa, duration.hours(), duration.minutes(), duration.seconds());

      const isNotTimeout = duration.hours() >= 0 && duration.minutes() >= 0 && duration.seconds() >= 0;

      if (isNotTimeout) {
        this.countdownTimer = setInterval(function() {
          duration = moment.duration(duration - interval, "milliseconds");
          const hours =
            duration.hours() > 10 ? duration.hours() : "0" + duration.hours();
          const minutes =
            duration.minutes() > 10
              ? duration.minutes()
              : "0" + duration.minutes();
          const seconds =
            duration.seconds() > 10
              ? duration.seconds()
              : "0" + duration.seconds();
          if (duration.minutes() < 1 && duration.seconds() <= 30) {
            boardTimer.classList.add("text-danger");
          }
          if (
            duration.hours() >= 0 &&
            duration.minutes() >= 0 &&
            duration.seconds() >= 0
          ) {
            console.log("time is running..");
            countdownElement.textContent =
              hours + ":" + minutes + ":" + seconds;
          this.saveJawaban()
          }
        }.bind(this), interval);
      } else {
        console.log('> Tryout sudah melewati waktu!')
      }
    },
    onCloseWindow(event) {
      console.log("unload", event);
      event.preventDefault();
      event.returnValue = "";
    },
    onKeyDownNavigation(event) {
      const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
      const currNomor = this.currentNomor.nomor;
      let foundSoal, targetNomor;
      // console.log(key);
      switch (key) {
        case "ArrowRight":
          targetNomor = currNomor + 1;
          break;
        case "ArrowLeft":
          targetNomor = currNomor - 1;
          break;
        case "ArrowDown":
          targetNomor = currNomor + 5;
          break;
        case "ArrowUp":
          targetNomor = currNomor - 5;
          break;

        default:
          break;
      }
      foundSoal = this.listNomorSoal.find(item => item.nomor == targetNomor);
      if (foundSoal) {
        this.currentNomor = foundSoal;
      }
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
          window.location.reload();
        })
        .catch(error => console.log(error))
        .finally(() => {});
    },
    onConfirmEndTest() {
      this.loading = true;

      // let jawabans = [];
      // for(let key in this.jawabanUser)
      // {
      //   jawabans.push(this.jawabanUser[key]);
      // }
      this.$axios
        .post(`/api/tryout_user_jawaban/create/multiple`, {
          id_tryout_user: this.detailUjian.id,
          jawabans: this.jawabanUser
        })
        .then(response => {
          console.log(response);
          this.detail.is_start_end = true;
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.loading = false;
        });
    },
    updateNomor(dataNomor) {
      // this.$store.commit("set", ["currentNomor", dataNomor]);
      this.currentNomor = dataNomor;
    },
    saveJawaban() {
      const dataSave = { ...this.jawabanUser };
      this.$cookiz.set("_ujiaja_temp_to_user", {
        id_user: this.user.id,
        id_produk: this.detail.id,
        id_tryout: this.tryout.id,
        data: dataSave,
        time: new Date().getTime()
      });
    },
    async getDetailProduk() {
      this.loading = true;
      await this.$axios
        .$get(`/api/produk/find/${this.productId}`)
        .then(res => {
          console.log("produk", res);
          if (res.success) {
            this.detail = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
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
          console.log("detail ujian", res);
          if (res.success) {
            this.detailUjian = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    async getDetailTryout() {
      this.loading = true;
      await this.$axios
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
    async getNomorSoal() {
      this.loading = true;
      await this.$axios
        .$get(`/api/tryout/nomor-soal/${this.tryoutId}`)
        .then(res => {
          console.log("list soal", res);
          if (res.success) {
            this.listNomorSoal = res.data.soal;
            this.currentNomor = res.data.soal[0];
            this.jawabanUser = res.data.jawaban_placeholder;
            // this.$store.commit("set", ["listNomorSoal", res.data.soal]);
            // this.$store.commit("set", ["currentNomor", res.data.soal[0]]);
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  },
  fetchOnServer: false
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
