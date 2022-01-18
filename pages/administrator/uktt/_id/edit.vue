<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Data UKTT
          </h2>
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">Judul <code>*</code></label>
              <input
                type="text"
                class="form-control"
                name="judul_uktt"
                id="judul_uktt"
                placeholder="Isi Judul"
                v-model="form.judul"
              />
            </div>
            <div class="form-group reg-siswa">
              <label for="text">Deskripsi <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="deskripsi_uktt"
                name="deskripsi_uktt"
                placeholder="Isi Deskripsi"
                v-model="form.deskripsi"
              />
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group reg-siswa">
                  <label for="select">Jenjang <code>*</code></label>
                  <b-form-select
                    class="form-control"
                    v-model="form.id_jenjang"
                    :options="dataMaster.jenjang"
                    text-field="nama_jenjang"
                    value-field="id"
                  >
                  </b-form-select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col form-group reg-siswa">
                <label for="alokasi_waktu"
                  >Alokasi Waktu Pengerjaan (Menit) <code>*</code></label
                >
                <input
                  type="number"
                  class="form-control"
                  id="alokasi_waktu"
                  name="alokasi_waktu"
                  placeholder="Misal: 60"
                  v-model="form.alokasi_waktu"
                />
              </div>
              <!-- <div class="col form-group reg-siswa">
                <label for="jeda_waktu"
                  >Jeda Waktu Antar Mata Pelajaran (Menit) <code>*</code></label
                >
                <input
                  type="number"
                  class="form-control"
                  id="jeda_waktu"
                  name="jeda_waktu"
                  placeholder="Misal: 5"
                  v-model="form.jeda_waktu"
                />
              </div> -->
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/uktt"
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
        jenjang: []
      },
      form: {
        judul: "",
        deskripsi: "",
        id_jenjang: 1,
        panduan_pengerjaan: null,
        kategori: "UKTT",
        alokasi_waktu: 0
      },
      dataDetail: {}
    };
  },
  mounted() {
    this.getData("jenjang");
    if (!this.$route.params.id) return this.$router.push("/administrator/uktt");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "UKTT",
        href: "/administrator/product",
       }, 
      {                            
        text: "Edit",    
        active: true                                                  
      }
    ]);                
    this.getDetail("tryout", this.$route.params.id);
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (
        !this.form.judul ||
        !this.form.deskripsi ||
        !this.form.id_jenjang ||
        !this.form.alokasi_waktu
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("tryout");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$put(`/api/${type}/update/${this.$route.params.id}`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data UKTT berhasil diperbarui.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/uktt");
          }
          false;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getData(type, params = {}) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: params.keyword ?? "",
            paginate: params.perPage ?? 99,
            page: params.page ?? 1
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataMaster[type] = res.data.data;
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
            this.form = this.dataDetail;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status == 404) {
            return this.$router.push("/administrator/uktt");
          }
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
