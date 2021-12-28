<template>
  <PageDashboardStudent
    v-if="user.role_user == 'siswa'"
  />
  <PageDashboardTeacher v-else-if="user.role_user == 'teacher'" />
</template>

<script>
export default {
  layout: "app",
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    }
  }
};
</script>
