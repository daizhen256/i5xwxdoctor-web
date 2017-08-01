import React from 'react'
import { Router, Route, IndexRoute } from 'dva/router'
import { isLogin } from './utils'

export default function ({history, app}) {

  function redirectToLogin(nextState, replace) {
    if (!isLogin()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname, nextSearch: location.search }
      })
    }
  }

  function redirectToDashboard(nextState, replace) {
    if (isLogin()) {
      replace('/dashboard')
    }
  }

  return  (
    <Router history={history}>
      <Route path="/" component={require("./routes/App")} onEnter={redirectToLogin}>
        <IndexRoute component={require("./routes/Dashboard")}/>
        <Route path="dashboard" component={require("./routes/Dashboard")}/>
        <Route path="diancai">
          <Route path="mcinfo" component={require("./routes/account/mcinfo")}/>
          <Route path="dishes" component={require("./routes/account/dishes")}/>
        </Route>
        <Route path="card">
          <Route path="modify-password" component={require("./routes/system/ModifyPassword")}></Route>
        </Route>
        <Route path="no-power" component={require("./routes/NoPower")}/>
      </Route>
      <Route path="login" component={require("./routes/Login")} onEnter={redirectToDashboard}/>
      <Route path="*" component={require("./routes/Error")}/>
    </Router>
  )
}
