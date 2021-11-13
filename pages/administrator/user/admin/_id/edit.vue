<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Ubah Admin</h2>
          <!-- <p>
            Buat data Admin sebagai pengelola sistem.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">Nama Lengkap <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="nama"
                name="nama"
                placeholder="Tulis Nama Lengkap"
                v-model="form.nama_lengkap"
              />
            </div>
          </div>
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">Username <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                placeholder="Tulis Username"
                v-model="form.username"
              />
            </div>
            <div class="small text-primary mt-2">
              Jangan gundakan spasi, gunakan undersoce (_)
            </div>
          </div>
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">Email <code>*</code></label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="Tulis Email Aktif"
                :value="form.email"
                disabled
              />
            </div>
          </div>
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">No. Telp/HP <code>[opsional]</code></label>
              <input
                type="number"
                class="form-control"
                id="email"
                name="email"
                placeholder="Tulis Nomor Telp / HP"
                v-model="form.nomor_telephone"
              />
            </div>
          </div>
          <div class="form-user mt-3 row" v-if="isUbahPassword">
            <div class="col-6 form-group reg-siswa">
              <label for="text">Password <code>*</code></label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                autocomplete="new-password"
                placeholder="Tulis Password"
                v-model="form.password"
              />
            </div>
            <div class="col-6 form-group reg-siswa">
              <label for="text">Ulangi Password <code>*</code></label>
              <input
                type="password"
                class="form-control"
                id="ulangi_password"
                name="ulangi_password"
                autocomplete="new-password"
                placeholder="Tulis Ulang Password"
                v-model="form.ulangi_password"
              />
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-between align-items-center mt-4">
        <label for="is_ubah_password">
          <input id="is_ubah_password" type="checkbox" name="is_ubah_password" v-model="isUbahPassword"> Ubah Password?</label>
         <div>
              <nuxt-link
              to="/administrator/user/admin"
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
        nama_lengkap: "",
        username: "",
        email: "",
        nomor_telephone: "",
        password: "",
        ulangi_password: ""
      },
      isUbahPassword: false
    };
  },
  created() {
    this.getDetail('users/admin')
  },
  watch: {
    isUbahPassword(value) {
      if(value === false) {
        this.form.password = null;
        this.form.ulangi_password = null;
      }
    },
    "form.username": function (value) {
      if(value) {
        this.form.username = value.replace(/ /g,'').toLowerCase();
      }
    }
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (!this.form.nama_lengkap || 
      !this.form.username || 
      !this.form.email || 
      !this.form.nomor_telephone 
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }

    if(this.isUbahPassword) {
      if(!this.form.password || !this.form.ulangi_password) {
        this.$bvToast.toast("Password wajib diisi!", {
            title: "Peringatan",
            variant: "warning",
            solid: true,
            autoHideDelay: 2000
          });
          return;
      }
      if(this.form.password !== this.form.ulangi_password) {
        this.$bvToast.toast("Password tidak sama!", {
            title: "Peringatan",
            variant: "warning",
            solid: true,
            autoHideDelay: 2000
          });
          return;
      }
    }

      this.submitData("users/admin");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$put(`/api/${type}/update/${this.$route.params.id}`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data admin berhasil diperbarui.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/user/admin");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetail(type) {
      this.loading = true;
      this.$bvModal.show("modal-detail");
      this.$axios
        .$get(`/api/${type}/find/${this.$route.params.id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.form = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
  }
};
</script>
