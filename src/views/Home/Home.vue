<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div> <!--slot指定需要替换的插槽 -->
    </nav-bar>
    <tab-control 
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1" 
      class="tab-control" v-show="isFixed" />
    <scroll 
    class="contents" 
    ref="scroll" 
    :probeType=3 
    @scroll="contentscroll"
    :pullUpLoad="true"
    @updateData="updateMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control 
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2" />
      <goods-list :goods="showGoods"
       />
    </scroll>
    <!-- 监听组件原生事件，需要给事件加上.navtive修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>  
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
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
//导入网络请求的api
import {
  getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'  



export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0
    }
  },
  created(){
    //请求多个数据
    this.getHomeMultidata()

     // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // 监听item中图片加载完成
    
    },
    
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },

      },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemImageLoad',() =>{
      // console.log(1);
      refresh()
      })
      
    },
    
   methods: {
    //  事件监听的方法
     tabClick(index) {
      //  console.log(index);
      switch(index) {
        case 0 :
          this.currentType = 'pop'
          break;
        case 1 :
          this.currentType = 'new'
          break;
        case 2 :
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
     },
     backClick() {
       this.$refs.scroll.scrollTo(0,0,500)
     },
    contentscroll(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 决定tabcontrol是否吸顶(position fixed)
      this.isFixed = (-position.y) > this.tabOffsetTop
    },
    updateMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      
    },
    


    //  网络请求的方法
     getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list //请求完毕后数据会释放，需要用data将请求到的数据保存起来
          this.recommends = res.data.data.recommend.list
        })
     },
     getHomeGoods(type) {
       let page = this.goods[type].page + 1
      //  console.log(this.goods[type].page);
       getHomeGoods(type,page).then(res => {
        
        this.goods[type].list.push(...res.data.data.list) 
        this.goods[type].page += 1

        this.$refs.scroll.scroll.finishPullUp()
       })
     }
   },
  destroyed() {
    console.log('销毁');
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY)
    // 最好回来时进行一次重载
    this.$refs.scroll.refresh() 
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
    // console.log(this.$refs.scroll);
  }
}
</script>

<style scoped> 
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }
  
  .contents {
    /* height: 300px; */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>