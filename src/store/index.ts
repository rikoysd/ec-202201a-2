import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async getItemList(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/items/aloha"
      );
      console.dir("response:" + JSON.stringify(response));
      const payload = response.data;
      context.commit("showItemList", payload);
    },
  },
  modules: {},
});
