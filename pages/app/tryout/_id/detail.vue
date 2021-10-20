<template>
  <div class="container-fluid crud">
    <div class="col-md-12 dash-kelas p-0 text-left">
      <h2 class="pb-0">
        <BackUrl
          :title="null"
          :url="$route.query.ref ? $route.query.ref : '/app/tryout'"
          class="py-1 px-2 mr-3"
        />
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
              <p :class="dataDetail.is_paid ? 'text-success' : ''">
                <i class="fa-fw fas fa-check"></i>
                {{
                  dataDetail.is_paid ? "Sudah Terdaftar" : "Belum Terdaftar"
                }}
              </p>
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
                <p class="mb-0" v-if="dataDetail.total_waktu">
                  {{ Math.floor((dataDetail.total_waktu / 60).toFixed(1)) }}
                </p>
                <p class="mb-0">Jam</p>
              </div>
            </div>
            <div class="col-md-4 text-center p-0">
              <div class="bg-time">
                <p class="mb-0" v-if="dataDetail.total_waktu">
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
        v-if="!loading && !dataDetail.transaksi"
        :to="`/app/tryout/${dataDetail.produk.id}/enroll`"
        >Beli Tryout</router-link
      >
      <button
        v-else-if="!dataDetail.is_paid"
        :disabled="true"
        class="btn btn-primary dashboard my-4"
      >
        Beli Tryout
      </button>
      <router-link
        class="btn btn-primary dashboard my-4 ml-2"
        v-if="
          !loading &&
            isPayable(
              dataDetail,
              dataDetail.transaksi && dataDetail.transaksi.tipe
            )
        "
        :to="
          `/app/payment/${dataDetail.produk.transaksi_user.id}/detail?ref=${$route.path}`
        "
        >Detail Pembayaran</router-link
      >

      <h4 class="mb-4" style="font-size: 18px" v-if="dataDetail.is_paid">Daftar Produk:</h4>
      <h4 class="mb-4" style="font-size: 18px" v-else>Daftar Produk yang Akan Kamu Dapatkan:</h4>
      <div
        class="card mb-4 shadow-sm"
        v-for="(tryout, t) in dataDetail.tryout"
        :key="t"
      >
        <div class="card-header bg-white">
          <h5 class="my-0 py-2">
            {{ tryout.judul }}
          </h5>
        </div>
        <div class="card-body row no-gutters mandiri-detail pos-relative flex-wrap">
          <div class="col-md-12">
            <p class="alert alert-light" style="font-size: 13px"><i class="fas fa-info-circle mr-1"></i> {{tryout.deskripsi}}</p>
          </div>
          <UILoading v-if="loading" class="col-md-12" />
          <div class="col-md-4 mb-3" v-for="(soal, s) in tryout.soal" :key="s">
            <div class="mr-2 pt-4 pb-3 px-4 shadow-none border-none">
              <h5 class="mb-3">
                {{ soal.mapel ? soal.mapel.nama_mapel : "" }}
              </h5>
              <p>
                <i class="fa-fw text-primary fas fa-file-alt"></i>
                {{ soal.jumlah_soal }} Soal
              </p>
              <p class="mb-0">
                <i class="fa-fw text-primary far fa-clock"></i>
                {{ soal.alokasi }} Menit
              </p>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button
            v-if="dataDetail.is_paid && !tryout.is_task_done"
            class="btn btn-primary dashboard"
            @click.prevent="confirmStartTest"
          >
            <i class="far fa-edit mr-1"></i> Kerjakan Tryout
          </button>
        </div>
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
          Apakah anda yakin ingin memulai tryout ini? Waktu mulai akan berjalan. Harap persiapkan diri kamu sebelum mulai ya! 
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
  layout: "app",
  data() {
    return {
      loading: true,
      dataDetail: {
        produk: {},
        tryout: []
      }
    };
  },
  mounted() {
    if (!this.$route.params.id) return this.$router.go(-1);
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
    confirmStartTest() {
      const hariIni = new Date().toJSON();
      const tglMulai = new Date(this.dataDetail.produk.tanggal_mulai).toJSON();
      const tglAkhir = new Date(
        this.dataDetail.produk.tanggal_berakhir
      ).toJSON();

      const diffMulai = this.formatSelisih(hariIni, tglMulai, "hours");
      const diffAkhir = this.formatSelisih(hariIni, tglAkhir, "hours");

      console.log(diffMulai, diffAkhir);

      if (this.dataDetail.produk.jenis_produk !== "Masal") {
        this.$bvModal.show("modal-confirm-start");
      }
      // else if(this.dataDetail.produk.jenis_produk == 'Masal' && diffMulai <=)
    },
    onConfirmStartTest() {
      
    },
    formatRupiah(num) {
      if (num) {
        return num.toLocaleString("ID-id");
      }
      return 0;
    },
    isPayable(detail, tipe) {
      if (detail && detail.transaksi) {
        if (tipe == "Bank Transfer") {
          const statusPayable = [
            "Menunggu Pembayaran",
            "Menunggu Verifikasi",
            "Ditolak"
          ];
          console.log(statusPayable.includes(detail.transaksi.status));
          if (statusPayable.includes(detail.transaksi.status)) {
            return true;
          }
          return false;
        } else if (tipe == "Pihak Ketiga") {
          const statusPayable = [
            "Menunggu Pembayaran",
            "Menunggu Verifikasi",
            "Ditolak"
          ];
          console.log(statusPayable.includes(detail.transaksi.status));
          if (statusPayable.includes(detail.transaksi.status)) {
            return true;
          }
        }
      }
      return false;
    }
  }
};
</script>
