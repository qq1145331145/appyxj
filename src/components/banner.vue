<!--  -->
<template>
  <div class="banTem">
    <div class="red"></div>
    <!-- 轮播图最多只能为10张,最少为两张 -->
    <div class="bannerBox" ref="bannerBox" @touchstart.capture="touchstart">
      <div class="ban" ref="ban">
        <div
          class="banFor"
          v-for="(item,index) in bannerArray"
          :key="'ban'+index"
          ref="banDiv"
          @click="banForClick(item,index)"
        >
          <img :src="bannerArray[index].src">
        </div>
      </div>
      <div class="activeBox">
        <ul>
          <li :class="index==i ?'active' :''" v-for="(item,i) in picArr" :key="'active'+ i"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      houch: false,
      index: 0,
      createdTime: null
    };
  },
  props: ["picArr"],
  computed: {
    bannerArray() {
      let a = this.picArr;
      return [a[a.length - 1], ...a, a[0]];
    }
  },
  created() {
    this.createdTime = setInterval(() => {
      let ref = this.$refs;
      if (this.index >= this.picArr.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
      ref.ban.style.left = this.index * -100 + -100 + "%";
      ref.ban.style.transition = "all 0.5s linear";
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.createdTime);
  },
  methods: {
    touchstart(el) {
      if (this.houch) {
        return;
      } else if (this.houch == false) {
        // 防止滑太快出bug,同时取消定时间器
        this.houch = true;
        // clearInterval(this.createdTime);

        let self = this;
        let ref = self.$refs;
        //获取ban元素计算样式
        let banLeft = ref.ban.offsetLeft;
        let banDivWidth = ref.banDiv[0].offsetWidth;
        // 初始手指按下距离
        let touchsX = parseInt(el.touches[0].pageX);
        //按下移动事件
        let moveFun = function(e) {
          //获取手指滑动的距离
          let banX = e.touches[0].pageX;
          ref.ban.style.left = banLeft + (banX - touchsX) + "px";
        };

        //手指按住离开事件
        let endFun = function(e) {
          // 按下鼠标位置
          // console.log(touchsX);
          // 手指离开位置
          let changedX = e.changedTouches[0].pageX;
          // console.log(changedX);
          let yidon = touchsX - changedX;
          if (yidon > 0) {
            if (yidon >= banDivWidth / 2) {
              self.index++;
              banIndex();
              if (self.index > self.picArr.length - 1) {
                self.index = 0;
              }
            } else {
              banIndex();
            }
          } else if (yidon < 0) {
            let yidonAbs = Math.abs(yidon);
            if (yidonAbs >= banDivWidth / 2) {
              self.index--;
              banIndex();
              if (self.index < 0) {
                self.index = self.picArr.length - 1;
              }
            } else {
              banIndex();
            }
          }
          ref.bannerBox.removeEventListener("touchmove", moveFun);
          ref.bannerBox.removeEventListener("touchend", endFun);
        };

        //在函数中删除,否则内存泄漏,函数要在外定义,因为this指向不同
        ref.bannerBox.addEventListener("touchmove", moveFun);
        ref.bannerBox.addEventListener("touchend", endFun);

        //动画函数
        let banIndex = function() {
          ref.ban.style.left = self.index * -100 + -100 + "%";
          ref.ban.style.transition = "all 0.5s linear";
        };

        ref.bannerBox.addEventListener("transitionend", function() {
          ref.ban.style.transition = "";
          ref.ban.style.left = self.index * -100 + -100 + "%";

          // 启动滑动效果,启动定时器
          self.houch = false;
        });
        // let te = function() {
        //   ref.ban.style.transition = "";
        //   ref.ban.style.left = self.index * -100 + -100 + "%";

        //   // 启动滑动效果,启动定时器
        //   self.houch = false;

        //   ref.bannerBox.removeEventListener("transitionend", te);
        // };
      }
    },
    banForClick(item, index) {
      if (item.type == "song") {
        this.axios.get(item.url).then(
          response => {
            this.$store.commit("songsClick", response.data.data);
            console.log(response.data.data);
          },
          err => {
            alert(err);
          }
        );
      }else if(item.type == "album"){
                this.axios.get(item.url).then(
          response => {
            console.log(response);
          },
          err => {
            alert(err);
          })
      }

      console.log(item, index);
    },

    setTime() {
      setInterval(() => {
        let self = this;
        let ref = self.$refs;
        self.index++;
        ref.ban.style.left = self.index * -100 + -100 + "%";
        ref.ban.style.transition = "all 0.5s linear";
      }, 500);
    }
  }
};
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../public/sass/_color.scss";

.banTem {
  width: 100%;
  height: 90%;
  padding-top: 5%;
  position: relative;

  .red {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50%;
    background: $bc;
  }
}

.bannerBox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .activeBox {
    position: absolute;
    bottom: 10%;
    left: 25%;
    width: 50%;
    height: 5%;

    ul {
      display: flex;
      height: 100%;
      width: 100%;
    }

    li {
      flex: 1;
      height: 100%;
      margin: 0 1%;
      background: rgba(0, 0, 0, 0.5);
    }

    .active {
      background: $bc;
    }
  }

  .ban {
    position: absolute;
    left: -100%;
    height: 100%;
    width: 1000%;

    .banFor {
      height: 100%;
      width: 9.6%;
      padding: 0 0.2%;

      float: left;
    }
    .banFor > img {
      border-radius: 0.2rem;
    }
  }
}
</style>