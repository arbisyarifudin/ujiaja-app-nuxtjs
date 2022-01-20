<template>
  <div class="container-fluid crud px-md-4 px-0">
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
      <div class="row mandiri-detail mt-4 px-4">
        <div class="col-lg-9 col-md-7 col-sm-12 p-0 mb-3">
          <div class="row">
            <div class="col-md-6 p-0">
              <p class="text-dark h5">
                <i class="fa-fw fas fa-user"></i> Dibuat Oleh Tim Uji Aja
              </p>
              <p :class="dataDetail.is_paid ? 'text-success' : ''">
                <i class="fa-fw fas fa-check"></i>
                {{ dataDetail.is_paid ? "Sudah Terdaftar" : "Belum Terdaftar" }}
              </p>
            </div>
            <div class="col-md-6 p-0">
              <p class="text-dark h5"
                v-if="dataDetail.produk.jenis_produk == 'Masal'">
                <i class="fas fa-fw fa-calendar"></i>
                <span
                  v-text="
                    'Dimulai pada ' + dataDetail.produk.tanggal_mulai_label
                  "
                ></span>
              </p>
              <p
                class="text-dark h5"
                v-if="dataDetail.produk.jenis_produk == 'Masal'"
              >
                <i class="fas fa-fw fa-calendar"></i>
                <span
                  v-text="
                    'Berakhir pada ' + dataDetail.produk.tanggal_berakhir_label
                  "
                ></span>
              </p>
              <!-- <p class="text-dark h5" v-else>
                <i class="fas fa-fw fa-calendar"></i>
                <span>Tidak Ada Batasan Waktu Pengerjaan</span>
              </p> -->
            </div>
          </div>
          <p class="mt-3" v-html="dataDetail.produk.deskripsi_produk">
            <!-- Tryout Mandiri yang disediakan oleh Tim Uji Aja. Tryout Mandiri
            telah disusun oleh tim pembuat soal yang kompeten pada bidangnya
            masing-masing. Tryout TPS berisi 1 sesi, yaitu Tes Potensi Skolastik
            (TPS). -->
          </p>
        </div>
        <div
          class="col-lg-3 col-md-5 col-sm-12 p-0 durasi text-center pt-5 pb-4 px-3 bg-white mb-3"
        >
          <h5>Durasi Pengerjaan</h5>
          <div class="row mt-2 px-2">
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
          <div class="h6 text-muted mt-3">
            <span
              ><i class="fas fa-file-alt fa-fw mr-1"></i>
              {{ dataDetail.total_soal }} Soal</span
            >
            <span>/</span>
            <span
              ><i class="far fa-clock fa-fw mr-1"></i>
              {{ dataDetail.total_waktu }}m</span
            >
          </div>
           <div class="small" style="color: #555" v-if="dataDetail.produk.bonus">
            <i class="fas fa-fw fa-tag"></i>
            Bonus Tes MBTI : <i class="fas fa-fw" :class="[dataDetail.produk.bonus && dataDetail.produk.bonus.mbti ? 'fa-check text-success' : 'fa-times text-danger']"></i>
          </div>
        </div>
      </div>
      <router-link
        class="btn btn-primary dashboard mb-4"
        v-if="!loading && !dataDetail.transaksi"
        :to="`/app/tryout/${dataDetail.produk.id}/enroll`"
        >Beli Tryout</router-link
      >
      <button
        v-else-if="!dataDetail.is_paid"
        :disabled="true"
        class="btn btn-primary dashboard mb-4"
      >
        <i class="fas fa-fw fa-shopping-cart"></i>
        Beli Tryout
      </button>
      <button
        v-if="
          dataDetail.is_paid &&
            !dataDetail.is_task_done &&
            !dataDetail.is_task_start
        "
        class="btn btn-primary dashboard mb-4"
        @click.prevent="startTest(false)"
      >
        <i class="far fa-edit mr-1"></i> Kerjakan Tryout
      </button>
      <!-- <button
        class="btn btn-primary dashboard mb-4"
        @click.prevent="startTest(false)"
      >
        <i class="far fa-edit mr-1"></i> Kerjakan Tryout
      </button> -->
      <button
        v-if="
          dataDetail.is_paid &&
            !dataDetail.is_task_done &&
            dataDetail.is_task_start
        "
        class="btn btn-primary dashboard mb-4"
        @click.prevent="startTest(true)"
      >
        <i class="far fa-edit mr-1"></i> Lanjut Mengerjakan
      </button>
      <router-link
        class="btn btn-primary dashboard mb-4 ml-2"
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
      <router-link
        class="btn btn-primary dashboard mb-4 square"
        v-if="!loading && dataDetail.is_task_done"
        :to="`/app/tryout/${dataDetail.produk.id}/result`"
        ><i class="fas fa-fw fa-award"></i> Lihat Hasil</router-link
      >

      <h4 class="mb-4" style="font-size: 18px" v-if="dataDetail.is_paid">
        Daftar Produk:
      </h4>
      <h4 class="mb-4" style="font-size: 18px" v-else>
        Daftar Produk yang Akan Kamu Dapatkan:
      </h4>
      <div
        class="card mb-4 shadow-sm"
        v-for="(tryout, t) in dataDetail.tryout"
        :key="t"
      >
        <div
          class="card-header bg-white d-flex justify-content-between align-items-center"
        >
          <h5 class="my-0 py-2">
            {{ tryout.judul }}
          </h5>
          <div class="h6">
            <span
              ><i class="fas fa-file-alt fa-fw mr-1"></i>
              {{ tryout.jumlah_soal }} Soal</span
            >
            <span>/</span>
            <span
              ><i class="far fa-clock fa-fw mr-1"></i>
              {{ tryout.alokasi_waktu }}m</span
            >
          </div>
        </div>
        <div
          class="card-body row no-gutters mandiri-detail pos-relative flex-wrap"
        >
          <div class="col-md-12">
            <p class="alert alert-light" style="font-size: 13px">
              <i class="fas fa-info-circle mr-1"></i> {{ tryout.deskripsi }}
            </p>
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
              <!-- <p class="mb-0">
                <i class="fa-fw text-primary far fa-clock"></i>
                {{ soal.alokasi }}m
              </p> -->
            </div>
          </div>
        </div>
        <!-- <div class="card-footer">
          <button
            v-if="dataDetail.is_paid && !tryout.is_task_done"
            class="btn btn-primary dashboard"
            @click.prevent="confirmStartTest"
          >
            <i class="far fa-edit mr-1"></i> Kerjakan Tryout
          </button>
        </div> -->
      </div>
    </div>
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
  computed: {
    isAlreadyStartEvent() {
      if (this.dataDetail.produk.jenis_produk != "Masal") {
        return true;
      }
    }
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
    startTest(isContinue = false) {
      // if (this.dataDetail.produk.jenis_produk !== "Masal") {
      //   this.$bvModal.show("modal-confirm-start");
      //   return;
      // }

      if (this.dataDetail.produk.jenis_produk == "Masal" && !isContinue) {
        const hariIni = new Date().toJSON();
        const tglMulai = new Date(
          this.dataDetail.produk.tanggal_mulai
        ).toJSON();
        const tglAkhir = new Date(
          this.dataDetail.produk.tanggal_berakhir
        ).toJSON();

        const diffMulaiJam = this.formatSelisih(hariIni, tglMulai, "hours");
        const diffMulaiMenit = this.formatSelisih(hariIni, tglMulai, "minutes");
        const diffMulaiDetik = this.formatSelisih(hariIni, tglMulai, "seconds");

        const diffAkhirJam = this.formatSelisih(hariIni, tglAkhir, "hours");
        const diffAkhirMenit = this.formatSelisih(hariIni, tglAkhir, "minutes");
        const diffAkhirDetik = this.formatSelisih(hariIni, tglAkhir, "seconds");

        console.log(diffAkhirJam, diffAkhirMenit, diffAkhirDetik);

        let sudahLewatMulai, belumLewatAkhir, sudahLewatAkhir;

        if (diffMulaiJam <= 0 && diffMulaiMenit <= 0 && diffMulaiDetik <= 0) {
          console.log("Sudah melewati jam mulai.");
          sudahLewatMulai = true;
        }

        if (diffAkhirJam > 0 && diffAkhirMenit > 0 && diffAkhirDetik > 0) {
          console.log("Masih dibawah jam berakhir.");
          belumLewatAkhir = true;
        }

        if (
          diffMulaiJam <= 0 &&
          diffMulaiMenit <= 0 &&
          diffMulaiDetik <= 0 &&
          diffAkhirJam <= 0 &&
          diffAkhirMenit <= 0 &&
          diffAkhirDetik <= 0
        ) {
          sudahLewatAkhir = true;
        }

        if (sudahLewatMulai && belumLewatAkhir) {
          this.toTryoutTestPage();
        } else if (!sudahLewatMulai) {
          window.alert("Mohon maaf. Event belum dimulai ya!");
        } else if (sudahLewatMulai && sudahLewatAkhir) {
          window.alert("Mohon maaf. Event sudah berlalu!");
        }
      } else {
        this.toTryoutTestPage();
      }

      // else if(this.dataDetail.produk.jenis_produk == 'Masal' && diffMulai <=)
    },
    toTryoutTestPage() {
      // this.axios.$post("/api/tryout/")
      const encryptedProductId = this.encrypt(this.dataDetail.produk.id);
      const encryptedProductIdSafe = encodeURIComponent(encryptedProductId);
      const encryptedTryoutId = this.encrypt(this.dataDetail.tryout[0].id);
      const encryptedTryoutIdSafe = encodeURIComponent(encryptedTryoutId);
      // this.$router.replace(`/app/tryout/${encryptedProductIdSafe}/test`);
      // window.location.replace(
      //   `/app/tryout/${encryptedProductIdSafe}/test?tryout=${encryptedTryoutIdSafe}`
      // );
      window.location.href = `/app/tryout/${encryptedProductIdSafe}/test?tryout=${encryptedTryoutIdSafe}`;
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
