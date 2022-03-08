<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">{{ currentItem.name }}</h1>
        <div class="row">
          <div class="row item-detail">
            <div class="item-icon">
              <img v-bind:src="currentItem.imagePath" />
            </div>
            <div class="item-intro">
              {{ currentItem.description }}
            </div>
          </div>
          <div class="row item-size">
            <div class="item-hedding">サイズ</div>
            <div>
              <label>
                <input
                  id="size-m"
                  name="size"
                  type="radio"
                  value="M"
                  v-model="selectedSize"
                />
                <span>
                  &nbsp;<span class="price">Ｍ</span>&nbsp;&nbsp;{{
                    currentItem.priceM.toLocaleString()
                  }}円(税抜)</span
                >
              </label>
              <label>
                <input
                  id="size-l"
                  name="size"
                  type="radio"
                  value="L"
                  v-model="selectedSize"
                />
                <span>
                  &nbsp;<span class="price">Ｌ</span>&nbsp;&nbsp;{{
                    currentItem.priceL.toLocaleString()
                  }}円(税抜)</span
                >
              </label>
            </div>
          </div>
          <div class="row item-toppings">
            <div class="item-hedding">
              トッピング：&nbsp;1つにつき
              <span>&nbsp;Ｍ&nbsp;</span>&nbsp;&nbsp;200円(税抜)
              <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
            </div>
            <div
              v-for="topping of currentItem.toppingList"
              v-bind:key="topping.id"
            >
              <label class="item-topping">
                <input type="checkbox" v-bind:value="topping" />
                <span>{{ topping.name }}</span>
              </label>
            </div>
          </div>
          <div class="row item-quantity">
            <div class="item-hedding item-hedding-quantity">数量</div>
            <div class="item-quantity-selectbox">
              <div class="input-field col s12">
                <select class="browser-default" v-model="quantity">
                  <option value="" disabled selected>選択して下さい</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row item-total-price">
            <span
              >この商品金額：{{
                calcTotalPrice.toLocaleString()
              }}
              円(税抜)</span
            >
          </div>
          <div class="row item-cart-btn">
            <button
              class="btn"
              type="button"
              onclick="location.href='cart_list.html'"
            >
              <span>カートに入れる</span>
            </button>
          </div>
        </div>
      </div>
      <!-- end container -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { Item } from "@/types/Item";
import { Topping } from "@/types/Topping";

@Component
export default class XXXComponent extends Vue {
  // 詳細ページに表示される商品
  private currentItem = new Item(0, "", "", "", 0, 0, "", false, []);
  // サイズ
  private selectedSize = "M";
  // 合計金額
  private calcTotalPrice = 0;
  // 数量
  private quantity = 1;
  // 選択されたトッピング一覧
  private checkedTopping = new Array<Topping>();

  async created(): Promise<void> {
    // WebAPIから商品を1件取得する
    const itemId = Number(this.$route.params.id);
    const responseItem = await axios.get(
      "http://153.127.48.168:8080/ecsite-api/item/" + itemId
    );
    console.dir("response:" + JSON.stringify(responseItem));
    this.currentItem = responseItem.data.item;

    // WebAPIからトッピング一覧を取得する
    const responseTopping = await axios.get(
      "http://153.127.48.168:8080/ecsite-api/item/aloha"
    );
    console.dir("response:" + JSON.stringify(responseTopping));
    for (const topping of responseTopping.data.toppings) {
      this.currentItem.toppingList.push(
        new Topping(
          topping.id,
          topping.type,
          topping.name,
          topping.priceM,
          topping.priceL
        )
      );
    }

    // //合計金額を計算する
    // if(this.selectedSize==="M"){
    // }checkedTopping
  }
}
</script>

<style scoped>
@import "../../public/css/item_detail.css";
</style>
