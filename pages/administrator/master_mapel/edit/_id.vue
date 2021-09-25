<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Mata
            Pelajaran
          </h2>
          <!-- <p>
            Ayo, buat data master kelas sekarang juga untuk merelasikan data
            siswa.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">Nama Mata Pelajaran <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Isi Nama Mata Pelajaran"
                v-model="form.nama_mapel"
              />
            </div>
          </div>
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
      selectedId: this.$route.params.id,
      dataDetail: {},
      form: {
        nama_mapel: ""
      }
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/master_mapel");
    this.getDetail("mapel", this.$route.params.id);
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
            this.$router.replace("/administrator/master_mapel");
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
            this.form = {
              nama_mapel: this.dataDetail.nama_mapel
            };
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
