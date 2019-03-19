<!-- 歌单内歌曲列表路由 -->
<template>
  <div class="songListBox">
    <div class="boxHead" @click="songGo">
      <div class="boxHeadOne"></div>
      <div class="boxHeadTow">
        <i class="fa fa-chevron-left"></i>
        <span>歌单</span>
      </div>
    </div>
    <div class="bodyBox">
      <div class="bodyTitle">
        <div class="imgUrlBox">
          <img v-show="songInformation.songListPic" :src="songInformation.songListPic">
        </div>
        <div class="bodyTitleText">
          <span class="titleName">{{songInformation.songListName}}</span>
        </div>
      </div>
      <div class="playAllBox">
        <div class="playAllTop">
          <div>
            <i class="fa fa-comment-o"></i>
          </div>
          <div>
            <i class="fa fa-share-alt"></i>
          </div>
          <div>
            <i class="fa fa-download"></i>
          </div>
          <div>
            <i class="fa fa-check-square-o"></i>
          </div>
        </div>
        <div class="playAllBottom">
          <div class="playClick" @click="pushCollect">
            <i class="playIcon fa fa-play-circle-o"></i>
            <span>播放全部</span>
            <span class="playNum">{{'(共'+songInformation.songListCount+'首)'}}</span>
          </div>
          <div class="collect">+ 收藏</div>
        </div>
      </div>
      <div class="musicListBox">
        <div
          class="songsDiv"
          v-for="(item,index) in songInformation.songs"
          :key="'songs' + index"
          @click="songsClick(item,index)"
        >
          <div class="serialNum">{{index + 1}}</div>
          <div class="musicLi">
            <div class="musicContent">
              <span :class="!audioSrc ?'' :item.id==audioSrc.id ?'playActive' :''"  class="musicName">{{isCreated ?item.name :'name'}}</span>
              <span class="framer">{{isCreated ?item.singer :'singer'}}</span>
            </div>
            <div class="musicSet">
              <i class="fa fa-youtube-play"></i>
              <i class="fa fa-ellipsis-v"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="zhanwei"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      songInformation: {
        songListCount: 100,
        songListDescription:
          "甜甜的爱情都是别人的↵而我只有柠檬相伴左右↵↵今天也是为别人爱情流泪的一天↵是要酸死我们这群小可爱吗↵↵宝贝们不要难过↵甜甜的恋爱会轮到你的↵到时候你要好好享受哦",
        songListId: "2663228502",
        songListName: "这首歌真甜 有和我一起酸的吗",
        songListPic:
          "https://p2.music.126.net/35D0Fpa2PYtfBlf1FKRUfA==/109951163865669289.jpg?param=400y400",
        songListPlayCount: 364987,
        songListUserId: 320509339
      },
      isCreated: false
    };
  },
  computed: {
    ...mapState({
      audioSrc: "audioSrc",
      audioSrcArr: "audioSrcArr"
    })
  },
  created() {
    this.axios
      .get(
        "https://api.bzqll.com/music/netease/songList?key=579621905&id=" +
          this.$route.query.id +
          "&limit=1000&offset=0"
      )
      .then(
        response => {
          this.songInformation = response.data.data;
          // console.log(this.songInformation);
          this.isCreated = !this.isCreated;
        },
        err => {
          alert(err);
        }
      );
  },
  methods: {
    songGo() {
      this.$router.go(-1);
    },
    songsClick(item) {
      this.$store.commit("songsClick", item);
    },
    pushCollect() {
      this.$store.commit("audioSrcArrPush", this.songInformation.songs);
      console.log(this.audioSrcArr)
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../../public/sass/_color.scss";
.songListBox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: white;

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
    height: calc(100% - 30px - 0.8rem);
    background: white;
    overflow-y: auto;

    .bodyTitle {
      width: 6.4rem;
      height: 1.9rem;
      background-color: $bc;
      display: flex;

      .bodyTitleText {
        margin: 0.2rem 0;
        height: 1.5rem;
        width: 3.9rem;

        .titleName {
          width: 100%;
          height: 0.6rem;
          display: block;
          font-size: 0.3rem;
          font-weight: bolder;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: white;
        }
      }
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
    .playAllBox {
      width: 6.4rem;
      height: 1.4rem;
      background: $bc;

      .playAllTop {
        display: flex;
        width: 6.4rem;
        height: 0.8rem;

        div {
          flex: 1;
          width: 2.1rem;
          height: 0.8rem;
          font-size: 0.3rem;
          text-align: center;
          line-height: 0.8rem;
          color: #fff;
        }
      }

      .playAllBottom {
        display: flex;
        width: 6.4rem;
        height: 0.7rem;
        background: #fff;
        border-top-left-radius: 0.2rem;
        border-top-right-radius: 0.2rem;
        border-bottom: 1px solid rgba(204, 204, 204, 0.479);
        overflow: hidden;

        .playClick {
          display: flex;
          padding: 0 0.2rem;
          width: 4.6rem;
          height: 0.7rem;
          font-size: 0.2rem;
          line-height: 0.7rem;
          color: #444444;
        }

        & .playIcon {
          width: 0.7rem;
          height: 0.7rem;
          text-align: center;
          display: block;
          line-height: 0.7rem;
          font-size: 0.4rem;
          color: #444444;
        }

        & .playNum {
          font-size: 0.1rem;
          color: rgb(143, 143, 143);
        }

        .collect {
          width: 2.2rem;
          height: 0.7rem;
          color: $bc;
          font-size: 0.3rem;
          line-height: 0.7rem;
          text-align: center;
        }
      }
    }

    .musicListBox {
      margin-top: 0.1rem;
      width: 6.4rem;
      overflow: hidden;

      .songsDiv {
        display: flex;
        width: 6.4rem;
        height: 1rem;
      }

      & .serialNum {
        padding: 0.1rem;
        width: 0.8rem;
        height: 0.8rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        text-align: center;
        color: $sfc;
      }

      & .musicLi {
        display: flex;
        padding: 0.1rem 0;
        width: 5.4rem;
        height: 0.8rem;
        border-bottom: 1px solid rgba(204, 204, 204, 0.479);
      }

      & .musicContent {
        width: 4rem;
        height: 0.8rem;
      }

      & .musicSet {
        display: flex;
        width: 1.2rem;
        height: 0.8rem;
        font-size: 0.3rem;
        text-align: center;
      }

      & .musicSet > i {
        display: block;
        width: 0.6rem;
        height: 0.8rem;
        line-height: 0.8rem;
        color: rgb(75, 75, 75);
      }

      & .musicContent > span {
        display: block;
        width: 4rem;
        height: 0.4rem;
        line-height: 0.4rem;
      }

      & .musicName {
        font-weight: bold;
        font-size: 0.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      & .playActive{
        color: $bc;
      }

      & .framer {
        font-size: 0.2rem;
        color: rgb(90, 90, 90);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        animation: anis 10s linear infinite;
      }
    }
    .zhanwei {
      width: 6.4rem;
      height: 0.8rem;
    }
  }
}
</style>