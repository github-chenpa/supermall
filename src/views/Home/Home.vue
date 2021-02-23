<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div> <!--slot指定需要替换的插槽 -->
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>

  </div>
</template>

<script>

// 导入子组件
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'
// 导入公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

//导入网络请求的api
import {
  getHomeMultidata,getHomeGoods} from 'network/home'



export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      }
    }
  },
  created(){
    //请求多个数据
    this.getHomeMultidata()

     // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
    },
   methods: {
     getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list //请求完毕后数据会释放，需要用data将请求到的数据保存起来
          this.recommends = res.data.data.recommend.list
        })
     },
     getHomeGoods(type) {
       const page = this.goods[type].page + 1
       getHomeGoods(type,page).then(res => {
         console.log(res.data.data.list);
        
        this.goods[type].list.push(...res.data.data.list) 
        this.goods[type].page += 1
       })
     }
   }
    
}
</script>

<style> 
  #home {
    padding-top: 44px;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>