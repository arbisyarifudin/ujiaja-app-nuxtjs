import Vue from "vue";

export const state = () => ({
  isAuth: false,
  dataUser: {},
  dataError: {}
});

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
  setData(state, [type, value]) {
    state.dataList[type] = value;
  },
  setUser(state, payload) {
    state.dataUser = payload;
    console.log("setUser");
    // this.$cookies.set("jbtvToken", payload, {
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 7
    // });
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
        })
        .catch(async error => {
          console.log("nuxtInitError", error);
          await commit("SET_IS_AUTH", false);
          await commit("set", ["dataUser", {}]);
          app.$cookiz.remove("_ujiaja");
        });
    }
  }
};
