<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Rumpun
          </h2>
          <!-- <p>
            Ayo, buat data master kelas sekarang juga untuk merelasikan data
            siswa.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <!-- <div class="form-group reg-siswa">
              <label for="select">Kategori <code>*</code></label>
              <b-form-select class="form-control" v-model="form.id_to_kategori">
                <b-form-select-option :value="null"
                  >-- Pilih Kategori --</b-form-select-option
                >
                <b-form-select-option
                  :value="item.id"
                  v-for="item in dataMaster['kategori']"
                  :key="item.id"
                  >{{ item.kategori }}
                  <span
                    v-if="item.kelompok"
                    v-text="' - ' + item.kelompok"
                  ></span>
                  <span
                    v-if="item.jenjang"
                    v-text="' - ' + item.jenjang"
                  ></span>
                  <span
                    v-if="item.penjurusan"
                    v-text="' - ' + item.penjurusan"
                  ></span>
                  <span v-if="item.kelas" v-text="' - ' + item.kelas"></span>
                </b-form-select-option>
              </b-form-select>
            </div> -->
            <div class="form-group reg-siswa">
              <label for="text">Nama Rumpun <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Tulis Nama Rumpun"
                v-model="form.nama"
              />
            </div>
            <div class="form-group reg-siswa">
              <label for="kelompok">Kelompok/Kategori <code>*</code></label>
              <b-form-select
                class="form-control"
                id="kelompok"
                v-model="form.kelompok"
                :options="['SAINTEK', 'SOSHUM']"
              />
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/rumpun"
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
        jenjang: []
      },
      form: {
         // id_to_kategori: null,
        nama: "",
        kelompok: "SAINTEK"
      }
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/rumpun");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Rumpun",
        href: "/administrator/rumpun"
      },
      {
        text: "Edit",
        active: true
      }
    ]);
    // this.getData("kategori-to");
    this.getDetail("rumpun", this.$route.params.id);
  },
  methods: {
    validateForm() {
      console.log(this.form);
      // if (!this.form.id_to_kategori || !this.form.nama) {
      if (!this.form.kelompok || !this.form.nama) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("rumpun");
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
            this.$router.replace("/administrator/rumpun");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    // getData(type) {
    //   this.loading = true;
    //   this.$axios
    //     .$get(`/api/${type}`)
    //     .then(res => {
    //       console.log(res);
    //       if (res.success) {
    //         if (type == "kategori-to") {
    //           this.dataMaster["kategori"] = res.data.data;
    //         } else {
    //           this.dataMaster[type] = res.data.data;
    //         }
    //       }
    //       return true;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       this.catchError(err);
    //     })
    //     .finally(() => (this.loading = false));
    // },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            this.form = {
              // id_to_kategori: this.dataDetail.id_to_kategori,
              kelompok: this.dataDetail.kelompok,
              nama: this.dataDetail.nama
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
