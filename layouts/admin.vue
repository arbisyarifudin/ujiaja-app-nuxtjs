<template>
  <div class="admin-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-sm-4 bg-white d-none d-lg-block">
          <nav class="sidebar navbar-light pt-3 pl-4" id="menu">
            <img v-if="ApiUrl" :src="ApiUrl(getSetting('logo'))" class="img-fluid w-25 pb-4" />
            <UIMenuSuperAdmin v-if="user.role_user == 'superAdmin'" />
            <UIMenuAdmin v-else-if="user.role_user == 'admin'" />
          </nav>
        </div>
        <b-sidebar
          id="admin-sidebar"
          class="bg-white d-block d-lg-none"
          shadow
          backdrop
        >
          <nav class="sidebar navbar-light pt-3 pl-4" id="menu">
            <!-- <img src="/logo2.png" class="img-fluid w-25 pb-4" /> -->
            <img v-if="ApiUrl" :src="ApiUrl(getSetting('logo'))" class="img-fluid w-25 pb-4" />
            <UIMenuAdmin />
          </nav>
        </b-sidebar>
        <div
          class="col-xl-9 col-lg-8 col-sm-12 bg-primary--soft"
          id="right-sect"
        >
          <div id="header">
            <nav class="navbar navbar-expand navbar-light">
              <ul
                class="
                  nav
                  navbar-nav
                  mr-auto
                  align-items-center
                  d-block d-lg-none
                "
              >
                <li class="nav-item">
                  <button
                    class="nav-link btn text-primary btn-sm px-2"
                    type="button"
                    v-b-toggle.admin-sidebar
                  >
                    <i class="fas fa-bars"></i>
                  </button>
                </li>
              </ul>
              <ul
                class="nav navbar-nav ml-auto align-items-center"
              >
                <UINotificationDropdown :user-role="user.role_user"/>
                <b-nav-item-dropdown text="Profil" right no-caret>
                  <template #button-content>
                    <img src="/icon-user.png" class="img-fluid" width="30" />
                  </template>
                  <b-dropdown-item to="/administrator/profile"
                    >Profil</b-dropdown-item
                  >
                   <b-dropdown-item to="/administrator/setting"
                    >Pengaturan</b-dropdown-item
                  >
                  <b-dropdown-item @click.prevent="appLogout"
                    >Keluar</b-dropdown-item
                  >
                </b-nav-item-dropdown>
              </ul>
            </nav>
          </div>
          <main id="konten" class="konten px-md-3 px-0 pt-0">
            <Breadcrumb />
            <Nuxt />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/UI/Breadcrumb.vue";
export default {
  middleware: "auth-admin",
  components: { Breadcrumb },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    },
  },
  data() {
    return {
      // notifData: []
    };
  },
  created() {
    this.getNotif();
  },
  mounted() {
    console.log("user", this.user);
    console.log("userDetail", this.userDetail);
  },
  methods: {
    getNotif() {
      this.$axios
        .$get("/api/notification", {
          params: {}
        })
        .then(response => {
          if (response.success) {
            // this.notifData = response.data.data;
            this.$store.commit("set", ["notifData", response.data.data]);
            this.$store.commit("set", ["notifTotal", response.data.total]);
          }
        });
    }
  }
};
</script>

<style>
@import url("@/assets/ano/admin.css");
@import url("@/assets/admin.css");
</style>
