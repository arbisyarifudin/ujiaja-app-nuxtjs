<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah UKTT</h2>
          <!-- <p>
           Ayo, buat data master soal & jawaban sekarang juga untuk merelasikan data tryout.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="judul_uktt">Judul <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="judul_uktt"
                name="judul_uktt"
                placeholder="Misal: Soal Tryout UTBK TPS 2022"
                v-model="form.judul"
              />
            </div>
            <div class="form-group reg-siswa">
              <label for="deskripsi_uktt"
                >Deskripsi <code>*</code></label
              >
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
              <div class="col-md-6">
                <div class="form-group reg-siswa">
                  <label for="jenjang">Jenjang <code>*</code></label>
                  <b-form-select
                    id="jenjang"
                    name="jenjang"
                    class="form-control"
                    v-model="form.id_jenjang"
                    :options="dataMaster.jenjang"
                    text-field="nama_jenjang"
                    value-field="id"
                  >
                  </b-form-select>
                </div>
              </div>
               <div class="col-md-6">
                <div class="form-group reg-siswa">
                  <label for="mapel">Mata Pelajaran <code>*</code></label>
                  <b-form-select
                    id="mapel"
                    name="mapel"
                    class="form-control"
                    v-model="form.id_mapel"
                    :options="dataMaster.mapel"
                    text-field="nama_mapel"
                    value-field="id"
                  >
                  </b-form-select>
                </div>
              </div>
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
        jenjang: [],
        mapel: [],
      },
      form: {
        judul: "",
        deskripsi: "",
        id_jenjang: 1,
        id_mapel: null,
        panduan_pengerjaan: null,
        kategori: 'UKTT'
      }
    };
  },
  mounted() {
    this.getData("jenjang");
    this.getData("mapel");
  },
  methods: {
    validateForm() {
      // console.log(this.form);
      if (!this.form.judul || !this.form.deskripsi || !this.form.id_jenjang || !this.form.id_mapel) {
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
        .$post(`/api/${type}/create`, this.form)
        .then(res => {
          console.log("UKTT berhasil ditambah!!!", res);
          if (res.success) {
            return {
              success: true,
              data: res.data,
              next: "tryout/soal"
            };
          }
          return false;
        })
        .then(res => {
          if (res.success) {
            console.log("res.data", res.data);
            let dataSoal = [
                {
                  id_tryout: res.data.id,
                  id_mapel: this.form.id_mapel
                }
              ];

            this.$axios
              .$post(`/api/${res.next}/create/multiple`, dataSoal)
              .then(res => {
                console.log(res);
                if (res.success) {
                  this.$root.$bvToast.toast(
                    "Data UKTT berhasil ditambah.",
                    {
                      title: "Sukses",
                      variant: "success",
                      solid: true,
                      autoHideDelay: 3000
                    }
                  );
                  this.$router.replace(
                    `/administrator/uktt/${dataSoal[0].id_tryout}/soal/create`
                  );
                }
              })
              .catch(err => {
                console.log(err);
                this.catchError(err);
              })
              .finally(() => (this.loading = false));
          }
          return false;
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
    }
  }
};
</script>
