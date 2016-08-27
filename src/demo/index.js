import React from 'react'
import { render } from 'react-dom'

render(
  <div>
    <ul>
      <li><a href='./snapshot.html'>Snapshot</a></li>
      <li><a href='./timeline.html'>Timeline</a></li>
      <li><a href='./store.html'>Store</a></li>
    </ul>
  </div>
  , document.getElementById('arrow-of-time')
)
