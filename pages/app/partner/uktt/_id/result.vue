<template>
  <div class="container-fluid crud px-md-4 px-0">
    <div class="dash-kelas p-0 text-left">
      <h3>
        <BackUrl
          :title="null"
          :url="$route.query.ref ? $route.query.ref : '/app/partner/uktt'"
          class="py-1 px-2 mr-3"
        />
        Hasil Ujian
      </h3>
      <h2 class="pb-0 mb-5">
        {{
          detailProduk.nama_produk
            ? detailProduk.nama_produk
            : "Tes Kompetensi UjiAja"
        }}
      </h2>
    </div>
    <div class="row skor" v-if="!loading">
      <div class="col-md-8">
        <div class="skor-date">
          <div class="mb-3">
            <i class="fas fa-calendar fa-fw mr-1"></i> {{formatTanggal(detailSoal.waktu_selesai)}}
          </div>
          <div class="mb-3">
            <i class="fas fa-clock fa-fw mr-1"></i> {{formatTanggal(detailSoal.waktu_selesai, 'HH:mm')}} WIB
          </div>
          <div class="mb-3">
            <i class="fas fa-book fa-fw mr-1"></i> {{detailSoal.nama_mapel}}
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-center skor-box">
          <img :src="skorStampImage()" alt="stamp" class="skor-stamp">
          <div class="mb-2">Skor</div>
          <div class="h3 skor-val">{{dataResult.skor.skor_akhir}} / {{detailProduk.uktt_nilai_minimal}}</div>
          <button class="btn btn-primary square btn-sm" v-if="!isLulus" @click.prevent="$bvModal.show('modal-confirm')"><i class="fas fa-reply fa-fw mr-1"></i> Ulangi Ujian</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="alert alert-danger" v-if="!isLulus && !loading && dataResult.detail && dataResult.detail.produk">Mohon maaf! Anda belum mencapai nilai minimum kelulusan Ujian UKTT ini. Silakan coba lagi.</div>
    <div class="alert alert-success" v-if="isLulus && !loading && dataResult.detail && dataResult.detail.produk">Selamat! Skor Anda telah mencapai nilai minimum kelulusan Ujian UKTT ini. Sekarang level Anda telah naik menjadi <b>{{dataResult.detail.produk.level.nama_levek}}</b>. <hr>Untuk naik ke level selanjutnya Anda perlu memenui syarat berikut:
    <br>
    <ul>
      <li>asas</li>
      <li>asas</li>
      <li>asas</li>
    </ul>
    </div>
    <hr>
    <div class="soal mt-4">
      <div class="h4">Detail Soal</div>
      <UILoading v-if="loading" />
      <ol>
        <li class="pl-2 mb-4" v-for="(soal, s_index) in dataResult.soal" :key="'s'+s_index">
          <div class="h6 text-dark soal-pertanyaan" v-html="soal.soal_pertanyaan"></div>
          <ul class="list-unstyled">
            <li v-for="(opsi, o_index) in soal.opsi_pertanyaan" :key="'o'+o_index">
              <label :for="`${s_index}-${o_index}`"
                ><input :id="`${s_index}-${o_index}`" type="radio" :name="`radio_${s_index}_${o_index}`" disabled :value="opsi.uuid" :checked="opsi.uuid === soal.jawaban_user"/>
                <span v-html="opsi.option" :class="optionColor(soal, opsi)"></span>
                </label
              >
            </li>
          </ul>
          <div class="mt-2">
            <div class="badge badge-info px-2" style="border-radius: 10px; font-weight: 500; font-size: 12px" v-for="(bab, b_index) in soal.bab" :key="'b'+b_index">{{bab}}</div>
          </div>
        </li>
      </ol>
    </div>
    <b-modal
      id="modal-confirm"
      title="Konfirmasi Kerjakan UKTT Ulang"
      centered
      hide-footer
      class="admin-modal"
    >
      <div>
        <p class="modal-text">
          Apakah Anda yakin ingin mengerjakan UKTT ulang? Data hasil ujian terakhir akan dihapus dan tidak dapat dikembalikan.
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary square"
            type="button"
            @click="$bvModal.hide('modal-confirm')"
          >
            Tutup
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2 square"
            type="button"
            :disabled="submitting"
            @click.prevent="resetUjian"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner> Ya, Kerjakan Ulang
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<style lang="scss">
.skor {
  &-box {
    border: 2px solid #9e8df3;
    background-color: #fcfbff;
    padding: 20px 40px;
    // color: white;
  }
  &-stamp {
    position: absolute;
    width: 80px;
    height: 80px;
    left: -25px;
    top: 10px;
    transform: rotate(-15deg);
  }
}
.soal {
  .soal-pertanyaan {
     color: #47415b!important;
     margin-bottom: 10px;
     p {
        color: #47415b!important;
     }
  }
}
</style>

<script>
export default {
  layout: "app",
  fetchOnServer: false,
  data() {
    return {
      loading: true,
      submitting: false,
      detailProduk: {},
      dataResult: {
        detail: {},
        soal: [],
        pencocokan: [],
        skor: {
          skor_akhir: 0
        }
      }
    };
  },
  created() {
    if (!this.$route.params.id) return this.$router.go(-1);
    this.getDetail("produk", this.$route.params.id);
    this.getResult(this.$route.params.id)
  },
  computed: {
    detailSoal() {
      if (this.dataResult.soal && this.dataResult.soal.length > 0 ) {
        return {
          ...this.dataResult.detail,
          ...this.dataResult.soal[0],
        };
      } else {
        return {}
      }
    },
    isLulus() {
      return this.dataResult.skor.skor_akhir >= this.detailProduk.uktt_nilai_minimal
    }
  },  
  methods: {
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.detailProduk = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getResult(id) {
      this.loading = true;
      this.$axios
        .$get(`/api/tryout_user/uktt-hasil?id_produk=${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataResult = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    optionColor(soal, opsi) {
      console.log(soal.nomor, soal.jawaban_pertanyaan, soal.jawaban_user)
      if(opsi.uuid == soal.jawaban_pertanyaan && opsi.uuid == soal.jawaban_user) {
          return 'text-success font-weight-bold'
      }
      if(opsi.uuid == soal.jawaban_user && soal.jawaban_user != soal.jawaban_pertanyaan) {
        return 'text-danger font-weight-bold'
      }
    },
    skorStampImage() {
      if (this.isLulus) {
        return '/icon/uktt-lulus.svg';
      } else {
        return '/icon/uktt-gagal.svg'
      }
    },
    resetUjian() {
      console.log('reset')
      this.submitting = true
      this.$axios.$delete('/api/tryout_user/uktt-reset/' + this.dataResult.detail.id)
      .then(response => {
        this.showToastMessage('UKTT berhasil direset!', 'success');
        const encryptedProductId = this.encrypt(this.dataResult.detail.id_produk);
        const encryptedProductIdSafe = encodeURIComponent(encryptedProductId);
        const encryptedTryoutId = this.encrypt(this.dataResult.detail.id_tryout);
        const encryptedTryoutIdSafe = encodeURIComponent(encryptedTryoutId);
        window.location.href = `/app/partner/uktt/${encryptedProductIdSafe}/test?tryout=${encryptedTryoutIdSafe}`;
      }).catch(err => {
        console.log(err);
        this.catchError(err);
      })
      .finally(() => (this.submitting = false));
    }
  }
};
</script>
