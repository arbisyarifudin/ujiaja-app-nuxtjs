<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Klaster Rumpun
          </h2>
          <!-- <p>
            Ayo, buat data master kelas sekarang juga untuk merelasikan data
            siswa.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="rumpun">Rumpun <code>*</code></label>
              <b-form-select
                id="rumpun"
                class="form-control"
                v-model="form.id_rumpun"
                :disabled="true"
              >
                <b-form-select-option :value="null"
                  >-- Pilih Rumpun --</b-form-select-option
                >
                <b-form-select-option
                  :value="item.id"
                  v-for="item in dataMaster['rumpun']"
                  :key="item.id"
                  >{{ item.nama }}</b-form-select-option
                >
              </b-form-select>
            </div>
            <div
              class="row align-items-center"
              v-for="(mapel, m) in form.mapels"
              :key="'m-' + m"
            >
              <div class="col-md-6">
                <div class="form-group reg-siswa">
                  <label for="mapel">Mapel <code>*</code></label>
                  <b-form-select
                    id="mapel"
                    class="form-control"
                    v-model="mapel.id"
                  >
                    <b-form-select-option :value="null"
                      >-- Pilih Mapel --</b-form-select-option
                    >
                    <b-form-select-option
                      :value="item.id"
                      v-for="item in dataMaster['mapel']"
                      :key="item.id"
                      >({{ item.kode }}) -
                      {{ item.nama_mapel }}</b-form-select-option
                    >
                  </b-form-select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group reg-siswa">
                  <label for="nilai">Nilai <code>*</code></label>
                  <input
                    type="number"
                    class="form-control"
                    id="nilai"
                    placeholder="Tulis Nilai"
                    v-model="mapel.nilai"
                  />
                </div>
              </div>
              <div class="col-md-2">
                <button
                  class="btn btn-sm btn-danger px-3"
                  type="button"
                  v-if="m != 0"
                  @click="deleteMapel(m)"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <button
              class="btn btn-sm btn-outline-primary square mt-3 mb-4"
              type="button"
              @click="addMapel"
            >
              <i class="fas fa-plus fa-fw mr-1"></i> Tambah Mapel
            </button>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/klaster"
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
        rumpun: []
      },
      form: {
        id_rumpun: null,
        is_edit: 1,
        mapels: [
          {
            id: null,
            nilai: 15
          }
        ]
      }
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/klaster");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Klaster",
        href: "/administrator/klaster"
      },
      {
        text: "Edit",
        active: true
      }
    ]);
    this.getData("rumpun");
    this.getData("mapel");
    this.getDetail("klaster", this.$route.params.id);
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (
        !this.form.id_rumpun ||
        !this.form.mapels ||
        (!this.form.mapels && !this.form.mapels.length < 1)
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("klaster");
    },
    addMapel() {
      this.form.mapels.push({
       id: null,
        nilai: 15
      })
    },
    deleteMapel(index) {
      this.form.mapels.splice(index, 1)
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/createBulk`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data " + type + " berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/klaster");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            paginate: 999
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
            this.form = {
              is_edit: true,
              id_rumpun: this.dataDetail.id,
              mapels: this.dataDetail.mapel.map(item => {
                return {
                  id: item.id_mapel,
                  id_klaster:item.id_klaster,
                  nilai: item.nilai
                }
              })
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
