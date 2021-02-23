<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .recommend {
    display: flex;
    justify-content: space-around;
    border-bottom: solid 10px rgba(100, 100, 100, .2);
    margin-top: 10px;
  }
  .recommend-item {
    flex: 1;
    text-align: center;
  }
  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 6px;
  }
  .recommend-item div {
    margin-bottom: 5px;
  }
</style>