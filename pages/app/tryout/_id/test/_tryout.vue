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
            <span v-if="detail.jenis_produk == 'Masal'">
              Dan dapat melihat hasil pada
              <b
                >{{
                  formatTanggal(detail.tanggal_berakhir, "Do MMMM YYYY HH:mm")
                }}
                WIB.</b
              >
            </span>
          </p>
          <p v-else>
            Mohon maaf! Waktu untuk mengerjakan Tryout Ini sudah habis.
          </p>
          <div
            v-if="detail && detail.jenis_produk == 'Perorangan'"
            class="mt-3"
          >
            <a class="btn btn-outline-primary " :href="`/app/tryout/mine`"
              >Kembali</a
            >
            <a
              class="btn btn-primary ml-2"
              :href="
                `/app/tryout/${detail.id}/result?code=${$route.query.kode}&category=${detail.kategori_produk}`
              "
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
          <div
            v-else-if="detail && detail.jenis_produk == 'Masal'"
            class="mt-3"
          >
            <a class="btn btn-outline-primary " :href="`/app/tryout/mine`"
              >Kembali</a
            >
            <a
              v-if="detail.is_result_openable === true"
              class="btn btn-primary ml-2"
              :href="
                `/app/tryout/${detail.id}/result?code=${$route.query.kode}&category=${detail.kategori_produk}`
              "
              >Lihat Hasil</a
            >
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
                         v-if="jawabanUser[currentNomor.nomor]"
                          >
                          <input
                            type="radio"
                            :name="'opsi_' + currentNomor.nomor"
                            :id="'opsi-' + currentNomor.nomor + '-' + o"
                            class="mr-2"
                            :value="opsi.uuid"
                            v-model="jawabanUser[currentNomor.nomor].jawaban_user"
                          />
                          <span v-html="opsi.option" class="option-text"></span>
                        </label>
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
                  </div>
                </div>
              </div>
              <div class="d-block d-md-none">
                <h2
                  class="board-timer d-flex align-items-center"
                  id="board-timer-2"
                  style="font-size: 25px"
                >
                  <i class="far fa-clock fa-fw mr-1 small"></i>
                  <span class="countdown">00:00:00</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-md-block d-none">
          <div class="info-board bg-white p-4">
            <h2
              class="board-timer d-flex align-items-center"
              id="board-timer-1"
            >
              <i class="far fa-clock fa-fw mr-1 small"></i>
              <span class="countdown">00:00:00</span>
            </h2>
            <hr />
            <h2 class="board-title mb-3">Nomor Soal</h2>
            <UjianNumberList
              @update="updateNomor"
              :jawaban="jawabanUser"
              :list="listSoal"
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
              v-if="nextSubtestAvailable()"
              type="button"
              class="btn btn-danger btn-block square"
              v-b-modal.modal-next-subtest
            >
              Ke Subtest Selanjutnya
            </button>
            <button
              v-else
              type="button"
              class="btn btn-danger btn-block square"
              v-b-modal.modal-confirm-end
              :disabled="loading"
            >
              Selesai dan Serahkan
            </button>
            <!-- <h3 class="board-title mb-3">Panduan Pengerjaan:</h3>
    <div class="board-guide-text" v-html="dataTryout.panduan_pengerjaan"></div> -->
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
                v-if="nextSubtestAvailable()"
                type="button"
                class="btn btn-danger btn-block square"
                v-b-modal.modal-next-subtest
              >
                Ke Subtest Selanjutnya
              </button>
              <button
                v-else
                type="button"
                class="btn btn-danger btn-block square"
                :disabled="loading"
                v-b-modal.modal-confirm-end
              >
                <i class="fas fa-paper-plane"></i>
                Selesai dan Serahkan
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
          <!-- <h2 class="board-timer d-flex align-items-center">
            <i class="far fa-clock fa-fw mr-1 small"></i>
            <span class="countdown">00:00:00</span>
          </h2>
          <hr /> -->
          <h2 class="board-title mb-3">Nomor Soal</h2>
          <UjianNumberList
            @update="updateNomor"
            :jawaban="jawabanUser"
            :list="listSoal"
            :active="currentNomor.nomor"
          />
          <hr />
          <h2 class="board-title mb-3">Keterangan</h2>
          <ul class="list-unstyled board-legend">
            <li><span class="active"></span> Posisi kamu saat ini</li>
            <li><span class="filled"></span> Soal yang sudah dijawab</li>
            <li><span class="unfilled"></span> Soal yang belum dijawab</li>
          </ul>
          <!-- <UjianNumberList
          @update="updateNomor"
          :jawaban="jawabanUser"
          :list="listNomorSoal"
          :active="currentNomor.nomor"
        /> -->
        </div>
      </b-sidebar>
    </div>
    <div
      class="ujian-wrapper bg-white "
      v-else-if="!loading && detail.is_task_start && detail.is_task_done"
    >
      <div class="row align-items-center justify-content-center">
        <p v-if="detailUjian.waktu_selesai">
          Kamu sudah selesai mengerjakan Tryout ini.
          <span v-if="detail.jenis_produk == 'Masal'">
            Dan dapat melihat hasil pada
            <b
              >{{
                formatTanggal(detail.tanggal_berakhir, "Do MMMM YYYY HH:mm")
              }}
              WIB.</b
            >
          </span>
        </p>
      </div>
      <div
        v-if="detail && detail.jenis_produk == 'Perorangan'"
        class="mt-3 text-center"
      >
        <a
          class="btn btn-outline-primary "
          :href="`/app/tryout/${detail.id}/detail`"
          >Kembali</a
        >
        <a
          v-if="detail.is_result_openable === true"
          class="btn btn-primary ml-2"
          :href="
            `/app/tryout/${detail.id}/result?code=${$route.query.kode}&category=${detail.kategori_produk}`
          "
          >Lihat Hasil</a
        >
      </div>
      <div v-else class="mt-3 text-center">
        <a
          class="btn btn-outline-primary ml-2"
          :href="`/app/tryout/${detail.id}/detail`"
          >Lihat Detail Ujian</a
        >
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
        <p class="modal-text" v-if="isAllowNext()">
          Apakah kamu yakin ingin menyelesaikan dan mengirim jawaban tryoutmu?
          Kamu akan diarahkan ke tryout selanjutnya..
        </p>
        <p class="modal-text" v-else>
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
            v-if="isAllowNext()"
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="onNextSubtest"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner>
            <span v-else>Ya, Kirim & Lanjutkan</span>
          </button>
          <button
            v-else
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="onConfirmEndTest"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner>
            <span v-else>Ya, Kirim Sekarang</span>
          </button>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="modal-next-subtest"
      title="Lanjut Subtest Selanjutnya"
      hide-footer
      centered
      :no-close-on-backdrop="loading"
      :no-close-on-esc="loading"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah kamu yakin ingin melanjutkan ke subtest selanjutnya?
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-next-subtest')"
            v-if="!loading"
          >
            Batal
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="onNextSubtest"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner>
            <span>Ya, Lanjut</span>
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
        <p class="modal-text" v-if="detail.jenis_produk != 'Masal'">
          Kamu dapat langsung melihat hasil ujian tryout dan lihat rekomendasi
          belajar yang tepat untukmu sekarang juga!
        </p>
        <p class="modal-text" v-else-if="detail.jenis_produk == 'Masal'">
          Kamu berhasil menyelesaikan ujian tryout akbar dan dapat melihat
          hasilnya pada
          <b
            >{{
              formatTanggal(detail.tanggal_berakhir, "Do MMMM YYYY HH:mm")
            }}
            WIB.</b
          >
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-secondary"
            type="button"
            @click="navGoTo(`/app/tryout/mine`)"
          >
            Halaman Utama
          </button>
          <button
            v-if="detail.is_result_openable == true"
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="
              navGoTo(
                `/app/tryout/${productId}/result?code=${$route.query.kode}&category=${detail.kategori_produk}`
              )
            "
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
      listSubtest: [],
      listSoal: [],
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

    // return;

    // jika data ujian sudah pernah dibuat
    if (this.detailUjian.id) {
      if (this.detailUjian.waktu_selesai) {
        return this.goToNext();
      } else {
        await this.getDetailTryout();
        await this.getNomorSoal();
        document.addEventListener("keydown", this.onKeyDownNavigation);
        if (!this.$route.query.id_mapel) {
          this.$router.replace({
            ...this.$route,
            query: {
              ...this.$route.query,
              id_mapel: this.listSubtest[0].id
            }
          })
        }
        this.listSoal = this.listNomorSoal.filter(soal => soal.id_soal_tryout === (parseInt(this.$route.query.id_mapel, 10) || this.listSubtest[0].id))
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
    subtestIndex() {
      return this.listSubtest.findIndex(subtest => subtest.id === parseInt(this.$route.query.id_mapel, 10))
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
        `/app/tryout/${encryptedProductIdSafe}/test/${encryptedTryoutIdSafe}?kode=${this.$route.query.kode}`
      );
    },
    toWaitingTestPage(productID, tryoutID, mapelID = null) {
      const encryptedProductId = this.encrypt(productID);
      const encryptedProductIdSafe = encodeURIComponent(encryptedProductId);
      const encryptedTryoutId = this.encrypt(tryoutID);
      const encryptedTryoutIdSafe = encodeURIComponent(encryptedTryoutId);
      window.location.replace(
        `/app/tryout/${encryptedProductIdSafe}/waiting/${encryptedTryoutIdSafe}?kode=${this.$route.query.kode}${mapelID ? '&id_mapel=' + mapelID : ''}`
      );
    },
    checkLastSaved() {
      // const lastSavedData = this.$cookiz.get(
      //   "_ujiaja_temp_to_user_" + this.$route.query.kode + "_" + this.tryout.id
      // );
      let lastSavedData = window.localStorage.getItem(
        "_ujiaja_temp_to_user_" + this.$route.query.kode + "_" + this.tryout.id
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
      moment.locale("id");
      const today = moment.now();
      const lastSavedData = this.checkLastSaved();
      const waktuMulai = moment(this.detailUjian.waktu_mulai).valueOf();
      const waktuBatas = waktuMulai + this.tryout.alokasi_waktu * 1000 * 60;

      // console.log(lastSavedData);
      // return
      // cek batas waktu mulai dengan hari ini
      if (waktuBatas < today) {
        this.isTimeout = true;
        window.removeEventListener("beforeunload", this.onCloseWindow);
        console.log("sudah melewati batas waktu");
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
        console.log(diffTime);
      let duration = moment.duration(diffTime, "milliseconds");
      const interval = 1000;
      // const boardTimer = document.querySelector(".board-timer");
      const boardTimer = document.getElementById("board-timer-1");
      // console.log(boardTimer)
      const boardTimer2 = document.getElementById("board-timer-2");
      // console.log(boardTimer2)
      // return
      const countdownElement = boardTimer.children[1];
      const countdownElement2 = boardTimer2.children[1];

      const isNotTimeout =
        duration.hours() >= 0 &&
        duration.minutes() >= 0 &&
        duration.seconds() >= 0;

      console.log(
        diffTime,
        duration.hours(),
        duration.minutes(),
        duration.seconds()
      );

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
              countdownElement2.textContent =
                hours + ":" + minutes + ":" + seconds;
              this.saveJawaban();

              const kerutinan = 10; // detik
              // setiap n menit sekali simpan ke server
              // console.log(duration.seconds() % kerutinan)
              if (duration.seconds() % kerutinan == 0) {
                this.saveJawabanToServer();
              }
            } else {
              console.log("> Tryout sudah melewati waktu!");
              // return
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
        // return
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
      foundSoal = this.listSoal.find(item => item.nomor == targetNomor);
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
      console.log("onConfirmEndTest");
      clearInterval(this.countdownTimer);
      console.log(this.detailUjian);
      if (this.detailUjian.waktu_selesai) {
        this.detail.is_task_done = true;
        this.loading = false;
        return;
      }
      this.loading = true;
      this.isTimeout = true;
      const response = await this.submitJawabanUser();
      if (response) {
        console.log("submitJawabanUser response", response);
        window.removeEventListener("beforeunload", this.onCloseWindow);
        this.$bvModal.hide("modal-confirm-start");
        this.$bvModal.hide("modal-confirm-end");
        // this.$cookiz.remove(
        //   "_ujiaja_temp_to_user_" +
        //     this.$route.query.kode +
        //     "_" +
        //     this.tryout.id
        // );
        window.localStorage.removeItem(
          "_ujiaja_temp_to_user_" +
            this.$route.query.kode +
            "_" +
            this.tryout.id
        );
        if (this.isAllowNext()) {
          this.goToNext();
        } else {
          this.detailUjian.waktu_selesai = "ada isi";
          this.$bvModal.show("modal-success-end");
        }
        this.loading = false;
      }
    },
    async onNextSubtest() {
      await this.saveJawabanToServer()
      this.toWaitingTestPage(this.detailUjian.id_produk, this.tryoutId, this.listSubtest[this.subtestIndex + 1].id)
    },
    async submitJawabanUser() {
      console.log("submitJawaban", this.jawabanUser);
      const data = await this.$axios
        .$post(`/api/tryout_user_jawaban/create/multiple`, {
          id_tryout_user: this.detailUjian.id,
          jawabans: this.jawabanUser
          // waktu_selesai_ujian: new Date()
        })
        .then(response => {
          return response;
        })
        .catch(error => console.log(error));
      return data;
    },
    updateNomor(dataNomor) {
      console.log(dataNomor);
      // this.$store.commit("set", ["currentNomor", dataNomor]);
      this.currentNomor = dataNomor;
    },
    saveJawaban() {
      const dataSave = this.jawabanUser;
      // this.$cookiz.set("_ujiaja_temp_to_user_" + this.$route.query.kode + "_" + this.tryout.id, {
      //   kode: this.$route.query.kode,
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
        "_ujiaja_temp_to_user_" + this.$route.query.kode + "_" + this.tryout.id,
        lsSave
      );
    },
    saveJawabanToServer() {
      const dataSave = this.jawabanUser;
      this.$axios
        .$put("/api/tryout_user/update/" + this.detailUjian.id, {
          temp_jawaban_user: dataSave
        })
        .then(response => {
          console.log("temp jawaban saved to server", response);
        })
        .catch(error => {
          console.log(error);
          this.catchError(error);
        });
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
        // return
        // if (tryoutNotDone && tryoutNotDone.id != this.tryoutId) {
        if (tryoutNotDone) {
          console.log(
            "tryoutId",
            this.tryoutId,
            tryoutNotDone.id
            // tryoutNotDone.id != this.tryoutId
          );
          if (!this.jawabanUser["1"]) {
            await this.getNomorSoal();
          }

          // const tryoutCurrentIndex = listTryout.findIndex(
          //   item => !item.is_tryout_done && item.id != this.tryoutId
          // );

          // const lastTryout = tryoutNotDoneIndex == (listTryout.length - 1)

          // const moment = require("moment");
          // const today = moment.now();
          // const waktuMulai = new Date(tryoutNotDone.waktu_mulai_test).getTime();
          // const waktuBatas = waktuMulai + tryoutNotDone.alokasi_waktu * 1000 * 60;

          // console.log(today);
          // cek batas waktu mulai dengan hari ini
          // console.log('tryoutNotDoneIndex', tryoutNotDoneIndex)
          // return
          // if (waktuBatas < today) {
          //   this.isTimeout = true;
          //   window.removeEventListener("beforeunload", this.onCloseWindow);
          //   console.log("sudah melewati batas waktu - tryout akhir");
          //   this.onConfirmEndTest();
          // } else {
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
          // }
        } else if (!this.detailUjian.waktu_selesai) {
          this.onConfirmEndTest();
        } else {
          this.loading = false;
          this.detail.is_task_done = true;
          console.log("all DONE");
        }
      } else {
        console.log("single DONE");
        this.onConfirmEndTest();
        // this.detail.is_task_done = true
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
            this.listSubtest = res.data.soal.map((to) => ({
              id: to.id,
              mapel: to.mapel.nama_mapel,
              jeda_waktu: to.jeda_waktu_antar_mapel || res.data.jeda_waktu
            }));
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
            if (this.$route.query.id_mapel) {
              this.currentNomor = res.data.soal.find(s => s.id_soal_tryout === parseInt(this.$route.query.id_mapel, 10))
            } else {
              this.currentNomor = res.data.soal[0];
            }
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
        `/app/tryout/${encryptedProductIdSafe}/test?tryout=${encryptedTryoutIdSafe}&kode=${this.$route.query.kode}`
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
