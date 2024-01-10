import React from 'react'
import { Provider } from 'react-redux'

import DocumentationModal from './components/DocumentationModal'
import store from './state/store'

const index = () => {
  return (
    <Provider store={store}>
      <DocumentationModal />
    </Provider>
  )
}

export default index
