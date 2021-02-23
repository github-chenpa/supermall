<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div> <!--slot指定需要替换的插槽 -->
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'


import {getHomeMultidata} from 'network/home'



export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created(){
    //请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.data.banner.list //请求完毕后数据会释放，需要用data将请求到的数据保存起来
      this.recommends = res.data.data.recommend.list
    })
  }
}
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
  }
</style>