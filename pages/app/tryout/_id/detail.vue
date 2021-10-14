<template>
  <div class="container-fluid crud">
    <div class="col-md-12 dash-kelas p-0 text-left">
      <h2 class="pb-0">
        <BackUrl :title="null" class="py-1 px-2 mr-3" />
        <b-spinner type="grow" class="mr-2" v-if="loading" />
        {{ dataDetail.produk.nama_produk }}
      </h2>
      <div class="d-flex mandiri-detail mt-4">
        <div class="col-md-9 p-0">
          <div class="d-flex">
            <div class="col-md-6 p-0">
              <p class="text-dark h5">
                <i class="fa-fw fas fa-user"></i> Dibuat Oleh Tim Uji Aja
              </p>
              <p><i class="fa-fw fas fa-check"></i> Belum Terdaftar</p>
            </div>
            <div
              class="col-md-6 p-0"
              v-if="dataDetail.produk.jenis_produk == 'Masal'"
            >
              <p class="text-dark h5">
                <i class="fas fa-fw fa-calendar"></i>
                <!-- <span>Tidak Ada Batasan Waktu Pengerjaan</span> -->
                <span
                  v-text="
                    'Dimulai pada ' + dataDetail.produk.tanggal_mulai_label
                  "
                ></span>
              </p>
            </div>
          </div>
          <p class="mt-3" v-html="dataDetail.produk.deskripsi_produk">
            <!-- Tryout Mandiri yang disediakan oleh Tim Uji Aja. Tryout Mandiri
            telah disusun oleh tim pembuat soal yang kompeten pada bidangnya
            masing-masing. Tryout TPS berisi 1 sesi, yaitu Tes Potensi Skolastik
            (TPS). -->
          </p>
        </div>
        <div class="col-md-3 p-0 durasi text-center pt-5 pb-4 px-3  bg-white">
          <h5>Durasi Pengerjaan</h5>
          <div class="d-flex mt-2">
            <div class="col-md-4 text-center p-0">
              <div class="bg-time">
                <p class="mb-0">
                  {{ Math.floor((dataDetail.total_waktu / 60).toFixed(1)) }}
                </p>
                <p class="mb-0">Jam</p>
              </div>
            </div>
            <div class="col-md-4 text-center p-0">
              <div class="bg-time">
                <p class="mb-0">
                  {{ Math.floor((dataDetail.total_waktu % 60).toFixed(1)) }}
                </p>
                <p class="mb-0">Menit</p>
              </div>
            </div>
            <div class="col-md-4 text-center p-0">
              <div class="bg-time">
                <p class="mb-0">00</p>
                <p class="mb-0">Detik</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-link
        class="btn btn-primary dashboard my-4"
        v-if="!loading"
        :to="`/app/tryout/${dataDetail.produk.id}/enroll`"
        >Beli Tryout</router-link
      >

      <h5 class="my-4">Detail Soal</h5>
      <div class="row px-3 mandiri-detail pos-relative">
        <UILoading v-if="loading" class="col-md-12" />
        <div
          class="col-md-6 p-0"
          v-for="(tryout, t) in dataDetail.tryout"
          :key="t"
        >
          <div class="bg-white mr-2 p-5">
            <h5 class="mb-3">{{ tryout.judul }}</h5>
            <p><i class="fa-fw text-primary fas fa-file-alt"></i> 16 Soal</p>
            <p class="mb-0">
              <i class="fa-fw text-primary far fa-clock"></i> 28 Menit
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-12 p-0 text-right">
        <button class="btn btn-outline-secondary my-5 px-5 py-3">
          Kembali
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: false,
      dataDetail: {
        produk: {},
        tryout: []
      }
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/product");
    this.getDetail("produk", this.$route.params.id);
  },
  methods: {
    resetModal() {},
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}/detail`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    deleteData(type) {
      this.loading = true;
      this.$axios
        .$delete(`/api/${type}/delete/${this.$route.params.id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            // this.items.splice(this.selectedIndex, 1);
            this.$root.$bvToast.toast("Data " + type + " berhasil dihapus.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$bvModal.hide("modal-delete");
            this.$router.replace("/administrator/product");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    formatRupiah(num) {
      if (num) {
        return num.toLocaleString("ID-id");
      }
      return 0;
    }
  }
};
</script>
