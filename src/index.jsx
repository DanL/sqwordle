import React from 'react'
import { createRoot } from 'react-dom/client'
import Sqwordle from './components/Sqwordle'

const rootNode = document.createElement('div')
document.body.prepend(rootNode)

const root = createRoot(rootNode)
root.render(
  <React.StrictMode>
    <Sqwordle />
  </React.StrictMode>,
)
