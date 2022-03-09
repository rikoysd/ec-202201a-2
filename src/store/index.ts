import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Item } from "@/types/Item";
import { Order } from "@/types/Order";
import { User } from "@/types/User";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 商品の配列
    itemList: new Array<Item>(),
    // orderオブジェクト
    order: new Order(
      0,
      0,
      0,
      0,
      new Date(),
      "",
      "",
      "",
      "",
      "",
      new Date(),
      0,
      new User(0, "", "", "", "", "", ""),
      []
    ),
  },
  mutations: {
    /**
     * payloadのitemsの配列からitemを一つずつ取り出してstateにpushする.
     * @param state - ステート
     * @param payload - ペイロード
     */
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
    /**
     * stateのorderItemListに商品を追加する.
     */
    addItem(state, payload) {
      state.order.orderItemList.push(payload);
    },
  },
  actions: {
    /**
     * WebAPIから商品一覧を取得する.
     * @param context - コンテキスト
     */
    async getItemList(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/items/aloha"
      );
      console.dir("response:" + JSON.stringify(response));
      const payload = response.data;
      context.commit("showItemList", payload);
    },
  },
  getters: {
    /**
     * stateの商品一覧を表示する.
     * @param state - ステート
     * @returns  stateの商品一覧
     */
    getItemList(state) {
      return state.itemList;
    },
    /**
     * 注文を情報を取得する.
     */
    getOrder(state) {
      return state.order;
    },
  },
  modules: {},
});
