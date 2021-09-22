<template>
  <div class="admin-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 bg-white d-none d-lg-block">
          <nav class="sidebar navbar-light pt-3 pl-4" id="menu">
            <img src="/logo2.png" class="img-fluid w-25 pb-4" />
            <UIMenuAdmin />
          </nav>
        </div>
        <b-sidebar
          id="admin-sidebar"
          class="bg-white d-block d-lg-none"
          shadow
          backdrop
        >
          <nav class="sidebar navbar-light pt-3 pl-4" id="menu">
            <img src="/logo2.png" class="img-fluid w-25 pb-4" />
            <UIMenuAdmin />
          </nav>
        </b-sidebar>
        <div class="col-md-9 bg-primary--soft" id="right-sect">
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
              <ul class="nav navbar-nav ml-auto align-items-center">
                <b-nav-item-dropdown text="Notif" right no-caret>
                  <template #button-content>
                    <i class="fas fa-bell"></i>
                  </template>
                  <b-dropdown-item to="/produk/tryout">Notif</b-dropdown-item>
                  <b-dropdown-item to="/produk/les-pribate"
                    >Nofif 2</b-dropdown-item
                  >
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Profil" right no-caret>
                  <template #button-content>
                    <img src="/icon-user.png" class="img-fluid" width="24" />
                  </template>
                  <b-dropdown-item to="/administrator/profile"
                    >Profil</b-dropdown-item
                  >
                  <b-dropdown-item @click.prevent="appLogout"
                    >Keluar</b-dropdown-item
                  >
                </b-nav-item-dropdown>
              </ul>
            </nav>
          </div>
          <main id="konten" class="konten px-md-5 px-3">
            <Nuxt />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth-admin",
  computed: {
    user() {
      return this.$store.state.dataUser;
    },
  },
  mounted() {
    console.log(this.user);
  },
};
</script>

<style>
@import url("@/assets/ano/admin.css");
@import url("@/assets/admin.css");
</style>