<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah Perguruan Tinggi</h2>
          <p>
            Ayo, buat data master perguruan tinggi sekarang juga untuk merelasikan data program studi.
          </p>
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">Nama Perguruan Tinggi <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Isi Nama Perguruan Tinggi"
                v-model="form.nama_perguruan"
              />
            </div>
          </div>
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">Akreditasi Perguruan Tinggi <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Isi Akreditasi Perguruan Tinggi"
                v-model="form.akreditasi"
              />
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/master_perguruan_tinggi"
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
        nama_perguruan: "",
        akreditasi: "",
      },
    };
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (!this.form.nama_perguruan || !this.form.akreditasi) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000,
        });
        return;
      }
      this.submitData("perguruanTinggi");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/create`, this.form)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data perguruan tinggi berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000,
            });
            this.$router.replace("/administrator/master_perguruan_tinggi");
          }
          return true;
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>