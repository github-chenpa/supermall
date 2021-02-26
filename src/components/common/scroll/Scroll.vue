<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
      
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
     click: true, //释放点击事件
     probeType: this.probeType,
     pullUpLoad:this.pullUpLoad,
     bounceTime: 200,
     snap: { 
      //  轮播图取消设置禁用
       loop: this.loop,
       threshold: 0.3,
       speed: 400
     }
    })
    // 监听滚动的位置
    if(this.probeType === 2 || this.probeType == 3){
      this.scroll.on('scroll',position => {
      // console.log(position);
      this.$emit('scroll',position)
    })
    }
    // console.log(this.scroll);

    // 监听scroll滚动到底部
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp',() => {
      this.$emit('updateData')
    })
    }
  },
  methods: {
    // time默认设值为300，如果未传入默认为300
    scrollTo(x,y,time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh() {
      // console.log(1); 
      this.scroll && this.scroll.refresh()
      
    }
  }
}
</script>

<style  scoped>
 
</style>