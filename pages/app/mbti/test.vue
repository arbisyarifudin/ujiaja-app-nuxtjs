<template>
  <div class="container pos-relative ujian">
    <div class="ujian-wrapper bg-white" v-if="loading">
      <div class="row">
        <UILoading />
      </div>
    </div>
    <div class="ujian-wrapper" v-else-if="!detail.tes">
      <div class="card ujian-guide-box">
        <div class="card-header">
          <h2 class="card-title">Petunjuk Pengerjaan</h2>
          <p class="mb-0">{{ detail.judul }}</p>
        </div>
        <div class="card-body" v-html="detail.panduan"></div>
        <div class="card-footer d-flex justify-content-end">
          <a :href="`/app/mbti`" class="btn btn-outline-dark">Kembali</a>
          <button class="btn btn-primary ml-3" v-b-modal.modal-confirm-start>
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
    <div class="ujian-wrapper" v-if="!loading && detail.tes">
      <div class="row">
        <div class="col-md-8">
          <div class="question-board bg-white p-4">
            <div class="left-section">
              <h2 class="product-name">{{ detail.judul }}</h2>
              <!-- <hr /> -->
              <div class="question-list">
                <div class="question-item">
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
                      v-html="currentNomor.pertanyaan"
                    ></p>
                    <ul class="list-unstyled option-list">
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
                            :value="opsi.id"
                            @change="saveJawaban"
                            v-model="
                              jawabanUser[currentNomor.nomor].jawaban_user
                            "
                          />
                          {{ opsi.opsi }}</label
                        >
                      </li>
                      <!-- <li class="mt-4">
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
                      </li> -->
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-md-block d-none">
          <div class="info-board bg-white p-4">
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
              :disabled="loading || jawaban_user_array.length !== totalJawaban"
              v-b-modal.modal-confirm-end
            >
              Kirim Jawaban
            </button>
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
            <div class="col-6 mb-3">
              <button
                type="button"
                class="btn btn-info btn-block square"
                v-b-toggle.sidebar-board
              >
                <i class="fas fa-list"></i>
                Nomor Soal
              </button>
            </div>
            <div class="col-6 mb-3">
              <button
                type="button"
                class="btn btn-danger btn-block square"
                :disabled="loading || jawaban_user_array.length !== totalJawaban"
                v-b-modal.modal-confirm-end
              >
                <i class="fas fa-paper-plane"></i>
                Kirim Jawaban
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-sidebar
      id="sidebar-board"
      bg-variant="white"
      text-variant="dark"
      shadow
      backdrop
      title="Nomor Soal"
      right
    >
      <div class="info-board bg-white p-4">
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
          :disabled="loading || jawaban_user_array.length !== totalJawaban"
          v-b-modal.modal-confirm-end
        >
          Kirim Jawaban
        </button>
      </div>
    </b-sidebar>
    <b-modal
      id="modal-confirm-start"
      title="Mulai Tes"
      hide-footer
      centered
      :no-close-on-backdrop="loading"
      :no-close-on-esc="loading"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin memulai kepribadian ini?
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
      title="Akhiri Tes"
      hide-footer
      centered
      :no-close-on-backdrop="loading"
      :no-close-on-esc="loading"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah kamu yakin ingin menyelesaikan dan mengirim jawaban tes-mu?
          Tindakan tidak dapat dibatalkan. Sistem akan langsung memberikan
          hasil.
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
            Ya, Kirim Sekarang
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
          Kamu dapat langsung melihat hasil ujian tryout dan lihat rekomendasi
          belajar yang tepat untukmu sekarang juga!
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
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="navGoTo(`/app/tryout/${productId}/result`)"
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
      listNomorSoal: [],
      currentNomor: {},
      jawabanUser: {},
      countdownTimer: null,
      isTimeout: false
    };
  },
  async mounted() {
    window.addEventListener("beforeunload", this.onCloseWindow);
    await this.getMBTIactive();
    await this.getNomorSoal();
    document.addEventListener("keydown", this.onKeyDownNavigation);
    this.checkLastSaved();
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.onCloseWindow);
    document.removeEventListener("keydown", this.onKeyDownNavigation);
  },
  computed: {
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
    checkLastSaved() {
      const lastSavedData = this.$cookiz.get("_ujiaja_temp_mbti_user");
      if (lastSavedData) {
        this.jawabanUser = lastSavedData.data;
        return lastSavedData;
      }
      return {};
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
        id_mbti: this.detail.id
      };
      this.$axios
        .post(`/api/mbti-jawaban/create`, dataSave)
        .then(response => {
          console.log(response);
          window.removeEventListener("beforeunload", this.onCloseWindow);
          document.removeEventListener("keydown", this.onKeyDownNavigation);
          window.location.reload();
        })
        .catch(error => console.log(error));
      // .finally(() => {this.loading = false});
    },
    async onConfirmEndTest() {
      // console.log(this.jawaban_user_array);
      this.loading = true;
      this.$axios
        .$post(`/api/mbti-jawaban-detail/create/multiple`, {
          jawabans: this.jawabanUser,
        })
        .then(response => {
          if (response) {
          this.$cookiz.remove("_ujiaja_temp_mbti_user");

            window.removeEventListener("beforeunload", this.onCloseWindow);
            this.$bvModal.hide("modal-confirm-start");
            this.$bvModal.hide("modal-confirm-end");
            this.$router.replace("/app/mbti")
            this.loading = false;
          }
        })
        .catch(error => console.log(error));
    },
    updateNomor(dataNomor) {
      this.currentNomor = dataNomor;
    },
    saveJawaban() {
      const dataSave = this.jawabanUser;
      this.$cookiz.set("_ujiaja_temp_mbti_user", {
        id_user: this.user.id,
        id_mbti: this.detail.id,
        data: dataSave,
        time: new Date().getTime()
      });
    },
    async getMBTIactive() {
      this.loading = true;
      await this.$axios
        .$get(`/api/mbti/active`)
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
    async getNomorSoal() {
      this.loading = true;
      await this.$axios
        .$get(`/api/mbti/nomor-soal/${this.detail.id}`)
        .then(res => {
          console.log("list soal", res);
          if (res.success) {
            this.listNomorSoal = res.data.pertanyaan;
            this.currentNomor = res.data.pertanyaan[0];
            this.jawabanUser = res.data.jawaban_placeholder;
            // this.$store.commit("set", ["listNomorSoal", res.data.soal]);
            // this.$store.commit("set", ["currentNomor", res.data.soal[0]]);
          }
        })
        .catch(err => {
          console.log(err);
          // this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    navGoTo(to) {
      window.removeEventListener("beforeunload", this.onCloseWindow);
      window.location.replace(to);
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
