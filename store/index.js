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
  async nuxtServerInit({ commit, state, dispatch }, { app, store, route, req, res, error, redirect }) {
    const ujiajaToken = app.$cookiz.get("_ujiaja");

    const axiosInstance = app.$axios.create({
      baseURL: app.$config.apiUrl,
      // headers: {
      //   Authorization: 'Bearer ' + ujiajaToken
      // }
    });

    if (ujiajaToken && !app.$auth.loggedIn) {
      try {
        const res = await axiosInstance.get("api/users", {
          headers: {
            Authorization: "Bearer " + ujiajaToken
          }
        });
        // console.log("nuxtInit getUser response", res.data);
        const responseData = res.data?.data;
        await commit("SET_IS_AUTH", true);
        await commit("set", ["dataUser", responseData]);

        app.$auth.setUser(responseData)
        app.$auth.setUserToken(ujiajaToken)

      } catch (error) {
        console.log("nuxtInitError", error);
        // console.log("nuxtInitError", error.response);
        await commit("SET_IS_AUTH", false);
        await commit("set", ["dataUser", {}]);
        app.$cookiz.remove("_ujiaja");
      }
    }

    try {
      const res = await axiosInstance.get("api/public/pengaturan");
      const responseData = res.data?.data;

      if (res.data.success) {
        // console.log("pengaturan", responseData);
        await commit("set", ["dataSetting", responseData]);
      }
    } catch (error) {
      console.log('pengaturan err', error.response);
    }
  }
};
