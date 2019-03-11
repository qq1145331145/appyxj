<!--  -->
<template>
  <div class="recommendBox">
    <div class="bannerComponent">
      <banner :picArr="picArr"></banner>
      <div class="shortcutBox">
        <ul>
          <li class="sLi" v-for="(item, index) in shortcutArr" :key="'s'+index">
            <img class="sImg" :src="item.img">
            <span class="sName">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <songBox :name="'推荐歌单'" :forArr="a1" :nameUrl="salendid" :id="'tj123'"></songBox>
      <songBox :name="'精品歌单'" :forArr="a2" :nameUrl="hot" :id="'jp123'"></songBox>
      <div class="occupyBlock"></div>
    </div>
  </div>
</template>

<script>
import banner from "../../components/banner";
import songBox from "../../components/songBox";
import { mapState } from "vuex";

// const url1 =
//   "https://api.bzqll.com/music/netease/highQualitySongList?key=579621905&cat=全部&limit=100";
// const url2 =
//   "https://api.bzqll.com/music/netease/hotSongList?key=579621905&cat=全部&limit=100&offset=0";

export default {
  data() {
    return {
      picArr: [
        {
          src:
            "http://p1.music.126.net/dhztXFtnJ8b7ogQxaL4i2Q==/109951163912856248.jpg",
          url:
            "https://api.bzqll.com/music/netease/song?key=579621905&id=1311347592",
          type: "song"
        },
        {
          src:
            "http://p1.music.126.net/13ul8XJQSEAKztA1HhaIlg==/109951163909964152.jpg",
          url:
            "https://api.bzqll.com/music/netease/song?key=579621905&id=1350493419",
          type: "song"
        },
        {
          src:
            "http://p1.music.126.net/zqTZPIj_XzlHTak9Sk_yQg==/109951163902199576.jpg",
          url:
            "https://api.bzqll.com/music/netease/song?key=579621905&id=1348568908",
          type: "song"
        }
      ],
      shortcutArr: [
        {
          name: "每日推荐",
          img: require("../../../public/images/t1.png")
        },
        {
          name: "歌单",
          img: require("../../../public/images/t2.png")
        },
        {
          name: "排行",
          img: require("../../../public/images/t3.png")
        }
      ],
      a1: [],
      a2: []
    };
  },
  components: {
    banner,
    songBox
  },
  computed: {
    ...mapState({
      splendidUrl: "url1",
      hotUrl: "url2",
      salendid: "salendid",
      hot: "hot",
      audioSrc:"audioSrc"
    })
  },
  created() {
    this.axios.get(this.splendidUrl).then(
      response => {
        this.$store.commit("salendidArr", response.data.data);
        /* eslint-disable */
        // console.log("salendid", this.salendid);
        // console.log(response.data)

        for (let i = 0; i < 6; i++) {
          this.a1.push(this.salendid[i]);
        }
        // console.log("a1", this.a1);
      },
      err => {
        alert(err);
      }
    );
    this.axios.get(this.hotUrl).then(
      response => {
        /* eslint-disable */
        this.$store.commit("hotArr", response.data.data.playlists);
        // console.log("hot", this.hot);

        for (let i = 0; i < 6; i++) {
          this.a2.push(this.hot[i]);
        }
        // console.log("a2", this.a2);
      },
      err => {
        alert(err);
      }
    );
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../public/sass/_color.scss";

.bannerComponent {
  height: 2.5rem;
  width: 6.4rem;

  .shortcutBox {
    // display: flex;
    width: 6.4rem;
    height: 1.2rem;
    padding: 0.3rem 0;
    border-bottom: 1px solid rgb(238, 238, 238);

    ul {
      display: flex;
    }

    & li {
      height: 1.2rem;
      width: 1.2rem;
      flex: 1;
      margin: 0 0.45rem;
      text-align: center;
    }
    & .sImg {
      display: block;
      height: 0.8rem;
      width: 0.8rem;
      margin: 0 auto;
      // line-height: 0.8rem;
      background: $bc;
      border-radius: 50%;
    }

    & .sName {
      width: 1.2rem;
      margin: 0.2rem auto 0;
      display: block;
      font-size: 0.2rem;
    }
  }
}

.occupyBlock {
  display: block;
  width: 6.4rem;
  height: 0.8rem;
}
</style>