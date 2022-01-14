<template>
  <div class="row no-gutters">
    <div class="col-md-12 dashboard px-0">
      <div class="d-flex justify-content-between">
        <div>
          <h2 class="dash-label">
            Halo, Arbi Syarifudin!
          </h2>
          <p style="color: #777">
            Berikut adalah hasil test MBTI yang pernah kamu kerjakan.
          </p>
        </div>
        <!-- <button class="btn btn-primary square">
          <i class="fas fa-shopping-cart fa-fw mr-1"></i> Beli Tes MBTI
        </button> -->
      </div>
      <hr />
    </div>
    <div class="col-md-12">
      <div class="kelas lihat-tryout mt-4 d-flex w-100">
        <div class="col-md-8">
          <h4 class="m-0 mb-3">Oops!</h4>
          <p>
            Kamu belum pernah melakukan tes kepribadian. <br />
            <span
              v-if="
                detail &&
                  detail.transaksi &&
                  detail.transaksi.status != 'Sudah Diverifikasi'
              "
              >Tapi pembayaran kamu sedang diproses ya..</span
            >
            <span v-else-if="detail && !detail.transaksi"
              >Yuk beli tes MBTI sekarang!</span
            >
          </p>
          <nuxt-link
            class="btn btn-primary dashboard px-4"
            to="/app/mbti/enroll"
            v-if="
              (detail && !detail.transaksi) && !userDetail.bonus_mbti
            "
          >
            Beli Tes MBTI
          </nuxt-link>
          <nuxt-link
            class="btn btn-primary dashboard px-4"
            :to="`/app/payment/${detail.transaksi.id_induk}/detail`"
            v-if="
              detail &&
                detail.transaksi &&
                detail.transaksi.status != 'Sudah Diverifikasi'
            "
          >
            Cek Detail Pembayaran
          </nuxt-link>
          <button
            class="btn btn-primary dashboard px-4"
            v-if="
              (detail &&
                detail.transaksi &&
                detail.transaksi.status == 'Sudah Diverifikasi')"
            type="button"
            @click="toTesPage"
          >
            Mulai Tes Kepribadian
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      detail: {}
    };
  },
  mounted() {
    this.detail = this.data;
  },
  watch: {
    data(value) {
      this.detail = value;
    }
  },
  computed: {
    userDetail() {
      return this.$store.state.dataUser.detail;
    }
  },
  methods: {
    toTesPage() {
      window.location.href = process.env.baseUrl + "/app/mbti/test";
    }
  }
};
</script>
