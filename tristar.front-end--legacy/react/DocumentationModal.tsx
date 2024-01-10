import React from 'react'
import { Provider } from 'react-redux'

import DocumentationModal from './components/DocumentationModal/index'
import store from './state/store'

import "./global-styles.css"

const Index = () => {
  return (
    <Provider store={store}>
      <DocumentationModal />
    </Provider>
  )
}

export default Index