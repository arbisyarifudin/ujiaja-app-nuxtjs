<template>
  <div class="container pos-relative ujian">
    <div class="ujian-wrapper bg-white" v-if="loading">
      <div class="row">
        <UILoading />
      </div>
    </div>
    <div class="ujian-wrapper" v-else-if="!listSubtest.length">
      <div class="row">
        <div class="col-md-8">
          <div class="question-board bg-white p-4">
            <div class="left-section">
              <h2 class="product-name">{{ tryout.judul }}</h2>
              <div class="row no-gutters">
                <table class="col-sm-6 table table-borderless table-sm mb-1">
                  <tr>
                    <th width="130">Mata Pelajaran</th>
                    <td width="10">:</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th width="130">Jumlah Soal</th>
                    <td width="10">:</td>
                    <td>0 Soal</td>
                  </tr>
                </table>
              </div>
              <hr />
              <div class="question-list">
                <h4>Anda Belum Menambahkan Subtest</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-md-block d-none">
          <div class="info-board bg-white p-4">
            <h2 class="board-title mb-3">Nomor Soal</h2>
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
                  disabled
                >
                  <i class="fas fa-arrow-left"></i>
                </button>
              </div>
              <div class="col-6 mb-3">
                <button
                  type="button"
                  class="btn btn-primary btn-block square"
                  @click="onKeyDownNavigation({ key: 'ArrowRight' })"
                  disabled
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <button
              @click="toMenu"
              type="button"
              class="btn btn-danger btn-block square"
              :disabled="loading"
            >
              Selesai Preview
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
                disabled
              >
                Sebelumnya
              </button>
            </div>
            <div class="col-6 mb-3">
              <button
                type="button"
                class="btn btn-primary btn-block square"
                @click="onKeyDownNavigation({ key: 'ArrowRight' })"
                disabled
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
                @click="toMenu"
                type="button"
                class="btn btn-danger btn-block square"
                :disabled="loading"
              >
                Selesai Preview
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
          <h2 class="board-title mb-3">Nomor Soal</h2>
          <hr />
          <h2 class="board-title mb-3">Keterangan</h2>
          <ul class="list-unstyled board-legend">
            <li><span class="active"></span> Posisi kamu saat ini</li>
            <li><span class="filled"></span> Soal yang sudah dijawab</li>
            <li><span class="unfilled"></span> Soal yang belum dijawab</li>
          </ul>
        </div>
      </b-sidebar>
    </div>
    <div class="ujian-wrapper" v-else-if="!listPertanyaan.length">
      <div class="row">
        <div class="col-md-8">
          <div class="question-board bg-white p-4">
            <div class="left-section">
              <h2 class="product-name">{{ tryout.judul }}</h2>
              <div class="row no-gutters">
                <table class="col-sm-6 table table-borderless table-sm mb-1">
                  <tr>
                    <th width="130">Mata Pelajaran</th>
                    <td width="10">:</td>
                    <td>{{ listSubtest[subtestIndex].mapel }}</td>
                  </tr>
                  <tr>
                    <th width="130">Jumlah Soal</th>
                    <td width="10">:</td>
                    <td>0 Soal</td>
                  </tr>
                </table>
              </div>
              <hr />
              <div class="question-list">
                <h4>Anda Belum Menambahkan Soal pada Subtest ini</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-md-block d-none">
          <div class="info-board bg-white p-4">
            <h2 class="board-title mb-3">Nomor Soal</h2>
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
                  disabled
                >
                  <i class="fas fa-arrow-left"></i>
                </button>
              </div>
              <div class="col-6 mb-3">
                <button
                  type="button"
                  class="btn btn-primary btn-block square"
                  @click="onKeyDownNavigation({ key: 'ArrowRight' })"
                  disabled
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <button
              v-if="nextSubtestAvailable"
              @click="changeSubtest"
              type="button"
              class="btn btn-danger btn-block square"
            >
              Ke Subtest Selanjutnya
            </button>
            <button
              v-else
              @click="toMenu"
              type="button"
              class="btn btn-danger btn-block square"
              :disabled="loading"
            >
              Selesai Preview
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
                disabled
              >
                Sebelumnya
              </button>
            </div>
            <div class="col-6 mb-3">
              <button
                type="button"
                class="btn btn-primary btn-block square"
                @click="onKeyDownNavigation({ key: 'ArrowRight' })"
                disabled
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
                v-if="nextSubtestAvailable"
                @click="changeSubtest"
                type="button"
                class="btn btn-danger btn-block square"
              >
                Ke Subtest Selanjutnya
              </button>
              <button
                v-else
                @click="toMenu"
                type="button"
                class="btn btn-danger btn-block square"
                :disabled="loading"
              >
                Selesai Preview
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
          <h2 class="board-title mb-3">Nomor Soal</h2>
          <hr />
          <h2 class="board-title mb-3">Keterangan</h2>
          <ul class="list-unstyled board-legend">
            <li><span class="active"></span> Posisi kamu saat ini</li>
            <li><span class="filled"></span> Soal yang sudah dijawab</li>
            <li><span class="unfilled"></span> Soal yang belum dijawab</li>
          </ul>
        </div>
      </b-sidebar>
    </div>
    <div class="ujian-wrapper" v-else>
      <div class="row">
        <div class="col-md-8">
          <div class="question-board bg-white p-4">
            <div class="left-section">
              <h2 class="product-name">{{ tryout.judul }}</h2>
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
                      v-html="currentNomor.soal"
                    ></p>
                    <b-form-group
                      v-slot="{ ariaDescribedby }"
                      class="question-option-radio-group"
                    >
                      <b-form-radio
                        v-for="(opsi, o) in currentNomor.opsi_pertanyaan"
                        :key="'opsi' + o"
                        :aria-describedby="ariaDescribedby"
                        :name="'opsi_' + currentNomor.nomor"
                        :value="opsi.uuid"
                      >
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
            <h2 class="board-title mb-3">Nomor Soal</h2>
            <UjianNumberList
              @update="updateNomor"
              :list="listPertanyaan"
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
              v-if="nextSubtestAvailable"
              @click="changeSubtest"
              type="button"
              class="btn btn-danger btn-block square"
            >
              Ke Subtest Selanjutnya
            </button>
            <button
              v-else
              @click="toMenu"
              type="button"
              class="btn btn-danger btn-block square"
              :disabled="loading"
            >
              Selesai Preview
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
                v-if="nextSubtestAvailable"
                @click="changeSubtest"
                type="button"
                class="btn btn-danger btn-block square"
              >
                Ke Subtest Selanjutnya
              </button>
              <button
                v-else
                @click="toMenu"
                type="button"
                class="btn btn-danger btn-block square"
                :disabled="loading"
              >
                Selesai Preview
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
          <h2 class="board-title mb-3">Nomor Soal</h2>
          <UjianNumberList
            @update="updateNomor"
            :list="listPertanyaan"
            :active="currentNomor.nomor"
          />
          <hr />
          <h2 class="board-title mb-3">Keterangan</h2>
          <ul class="list-unstyled board-legend">
            <li><span class="active"></span> Posisi kamu saat ini</li>
            <li><span class="filled"></span> Soal yang sudah dijawab</li>
            <li><span class="unfilled"></span> Soal yang belum dijawab</li>
          </ul>
        </div>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      listSubtest: [],
      listPertanyaan: [],
      currentNomor: {},
      tryout: {},
      subtestIndex: 0
    }
  },
  computed: {
    nextSubtestAvailable() {
      if (this.listSubtest[this.subtestIndex + 1]) return true
      return false
    },
  },
  async mounted() {
    await this.getDetailTryout()
    if (!this.$route.query.id_mapel) {
      this.$router.replace({
        ...this.$route,
        query: {
          ...this.$route.query,
          id_mapel: this.listSubtest[0].id
        }
      })
    }
  },
  watch: {
    "$route.query.id_mapel": async function() {
      await this.getDetailTryout()
    }
  },
  methods: {
    async getDetailTryout() {
      this.loading = true
      await this.$axios
        .$get(`/api/tryout/find/${this.$route.params.id}/detail`)
        .then(res => {
          if (res.success) {
            this.tryout = res.data;
            this.listSubtest = res.data.soal.map((to) => ({
              id: to.id,
              mapel: to.mapel.nama_mapel,
            }));
            this.subtestIndex = this.listSubtest.findIndex(subtest => subtest.id === parseInt(this.$route.query.id_mapel, 10))
            this.listPertanyaan = res.data.soal.find(to => to.id === this.listSubtest[this.subtestIndex].id).pertanyaan
            this.currentNomor = this.listPertanyaan[0]
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => this.loading = false)
    },
    onKeyDownNavigation(e) {
      const key = e.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
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
      foundSoal = this.listPertanyaan.find(item => item.nomor == targetNomor);
      if (foundSoal) {
        this.currentNomor = foundSoal;
      }
    },
    updateNomor(dataNomor) {
      this.currentNomor = dataNomor;
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
    },
    changeSubtest() {
      this.$router.push({
        ...this.$route,
        query: {
          ...this.$route.query,
          id_mapel: this.listSubtest[this.subtestIndex + 1].id
        }
      })
    },
    toMenu() {
      this.$router.push({
        path: '/administrator/tryout'
      })
    }
  }
}
</script>


<style>
@import url("@/assets/admin.css");
</style>
