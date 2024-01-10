import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import PageMain from './Main';
import { Provider } from 'react-redux';
import store from './store';

const Router = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Route path="/exchange-product" exact component={PageMain} />
      </Provider>
    </Fragment>
  )
}

export default Router
