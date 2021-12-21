import * as React from 'react'
import { ReactNode } from 'react'
import { connect } from 'react-redux'
import PanelList from '../ui/panel-list/panel-list'

import './sidebar.sass'

type Props = {
  title?: string
  cameraX?: number
  cameraY?: number
  children?: ReactNode
  showHeader?: boolean
  showNav?: boolean
  setTitle: (title: string) => void
}

const SideBar = (props: Props) => {
  const { title = 'Sidebar', cameraX = 0, cameraY = 0, children } = props

  const header = (
    <div className='header'>
      <h1>{title}</h1>
      <div className='link'>
        <span>
          <a href='https://github.com/erikwatson/Level-Editor/issues'>
            Report a Bug or request a Feature
          </a>
        </span>
      </div>
    </div>
  )

  const nav = (
    <div className='nav'>
      <ul>
        <li
          onClick={() => {
            props.setTitle('map')
          }}>
          <a>Map</a>
        </li>
        <li
          onClick={() => {
            props.setTitle('terrain')
          }}>
          <a>Terrain</a>
        </li>
        <li
          onClick={() => {
            props.setTitle('particle')
          }}>
          <a>Particle</a>
        </li>
      </ul>
    </div>
  )

  const headerElement = props.showHeader === true ? header : null
  const navElement = props.showNav === true ? nav : null

  return (
    <div id='sidebar'>
      {headerElement}
      {navElement}

      <PanelList>{children}</PanelList>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    setTitle: (title = 'tile') => {
      dispatch({ type: 'APP_SET_VIEW', value: title })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
