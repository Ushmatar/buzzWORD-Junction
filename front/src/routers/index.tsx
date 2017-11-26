import 'rxjs'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import * as RRR from 'react-router-redux'
const { ConnectedRouter } = RRR as any
import { history } from '../store'
import TopNavi from '../components/topNavi'
import Footer from '../components/Footer'

import HomeView from '../views/Home'

export const RootApp = () => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <TopNavi />
        <div className="app-content">
          <Switch>
            <Route exact path="/" component={HomeView} />
          </Switch>
          {/*<RightBar />*/}
        </div>
        <Footer />
      </div>
    </ConnectedRouter>
  )
}
