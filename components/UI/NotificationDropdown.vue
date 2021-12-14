<template>
  <b-nav-item-dropdown text="Notif" right no-caret class="notif-dropdown">
    <template #button-content>
      <i class="fas fa-bell"></i> 
      <span class="badge badge-primary notif-total">{{notifTotal}}</span>
    </template>
    <template v-for="(item, index) in notifData">
      <b-dropdown-item :to="toPath(item)" :key="'n' + index">
        <div class="notif-dropdown-item d-flex align-items-start">
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
      <!-- <b-dropdown-item :to="layout + '/notifications'" :key="'n' + (index + 99)">
        <span>Lihat Semua Notifikasi</span>
      </b-dropdown-item> -->
    </template>
    <template v-if="notifData && notifData.length < 1">
      <b-dropdown-item>
        <span>Tidak ada notifikasi.</span>
      </b-dropdown-item>
    </template>
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
      return this.$store.state.notifTotal;
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
    toPath(item) {
      const data = JSON.parse(item.notification_data);
      const basePath = this.layout == "admin" ? "administrator" : "app";
      if (this.userRole == "admin" || this.userRole == "superAdmin") {
        switch (item.notification_type) {
          case 0: // registration
            const user = data.user;
            const userDetail = data.detail;
            return {
              path: `/${basePath}/user/student`
            };
            break;

          default:
            break;
        }
      } else {
        switch (item.notification_type) {
          case 0: // registration
            return {
              path: `/${basePath}/profile/edit`
            };
            break;

          default:
            break;
        }
      }
    }
  }
};
</script>
