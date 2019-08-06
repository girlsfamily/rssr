// import * as React from 'react'
// import { Redirect } from 'react-router-dom'
import loadable from '@loadable/component'
import Root from '../components/Common'

const routes = [
  {
    path: '/login',
    component: loadable(() => import('../components/Account'))
  },
  {
    path: '/register',
    component: loadable(() => import('../components/Account'))
  },
  {
    path: '/404',
    component: loadable(() => import('../components/NotFound'))
  },
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: loadable(() => import('../components/Home'))
      },
      {
        path: '/anime',
        component: loadable(() => import('../components/Anime'))
      },
      {
        path: '/interest',
        component: loadable(() => import('../components/Interest'))
      },
      {
        path: '/play_video',
        component: loadable(() => import('../components/Video'))
      },
      {
        path: '/chatroom',
        component: loadable(() => import('../components/Chatroom'))
      },
      {
        path: '/love',
        component: loadable(() => import('../components/Love'))
      }
    ]
  }
]

export default routes