<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10;">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail Produk
            / Event
          </h2>
          <BackUrl url="/administrator/product" />
        </div>
      </div>
      <div class="col-md-12">
        <div
          class="header-detail bg-white my-4 px-5 py-4"
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div v-if="dataDetail.produk && !loading">

            <h3 class="mb-0">{{ dataDetail.produk.nama_produk }}</h3>
            <h4 class="mt-3" style="font-size: 12px; color: #555" v-if="dataDetail.produk.jenis_produk == 'Masal'"><i class="fas fa-calendar fa-fw"></i> {{dataDetail.produk.tanggal_mulai_label}} s/d {{dataDetail.produk.tanggal_berakhir_label}}</h4>
            <div class="small" style="color: #555">
              <i class="fas fa-fw fa-tag"></i>
                Bonus Tes MBTI : <i class="fas fa-fw" :class="[dataDetail.produk.bonus && dataDetail.produk.bonus.mbti ? 'fa-check text-success' : 'fa-times text-danger']"></i>
              </div>
          </div>
          <div v-if="!loading">
            <router-link
              :to="`/administrator/product/${dataDetail.produk.id}/edit`"
              role="button"
              z
              class="btn btn-success square py-1 mr-2"
            >
              Ubah Event
            </router-link>
            <button
              type="button"
              class="btn btn-danger square py-1"
              v-b-modal.modal-delete
            >
              Hapus Event
            </button>

            <button v-if="this.dataDetail.produk.kategori_produk == 'ASPD' || this.dataDetail.produk.kategori_produk == 'PAT' || this.dataDetail.produk.kategori_produk == 'PAS'"
            class="btn btn-primary square"
            :disabled="generating"
            @click.prevent="generateCSV()"
          >
            <b-spinner v-if="generating" small></b-spinner>


           Export Hasil TO {{ dataDetail.produk.kategori_produk }}
          </button>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3">
            <div class="bg-white pl-5 p-4">
              <h5 class="mb-3">Total Waktu</h5>
              <div class="d-flex justify-content-between">
                <p>{{ dataDetail.total_waktu }}</p>
                <i
                  class="fa fa-question-circle"
                  v-b-tooltip.hover
                  title="Total Waktu dalam Menit"
                ></i>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="bg-white pl-5 p-4">
              <h5 class="mb-3">Total Soal</h5>
              <div class="d-flex justify-content-between">
                <p>{{ dataDetail.total_soal }}</p>
                <i
                  class="fa fa-question-circle"
                  v-b-tooltip.hover
                  title="Total Soal dalam Tryout di produk ini"
                ></i>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="bg-white pl-5 p-4">
              <h5 class="mb-3">Event</h5>
              <p>{{ dataDetail.produk.jenis_produk }}</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="bg-white pl-5 p-4">
              <h5 class="mb-3">Paket</h5>
              <p>{{ dataDetail.produk.tipe_paket }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 my-4">
        <div class="bg-white p-5">
          <h5>Penilaian (Berlaku Untuk Pilihan Ganda & Kompleks)</h5>
          <p class="mb-2">
            Nilai Benar:
            {{
              dataDetail.produk.perhitungan
                ? dataDetail.produk.perhitungan.correct
                : "-"
            }}
          </p>
          <p class="mb-2">
            Nilai Salah:
            {{
              dataDetail.produk.perhitungan
                ? dataDetail.produk.perhitungan.wrong
                : "-"
            }}
          </p>
          <p>
            Nilai Tidak Diisi:
            {{
              dataDetail.produk.perhitungan
                ? dataDetail.produk.perhitungan.unfilled
                : "-"
            }}
          </p>
        </div>
      </div>

      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <div class="bg-white pl-5 p-4">
              <h5>Biaya</h5>
              <p>{{ dataDetail.produk.harga_label }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="bg-white pl-5 p-4">
              <h5>Status</h5>
              <p>
                {{
                  dataDetail.produk.status_produk == "Tidak"
                    ? "Nonaktif"
                    : "Aktif"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 my-4">
        <div class="card card-header bg-white pt-4 pb-3">
          <h3 class="h4 mb-0">Daftar Tryout dari Produk Ini</h3>
        </div>
        <UILoading v-if="loading" />
        <div
          v-else
          class="bg-white p-5"
          v-for="(tryout, t) in dataDetail.tryout"
          :key="t"
        >
          <div
            class="header-detail d-flex justify-content-between align-items-center"
          >
            <div class="">
              <h5 class="mb-3">{{ tryout.judul }}</h5>
              <h6 class="mb-3 text-muted">
                <span v-if="tryout.jenis_soal">{{ tryout.jenis_soal }}</span>
                <!-- <span>- {{ tryout.template_soal }}</span> -->
                <span v-if="tryout.alokasi_waktu">- {{ tryout.alokasi_waktu }} menit</span>
              </h6>
            </div>
            <div>
              <router-link
                class="btn btn-primary py-1 square"
                :to="`/administrator/tryout/${tryout.id}/soal/v2/create`"
                >Lihat Soal Tryout </router-link
              >
            </div>
          </div>
          <ol class="pl-4">
            <li class="mb-3" v-for="(soal, s) in tryout.soal" :key="s">
              {{ soal.mapel ? soal.mapel.nama_mapel : "???" }} -
              {{ soal.jumlah_soal ? soal.jumlah_soal : "??" }} Soal &nbsp;
              <strong v-if="tryout.jenis_soal == 'Campuran'">
                (
                <span>{{ soal.jenis_soal }}</span>
                <span>{{ soal.kelompok_soal }}</span>
                )
              </strong>
            </li>
            <!-- <li class="mb-3">
              Pemahaman Bacaan dan Menulis - 20 Soal & Alokasi Waktu 25 Menit
            </li>
            <li class="mb-3">
              Pengetahuan dan Penalaran Umum - 20 Soal & Alokasi Waktu 25 Menit
            </li>
            <li class="mb-3">
              Pengetahuan Kuantitatif - 20 Soal & Alokasi Waktu 35 Menit
            </li> -->
          </ol>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus Produk / Event"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus produk / event ini?
          <span class="text-danger"
            >Data yang dihapus tidak dapat dikembalikan.</span
          >
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="deletePaksaData('produk')"
            :disabled="loadinghapuspaksa">
            Hapus Paksa
            <b-spinner small v-if="loadinghapuspaksa" class="mr-1"></b-spinner>
          </button>
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-delete')"
          >
            Tidak
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="deleteData('produk')"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Ya
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {

  layout: "admin",
  data() {
    return {
      loading: true,
      loadinghapuspaksa: false,
      dataDetail: {
        produk: {},
        tryout: []
      }
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/product");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Product",
        href: "/administrator/product",
       },
      {
        text: "Detail",
        active: true
      }
    ]);
    this.getDetail("produk", this.$route.params.id);
  },
  methods: {
    resetModal() {},
    deletePaksaData(type) {
      this.loadinghapuspaksa = true;
      this.$axios
        .$delete(`/api/${type}/delete-paksa/${this.$route.params.id}`)
        .then(res => {
          console.log(res);
          if (res.success) {


            this.$bvModal.hide("modal-delete");
            this.$router.replace("/administrator/product");
            this.$bvToast.toast("Data " + type + " berhasil dihapus.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
          }
          return true;
        })
        .catch(err => {
          console.log(err.response)
          if(err.response && err.response.status && err.response.status == 500 && err.response.data && err.response.data.message && err.response.data.message.includes('SQLSTATE[23000]')) {
            return this.showToastMessage('Data tidak dapat dihapus karena sudah terdaftar pada produk yang telah dibeli oleh Siswa!', 'danger', 4000);
          }
          this.catchError(err);
        })
        .finally(() => (this.loadinghapuspaksa = false));
    },
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
    generateCSV() {


      this.$axios
        .$post(`/api/produk/export-csv`, {
          id_produk: this.dataDetail.produk.id,

        })
        .then(res => {
          //console.log(res);
          if (res.success) {
              const pdfUrl = res.data;
              let anchor = document.createElement("a");
              anchor.setAttribute("target", "_blank");
              anchor.setAttribute("href", pdfUrl);
              anchor.setAttribute("download", true);
               console.log(anchor);
              anchor.click();

          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        });

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

<style></style>
