import Vue from "vue";

export const state = () => ({
  isAuth: false,
  dataUser: {
    user: {},
    detail: {}
  },
  dataError: {},
  breadcrumbs: [],
  isProfilLengkap: true,
  dataSetting: [],
  notifData: [],
  notifTotal: 0,
  userPermissions: []
  // listNomorSoal: [],
  // currentNomor: {},
  // currentSoal: {}
});

export const getters = {
  checkIsAuth(state) {
    return state.isAuth
  }
}

export const mutations = {
  SET_IS_AUTH(state, payload) {
    state.isAuth = payload;
  },
  putError(state, payload) {
    console.log("putError", payload);
    // state.dataError = payload
    Vue.set(state.dataError, payload[0], payload[1]);
  },
  deleteError(state) {
    console.log("deleteError");
    state.dataError = {};
  },
  set(state, [variable, value]) {
    state[variable] = value;
  },
  setUser(state, payload) {
    state.dataUser = payload;
    console.log("setUser");
  },
  setBreadcrumb(state, payload) {
    state.breadcrumbs = payload;
  },
  addBreadcrumb(state, payload) {
    state.breadcrumbs = [...state.breadcrumbs, ...payload];
  },
  modifyBreadcrumb(state, payload) {
    if (payload && payload.length > 1) {
      state.breadcrumbs = [
        {
          text: "Dashboard",
          href: "/administrator/dashboard",
          icon: "house"
        },
        ...payload
      ];
    } else {
      state.breadcrumbs = payload;
    }
  }
};

export const actions = {
  async nuxtServerInit(
    { commit, state, dispatch },
    { app, store, route, req, res, error, redirect }
  ) {
    // console.log(app);
    if (app.$cookiz.get("_ujiaja")) {
      await app.$axios
        .$get("api/users", {
          headers: {
            Authorization: "Bearer " + app.$cookiz.get("_ujiaja")
          }
        })
        .then(async res => {
          // console.log(res.data);
          await commit("SET_IS_AUTH", true);
          await commit("set", ["dataUser", res.data]);
          return;
        })
        .catch(async error => {
          console.log("nuxtInitError", error);
          console.log("nuxtInitError", error.response);
          await commit("SET_IS_AUTH", false);
          await commit("set", ["dataUser", {}]);
          app.$cookiz.remove("_ujiaja");
          return;
        });
    }

    await app.$axios
      .$get("api/public/pengaturan", {
        headers: {
          Authorization: "Bearer " + app.$cookiz.get("_ujiaja")
        }
      })
      .then(async response => {
        // console.log('pengaturan', response.data)
        if (response.success) {
          await commit("set", ["dataSetting", response.data]);
        }
        return;
      })
      // .then(() => {
      //   app.$axios
      //     .$get("api/notification", {
      //       headers: {
      //         Authorization: "Bearer " + app.$cookiz.get("_ujiaja")
      //       },
      //       params: {
      //         limit: 6
      //       }
      //     })
      //     .then(async response => {
      //       // console.log("notif", response.data);
      //       if (response.success) {
      //         await commit("set", ["notifData", response.data.data]);
      //         await commit("set", ["notifTotal", response.data.total]);
      //       }
      //       return;
      //     })
      //     .catch(error => {
      //       // console.log('pengaturan err',error.response)
      //       return;
      //     });
      // })
      .catch(error => {
        // console.log('pengaturan err',error.response)
        return;
      });
  }
};
