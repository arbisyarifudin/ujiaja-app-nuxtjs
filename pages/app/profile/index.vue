<template>
  <b-card>
    <h3 class="card-title">Profil</h3>
    <hr />
    <table class="table table-borderless">
      <tbody>
        <tr>
          <th width="200">Nama Lengkap</th>
          <th width="20" class="px-0 text-center">:</th>
          <td>{{ user_detail.nama_lengkap }}</td>
        </tr>
        <tr>
          <th width="200">Username</th>
          <th width="20" class="px-0 text-center">:</th>
          <td>{{ user.username }}</td>
        </tr>
        <tr>
          <th width="200">Email</th>
          <th width="20" class="px-0 text-center">:</th>
          <td>{{ user.email }}</td>
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
  layout: "app",
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    user_detail() {
      return this.$store.state.dataUser.detail;
    },
  },
};
</script>