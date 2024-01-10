import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'

import RecommendationPage from './components/Page'

/* Router */
const ExtensionRouter = () => (
  <Fragment>
    <Route exact path="/minhas-recomendacoes" component={RecommendationPage} />
  </Fragment>
)

export default ExtensionRouter
