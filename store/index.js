import Vue from "vue";

export const state = () => ({
  dataError: {}
});

export const mutations = {
  putError(state, payload) {
    console.log("putError", payload);
    // state.dataError = payload
    Vue.set(state.dataError, payload[0], payload[1]);
  },
  deleteError(state) {
    console.log("deleteError");
    state.dataError = {};
  }
};

export const actions = {};
