import Vue from 'vue'
import Vuex from 'vuex'
// import { stat } from 'fs';

Vue.use(Vuex)

const state = {
    // 以下是请求歌单地址 存储歌单数组数据
    url1 : 'https://api.bzqll.com/music/netease/hotSongList?key=579621905&cat=全部&limit=100&offset=0',
    url2 : 'https://api.bzqll.com/music/netease/highQualitySongList?key=579621905&cat=全部&limit=100', 
    hot:[],
    salendid:[],
    clickGedan:[],
    clickDanQu:[],

    // 以下是播放所需要数据
    audioSrc:null,    //正在播放src
    audioSrcArr:[],  //播放列表
    audioPlayShow:false,   //播放层显示
    isPlay:false,    //是否有歌曲播放
    isPaused:true //是否暂停
}

const mutations = {
    salendidArr(state,arr){
        state.salendid = arr
    },
    hotArr(state,arr){
        state.hot = arr
    },
    clickGedanArr(state,arr){
        state.clickGedan = arr
    },
    songsClick(state,arr){
        state.audioSrc = arr;
        state.isPlay = true;
        state.isPaused = false;
    },
    isPausedClick(){
        state.isPaused = !state.isPaused;
    }

}

const actions = {

}

const store = new Vuex.Store({
    state,
    mutations,
    actions
  })

  export default store;