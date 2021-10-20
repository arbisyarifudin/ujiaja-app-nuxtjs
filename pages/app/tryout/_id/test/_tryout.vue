<template>
  <div class="container">
    <div class="ujian ujian-wrapper">
      <div class="row no-gutters">
        <div class="col-md-8">
          <h2 class="product-name">{{ tryout.judul }}</h2>
          <!-- <hr /> -->
          <div class="left-section">
            <div class="row no-gutters">
              <table class="col-sm-6 table table-borderless table-sm mb-1">
                <tr>
                  <th width="130">Mata Pelajaran</th>
                  <td width="10">:</td>
                  <td>Penalaran Umum</td>
                </tr>
                <tr>
                  <th width="130">Jumlah Soal</th>
                  <td width="10">:</td>
                  <td>16 Soal</td>
                </tr>
              </table>

              <table class="col-sm-6 table table-borderless table-sm mb-1">
                <tr>
                  <th width="130">Bab Mapel</th>
                  <td width="10">:</td>
                  <td>Kubus & Balik</td>
                </tr>
                <tr>
                  <th width="130">Dimulai Nomor</th>
                  <td width="10">:</td>
                  <td>01 - 03</td>
                </tr>
              </table>
            </div>
            <hr />
            <div class="question-list">
              <div class="question-item">
                <div class="question-header-text">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. A,
                    ipsam! Accusamus praesentium nam ipsum officiis architecto
                    iure a dicta ea commodi deleniti, exercitationem repellendus
                    rerum eius doloremque iusto eaque. Deleniti.
                  </p>
                </div>
                <div class="question-child-item" v-for="x in 5" :key="x">
                  <h3 class="question-header-title" :id="'question-' + x">
                    Pertanyaan <b-badge variant="primary">{{ x }}</b-badge>
                  </h3>
                  <p class="question-main-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quidem, omnis?
                  </p>
                  <ul class="list-unstyled option-list">
                    <li class="option-item">
                      <label for="1"
                        ><input type="radio" name="radio" id="1" class="mr-2" />
                        Keadaan Nyata Pendidikan Indonesia</label
                      >
                    </li>
                    <li class="option-item">
                      <label for="2"
                        ><input type="radio" name="radio" id="2" class="mr-2" />
                        Keadaan Nyata Pendidikan Indonesia</label
                      >
                    </li>
                    <li class="option-item">
                      <label for="3"
                        ><input type="radio" name="radio" id="3" class="mr-2" />
                        Keadaan Nyata Pendidikan Indonesia</label
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-md-block d-none">
          <div class="question-board bg-white p-4">
            <h2 class="board-timer d-flex align-items-center">
              <i class="far fa-clock fa-fw mr-1 small"></i> 01:30:00
            </h2>
            <hr />
            <h2 class="board-title mb-3">Nomor Soal</h2>
            <ol class="list-unstyled row align-items-center board-list">
              <li class="board-item col-2">
                <a href="#question-1" class="board-item-number">1</a>
                <span class="bg-primary"></span>
              </li>
              <li class="board-item col-2">
                <a href="#question-2" class="board-item-number">2</a>
                <span class="bg-success"></span>
              </li>
              <li class="board-item col-2">
                <a href="#question-3" class="board-item-number">3</a>
              </li>
              <li class="board-item col-2">
                <a href="#" class="board-item-number">4</a>
              </li>
              <li class="board-item col-2">
                <a href="#" class="board-item-number">5</a>
              </li>
            </ol>
            <hr />
            <h3 class="board-title mb-3">Panduan Pengerjaan:</h3>
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
        <div class="question-board bg-white">
          <!-- <h2 class="board-title text-center">Nomor Soal</h2> -->
          <ol class="list-unstyled row align-items-center board-list">
            <li class="board-item col-2">
              <a href="#" class="board-item-number">1</a>
              <span class="bg-primary"></span>
            </li>
            <li class="board-item col-2">
              <a href="#" class="board-item-number">2</a>
              <span class="bg-success"></span>
            </li>
            <li class="board-item col-2">
              <a href="#" class="board-item-number">3</a>
            </li>
            <li class="board-item col-2">
              <a href="#" class="board-item-number">4</a>
            </li>
            <li class="board-item col-2">
              <a href="#" class="board-item-number">5</a>
            </li>
          </ol>
        </div>
      </b-sidebar>
    </div>
    <!-- <b-button v-b-toggle.sidebar-board>Toggle Sidebar</b-button> -->
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
      detail: {},
      tryout: {}
    };
  },
  mounted() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getDetailProduk();
    this.getDetailTryout();
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
    }
  },
  methods: {
    getDetailProduk() {
      this.loading = true;
      this.$axios
        .$get(`/api/produk/find/${this.productId}`)
        .then(res => {
          console.log(res);
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
    getDetailTryout() {
      this.loading = true;
      this.$axios
        .$get(`/api/tryout/find/${this.tryoutId}/detail`)
        .then(res => {
          console.log(res);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.ujian {
  &-wrapper {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 25px;
    padding: 20px 30px;
    height: calc(100vh - 40px);
    margin-top: 20px;
    overflow-y: hidden;
  }
  .left-section {
    overflow-y: auto;
    height: 100%;
    max-height: calc(100vh - 150px);
    // padding-top: 30px;
    // position: relative;
  }
  .badge {
    border-radius: 25px;
    padding: 5px 10px;
  }
  .product-name {
    font-size: 25px;
    line-height: 35px;
    position: sticky;
    background-color: white;
    z-index: 1;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  .table-sm {
    th,
    td {
      font-size: 14px;
    }
  }
  .question {
    &-list {
      font-size: 13px;
    }
    &-header-title {
      font-size: 20px;
      margin-bottom: 15px;
    }
    &-main {
      &-text {
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
  .option {
    &-item {
      font-size: 13px;
      label {
        padding-top: 10px;
        padding-bottom: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
  .board {
    &-title {
      font-size: 20px;
    }
    &-item {
      display: block;
      position: relative;
      &-number {
        display: block;
        background-color: #f1e9fe;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 5px 18px;
        color: #9490a4;
        text-decoration: none;
        transition: cubic-bezier(0.95, 0.05, 0.795, 0.035);
        &:hover {
          font-weight: 500;
          transform: scale(1.1);
        }
        + span {
          position: absolute;
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #d1b8fc;
          right: 10px;
          bottom: 2px;
        }
      }
    }
  }
}
</style>
