import Vue from 'vue'
import Vuex from 'vuex'
// import { parse } from 'querystring';
// import axios from 'axios'
// import { stat } from 'fs';

Vue.use(Vuex)
// Vue.prototype.axios = axios

const state = {
    isLogin: false,
    user: [
        {
            username: 'yxj123',
            password: 'yxj123'
        },
        {
            username:'wyy123',
            password:'wyy123'
        }
    ],

    // 以下是请求歌单地址 存储歌单数组数据
    url1: '/api/music/netease/hotSongList?key=579621905&cat=全部&limit=200&offset=0',
    url2: '/api/music/netease/highQualitySongList?key=579621905&cat=全部&limit=200',
    hot: [], //热门歌单
    salendid: [], //精品歌单
    clickGedan: [], //歌单点击
    clickDanQu: [], //单曲点击

    // 以下是播放所需要数据
    audioPlayShow: false, //播放层显示
    collectBoxShow: false, //歌曲列表显示

    audioSrc: null, //正在播放src
    lyric: [], //正在播放的歌词
    audioSrcArr: [], //临时播放列表
    audioSrcIndex: 0, //临时列表的播放数据下标
    randomArr: [], //随机播放歌单下标缓存;
    randomIndex: 0, //随机播放缓存下标
    collectArr: [], //收藏列表;
    isPlay: false, //是否有歌曲播放
    isPaused: true, //是否暂停
    playSorting: 1, // 播放顺序 1.列表循环 2.随机播放 3.单曲循环
}

const getters = {
    lyricArr() {
        let lines = state.lyric
        let a = [];
        let b = []
        lines.forEach(v => {
            a.push(v.split('[').splice(1, 1))
        })
        a.pop()
        a.forEach(vl => {
            b.push(vl[0].split(']'))
        })
        for (let i = 0; i < b.length; i++) {
            let ti = b[i][0].split(':')
            ti[0] = parseInt(ti[0])
            ti[1] = parseFloat(ti[1])
            b[i][0] = ti[0] * 60 + ti[1]
        }
        return b
    }

}

const mutations = {
    salendidArr(state, arr) {
        state.salendid = arr
    },
    hotArr(state, arr) {
        state.hot = arr
    },
    clickGedanArr(state, arr) {
        state.clickGedan = arr
    },
    songsClick(state, arr) {
        state.audioSrc = arr;
        let v = state.audioSrcArr.filter((item) => {
            return item.id == arr.id
        })
        if (v.length <= 0) {
            state.audioSrcArr.push(arr)
        }
        state.audioSrcIndex = state.audioSrcArr.length - 1
        state.isPlay = true;
        state.isPaused = false;
    },
    removeMusic(state, index) {
        state.audioSrcArr.splice(index, 1);
    },
    removeAll() {
        state.audioSrcArr = [];
    },
    audioPlayShow() {
        state.audioPlayShow = !state.audioPlayShow
    },

    collectBoxShow() {
        state.collectBoxShow = !state.collectBoxShow
    },

    isPausedClick() {
        state.isPaused = !state.isPaused;
    },

    audioSrcArrPush(state, arr) {
        state.audioSrcArr = [];
        arr.forEach(v => {
            state.audioSrcArr.push(v);
        });
        state.audioSrc = state.audioSrcArr[state.audioSrcIndex];
        state.isPlay = true;
        state.isPaused = false;
    },

    audioSrcArrPlay(state, obj) {
        state.audioSrc = obj.item;
        state.audioSrcIndex = obj.index
    },

    lostMusic() {
        if (state.audioSrcArr.length) {
            state.audioSrcIndex--;
            if (state.audioSrcIndex < 0) {
                state.audioSrcIndex = state.audioSrcArr.length - 1
            }
            state.audioSrc = state.audioSrcArr[state.audioSrcIndex]
        }
    },

    nextMusic() {
        if (state.playSorting == 1 || state.playSorting == 3) {
            if (state.audioSrcArr.length) {
                state.audioSrcIndex++;
                if (state.audioSrcIndex > state.audioSrcArr.length - 1) {
                    state.audioSrcIndex = 0
                }
                state.audioSrc = state.audioSrcArr[state.audioSrcIndex]
            }
        } else if (state.playSorting == 2) {
            let i = Math.round(Math.random() * state.audioSrcArr.length - 1);
            state.audioSrc = state.audioSrcArr[i];
        }

    },

    playSort() {
        state.playSorting++
        if (state.playSorting < 1) {
            state.playSorting = 3
        } else if (state.playSorting > 3) {
            state.playSorting = 1
        }
    },
    audioEnd() {
        if (state.playSorting == 1) {
            state.audioSrcIndex++;
            if (state.audioSrcIndex > state.audioSrcArr.length - 1) {
                state.audioSrcIndex = 0
            }
        } else if (state.playSorting == 2) {
            for (let i = 0; i < 1; i) {
                if (state.audioSrcArr[state.audioSrcIndex].id == state.audioSrc.id) {
                    state.audioSrcIndex = Math.round(Math.random() * (state.audioSrcArr.length - 1));
                } else {
                    state.audioSrc = state.audioSrcArr[state.audioSrcIndex]
                    return
                }
            }
        }
        state.audioSrc = state.audioSrcArr[state.audioSrcIndex]
    }
}

const actions = {
    musicLrc() {
        Vue.prototype.axios.get(state.audioSrc.lrc).then(
            response => {
                state.lyric = response.data.split('\n')
            }, err => {
                alert(err);
            }
        )
        // console.log(Vue.prototype.axios)
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})

export default store;