<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="card-title">Profil</h3>
      <div>Kelengkapan Profil: 
        <span class="text-success font-weight-bold" v-if="isProfilLengkap">100%</span>
        <span class="text-danger font-weight-bold" v-else>15%</span>
      </div>
    </div>
    <hr />
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
          <td>{{ user.username }}</td>
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
              <nuxt-link to="/user/mbti" class="btn btn-sm btn-light square"
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
    <nuxt-link to="/user/profile/edit" class="btn btn-info btn-sm"
      >Ubah Profil</nuxt-link
    >
  </b-card>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    user_detail() {
      return this.$store.state.dataUser.detail;
    },
    isProfilLengkap() {
      return this.$store.state.isProfilLengkap
    }
  },
  methods: {
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
