<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Ubah Kelas</h2>
          <!-- <p>
            Ayo, buat data master kelas sekarang juga untuk merelasikan data
            siswa.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="select">Jenjang Studi</label>
              <b-form-select class="form-control" v-model="form.id_jenjang">
                <b-form-select-option :value="null"
                  >-- Pilih Jenjang --</b-form-select-option
                >
                <b-form-select-option
                  :value="item.id"
                  v-for="item in dataMaster['jenjang']"
                  :key="item.id"
                  >{{ item.nama_jenjang }}</b-form-select-option
                >
              </b-form-select>
            </div>
            <div class="form-group reg-siswa">
              <label for="text">Nama Kelas</label>
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Isi Nama Kelas"
                v-model="form.nama_kelas"
              />
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/master_kelas"
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
      dataMaster: {
        jenjang: [],
      },
      form: {
        id_jenjang: null,
        nama_kelas: "",
      },
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/master_kelas");
    this.getData("jenjang");
    this.getDetail("kelas", this.$route.params.id);
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (!this.form.id_jenjang || !this.form.nama_kelas) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000,
        });
        return;
      }
      this.submitData("kelas");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$put(`/api/${type}/update/${this.$route.params.id}`, this.form)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data kelas berhasil diperbarui.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000,
            });
            this.$router.replace("/administrator/master_kelas");
          }
          return true;
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.dataMaster[type] = res.data.data;
          }
          return true;
        })
        .catch((err) => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            this.form = {
              id_jenjang: this.dataDetail.id_jenjang,
              nama_kelas: this.dataDetail.nama_kelas,
            };
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