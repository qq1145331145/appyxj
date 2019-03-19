<template>
  <div id="app" class="musicApp">
    <!-- app主要功能层 -->
    <div class="musicApp">
      <div class="aboveBox">
        <!-- 头部框 -->
        <div class="headBox">
          <div class="headPlace"></div>
          <div class="headNav">
            <div class="navLeft fa fa-align-justify"></div>
            <div class="navMiddle">
              <router-link tag="div" class="fa fa-music" to="/mine"></router-link>
              <router-link tag="div" class="fa fa-circle-o-notch" to="/music"></router-link>
              <router-link tag="div" class="fa fa-youtube-play" to="/video"></router-link>
            </div>
            <div class="navRight fa fa-search"></div>
          </div>
        </div>
        <!-- 主要内容框 -->
        <div class="mainBox">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
      <!-- 固定底部框 -->
      <div class="footBox">
        <div class="musicImg" @click="audioShow">
          <img :src="this.musicPic">
        </div>
        <div class="musicConten" @click="audioShow">
          <span class="song">{{this.musicName}}</span>
          <span class="singer">{{this.musicSinger}}</span>
        </div>
        <div
          :class="['musicPlay' ,'fa', isPaused ?'fa-play-circle-o' :'fa-pause-circle-o' ]"
          @click="isPausedClick"
        ></div>
        <div class="musicMenu fa fa-indent" @click="collectShow"></div>
      </div>
    </div>
    <!-- 播放层组件 -->
    <audioPlay
      ref="audioPlay"
      v-show="audioPlayShow"
      :musicName="musicName"
      :musicSinger="musicSinger"
      :musicPic="musicPic"
    ></audioPlay>
    <!-- 音乐列表层 -->
    <collectBox v-show="collectBoxShow"></collectBox>
  </div>
</template>
<script>
import { mapState } from "vuex";
import audioPlay from "./components/audioPlay";
import collectBox from "./components/collectBox"

// const url ="/API/recommend/resource";

export default {
  name: "app",
  components: {
    audioPlay,
    collectBox

  },
  computed: {
    ...mapState({
      audioSrc: "audioSrc",
      isPlay: "isPlay",
      isPaused: "isPaused",
      audioPlayShow: "audioPlayShow",
      collectBoxShow:'collectBoxShow'

    }),
    musicName() {
      if (this.audioSrc) {
        return this.audioSrc.name;
      } else {
        return "name";
      }
    },
    musicSinger() {
      if (this.audioSrc) {
        return this.audioSrc.singer;
      } else {
        return "singer";
      }
    },
    musicPic() {
      if (this.audioSrc) {
        return this.audioSrc.pic;
      } else {
        return "http://p1.music.126.net/XnVjKN4-Isoo-pYFz2qFvw==/16658700673109477.jpg?param=400y400";
      }
    }
  },
  methods: {
    isPausedClick() {
      this.$refs.audioPlay.isPausedClick();
    },
    audioShow() {
      this.$store.commit("audioPlayShow");
    },

    collectShow(){
      this.$store.commit("collectBoxShow");
    }
  }
  // created() {
  //   this.axios.get(url).then(
  //     response => {
  //       /* eslint-disable */
  //       console.log(response);
  //     },
  //     err => {
  //       alert(err);
  //     }
  //   );
  // }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../public/sass/_color.scss";

.musicApp {
  width: 6.4rem;
  height: 100%;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  .aboveBox {
    width: 6.4rem;
    height: calc(100% - 1px - 0.8rem);
  }

  .headBox {
    width: 6.4rem;
    overflow: hidden;
    background-color: $bc;

    .headPlace {
      width: 6.4rem;
      height: 30px;
    }

    .headNav {
      height: 0.8rem;
      width: 6.4rem;
      display: flex;
    }

    & .navLeft,
    & .navRight {
      width: 1rem;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.3rem;
      color: rgba(255, 255, 255, 0.8);
    }

    & .navMiddle {
      width: 3rem;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.3rem;
      padding: 0 0.7rem;
      display: flex;
    }
    & .navMiddle > div {
      flex: 1 0 auto;
      width: 0.8rem;
      height: 0.8rem;
      margin: 0 0.1rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.4rem;
      color: $fc;
    }
    & .navMiddle > .active {
      color: white;
    }
  }
  .mainBox {
    width: 6.4rem;
    height: calc(100% - 30px);
    // background: blue;
  }
  .footBox {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: calc(640px - 0.2rem);
    padding: 0.1rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    z-index: 3;
  }
  & .musicImg {
    display: flex;
    width: 0.6rem;
    height: 0.6rem;
    background: black;
  }

  & .musicConten {
    width: 3.8rem;
    height: 0.6rem;
    padding: 0 0.2rem;
  }

  & .musicConten > span {
    display: block;
    width: 3.8rem;
    height: 0.3rem;
  }

  & .song {
    font-size: 0.2rem;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .singer {
    font-size: 0.1rem;
    color: rgb(90, 90, 90);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .musicPlay,
  & .musicMenu {
    width: 0.5rem;
    height: 0.5rem;
    margin: auto 0.1rem;
    line-height: 0.5rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }
  & .musicPlay {
    font-size: 0.5rem;
  }
  & .musicMenu {
    font-size: 0.4rem;
  }
}
</style>
