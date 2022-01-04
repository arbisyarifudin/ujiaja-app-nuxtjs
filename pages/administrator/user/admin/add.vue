<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters bg-white mx-0 p-3">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Tambah Admin</h2>
          <p>
            Buat data Admin sebagai pengelola sistem.
          </p>
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
                v-model="form.email"
              />
            </div>
          </div>
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="text">No. Telp/HP <code>[opsional]</code></label>
              <input
                type="number"
                class="form-control"
                id="phone"
                name="phone"
                placeholder="Tulis Nomor Telp / HP"
                v-model="form.nomor_telephone"
              />
            </div>
          </div>
        </div>
        <div class="col-md-12 mt-2">
          <!-- <hr /> -->
          <div class="row bg-white mx-0 p-3">
            <div class="col-12">
              <h5>Akses yang Diizinkan</h5>
            </div>
            <div class="col-md-4" v-for="(permission, p_index) in permissionList" :key="'p-'+p_index">
              <div class="form-group">
                <label for="module-name" style="font-weight: 500">{{permission.label}}</label>
                <div class="d-flex">
                  <label :for="`action-${p_index}-${a_index}`" class="mr-2" style="font-size: 17px" v-for="(action, a_index) in permission.actions" :key="'a-'+a_index">
                    <input type="checkbox" :id="`action-${p_index}-${a_index}`" :name="`module-${p_index}`" v-model="action.allow"/>
                    {{action.label}}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
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
        password: "Admin123"
        // ulangi_password: ""
      },
      permissionList: []
    };
  },
  watch: {
    "form.username": function(value) {
      if (value) {
        this.form.username = value.replace(/ /g, "").toLowerCase();
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (
        !this.form.nama_lengkap ||
        !this.form.username ||
        !this.form.email
        // !this.form.nomor_telephone
        // !this.form.password ||
        // !this.form.ulangi_password
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }

      // if(this.form.password !== this.form.ulangi_password) {
      //   this.$bvToast.toast("Password tidak sama!", {
      //       title: "Peringatan",
      //       variant: "warning",
      //       solid: true,
      //       autoHideDelay: 2000
      //     });
      //     return;
      // }

      this.submitData("admin");
    },
    submitData(type) {
      this.loading = true;
      this.form.password = this.randomString(10);
      this.$axios
        .$post(`/api/${type}/create`, {
          ...this.form,
          permissions: this.permissionList
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data admin berhasil ditambah.", {
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
    randomString(length = 5) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    getPermissionList() {
      this.loading = true
      this.$axios.get('/api/permission/list')
      .then(response => {
        console.log(response)
        this.permissionList = response.data.data
      }).catch(error => {
        this.catchError(error)
      }).finally(() => {
        this.loading = false
      })
    }
  }
};
</script>
