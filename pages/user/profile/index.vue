<template>
  <PageProfileStudent v-if="user.role_user == 'siswa'"/>
  <PageProfileParent v-else-if="user.role_user == 'parent'"/>
  <PageProfileTeacher v-else-if="user.role_user == 'teacher'"/>
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
