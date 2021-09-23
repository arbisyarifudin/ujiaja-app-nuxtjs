<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah Penjurusan</h2>
          <p>
            Ayo, buat data master penjuruan sekarang juga untuk merelasikan data
            siswa.
          </p>
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="kelas">Kelas <code>*</code></label>
              <b-form-select
                class="form-control"
                id="kelas"
                v-model="form.id_kelas"
                :options="dataOption['kelas']"
                value-field="id"
                text-field="textField"
              >
                <template #first>
                  <b-form-select-option :value="null"
                    >-- Pilih Kelas --</b-form-select-option
                  >
                </template>
              </b-form-select>
            </div>
            <div class="form-group reg-siswa">
              <label for="text">Nama Penjurusan <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Isi Nama Penjurusan"
                v-model="form.nama_penjurusan"
              />
              <div class="small text-danger mt-2">
                Gunakan "-" jika kelas tidak memiliki penjurusan
              </div>
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/master_penjurusan"
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
      dataMaster: {
        kelas: [],
      },
      dataOption: {
        kelas: [],
      },
      form: {
        id_kelas: null,
        nama_penjurusan: "-",
      },
    };
  },
  mounted() {
    this.getData("kelas");
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (!this.form.id_kelas || !this.form.nama_penjurusan) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000,
        });
        return;
      }
      this.submitData("penjurusan");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/create`, this.form)
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data " + type + " berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000,
            });
            this.$router.replace("/administrator/master_penjurusan");
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
            if (type == "kelas") {
              this.dataOption[type] = this.dataMaster[type].map((item) => {
                let textField = item.jenjang.nama_jenjang;
                textField += " - " + item.nama_kelas;
                return {
                  ...item,
                  textField,
                };
              });
              // console.log(this.dataOption[type]);
            }
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