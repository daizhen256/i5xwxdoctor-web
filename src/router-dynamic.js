import React from 'react'
import {Router, Route, IndexRoute} from 'dva/router'
import App from './routes/App'
import {isLogin} from './utils'

function redirectToLogin(nextState, replace) {
  if (!isLogin()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
        nextSearch: location.search
      }
    })
  }
}

function redirectToDashboard(nextState, replace) {
  if (isLogin()) {
    replace('/dashboard')
  }
}

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

export default function({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      onEnter: redirectToLogin,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, {component: require('./routes/Dashboard')})
        }, 'dashboard')
      },
      childRoutes: [
        //dashboard
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/Dashboard'))
            }, 'dashboard')
          }
        },
        //diancai
        {
          path: 'diancai',
          name: 'diancai',
          childRoutes: [
            {
              path: 'dishes',
              name: 'dishes',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/diancai/dishes'))
                  cb(null, require('./routes/diancai/dishes'))
                }, 'diancai-dishes')
              }
            }, {
              path: 'mcinfo',
              name: 'mcinfo',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/diancai/mcinfo'))
                  cb(null, require('./routes/diancai/mcinfo'))
                }, 'diancai-mcinfo')
              }
            }
          ]
        },
        //system
        {
          path: 'card',
          name: 'card',
          childRoutes: [
            {
              path: 'modify-password',
              name: 'modify-password',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/card/modifyPassword'))
                  cb(null, require('./routes/card/ModifyPassword'))
                }, 'modify-password')
              }
            }
          ]
        },
        //no-power
        {
          path: 'no-power',
          name: 'no-power',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/NoPower'))
            }, 'no-power')
          }
        }
      ]
    },
    //login
    {
      path: 'login',
      name: 'login',
      onEnter: redirectToDashboard,
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Login'))
        }, 'login')
      }
    },
    //*
    {
      path: '*',
      name: 'error',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Error'))
        }, 'error')
      }
    }
  ]

  return <Router history={history} routes={routes}/>
}
