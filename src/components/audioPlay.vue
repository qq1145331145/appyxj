<!--播放层组件-->
<template>
  <div class="audioPlayBox">
      <div class="playHead">
          <div class="headOccupy"></div>
          <div class="headFun"></div>

      </div>
      <div class=""></div>
      <div></div>
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
<style lang='scss' rel='stylesheet/scss' scoped>

.audioPlayBox{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 255, 0.219);
    z-index: 100;

    .playHead{
        width: 6.4rem;
        overflow: hidden;

        .headOccupy{
            width: 6.4rem;
            height: 30px;
        }
        
        .headFun{
            width: 6.4rem;
        }
    }
}
</style>