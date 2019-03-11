<!--推荐歌单页组件-->
<template>
  <div class="albumBox">
    <router-link :to="{path:$route.path + '/' + id,query:{id:id,name:name}}">
      <div class="albumTitle" @click="clikcTitle">
        {{name}}
        <span>></span>
      </div>
    </router-link>
    <div class="albumContent">
      <router-link
        :to="{path:$route.path + '/' + id +'/'+ item.id,query:{id:item.id}}"
        class="albumDiv"
        v-for="(item,index) in forArr"
        :key="'u1'+index"
        @click="clickAlbum(item,index)"
        tag="div"
      >
        <div class="albumImg">
          <div class></div>
          <img :src="item.coverImgUrl">
        </div>
        <span class="albumSpan">{{item.title}}</span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  props: ["name", "forArr", "nameUrl" ,"id"],
  methods: {
    clickAlbum(item, index) {
      console.log(item);
    },
    clikcTitle() {
      // let a ={name:this.name,forArr:this.forArr,nameUrl:this.nameUrl}
      // this.$store.commit("clickGedanArr", a);
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.albumBox {
  margin: 0.3rem 0;
  width: 6.2rem;
  padding: 0 0.1rem;

  .albumTitle {
    width: 1.5rem;
    height: 0.6rem;
    font-size: 0.2rem;
    line-height: 0.6rem;
    font-weight: bolder;
    color: rgb(119, 119, 119);
  }

  .albumContent {
    width: 6.2rem;
    display: flex;
    flex-wrap: wrap;

    .albumDiv {
      position: relative;
      flex: 0;
      width: 1.8rem;
      height: 2.5rem;
      margin: 0.2rem auto;
    }
    & .albumImg {
      width: 1.8rem;
      height: 1.8rem;
    }
    & .albumSpan {
      margin-top: 0.1rem;
      display: block;
      width: 1.8rem;
      height: 0.6rem;
      line-height: 0.3rem;
      word-wrap: break-word;
      font-size: 0.01rem;
      color: #5f5f5f;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>