<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah Soal MBTI</h2>
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
        id_dimensi: [1, 2, 3, 4]
      }
    };
  },
  mounted () {
    this.$store.commit("setBreadcrumb", [
      { text: "Dashboard", href: "/administrator/dashboard", icon: "house" },
      {
        text: "MBTI",
        href: "/administrator/mbti"
      },
      {
        text: "Add",
        active: true
      },
    ]);
  },
  methods: {
    validateForm() {
      console.log(this.form);
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
        .$post(`/api/${type}/create`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data " + type + " berhasil ditambah.", {
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
    }
  }
};
</script>
