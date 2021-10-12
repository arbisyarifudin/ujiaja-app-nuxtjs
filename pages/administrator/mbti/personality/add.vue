<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            Tambah Kepribadian
          </h2>
          <p>
            Ayo, buat data master kepribadian sekarang juga untuk merelasikan
            data dimensi sifat dasar.
          </p>
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3 row">
            <div class="form-group reg-siswa col-md-6">
              <label for="nama_singkat"
                >Nama Kepribadian (Singakatan) <code>*</code></label
              >
              <input
                type="text"
                class="form-control"
                id="nama_singkat"
                name="nama_singkat"
                placeholder="Tulis Nama Singkatan"
                v-model="form.nama_singkat"
              />
            </div>
            <div class="form-group reg-siswa col-md-6">
              <label for="nama_panjang"
                >Nama Kepribadian (Kepanjangan) <code>*</code></label
              >
              <input
                type="text"
                class="form-control"
                id="nama_panjang"
                name="nama_panjang"
                placeholder="Tulis Nama Kepanjangan"
                v-model="form.nama_panjang"
              />
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="jenis_kepribadian"
                >Jenis Kepribadian <code>*</code></label
              >
              <input
                type="jenis_kepribadian"
                class="form-control"
                id="jenis_kepribadian"
                name="jenis_kepribadian"
                placeholder="Jenis Kepribadian"
                v-model="form.jenis"
              />
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-user">
              <label for="deskripsi_kepribadian"
                >Detail / Kelebihan <code>*</code></label
              >
              <client-only>
                <VueEditor
                  id="deskripsi_kepribadian"
                  v-model="form.deskripsi"
                  :editor-toolbar="customToolbar"
                />
              </client-only>
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-user">
              <label for="saran_kepribadian"
                >Saran / Masukan <code>*</code></label
              >
              <client-only>
                <VueEditor
                  id="saran_kepribadian"
                  v-model="form.saran"
                  :editor-toolbar="customToolbar"
                />
              </client-only>
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="profesi_kepribadian">Profesi <code>*</code></label>
              <input
                type="profesi_kepribadian"
                class="form-control"
                id="profesi_kepribadian"
                name="profesi_kepribadian"
                placeholder="Tulis Profesi yang Cocok dari Kepribadian"
                v-model="form.profesi"
              />
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="partner_kepribadian"
                >Partner Alami <code>*</code></label
              >
              <input
                type="partner_kepribadian"
                class="form-control"
                id="partner_kepribadian"
                name="partner_kepribadian"
                placeholder="Tulis Partner Alami untuk Kepribadian"
                v-model="form.partner"
              />
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/mbti/personality"
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  layout: "admin",
  components: { vSelect },
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
        // ["formula", "clean"]
      ],
      loading: false,
      dataDetail: {},
      form: {
        nama_singkat: "",
        nama_panjang: "",
        jenis: "",
        deskripsi: "",
        saran: "",
        profesi: "",
        partner: ""
      }
    };
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (
        !this.form.nama_singkat ||
        !this.form.nama_panjang ||
        !this.form.jenis ||
        !this.form.deskripsi ||
        !this.form.saran ||
        !this.form.profesi ||
        !this.form.partner
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("kepribadian");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/create`, this.form)
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
            this.$router.replace("/administrator/mbti/personality");
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
