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
        <tr>
          <th width="200">Kepribadian</th>
          <th width="20" class="px-0 text-center">:</th>
          <td v-if="user_detail.nama_kepribadian">
            <div class="">
              <h5
                v-text="user_detail.nama_kepribadian"
                class="mb-2 mr-2"
                style="border: 1px dashed #aaa; border-radius: 10px; padding: 10px 20px; display: inline-block"
              ></h5>
              <nuxt-link to="/app/mbti" class="btn btn-sm btn-light square"
                >Lihat Hasil Tes Kepribadian</nuxt-link
              >
            </div>
          </td>
          <td v-else>
            <nuxt-link to="/app/mbti" class="btn btn-sm btn-light square"
              >Ikuti Tes Kepribadian</nuxt-link
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
  layout: "app",
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
