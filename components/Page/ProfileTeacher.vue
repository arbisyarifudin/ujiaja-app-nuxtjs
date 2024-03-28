<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="card-title">Profil</h3>
      <div>
        Kelengkapan Profil:
        <span class="text-success font-weight-bold" v-if="isProfilLengkap"
          >100%</span
        >
        <span class="text-danger font-weight-bold" v-else>15%</span>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-7 mb-md-0 mb-4">
        <div class="table-responsive">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th width="140">Foto</th>
                <th width="20" class="px-0 text-center">:</th>
                <td>
                  <img
                    v-if="ApiUrl"
                    :src="ApiUrl(user_detail.foto)"
                    @error="noImage"
                    alt="foto"
                    class="img-fluid"
                    style="width: 150px"
                  />
                </td>
              </tr>
              <tr>
                <th width="140">Nama Lengkap</th>
                <th width="20" class="px-0 text-center">:</th>
                <td>{{ user_detail.nama_lengkap }}</td>
              </tr>
              <tr>
                <th width="140">Username</th>
                <th width="20" class="px-0 text-center">:</th>
                <td>
                  {{ user.username }}
                  <span title="Status Verifikasi" class="ml-1">
                    <i
                      class="fas fa-check text-success"
                      v-if="user.verifikasi == 2"
                    ></i>
                    <i class="fas fa-times text-danger" v-else></i>
                  </span>
                </td>
              </tr>
              <tr>
                <th width="140">Email</th>
                <th width="20" class="px-0 text-center">:</th>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <th width="140">Kepribadian</th>
                <th width="20" class="px-0 text-center">:</th>
                <td v-if="user_detail.nama_kepribadian">
                  <div class="">
                    <h5
                      v-text="user_detail.nama_kepribadian"
                      class="mb-2 mr-2"
                      style="border: 1px dashed #aaa; border-radius: 10px; padding: 10px 20px; display: inline-block"
                    ></h5>
                    <nuxt-link
                      to="/user/mbti"
                      class="btn btn-sm btn-light square"
                      >Lihat Hasil Tes Kepribadian</nuxt-link
                    >
                  </div>
                </td>
                <td v-else>
                  <nuxt-link to="/user/mbti" class="btn btn-sm btn-light square"
                    >Ikuti Tes Kepribadian</nuxt-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <nuxt-link to="/user/profile/edit" class="btn btn-info btn-sm"
            >Ubah Profil</nuxt-link
          >
          <button
            class="btn btn-danger btn-sm"
            style="opacity: 80%"
            v-b-modal.modal-delete
          >
            <i class="fas fa-fw mr-1 fa-trash"></i> Hapus Akun
          </button>
        </div>
      </div>
      <div class="col-md-5">
        <h4>Level</h4>
        <hr />
        <div class="level row">
          <div class="col-md-3">
            <div class="level-circle mx-auto mx-md-0 mb-3">
              <span class="level-name">BASE</span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="level-rating text-left mb-2">
              <div class="title">Rating saat Ini:</div>
              <div
                class="text-star"
                v-html="rerataUlasan(user_detail.rate_mengajar)"
              ></div>
              <div>
                <b>{{ user_detail.rate_mengajar }}</b
                >/5
              </div>
            </div>
            <no-ssr>
              <div class="level-honorarium text-left mb-2">
                <div class="title">Honorarium Maksimum:</div>
                <div v-if="user && formatRupiah">
                  Rp
                  {{
                    user_detail.level
                      ? formatRupiah(user_detail.level.honor_level)
                      : 0
                  }}
                </div>
              </div>
            </no-ssr>
            <div class="level-job text-left mb-2">
              <div class="title">Total Mengajar:</div>
              <div>{{ user_detail.total_mengajar }} sesi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus Akun"
      hide-footer
      centered
      modal-class="admin-modal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus akun Tentor anda?
          <small class="text-danger"
            ><b>Perhatian:</b> Dengan menghapus akun, Anda akan kehilangan saldo
            tersisa dan akun tidak dapat dikembalikan.</small
          >
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="$bvModal.hide('modal-delete')"
          >
            Tidak
          </button>
          <button
            class="btn btn-danger tambah px-4 py-2"
            type="button"
            :disabled="submitting"
            @click.prevent="deleteData"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner> Ya,
            Saya Yakin
          </button>
        </div>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      submitting: false
    };
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    user_detail() {
      return this.$store.state.dataUser.detail;
    },
    isProfilLengkap() {
      return this.$store.state.isProfilLengkap;
    }
  },
  methods: {
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case 0:
          statusClass += "secondary";
          break;
        case 1:
          statusClass += "info";
          break;
        case 2:
          statusClass += "success";
          break;
        default:
          statusClass += "warning";
          break;
      }
      return statusClass;
    },
    rerataUlasan(rataRata) {
      const rataRataFloor = Math.floor(rataRata);
      const sisaDesimal = Math.round(rataRata - rataRataFloor);

      let element = "";
      for (let i = 0; i < rataRataFloor; i++) {
        element += '<i class="fas fa-star fa-fw text-star"></i>';
      }
      for (let x = 0; x < sisaDesimal; x++) {
        element += '<i class="fas fa-star-half-alt fa-fw text-star"></i>';
      }
      for (let x = 0; x < 5 - rataRataFloor - sisaDesimal; x++) {
        element += '<i class="far fa-star fa-fw text-star"></i>';
      }

      return element;
    },
    deleteData() {
      this.submitting = true;
      this.$axios
        .$delete("/api/users/teacher/delete/" + this.user.id)
        .then(response => {
          console.log(response);
          this.showToastMessage("Akun berhasil dihapus");
          this.$cookiz.remove("_ujiaja");
          this.$store.commit("SET_IS_AUTH", false);
          this.$router.replace({ path: "/masuk" });
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    formatRupiah(nominal) {
      if (nominal) {
        nominal = parseFloat(nominal);
        return nominal.toLocaleString("id-ID");
      }
      return 0;
    },
    ApiUrl(param, no_separator = false) {
      if(no_separator)  {
        return process.env.apiUrl + param;
      }
      return process.env.apiUrl + "/" + param;
    },
    noImage(event) {
      event.target.src = `${window.origin}/logo-baru.png`;
    },
  }
};
</script>
