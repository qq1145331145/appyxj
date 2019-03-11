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
        <div class="musicImg">
          <img :src="this.musicPic">
        </div>
        <div class="musicConten">
          <span class="song">{{this.musicName}}</span>
          <span class="singer">{{this.musicSinger}}</span>
        </div>
        <div
          :class="['musicPlay' ,'fa', isPaused ?'fa-play-circle-o' :'fa-pause-circle-o' ]"
          @click="isPausedClick"
        ></div>
        <div class="musicMenu fa fa-indent"></div>
      </div>
    </div>
    <!-- 播放层组件 -->
    <audioPlay v-show="false"></audioPlay>
    <audio ref="audio" :src="isPlay ?audioSrc.url :null" autoplay>你的浏览器不支持audio</audio>
  </div>
</template>
<script>
import { mapState } from "vuex";
import audioPlay from "./components/audioPlay";
// const url ="https://api.bzqll.com/music/netease/songList?key=579621905&id=3778678&limit=200&offset=0";

export default {
  name: "app",
  components: {
    audioPlay
  },
  computed: {
    ...mapState({
      audioSrc: "audioSrc",
      isPlay: "isPlay",
      isPaused: "isPaused"
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
        return;
      }
    }
  },
  methods: {
    isPausedClick() {
      if (this.isPlay) {
        if (this.isPaused == false) {
          this.$refs.audio.pause();
          console.log("暂停");
        } else if (this.isPaused == true) {
          this.$refs.audio.play();
          console.log("播放");
        }
        this.$store.commit("isPausedClick");
        // console.log(this.isPaused)
        // console.log(this.$refs.audio)
      }
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
