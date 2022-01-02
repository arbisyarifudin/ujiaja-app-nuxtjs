<template>
  <b-nav-item-dropdown text="Notif" right no-caret class="notif-dropdown">
    <template #button-content>
      <i class="fas fa-bell"></i>
      <span class="badge badge-primary notif-total">{{ notifTotal }}</span>
    </template>
    <template v-for="(item, index) in notifData">
      <b-dropdown-item @click.prevent="toPath(item)" :key="'n' + index">
        <div
          class="notif-dropdown-item d-flex align-items-start"
          :class="item.notification_open ? 'opened' : ''"
        >
          <span
            class="fas fa-fw mr-2 notif-icon"
            :class="iconType(item.notification_type)"
          ></span>
          <div>
            <h4 class="notif-title">{{ item.notification_title }}</h4>
            <div class="notif-body" v-html="item.notification_body"></div>
          </div>
        </div>
      </b-dropdown-item>
    </template>
    <template v-if="notifData && notifData.length < 1">
      <b-dropdown-item>
        <span>Tidak ada notifikasi.</span>
      </b-dropdown-item>
    </template>
    <b-dropdown-item
      class="text-center"
      @click.prevent="$emit('expand-all')"
      v-else
    >
      <span>Lihat Semua Notifikasi</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    layout: {
      type: String,
      default: "admin"
    },
    userRole: {
      type: String,
      default: null
    }
  },
  computed: {
    notifData() {
      return this.$store.state.notifData;
    },
    notifTotal() {
      return (
        this.$store.state.notifData &&
        this.$store.state.notifData.filter(item => item.notification_open === 0)
          .length
      );
    }
  },
  methods: {
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
            console.log(error);
          });
      }

      window.location.href = this.getPath(item);
    },
    getPath(item) {
      const data = JSON.parse(item.notification_data);
      const basePath = this.layout == "admin" ? "administrator" : "app";
      if (this.userRole == "admin" || this.userRole == "superAdmin") {
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
    }
  }
};
</script>
