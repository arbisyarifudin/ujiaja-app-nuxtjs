<template>
  <div class="admin-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-sm-4 bg-white d-none d-lg-block">
          <nav class="sidebar navbar-light pt-3 pl-4" id="menu">
            <a href="/" target="_blank"><img v-if="!isServer" :src="ApiUrl(getSetting('logo'))" class="img-fluid w-25 pb-4" /></a>
            <UIMenuSuperAdmin v-if="user.role_user == 'superAdmin'" />
            <UIMenuAdmin v-else-if="user.role_user == 'admin'" :permissions="userPermissions"/>
          </nav>
        </div>
        <b-sidebar
          id="admin-sidebar"
          class="bg-white d-block d-lg-none"
          shadow
          backdrop
        >
          <nav class="sidebar navbar-light pt-3 pl-4" id="menu2">
            <a href="/" target="_blank"><img v-if="!isServer" :src="ApiUrl(getSetting('logo'))" class="img-fluid w-25 pb-4" /></a>
            <UIMenuSuperAdmin v-if="user.role_user == 'superAdmin'" />
            <UIMenuAdmin v-else-if="user.role_user == 'admin'" />
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
                <UINotificationDropdown :user-role="user.role_user" @expand-all="expandAllNotif"/>
                <b-nav-item-dropdown text="Profil" right no-caret>
                  <template #button-content>
                    <img src="/icon-user.png" class="img-fluid" width="30" />
                  </template>
                  <b-dropdown-item to="/administrator/profile"
                    >Profil</b-dropdown-item
                  >
                   <b-dropdown-item to="/administrator/setting" v-if="isHavePermission(['Pengaturan', 'Level', 'Bank'], 'List')"
                    >Pengaturan</b-dropdown-item
                  >
                  <b-dropdown-item @click.prevent="appLogout"
                    >Keluar</b-dropdown-item
                  >
                </b-nav-item-dropdown>
              </ul>
            </nav>
          </div>
          <b-sidebar id="aside-notif" title="Semua Notifikasi" v-model="showAllNotif" right shadow backdrop width="400px" @hidden="closeAllNotif">
            <b-list-group>
              <b-list-group-item
                v-for="(item, n_index) in notifData"
                :key="'n' + n_index"
                style="border-color: transparent; cursor: pointer"
                 class="pt-2 pb-2"
                @click.prevent="toPath(item)"
              >
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
  fetchOnServer: false,
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    },
    notifData() {
      return this.$store.state.notifData;
    },
    userPermissions() {
      return this.$store.state.userPermissions;
    },
  },
  head() {
    return {
      title: 'App',
    }
  },
  data() {
    return {
      // notifData: []
      isServer: true,
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
  created() {
    this.getNotif({
      ...this.filter
    });
    this.getUserPermission()
  },
  mounted() {
    this.isServer = false
    console.log("user", this.user);
    console.log("userDetail", this.userDetail);
  },
  methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
    },
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
     async toPath(item) {
      if (item.notification_open === false || item.notification_open === 0) {
        await this.$axios
          .$put(`/api/notification/open/${item.notification_id}`)
          .then(() => {
            // item.notification_open = 1
          })
          .catch(err => {
            console.log(err);
          });
      }

      window.location.href = this.getPath(item);
    },
    getPath(item) {
      const data = JSON.parse(item.notification_data);
      const basePath = "administrator";
      if (this.user.role_user == "admin" || this.user.role_user == "superAdmin") {
        switch (item.notification_type) {
          case 0: // registration
            const user = data.user;
            const userDetail = data.detail;
            // return {
            //   path: `/${basePath}/user/student`
            // };
            if (user && user.role_user == "siswa") {
              return `/${basePath}/user/student`;
            } else if (user && user.role_user == "teacher") {
              return `/${basePath}/user/tentor`;
            }
          case 1: // transaction
            // const user = data.user;
            // const userDetail = data.detail;
            // return {
            //   path: `/${basePath}/payment`
            // };
            return `/${basePath}/payment`;
          default:
            return "#";
        }
      } else {
        switch (item.notification_type) {
          case 0: // registration
            // return {
            //   path: `/${basePath}/profile/edit`
            // };
            return `/${basePath}/profile/edit`;
          case 1: // transaction
            console.log(data);
            // return {
            //   path: `/${basePath}/payment/${data.id}/detail`
            // };
            return `/${basePath}/payment/${data.id}/detail`;
          case 3: // courses
            console.log(data);
            const detail = data.detail ? data.detail : data;
            if (this.userRole == 'siswa' && detail.status_dikelas == "Ditolak") {
              return `/${basePath}/student/courses/${detail.id}/rejected?notifId=${item.notification_id}&rejectId=${detail.id}`;
            }
            if(this.userRole == 'siswa') {
              return `/${basePath}/student/courses/${detail.id_kursus}/detail`;
            } else {
              return `/${basePath}/partner/courses/${detail.id_kursus}/students?tab=1`;
            }
          default:
            return "#";
        }
      }
    },
    getUserPermission() {
      this.loading = true
      this.$axios
        .$get("/api/permission/mine", {
          params: {
            user_id: this.user.id,
          }
        })
        .then(response => {
          if (response.success) {
            this.$store.commit("set", ["userPermissions", response.data]);
          }
        });
    },
    isHavePermission(moduleName, actionName) {
      // console.log(this.perms);
      const moduleFound = this.userPermissions.find(module => moduleName.includes(module.label));
      if (moduleFound) {
        // console.log('moduleFound', moduleFound)
        const actionFound = moduleFound.actions.find(
          action => action.label == actionName
        );
        if (actionFound) {
          // console.log("actionFound", actionFound);
          if (actionFound.allow) {
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    }
  }
};
</script>

<style>
@import url("@/assets/ano/admin.css");
@import url("@/assets/admin.css");
</style>
