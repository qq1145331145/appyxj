<!--播放层组件-->
<template>
  <div class="audioPlayBox" :style="{packgroundImage:'url(musicPic)'}">
    <div :style="{backgroundImage:'url('+musicPic+')'}" class="audioPlackground"></div>
    <div class="audioPlay">
      <div class="playHead">
        <div class="headOccupy"></div>
        <div class="headFun">
          <i class="fa fa-chevron-left" @click="audioShow"></i>
          <div class="headSpan">
            <span class="spanOne">{{musicName}}</span>
            <span class="spanTow">{{musicSinger}}</span>
          </div>
        </div>
        <div class="voice">
          <i class="fa fa-volume-up vIcon"></i>
          <div class="voiceBox">
            <!-- 滑块 -->
            <div class="voiceProgress" ref="voiceProgress"></div>
            <!-- 激活层 -->
            <div class="voiceActive" ref="voiceActive"></div>
            <!-- 事件绑定层 -->
            <div
              class="voiceLayer"
              ref="voiceLayer"
              @touchstart="voiceStart"
              @touchmove="voiceMove"
            ></div>
          </div>
        </div>
      </div>
      <!-- 歌词 -->
      <div class="playBody">
        <div class="lyricBox" ref="lyricBox">
          <div
            v-for="(item,index) in lyricArr"
            :key="'ly' + index"
            class="lyricLi"
            ref="lyricLi"
            :class="index==lyricIndex ?'active' :''"
          >{{item[1]}}</div>
        </div>
      </div>
      <div class="playFoot">
        <div class="com-col">
          <i class="fa fa-heart"></i>
          <i class="fa fa-download"></i>
          <i class="fa fa-comment-o"></i>
          <i class="fa fa-ellipsis-v"></i>
        </div>
        <div class="schedule">
          <div class="startTime">{{sTime}}</div>
          <div class="barBox">
            <!-- 滑块 -->
            <div class="musicProgress" ref="musicProgress"></div>
            <!-- 激活层 -->
            <div class="musicActive" ref="musicActive"></div>
            <!-- 事件绑定层 -->
            <div
              class="musicLayer"
              ref="musicLayer"
              @touchstart="layerStart"
              @touchmove="layerMove"
              @touchend="layerEnd"
            ></div>
          </div>
          <div class="endTime">{{eTime}}</div>
        </div>
        <div class="contorl">
          <i
            :class="['iocnOne','fa',playSorting==1 ?'fa-refresh' :playSorting==2 ?'fa-random' :'fa-repeat']"
            @click="playSortClick"
          ></i>
          <i class="fa fa-step-backward iocnTow" @click="lostMusicClick"></i>
          <i
            :class="['iocnThree' ,'fa', isPaused ?'fa-play-circle-o' :'fa-pause-circle-o' ]"
            @click="isPausedClick"
          ></i>
          <i class="fa fa-step-forward iocnTow" @click="nextMusicClick"></i>
          <i class="fa fa-indent iocnOne" @click="collectShow"></i>
        </div>
      </div>
    </div>
    <!-- controls -->
    <!-- @timeupdate="audioTime" -->
    <audio
      ref="audio"
      :src="isPlay ?audioSrc.url :null"
      @ended="audioEnded"
      @canplay="audioCa"
      autoplay
    >你的浏览器不支持audio</audio>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      //音乐控制属性
      touX: null,
      divX: null,
      changedX: null,
      elWidth: null,
      startTime: 0,
      endTime: 0,
      //音量控制属性
      voiceX: null,
      voiceDivX: null,
      voiceChangedX: null,
      voiceElWidth: null,
      //歌词变白
      lyricIndex: 0
    };
  },
  props: ["musicName", "musicSinger", "musicPic"],
  computed: {
    sTime() {
      let ti = Math.round(this.startTime);
      let m = parseInt(ti / 60);
      let s = ti % 60;
      if (m < 10) {
        if (s < 10) {
          return "0" + m + ":" + "0" + s;
        } else {
          return m + ":" + s;
        }
      } else {
        return m + ":" + s;
      }
    },
    eTime() {
      let ti = Math.round(this.endTime);
      let m = parseInt(ti / 60);
      let s = ti % 60;
      if (m < 10) {
        if (s < 10) {
          return "0" + m + ":" + "0" + s;
        } else {
          return m + ":" + s;
        }
      } else {
        return m + ":" + s;
      }
    },
    ...mapState({
      audioSrc: "audioSrc",
      isPlay: "isPlay",
      isPaused: "isPaused",
      playSorting: "playSorting",
      audioSrcArr: "audioSrcArr"
    }),

    ...mapGetters({
      lyricArr: "lyricArr"
    })
  },
  watch: {},
  methods: {
    audioShow() {
      // console.log(this.musicPic);
      this.$store.commit("audioPlayShow");
    },
    isPausedClick() {
      if (this.isPlay) {
        if (this.isPaused == false) {
          this.$refs.audio.pause();
          // console.log("暂停");
        } else if (this.isPaused == true) {
          this.$refs.audio.play();
          // console.log("播放");
        }
        this.$store.commit("isPausedClick");
        // console.log(this.isPaused)
        // console.log(this.$refs.audio)
      }
    },
    collectShow() {
      this.$store.commit("collectBoxShow");
    },
    lostMusicClick() {
      this.$store.commit("lostMusic");
    },
    nextMusicClick() {
      this.$store.commit("nextMusic");
    },
    playSortClick() {
      this.$store.commit("playSort");
    },
    audioEnded() {
      // console.log(this.audioSrcArr)
      if (this.audioSrcArr.length <= 1) {
        this.$refs.audio.load();
      } else if (this.playSorting == 3) {
        this.$refs.audio.load();
        // console.log("重新");
      } else {
        this.$store.commit("audioEnd");
      }
    },
    voiceStart(el) {
      this.voiceX = el.touches[0].pageX;
      this.voiceDivX = el.target.getBoundingClientRect().left;
      this.voiceChangedX = this.voiceX - this.voiceDivX;
      this.voiceElWidth = parseInt(
        getComputedStyle(this.$refs.voiceLayer).width
      );
      this.$refs.voiceProgress.style.left =
        "calc(" + this.voiceChangedX + "px - .075rem)";
      this.$refs.voiceActive.style.width = this.voiceChangedX + "px";
      this.$refs.audio.volume = this.voiceChangedX / this.voiceElWidth;
    },
    voiceMove(el) {
      this.voiceX = el.touches[0].pageX;
      this.voiceDivX = el.target.getBoundingClientRect().left;
      this.voiceChangedX = this.voiceX - this.voiceDivX;
      // console.log(this.voiceX,this.voiceDivX, this.voiceChangedX);
      if (this.voiceChangedX <= 0) {
        this.voiceChangedX = 0;
      } else if (this.voiceChangedX >= this.voiceElWidth) {
        this.voiceChangedX = this.voiceElWidth;
      }
      this.$refs.voiceProgress.style.left =
        "calc(" + this.voiceChangedX + "px - .075rem)";
      this.$refs.voiceActive.style.width = this.voiceChangedX + "px";

      this.$refs.audio.volume = this.voiceChangedX / this.voiceElWidth;
    },

    layerStart(el) {
      if (this.audioSrc) {
        this.$refs.audio.removeEventListener("timeupdate", this.audioTime);
        this.touX = el.touches[0].pageX;
        this.divX = el.target.getBoundingClientRect().left;
        this.changedX = this.touX - this.divX;
        this.$refs.musicProgress.style.left =
          "calc(" + this.changedX + "px - .1rem)";
        this.$refs.musicActive.style.width = this.changedX + "px";
      }
    },
    layerMove(el) {
      if (this.audioSrc) {
        this.touX = el.touches[0].pageX;
        this.divX = el.target.getBoundingClientRect().left;
        this.changedX = this.touX - this.divX;
        if (this.changedX <= 0) {
          this.changedX = 0;
        } else if (this.changedX >= this.elWidth) {
          this.changedX = this.elWidth;
        }
        this.$refs.musicProgress.style.left =
          "calc(" + this.changedX + "px - .08rem)";
        this.$refs.musicActive.style.width = this.changedX + "px";
      }
    },
    layerEnd(el) {
      if (this.audioSrc) {
        this.$refs.audio.currentTime =
          (parseInt(this.$refs.musicActive.style.width) / this.elWidth) *
          this.$refs.audio.duration;
        this.$refs.audio.addEventListener("timeupdate", this.audioTime);
      }
    },
    //播放改变触发
    audioCa() {
      console.log(this.audioSrc)
      this.$refs.audio.addEventListener("timeupdate", this.audioTime);
      this.elWidth = parseInt(getComputedStyle(this.$refs.musicLayer).width);
      this.endTime = this.$refs.audio.duration;

      this.$store.dispatch("musicLrc");
      console.log(this.lyricArr);

      let self = this;
    },
    //播放不断触发
    audioTime() {
      let t =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) *
        this.elWidth;
      this.$refs.musicActive.style.width = t + "px";
      this.$refs.musicProgress.style.left = "calc(" + t + "px - .1rem)";

      this.startTime = this.$refs.audio.currentTime;

      let self = this;
      let i =0;
      for(i;i<self.lyricArr.length;i++){
        if(self.lyricArr[i][0]<= self.$refs.audio.currentTime){
          let hei = parseInt(getComputedStyle(self.$refs.lyricLi[i]).height);
          let top = parseInt(self.$refs.lyricBox.style.top);
          self.$refs.lyricBox.style.top = -hei * i + "px";
          self.$refs.lyricBox.style.transition = "all .5s linear";
          self.lyricIndex = i;

          // return;
        }
      }
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../public/sass/_color.scss";

.audioPlackground {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: 100% 100%;
  filter: blur(20px);
}

.audioPlayBox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: #000;

  .audioPlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
  }

  .playHead {
    width: 6.4rem;
    overflow: hidden;

    .headOccupy {
      width: 6.4rem;
      height: 30px;
    }

    .headFun {
      display: flex;
      width: 6.4rem;
      height: 0.8rem;
      margin-left: 0.1rem;
      font-size: 0.3rem;
      line-height: 0.8rem;
      color: #fff;
    }

    & .headFun > i {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      margin: 0.1rem 0;
      line-height: 0.6rem;
      text-align: center;
    }

    & .headSpan {
      width: 4rem;
      height: 0.8rem;
    }
    & .headSpan > span {
      display: block;
      width: 4rem;
      height: 0.4rem;
      line-height: 0.4rem;
      font-weight: bold;
    }

    & .headSpan .spanOne {
      font-size: 0.3rem;
    }

    & .headSpan .spanTow {
      font-size: 0.2rem;
      color: rgba(161, 161, 161, 0.5);
    }

    & .voice {
      display: flex;
      margin: 0.1rem 0.1rem;
      width: 6.2rem;
      height: 0.3rem;
      // background: #fff;
    }

    & .vIcon {
      display: block;
      margin: 0 0.2rem;
      width: 0.3rem;
      height: 0.3rem;
      font-size: 0.3rem;
      color: white;
    }

    & .voiceBox {
      position: relative;
      width: 4.8rem;
      height: 0.1rem;
      margin: 0.1rem 0.7rem 0.1rem 0;
      background: rgba(255, 255, 255, 0.425);
    }

    & .voiceProgress {
      position: absolute;
      top: -0.03rem;
      left: 4.72rem;
      width: 0.16rem;
      height: 0.16rem;
      background: rgba(255, 255, 255, 0.26);
      border-radius: 50%;
    }

    & .voiceActive {
      width: 4.8rem;
      height: 0.1rem;
      background: $bc;
    }

    & .voiceLayer {
      position: absolute;
      top: -0.1rem;
      left: 0;
      width: 4.8rem;
      height: 0.3rem;
    }
  }

  .playBody {
    position: relative;

    width: 6.4rem;
    height: calc(100% - 3.7rem - 30px);
    overflow: hidden;
    // background: #cfa45c;

    .lyricBox {
      position: absolute;
      top: 1px;
      left: 0;
      padding-top: 50%;
      width: 5rem;
      height: 50%;
      margin: 0 0.7rem;
    }

    & .lyricLi {
      width: 5rem;
      height: 0.8rem;
      font-size: 0.2rem;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
    }
    & .active {
      color: rgb(255, 255, 255);
    }
  }

  .playFoot {
    width: 6.2rem;
    height: 2.2rem;
    padding: 0.1rem;

    .com-col {
      display: flex;
      width: 6.2rem;
      height: 0.4rem;
    }

    .com-col > i {
      display: block;
      margin: 0 0.5rem;
      width: 0.55rem;
      height: 0.4rem;
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.4rem;
      color: #fff;
    }

    .schedule {
      width: 6.2rem;
      height: 0.2rem;
      margin: 0.3rem 0 0.1rem;
      display: flex;
    }

    .schedule .startTime {
      height: 0.2rem;
      width: 0.7rem;
      margin-right: 0.1rem;
      font-size: 0.1rem;
      color: #fff;
      text-align: center;
      line-height: 0.2rem;
    }

    .schedule .endTime {
      height: 0.2rem;
      width: 0.7rem;
      margin-left: 0.1rem;
      font-size: 0.1rem;
      color: #fff;
      text-align: center;
      line-height: 0.2rem;
    }

    .schedule .barBox {
      position: relative;
      margin: 0.05rem 0;
      width: 4.6rem;
      height: 0.1rem;
      background: rgba(255, 255, 255, 0.5);
    }

    & .musicProgress {
      position: absolute;
      top: -0.05rem;
      left: -0.1rem;
      width: 0.2rem;
      height: 0.2rem;
      background: rgba(255, 255, 255, 0.26);
      border-radius: 50%;
    }

    & .musicActive {
      width: 0;
      height: 0.1rem;
      background: $bc;
    }

    & .musicLayer {
      width: 4.6rem;
      height: 0.3rem;
      position: absolute;
      top: -0.1rem;
      left: 0;
    }

    .contorl {
      display: flex;
      width: 6.2rem;
      height: 0.8rem;
      padding: 0.2rem 0;
    }

    .contorl > i {
      flex: 1;
      margin: 0 0.2rem;
      display: block;
      text-align: center;
      line-height: 0.8rem;
    }

    .contorl > .iocnOne {
      font-size: 0.3em;
      color: rgba(255, 255, 255, 0.8);
    }

    .contorl > .iocnTow {
      font-size: 0.4rem;
      color: #fff;
    }

    .contorl > .iocnThree {
      font-size: 0.8rem;
      color: #fff;
    }
  }
}
</style>