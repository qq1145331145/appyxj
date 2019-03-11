import Vue from 'vue'
import Router from 'vue-router'
import Music from './views/Music/Music.vue'
import Recommend from './views/Music/Recommend.vue'
import songs from './views/Music/songs.vue'
import songList from './views/Music/songList.vue'
// import Mine from './views/Mine.vue'
// import Video from './views/Video.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      redirect:'/music/recommend'
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
      redirect:'/music/recommend',
      children: [{

        path: 'recommend',
        name: 'recommend',
        component: Recommend,
        props:true,
        children:[{

          path:':name',
          name:'songs',
          component:songs,
          props:true,
          children:[{

            path:':name',
            name:' songList',
            component:songList,
            props:true      
          }]
        }]
      },
      {
        path:'radio',
        name:'radio', 
      }
    
    ],
      linkActiveClass: 'active'
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('./views/Mine/Mine.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('./views/Video/Video.vue')
    },
  ],
  // redirect: 'music/recommend',
  linkActiveClass: 'active'
})