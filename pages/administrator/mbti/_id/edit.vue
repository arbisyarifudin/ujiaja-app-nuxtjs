<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Ubah Tes MBTI</h2>
          <!-- <p>
            Ayo, buat data master soal & jawaban sekarang juga untuk merelasikan
            data MBTI.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="judul_soal">Judul Soal <code>*</code></label>
              <input
                type="judul_soal"
                class="form-control"
                id="judul_soal"
                placeholder="Tulis Judul Soal"
                v-model="form.judul"
              />
            </div>
          </div>
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">Deskripsi Soal <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Tulis Deskripsi Soal"
                v-model="form.deskripsi"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="form-user mt-3">
                <div class="form-group reg-siswa">
                  <label for="harga_mbti">Biaya (Rp) <code>*</code></label>
                  <input
                    type="number"
                    class="form-control"
                    id="harga_mbti"
                    placeholder="Masukkan Biaya"
                    v-model="form.harga"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="col-md-4">
              <div class="form-user mt-3">
                <div class="form-group reg-siswa">
                  <label for="sertifikat_mbti">Sertifikat <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    id="sertifikat_mbti"
                    v-model="form.sertifikat"
                    :options="[
                    {text:'Pakai', value:'Pakai'},
                    {text:'Tidak Pakai', value:'Tidak Pakai'},
                    ]"
                  />
                </div>
              </div>
            </div> -->
            <div class="col-md-4">
              <div class="form-user mt-3">
                <div class="form-group reg-siswa">
                  <label for="sertifikat_mbti">Jadikan Utama? <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    id="sertifikat_mbti"
                    v-model="form.status"
                    :options="[
                    {text:'Ya', value:'Aktif'},
                    {text:'Tidak', value:'Tidak Aktif'},
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/mbti"
            class="btn btn-outline-secondary mr-2"
          >
            Kembali
          </nuxt-link>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <b-spinner small class="mr-1" v-if="loading"></b-spinner>
            Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      form: {
        judul: "",
        deskripsi: "",
        panduan: "-",
        harga: 10000,
        sertifikat: 'Pakai',
        status: 'Tidak Aktif',
        // id_dimensi: [1, 2, 3, 4]
      }
    };
  },
  mounted () {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/mbti");
    this.getDetail("mbti", this.$route.params.id);
    this.$store.commit("setBreadcrumb", [
      { text: "Dashboard", href: "/administrator/dashboard", icon: "house" },
      {
        text: "MBTI",
        href: "/administrator/mbti"
      },
      {
        text: "Edit",
        active: true
      }
    ]);
  },
  methods: {
    validateForm() {
      if (!this.form.judul) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("mbti");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$put(`/api/${type}/update/${this.$route.params.id}`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data " + type + " berhasil diperbarui.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.push("/administrator/mbti/" + res.data.id + "/edit");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          if (res.success) {
            this.form = res.data;
          }
          return true;
        })
        .catch(err => {
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
