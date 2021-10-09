<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Dimensi
            Sifat Dasar
          </h2>
          <!-- <p>
            Ayo, buat data master kelas sekarang juga untuk merelasikan data
            siswa.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3 row">
            <div class="form-group reg-siswa col-md-6">
              <label for="nama">Nama Dimensi Sifat Dasar <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="nama"
                name="nama"
                placeholder="Tulis Nama Dimensi Sifat Dasar"
                v-model="form.nama"
                disabled
              />
            </div>
            <div class="form-group reg-siswa col-md-3">
              <label for="psikologi_1">Psikologi 1 <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="psikologi_1"
                name="psikologi_1"
                placeholder="Psikologi 1"
                v-model="form.psikologi_1"
                disabled
              />
            </div>
            <div class="form-group reg-siswa col-md-3">
              <label for="psikologi_2">Psikologi 2 <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="psikologi_2"
                name="psikologi_2"
                placeholder="Psikologi 2"
                v-model="form.psikologi_2"
                disabled
              />
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="deskripsi"
                >Deskripsi Dimensi Sifat Dasar <code>*</code></label
              >
              <textarea
                class="form-control"
                id="deskripsi"
                name="deskripsi"
                placeholder="Tulis Deskripsi Dimensi Sifat Dasar"
                v-model="form.deskripsi"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/mbti/dimention"
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
      selectedId: this.$route.params.id,
      dataDetail: {},
      form: {
        nama: ""
      }
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/mbti/dimention");
    this.getDetail("dimensi", this.$route.params.id);
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (!this.form.nama || !this.form.deskripsi) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("dimensi");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$put(`/api/${type}/update/${this.$route.params.id}`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast(
              "Data " + type + " berhasil diperbarui.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.$router.replace("/administrator/mbti/dimention");
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
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            this.form = { ...this.dataDetail };
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
