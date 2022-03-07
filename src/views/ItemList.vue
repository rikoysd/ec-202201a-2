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
        <div class="items" v-for="item of items" v-bind:key="item.id">
          <div class="item">
            <div class="item-icon">
              <img src="img/1.jpg" />
            </div>
            <router-link to="/itemDetail">ハワイアンパラダイス</router-link
            ><br />
            <span class="price">Ｍ</span>1,380円(税抜)<br />
            <span class="price">Ｌ</span>2,380円(税抜)<br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped></style>
