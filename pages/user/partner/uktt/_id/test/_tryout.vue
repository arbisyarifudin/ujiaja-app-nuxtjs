<template>
  <div class="container pos-relative ujian">
    <div class="ujian-wrapper bg-white" v-if="loading">
      <div class="row">
        <UILoading />
      </div>
    </div>
    <div class="ujian-wrapper bg-white" v-if="!loading && isTimeout">
      <div class="row justify-content-center align-items-center">
        <div class="col text-center">
          <p v-if="detailUjian.waktu_selesai">
            Kamu sudah selesai mengerjakan Tryout ini.
          </p>
          <p v-else>
            Mohon maaf! Waktu untuk mengerjakan Tryout Ini sudah habis.
          </p>
          <div
            v-if="detail && detail.jenis_produk == 'Perorangan'"
            class="mt-3"
          >
            <a class="btn btn-outline-primary " :href="`/user/partner/uktt/mine`"
              >Kembali</a
            >
            <a class="btn btn-primary ml-2" :href="`/user/partner/uktt/mine`"
              >Lihat Hasil</a
            >
            <!-- <button
            class="btn btn-primary"
            v-if="detail && detail.jenis_produk == 'Perorangan'"
            @click.prevent="onRepeatTest"
            :disabled="loading"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner>
            Ulangi Tryout
          </button> -->
          </div>
        </div>
      </div>
    </div>
    <div
      class="ujian-wrapper"
      v-else-if="
        !loading && detailUjian.waktu_mulai && !detailUjian.waktu_selesai
      "
    >
      <div class="row">
        <div class="col-md-8">
          <div class="question-board bg-white p-4">
            <div class="left-section">
              <!-- <h2 class="product-name">{{ tryout.judul }}</h2> -->
              <h2 class="product-name">{{ detail.nama_produk }}</h2>
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
                    class="question-header-text mb-3"
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
                    <!-- <ul class="list-unstyled option-list">
                      <li
                        class="option-item"
                        v-for="(opsi, o) in currentNomor.opsi_pertanyaan"
                        :key="'opsi' + o"
                      >
                        <label :for="'opsi-' + currentNomor.nomor + '-' + o"
                          ><input
                            v-if="jawabanUser[currentNomor.nomor]"
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
                          <span v-html="opsi.option" class="option-text"></span>
                          </label
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
                    </ul> -->
                    <b-form-group
                      v-slot="{ ariaDescribedby }"
                      class="question-option-radio-group"
                    >
                      <b-form-radio
                        v-for="(opsi, o) in currentNomor.opsi_pertanyaan"
                        :key="'opsi' + o"
                        v-model="jawabanUser[currentNomor.nomor].jawaban_user"
                        :aria-describedby="ariaDescribedby"
                        :name="'opsi_' + currentNomor.nomor"
                        :value="opsi.uuid"
                        :class="
                          jawabanUser[currentNomor.nomor].jawaban_user ===
                          opsi.uuid
                            ? 'checked'
                            : ''
                        "
                        @change="saveJawaban"
                      >
                        <!-- <div class="question-option-letter mb-2">
                          {{ letterLabel(o) }}
                        </div> -->
                        <span class="letter">{{ letterLabel(o) }}</span>
                        <div v-html="opsi.option"></div>
                      </b-form-radio>
                    </b-form-group>
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
            <div class="row">
              <div class="col-6 mb-3">
                <button
                  type="button"
                  class="btn btn-primary btn-block square"
                  @click="onKeyDownNavigation({ key: 'ArrowLeft' })"
                >
                  <i class="fas fa-arrow-left"></i>
                </button>
              </div>
              <div class="col-6 mb-3">
                <button
                  type="button"
                  class="btn btn-primary btn-block square"
                  @click="onKeyDownNavigation({ key: 'ArrowRight' })"
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-danger btn-block square"
              v-b-modal.modal-confirm-end
            >
              {{
                detailUjian.list_tryout && detailUjian.list_tryout.length > 1
                  ? "Selesai dan Lanjutkan"
                  : "Selesai dan Serahkan"
              }}
            </button>
            <!-- <h3 class="board-title mb-3">Panduan Pengerjaan:</h3>
    <div class="board-guide-text" v-html="dataTryout.panduan_pengerjaan"></div> -->
            <!-- {{ jawabanUser }} -->
          </div>
        </div>
        <div class="col-12 d-md-none mt-3">
          <div class="row">
            <div class="col-6 mb-3">
              <button
                type="button"
                class="btn btn-primary btn-block square"
                @click="onKeyDownNavigation({ key: 'ArrowLeft' })"
              >
                Sebelumnya
              </button>
            </div>
            <div class="col-6 mb-3">
              <button
                type="button"
                class="btn btn-primary btn-block square"
                @click="onKeyDownNavigation({ key: 'ArrowRight' })"
              >
                Selanjutnya
              </button>
            </div>
            <div class="col-sm-6 col-12 mb-3">
              <button
                type="button"
                class="btn btn-info btn-block square"
                v-b-toggle.sidebar-board
              >
                <i class="fas fa-list"></i>
                Nomor Soal
              </button>
            </div>
            <div class="col-sm-6 col-12 mb-3">
              <button
                type="button"
                class="btn btn-danger btn-block square"
                :disabled="
                  loading || jawaban_user_array.length !== totalJawaban
                "
                v-b-modal.modal-confirm-end
              >
                <i class="fas fa-paper-plane"></i>
                {{
                detailUjian.list_tryout && detailUjian.list_tryout.length > 1
                  ? "Selesai dan Lanjutkan"
                  : "Selesai dan Serahkan"
              }}
              </button>
            </div>
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
    <div
      class="ujian-wrapper bg-white"
      v-else-if="!loading && detail.is_task_start && detail.is_task_done"
    >
      <div class="row">
        <p>Kamus sudah menyelesaikan Ujian ini.</p>
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
    <b-modal
      id="modal-confirm-end"
      title="Konfirmasi Akhiri Ujian"
      hide-footer
      centered
      :no-close-on-backdrop="loading"
      :no-close-on-esc="loading"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p
          class="modal-text"
          v-if="detailUjian.list_tryout && detailUjian.list_tryout.length > 1"
        >
          Apakah kamu yakin ingin menyelesaikan dan mengirim jawaban ujianmu?
          Kamu akan diarahkan ke ujian selanjutnya..
        </p>
        <p class="modal-text" v-else>
          Apakah kamu yakin ingin menyelesaikan dan mengirim jawaban Ujianmu?
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
            <b-spinner small v-if="loading" class="mr-1"></b-spinner>
            <span
              v-if="
                detailUjian.list_tryout && detailUjian.list_tryout.length > 1
              "
              >Ya, Kirim & Lanjutkan</span
            >
            <span v-else>Ya, Kirim Sekarang</span>
          </button>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="modal-success-end"
      title="Kamu Berhasil Menyelesaikan"
      hide-footer
      centered
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Kamu dapat langsung melihat hasil ujian UKTT!
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-secondary"
            type="button"
            @click="navGoTo(`/user/partner/uktt/mine`)"
          >
            Halaman Utama
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="navGoTo(`/user/partner/uktt/${productId}/result?code=${$route.query.kode}`)"
          >
            Lihat Hasil
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
      countdownTimer: null,
      isTimeout: false,
      lastSavedDataTime: null
    };
  },
  async mounted() {
    if (!this.$route.params.id) return this.$router.go(-1);
    window.addEventListener("beforeunload", this.onCloseWindow);

    await this.getDetailProduk();
    await this.getDetailUjian();

    console.log(this.detailUjian)
    // return;

    // jika data ujian sudah pernah dibuat
    if (this.detailUjian.id) {
      if (this.detailUjian.waktu_selesai) {
        return this.goToNext();
      } else {
        await this.getDetailTryout();
        await this.getNomorSoal();
        document.addEventListener("keydown", this.onKeyDownNavigation);
        this.startTimer();
      }
    } else {
      // jika data ujian belum pernah dibuat/start
      await this.getDetailTryout();
    }
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.onCloseWindow);
    document.removeEventListener("keydown", this.onKeyDownNavigation);
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
        this.$route.params.tryout
      );
      const encryptedTryoutId = this.decrypt(encryptedTryoutIdSafe);
      return encryptedTryoutId;
    },
    user() {
      return this.$store.state.dataUser.user;
    },
    jawaban_user_array() {
      let data = [];

      for (const key in this.jawabanUser) {
        if (Object.hasOwnProperty.call(this.jawabanUser, key)) {
          const element = this.jawabanUser[key];
          if (element && element.jawaban_user) {
            data.push(element);
          }
        }
      }
      return data;
    },
    totalJawaban() {
      let data = [];
      for (const key in this.jawabanUser) {
        data.push(key);
      }
      return data.length;
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
    toTryoutTestPage(productID, tryoutID) {
      const encryptedProductId = this.encrypt(productID);
      const encryptedProductIdSafe = encodeURIComponent(encryptedProductId);
      const encryptedTryoutId = this.encrypt(tryoutID);
      const encryptedTryoutIdSafe = encodeURIComponent(encryptedTryoutId);
      window.location.replace(
        `/user/partner/uktt/${encryptedProductIdSafe}/test/${encryptedTryoutIdSafe}?kode=${this.$route.query.kode}`
      );
    },
    toWaitingTestPage(productID, tryoutID) {
      const encryptedProductId = this.encrypt(productID);
      const encryptedProductIdSafe = encodeURIComponent(encryptedProductId);
      const encryptedTryoutId = this.encrypt(tryoutID);
      const encryptedTryoutIdSafe = encodeURIComponent(encryptedTryoutId);
      window.location.replace(
        `/user/partner/uktt/${encryptedProductIdSafe}/waiting/${encryptedTryoutIdSafe}?kode=${this.$route.query.kode}`
      );
    },
    // checkLastSaved() {
    //   const lastSavedData = this.$cookiz.get("_ujiaja_temp_uktt_user_");
    //   if (lastSavedData) {
    //     this.jawabanUser = lastSavedData.data;
    //     return lastSavedData;
    //   }
    //   return {};
    // },
    checkLastSaved() {
      let lastSavedData = window.localStorage.getItem(
        "_ujiaja_temp_uktt_user_" + this.$route.query.kode + "_" + this.tryout.id
      );
      // let lastSavedData = null;
      if (lastSavedData) {
        lastSavedData = JSON.parse(lastSavedData);
        this.jawabanUser = lastSavedData.data;
        return lastSavedData;
      } else if (!lastSavedData && this.lastSavedDataTime) {
        const moment = require("moment");
        moment.locale("id");
        return {
          kode: this.$route.query.kode,
          id_user: this.user.id,
          id_produk: this.detail.id,
          id_tryout: this.tryout.id,
          data: this.jawabanUser,
          time: moment(this.lastSavedDataTime).valueOf()
        };
      }
      return {};
    },
    startTimer() {
      const moment = require("moment");
      const today = moment.now();
      const lastSavedData = this.checkLastSaved();
      const waktuMulai = new Date(this.detailUjian.waktu_mulai).getTime();
      const waktuBatas = waktuMulai + this.tryout.alokasi_waktu * 1000 * 60;

      // console.log(today);
      // cek batas waktu mulai dengan hari ini
      if (waktuBatas < today) {
        this.isTimeout = true;
        window.removeEventListener("beforeunload", this.onCloseWindow);
        console.log('sudah melewati batas waktu')
        this.goToNext();
        return;
      }

      let diffTime = 0,
        waktuSisa = 0;
      if (lastSavedData.id_tryout == this.tryout.id && lastSavedData.time) {
        waktuSisa = lastSavedData.time - waktuMulai;
        diffTime = waktuBatas - waktuMulai - waktuSisa;
      } else {
        diffTime = waktuBatas - waktuMulai;
      }
      let duration = moment.duration(diffTime, "milliseconds");
      const interval = 1000;
      const boardTimer = document.querySelector(".board-timer");
      const countdownElement = boardTimer.children[1];
      

      const isNotTimeout =
        duration.hours() >= 0 &&
        duration.minutes() >= 0 &&
        duration.seconds() >= 0;

      console.log(diffTime, duration.hours(), duration.minutes(), duration.seconds());

      if (isNotTimeout) {
        this.countdownTimer = setInterval(
          function() {
            duration = moment.duration(duration - interval, "milliseconds");
            const hours =
              duration.hours() >= 10
                ? duration.hours()
                : "0" + duration.hours();
            const minutes =
              duration.minutes() >= 10
                ? duration.minutes()
                : "0" + duration.minutes();
            const seconds =
              duration.seconds() >= 10
                ? duration.seconds()
                : "0" + duration.seconds();
            if (duration.minutes() < 2) {
              boardTimer.classList.add("text-danger");
            }
            if (
              duration.hours() >= 0 &&
              duration.minutes() >= 0 &&
              duration.seconds() >= 0
            ) {
              console.log("time is running..");
              // console.log(countdownElement)
              countdownElement.textContent =
                hours + ":" + minutes + ":" + seconds;
              this.saveJawaban();
            } else {
              console.log("> Tryout sudah melewati waktu!");
              this.isTimeout = true;
              this.goToNext();
            }
            console.log(
              duration.hours(),
              duration.minutes(),
              duration.seconds()
            );
          }.bind(this),
          interval
        );
      } else {
        console.log("> Tryout sudah melewati waktu!");
        this.isTimeout = true;
        this.goToNext();
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
    async onConfirmEndTest() {
      clearInterval(this.countdownTimer);
      if (this.detailUjian.waktu_selesai) return;
      this.loading = true;
      this.isTimeout = true;
      const response = await this.submitJawabanUser();
      if (response) {
        this.detailUjian.waktu_selesai = "ada isi";
        window.removeEventListener("beforeunload", this.onCloseWindow);
        this.$bvModal.hide("modal-confirm-start");
        this.$bvModal.hide("modal-confirm-end");
        this.$bvModal.show("modal-success-end");
        this.loading = false;
      }
    },
    async submitJawabanUser() {
      const data = await this.$axios
        .$post(`/api/tryout_user_jawaban/create/multiple`, {
          id_tryout_user: this.detailUjian.id,
          jawabans: this.jawabanUser,
          // waktu_selesai_ujian: new Date()
        })
        .then(response => {
          return response;
        })
        .catch(error => console.log(error));
      return data;
    },
    updateNomor(dataNomor) {
      // this.$store.commit("set", ["currentNomor", dataNomor]);
      this.currentNomor = dataNomor;
    },
    saveJawaban() {
      const dataSave = this.jawabanUser;
      // this.$cookiz.set("_ujiaja_temp_uktt_user_", {
      //   id_user: this.user.id,
      //   id_produk: this.detail.id,
      //   id_tryout: this.tryout.id,
      //   data: dataSave,
      //   time: new Date().getTime()
      // });
       const lsSave = JSON.stringify({
        kode: this.$route.query.kode,
        id_user: this.user.id,
        id_produk: this.detail.id,
        id_tryout: this.tryout.id,
        data: dataSave,
        time: new Date().getTime()
      });
      window.localStorage.setItem(
        "_ujiaja_temp_uktt_user_" + this.$route.query.kode + "_" + this.tryout.id,
        lsSave
      );
    },
    async goToNext() {
      console.log("goToNext");
      this.loading = true;
      const listTryout = this.detailUjian.list_tryout;

      // return;

      if (listTryout && listTryout.length > 1) {
        window.removeEventListener("beforeunload", this.onCloseWindow);
        clearInterval(this.countdownTimer);

        const tryoutNotDone = listTryout.find(
          item => !item.is_tryout_done && item.id != this.tryoutId
        );
        console.log("tryoutNotDone", tryoutNotDone);
        console.log("productId", this.productId);
        // if (tryoutNotDone && tryoutNotDone.id != this.tryoutId) {
        if (tryoutNotDone) {
          console.log(
            "tryoutId",
            this.tryoutId,
            tryoutNotDone.id
            // tryoutNotDone.id != this.tryoutId
          );
          if(!this.jawabanUser['1']) {
            await this.getNomorSoal();
          }
          const response = await this.submitJawabanUser();
          if (response && response.data && !response.data.is_task_done) {
            // this.toTryoutTestPage(this.detailUjian.id_produk, tryoutNotDone.id);
            this.toWaitingTestPage(
              this.detailUjian.id_produk,
              tryoutNotDone.id
            );
          } else {
            this.isTimeout = true;
            this.loading = false;
          }
        } else if(!this.detailUjian.waktu_selesai) {
          this.onConfirmEndTest();
        } else {
          console.log("all DONE");
        }
      } else {
        console.log("single DONE");
        this.onConfirmEndTest();
      }
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
        .$get(`/api/tryout_user/per-tryout-produk`, {
          params: {
            id_produk: this.productId,
            id_tryout: this.tryoutId,
            referensi: this.$route.query.kode
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
          if (err.response && err.response.status == 404) {
            this.backtoPanduanPage();
          }
          // this.catchError(err);
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
            this.lastSavedDataTime = res.data.last_saved_data_time;
            // this.$store.commit("set", ["listNomorSoal", res.data.soal]);
            // this.$store.commit("set", ["currentNomor", res.data.soal[0]]);
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    navGoTo(to) {
      window.removeEventListener("beforeunload", this.onCloseWindow);
      window.location.replace(to);
    },
    backtoPanduanPage() {
      const encryptedProductId = this.encrypt(this.productId);
      const encryptedProductIdSafe = encodeURIComponent(encryptedProductId);
      const encryptedTryoutId = this.encrypt(this.tryoutId);
      const encryptedTryoutIdSafe = encodeURIComponent(encryptedTryoutId);
      window.location.replace(
        `/user/partner/uktt/${encryptedProductIdSafe}/test?tryout=${encryptedTryoutIdSafe}&kode=${this.$route.query.kode}`
      );
    },
    nextSubtestAvailable() {
      if (this.listSubtest[this.subtestIndex + 1]) return true
      return false
    },
    isAllowNext() {
      if (
        this.detailUjian.list_tryout &&
        this.detailUjian.list_tryout.length > 1
      ) {
        const find = this.detailUjian.list_tryout.find(
          item => item.id === this.tryout.id
        );
        const lastNumber = this.detailUjian.list_tryout.length;
        if (find && find.number < lastNumber) {
          return true;
        }
        return false;
      }
      return false;
    },
    letterLabel(index) {
      const letters = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "O"
      ];
      return letters[index] ?? "-";
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
