import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Item } from "@/types/Item";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 商品の配列
    itemList: new Array<Item>(),
  },
  mutations: {
    // payloadのitemsの配列からitemを一つずつ取り出してstateにpushする
    showItemList(state, payload) {
      for (const item of payload.items) {
        state.itemList.push(
          new Item(
            item.id,
            item.type,
            item.name,
            item.description,
            item.priceM,
            item.priceL,
            item.imagePath,
            item.deleted,
            item.toppingList
          )
        );
      }
    },
  },
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
  getters:{
    // stateの商品一覧を表示する
    getItemList(state){
      return state.itemList;
    }
  },
  modules: {},
});
