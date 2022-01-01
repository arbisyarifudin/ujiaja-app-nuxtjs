<template>
  <div class="admin-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 bg-white d-none d-lg-block">
          <nav class="sidebar navbar-light pt-3 pl-4" id="menu">
            <img v-if="ApiUrl" :src="ApiUrl(getSetting('logo'))" class="img-fluid w-25 pb-4" />
            <!-- <img src="/logo2.png" class="img-fluid w-25 pb-4" /> -->
            <UIMenuStudent v-if="user.role_user == 'siswa'" />
            <UIMenuPartner v-if="user.role_user == 'teacher'" />
            <UIMenuParent v-if="user.role_user == 'parent'" />
          </nav>
        </div>
        <b-sidebar
          id="admin-sidebar"
          class="bg-white d-block d-lg-none"
          shadow
          backdrop
        >
          <nav class="sidebar navbar-light pt-3 pl-4" id="menu">
            <img v-if="ApiUrl" :src="ApiUrl(getSetting('logo'))" class="img-fluid w-25 pb-4" />
            <!-- <img src="/logo2.png" class="img-fluid w-25 pb-4" /> -->
            <UIMenuStudent v-if="user.role_user == 'siswa'" />
            <UIMenuPartner v-if="user.role_user == 'teacher'" />
            <UIMenuParent v-if="user.role_user == 'parent'" />
          </nav>
        </b-sidebar>
        <div class="col-lg-9 bg-light">
          <div id="header">
            <nav class="navbar navbar-expand navbar-light bg-light">
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
                <UINotificationDropdown :user-role="user.role_user" layout="app" @expand-all="expandAllNotif"/>
                <b-nav-item-dropdown text="Profil" right no-caret>
                  <template #button-content>
                    <img src="/icon-user.png" class="img-fluid" width="24" />
                  </template>
                  <b-dropdown-item to="/app/profile">Profil</b-dropdown-item>
                  <b-dropdown-item
                    v-if="user.role_user == 'teacher'"
                    to="/app/partner/earnings"
                    >Pendapatan</b-dropdown-item
                  >
                  <b-dropdown-item @click.prevent="appLogout"
                    >Keluar</b-dropdown-item
                  >
                </b-nav-item-dropdown>
              </ul>
            </nav>
          </div>
         <b-sidebar id="aside-notif" title="Semua Notifikasi" v-model="showAllNotif" right shadow backdrop width="400px" @hidden="closeAllNotif">
            <b-list-group v-for="(item, n_index) in notifData" :key="'n'+n_index">
              <b-list-group-item style="border-color: transparent">
                <div class="notif-dropdown-item d-flex align-items-start" :class="item.notification_open ? 'opened' : ''">
                <span
                  class="fas fa-fw mr-2 notif-icon"
                  :class="iconType(item.notification_type)"
                ></span>
                <div>
                  <h4 class="notif-title">{{ item.notification_title }}</h4>
                  <div class="notif-body" v-html="item.notification_body"></div>
                </div>
              </div>
              </b-list-group-item>
            </b-list-group>
          </b-sidebar>
          <main
            id="konten"
            class="konten px-3"
            :class="
              !isProfilLengkap && $route.path != '/app/profile/edit'
                ? 'konten-dashfirst'
                : ''
            "
            style="min-height: calc(100vh - 80px)"
          >
            <div
              class="col-md-12 text-left"
              v-if="!isProfilLengkap && $route.path != '/app/profile/edit'"
            >
              <div class="alert-konten">
                <p class="text-alert">
                  Sebelum kamu melangkah menikmati layanan dari kami, lengkapi
                  dulu profilmu sekarang juga ya. Gak lama kok cuman bentar
                  aja!!
                </p>
                <nuxt-link
                  to="/app/profile/edit"
                  class="btn btn-light btn-slengkapnya"
                >
                  Lengkapi Sekarang
                </nuxt-link>
                <!-- <a class="link-lewati" href="">Lewati</a> -->
              </div>
            </div>
            <Nuxt v-else />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentWrapper from "../components/Layout/ContentWrapper.vue";
export default {
  components: { ContentWrapper },
  middleware: "auth-user",
  head() {
    return {
      title: 'App',
    }
  },
  data() {
    return {
      // notifData: []
      showAllNotif: false,
      filter: {
        page: 1,
        limit: 6,
        search: '',
        sortBy: '',
        sortDir: '',
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    },
    isProfilLengkap() {
      return this.$store.state.isProfilLengkap;
    },
    notifData() {
      return this.$store.state.notifData;
    },
  },
  created() {
    if (this.user && this.user.role_user) {
      this.$axios
        .$get(`/api/users/${this.user.role_user}/cek`)
        .then(res => {
          console.log(res);
          this.$store.commit("set", ["isProfilLengkap", res.success]);
        })
        .catch(err => {
          console.log(err);
        });
      // .finally(() => (this.loading = false));
    }
     this.getNotif({
      ...this.filter
    });
  },
  mounted() {
    console.log("user", this.user);
    console.log("userDetail", this.userDetail);
  },
  methods: {
   getNotif(params) {

      const {page, limit, search, sortBy, sortDir} = params

      this.$axios
        .$get("/api/notification", {
          params: {
            page: page,
            limit: limit,
            search: search,
            sortBy: sortBy,
            sortDir: sortDir,
          }
        })
        .then(response => {
          if (response.success) {
            // this.notifData = response.data.data;
            this.$store.commit("set", ["notifData", response.data.data]);
            this.$store.commit("set", ["notifTotal", response.data.total]);
          }
        });
    },
    expandAllNotif() {
      this.showAllNotif = true
      // this.filter.page += 1
      this.filter.limit = 20
      this.getNotif({...this.filter})
    },
    closeAllNotif() {
      this.$store.commit("set", ["notifData", []]);
      this.$store.commit("set", ["notifTotal", 0]);
      this.showAllNotif = false
      // this.filter.page += 1
      this.filter.limit = 6
      this.getNotif({...this.filter})
    },
    iconType(type) {
      switch (type) {
        case 0:
          // registration
          return "fa-user-plus";
        case 1:
          // transaction
          return "fa-money-check";
        default:
          return "fa-bell";
      }
    },
  }
};
</script>

<style>
@import url("@/assets/ano/admin.css");
@import url("@/assets/admin.css");
</style>
