<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    link: String,
    activeColor: {
      type: String,
      default(){
        return 'lightred'
      } 
    }
  },
  data(){
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      //查询当前活跃路由是否是 当前动态绑定的link 如果是则不为负一
      return this.$route.path.indexOf(this.link)  !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.link)
    }
  }
}
</script>

<style scoped>
    .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;  /*常规tabbar高度49px 移动端*/
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /* .active{
    color: rgb(225,97,134);
  } */
</style>