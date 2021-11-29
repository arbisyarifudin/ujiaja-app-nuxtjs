<template>
  <b-card>
    <h3 class="card-title">Profil</h3>
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
          <td>
            <nuxt-link to="/app/mbti" class="btn btn-sm btn-light square"
              >Lihat Hasil Tes Kepribadian</nuxt-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <nuxt-link to="/app/profile/edit" class="btn btn-info btn-sm"
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
    }
  }
};
</script>
