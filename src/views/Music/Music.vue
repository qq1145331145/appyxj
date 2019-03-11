<!--  -->
<template>
  <div class="musicBox">
      <div class="musicNav">
        <router-link :to="{name:'recommend'}" tag="div">推荐</router-link>
        <router-link :to="{name:'radio'}" tag="div">电台</router-link>
      </div>
      <div class="musicMainBox">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

}

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../public/sass/_color.scss";
.musicBox{
  width: 6.4rem;
  height:calc(100% - .6rem);


  .musicNav{
  width: 100%;
  height: .6rem;
  background: $bc;
  display: flex;

  div{
    flex: 1;
    font-size: .3rem;
    text-align: center;
    line-height: .6rem;
    font-weight: bold;
    color: $fc;
  }

  .active{
    color: white;
  }
}

.musicMainBox{
  height: 100%;
  width: 6.4rem;
  overflow-y:auto;
}


}





</style>