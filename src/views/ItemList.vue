<template>
  <div>
    <div class="search-wrapper">
      <div class="container">
        <form method="post" class="search-form">
          <input type="text" name="name" class="search-name-input" />

          <button class="btn search-btn" type="button">
            <span>検索</span>
          </button>
        </form>
      </div>
    </div>

    <!-- item list -->
    <div class="item-wrapper">
      <div class="container">
        <div class="items" v-for="item of currentItemList" v-bind:key="item.id">
          <div class="item">
            <div class="item-icon">
              <img v-bind:src="item.imagePath" />
            </div>
            <router-link to="/itemDetail">{{ item.name }}</router-link
            ><br />
            <span class="price">Ｍ</span>{{ item.itemPriceM }}円(税抜)<br />
            <span class="price">Ｌ</span>{{ item.itemPriceL }}円(税抜)<br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "@/types/Item";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  private currentItemList = new Array<Item>();
  created(): void {
    // actionsのgetItemListを呼び出す
    this.$store.dispatch("getItemList");
    this.currentItemList = this.$store.state.itemList;
  }
}
</script>

<style scoped>
@import "../../public/css/item_list.css";
</style>
