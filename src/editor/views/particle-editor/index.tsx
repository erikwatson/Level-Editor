import * as React from 'react'
import { connect } from 'react-redux'

import Layout from '../layouts/sidebar-left/sidebar-left'
import Sidebar from './sidebar'

import { game as Game } from '@erikwatson/bramble'

import './style.sass'

let g

const Welcome = ({ width = 6250, height = 1600 }) => {
  React.useEffect(() => {
    if (g) {
      return
    }

    g = Game.create()

    const container = document.getElementsByClassName('bramble-view')[0]
    g.attachTo(container)

    g.disableContextMenu()
    g.setSize(width, height)
    g.setSmoothing(false)

    g.setUpdate(dt => {
      //
    })

    g.setRender(gfx => {
      gfx.clear()
      gfx.circle({ x: 0, y: 0 }, 100)
    })

    g.start()
  }, [])

  return (
    <Layout className='test'>
      <Sidebar />
      <div className='bramble-pane'>
        <div className='bramble-view'></div>
      </div>
    </Layout>
  )
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Welcome)
