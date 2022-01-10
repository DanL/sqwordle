import React from 'react'
import ReactDOM from 'react-dom'
import Sqwordle from './components/Sqwordle'

import { rootNodeId } from './config'

const rootNode = document.createElement('div')
rootNode.id = rootNodeId
document.body.prepend(rootNode)

ReactDOM.render(
  <React.StrictMode>
    <Sqwordle />
  </React.StrictMode>,
  rootNode
)
