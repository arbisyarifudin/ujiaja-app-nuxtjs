<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah Mata Pelajaran</h2>
          <p>
            Ayo, buat data master mata pelajaran sekarang juga untuk merelasikan
            dengan data tryout.
          </p>
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="kode">Kode Mata Pelajaran <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="kode"
                placeholder="Tulis Kode Mata Pelajaran"
                v-model="form.kode"
              />
            </div>
          </div>
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="nama_mapel">Nama Mata Pelajaran <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="nama_mapel"
                placeholder="Tulis Nama Mata Pelajaran"
                v-model="form.nama_mapel"
              />
            </div>
          </div>
          <!-- <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="kelompok">Kelompok/Kategori</label>
              <b-form-select
                class="form-control"
                id="kelompok"
                v-model="form.kelompok"
                :options="kelompoks"
              />
            </div>
          </div> -->
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/master_mapel"
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
        kode: '',
        nama_mapel: "",
        // kelompok: null
      },
      kelompoks: [
        { text: '-- Pilih --', value: null },
        { text: 'SAINTEK', value: 'SAINTEK' },
        { text: 'SOSHUM', value: 'SOSHUM' },
      ]
    };
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (!this.form.nama_mapel) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("mapel");
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
            this.$router.replace("/administrator/master_mapel");
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
