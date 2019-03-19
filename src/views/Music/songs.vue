<!-- 歌单路由-->
<template>
  <div class="songsBox">
    <div class="boxHead" @click="songGo">
      <div class="boxHeadOne"></div>
      <div class="boxHeadTow">
        <i class="fa fa-chevron-left"></i>
        <span>歌单</span>
      </div>
    </div>
    <div class="bodyBox" @scroll="scrollNext" ref="bodyBox">
      <div class="bodyTitle">
        <div class="imgUrlBox">
          <img :src="musicData[0].coverImgUrl">
        </div>
        <div class="bodyTitleText">
          <span class="spanTitle">{{$route.query.name}}</span>
          <span class="spanContent">{{musicData[0].title}}</span>
          <span class="spanDetails">{{musicData[0].description}}</span>
        </div>
      </div>
      <div class="bodySongBox">
        <router-link tag="div"  @click.native="songSelectClick(item,index)" :to="{path:$route.path+'/'+item.id,query:{id:item.id}}" class="songSelect" ref="songSelect" v-for="(item,index) in musicShow" :key="'ms'+index">
          <div class="songImg">
            <img :src="item.coverImgUrl">
            <div class="creatorBox"><i class="fa fa-user"></i> {{item.creator}}</div>
          </div>
          <span>{{item.title}}</span>
        </router-link>
      </div>
        <div class="placeholderBox" ref="placeholderBox"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      musicData: [
        {
          coverImgUrl:
            "http://p2.music.126.net/aao5Ku06P5PrMafCfT3MjQ==/18648816720698170.jpg?param=400y400",
          title: "「日语民谣」月色中的浅吟低唱",
          description: "这是一张以夜晚为主题的日语民谣歌单。"
        }
      ],
      musicShow: null,
      showSplice:11
    };
  },
  props: ["name"],
  computed: {
    ...mapState({
      dataArr: "clickGedan",
      splendidUrl: "url1",
      hotUrl: "url2"
    })
  },
  created() {
    if (this.$route.query.id == "tj123") {
      this.axios.get(this.splendidUrl).then(
        response => {
          response.data.data.forEach(element => {
            this.musicData.push(element);
          });
          this.musicData.splice(0, 1);
          this.musicShow = this.musicData.slice(1, this.showSplice);
          console.log(this.musicData);
        },
        err => {
          alert(err);
        }
      );
    } else if (this.$route.query.id == "jp123") {
      this.axios.get(this.hotUrl).then(
        response => {
          console.log(response.data.data.playlists);
          response.data.data.playlists.forEach(element => {
            this.musicData.push(element);
          });
          this.musicData.splice(0, 1);
          this.musicShow = this.musicData.slice(1, this.showSplice);
        },
        err => {
          alert(err);
        }
      );
    }
  },
  watch:{
    showSplice(){
      this.musicShow = this.musicData.slice(1, this.showSplice);
    }
  },
  methods: {
    songGo() {
      this.$router.go(-1);
    },
    songSelectClick(item,index){
      console.log(item)
    },
    scrollNext(){
      // console.log(this.$refs.placeholderBox.getBoundingClientRect().y)
      // console.log(getComputedStyle(this.$refs.placeholderBox).height)
      // console.log(document.body.clientHeight)

      let placeholderBoxY = this.$refs.placeholderBox.getBoundingClientRect().y;
      // let placeholderBoxHeight = parseInt(getComputedStyle(this.$refs.placeholderBox).height)
      let bodyHeight = document.body.clientHeight;
      if(placeholderBoxY <= bodyHeight){
        this.showSplice+=10
        console.log('1')
      }
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../../public/sass/_color.scss";

.songsBox {
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 1);
  z-index: 2;

  .boxHead {
    // position: sticky;
    // top: 0;
    width: 6.4rem;
    overflow: hidden;
    background: $bc;

    .boxHeadOne {
      width: 6.4rem;
      height: 30px;
      background: $bc;
    }

    .boxHeadTow {
      width: 1.2rem;
      height: 0.8rem;
      margin-left: 0.1rem;
      font-size: 0.3rem;
      line-height: 0.8rem;
      color: #fff;
    }

    & .boxHeadTow > i {
      margin-right: 0.2rem;
      font-size: 0.2rem;
    }
  }
  .bodyBox {
    width: 6.4rem;
    height: calc(100% - 30px - .8rem );
    background: white;
    overflow-y: auto;

    .bodyTitle {
      width: 6.4rem;
      height: 1.9rem;
      background-color: $bc;
      display: flex;
    }
    & .imgUrlBox {
      margin: 0.2rem 0.3rem;
      width: 1.5rem;
      height: 1.5rem;
    }
    & .bodyTitleText {
      height: 1.5rem;
      width: 3.9rem;
    }

    & .bodyTitleText > span {
      font-size: 0.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    & .bodyTitleText .spanTitle {
      width: 3.9rem;
      height: 0.3rem;
      margin: 0.2rem 0;
      font-size: 0.3rem;
      font-weight: bolder;
      color: #fff;
    }
    & .bodyTitleText .spanContent {
      width: 3.9rem;
      height: 0.3rem;
      margin: 0.1rem 0;
      font-size: 0.2rem;
      line-height: 0.3rem;
      color: #fff;
    }
    & .bodyTitleText .spanDetails {
      width: 3.9rem;
      height: 0.3rem;
      margin: 0.1rem 0;
      font-size: 0.1rem;
      line-height: 0.3rem;
      color: #ffffffbe;
    }

    .bodySongBox {
      width: 6.4rem;
      display: flex;
      flex-wrap: wrap;
    }

    & .songSelect {
      flex-shrink: 0;
      width: 3rem;
      height: 3.8rem;
      padding: 0.1rem;
    }

    & .songImg {
      position: relative;
      width: 3rem;
      height: 3rem;
      overflow: hidden;
      border-radius: .1rem;
    }

    & .songImg .creatorBox{
      position: absolute;
      bottom: 0;
      width: 2.8rem;
      height: .6rem;
      padding: 0 .1rem;
      font-size: .1rem;
      line-height: .6rem;
      color: #fff;
      background: linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,0));
    }

    & .songSelect>span{
      display: block;
      margin-top: .1rem;
      width: 3rem;
      height: .7rem;
      font-size: .1rem;
      line-height: .3rem;
      color: rgb(63, 63, 63)
    }

    .placeholderBox{
      width: 6.4rem;
      height:.8rem;
    }
  }
}
</style>