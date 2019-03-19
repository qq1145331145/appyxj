<!-- 音乐列表层 -->
<template>
  <div class="collectBox" @click="collectBoxShow">
    <div class="collectLi" @click.stop>
      <div class="collectLiHead">
        <div class="sorting" @click="playSortClick">
          <i :class="['fa',playSorting==1 ?'fa-refresh' :playSorting==2 ?'fa-random' :'fa-repeat']"></i>
          {{playSorting==1 ?'列表循环' :playSorting==2 ?'随机播放' :'单曲循环'}}
          {{'('+audioSrcArr.length+')'}}
        </div>
        <div class="collecDel">
          <div class="col">
            <i class="fa-folder-o fa"></i> 全部收藏
          </div>
          <i class="fa-trash-o fa del" @click="removeAllClick"></i>
        </div>
      </div>
      <div class="collectBody">
        <div v-for="(item,index) in audioSrcArr" :key="'as'+index" class="colSongs">
          <div class="Content" @click="audioSrcArrClick(item,index)">
            <span :class="item.id==audioSrc.id ?'playActive' :''" class="sName">{{item.name}}</span>
            <span :class="item.id==audioSrc.id ?'playActive' :''" class="sSinger">-{{item.singer}}</span>
          </div>
          <i class="remove" @click="removeMusicClick(index)">×</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      audioSrc: "audioSrc",
      audioSrcArr: "audioSrcArr",
      audioSrcIndex: "audioSrcIndex",
      playSorting: "playSorting"
    })
  },
  methods: {
    collectBoxShow() {
      this.$store.commit("collectBoxShow");
    },
      audioSrcArrClick(item,index){
    console.log(item,index)
      this.$store.commit("audioSrcArrPlay",{item:item,index:index});
  },
      playSortClick(){
      this.$store.commit("playSort");
    },
  removeMusicClick(index){
    this.$store.commit('removeMusic',index);
  },
  removeAllClick(){
    this.$store.commit('removeAll')
  }
  },

};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../public/sass/_color.scss";

.collectBox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 101;

  .collectLi {
    position: absolute;
    bottom: 0;
    width: 6.4rem;
    height: 50%;
    background: white;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    overflow: hidden;

    .collectLiHead {
      padding: 0.1rem;
      height: 0.4rem;
      width: 6.2rem;
      border-bottom: 1px solid #ccc;
      font-size: 0.2rem;
    }

    .sorting {
      float: left;
      height: 0.4rem;
      width: 2rem;
      line-height: 0.4rem;
    }

    .collecDel {
      display: flex;
      float: right;
      width: 2rem;
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
    }

    .collecDel > .col {
      height: 0.4rem;
      width: 1.5rem;
      border-right: 1px solid #ccc;
    }
    .collecDel > .del {
      display: block;
      height: 0.4rem;
      width: 0.5rem;
      line-height: 0.4rem;
    }

    .collectBody {
      width: 6.4rem;
      height: calc(100% - 0.6rem);
      overflow-y: auto;
    }

    & .colSongs {
      display: flex;
      margin: 0 0.1rem;
      padding: 0.1rem 0;
      width: 6.2rem;
      height: 0.4rem;
      border-bottom: 1px solid #ccc;
    }

    & .Content {
      display: flex;
      width: 5.8rem;
      height: 0.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & .Content > span {
      height: 0.4rem;
      line-height: 0.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & .Content > .sName {
      font-size: 0.2rem;
      font-weight: bold;
    }
    & .Content > .sSinger {
      font-size: 0.1rem;
      color: rgba(0, 0, 0, 0.8)
    }
     & .Content > .playActive{
       color: $bc;
     }

    & .remove {
      width: 0.4rem;
      height: 0.4rem;
      font-size: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
    }
  }
}
</style>