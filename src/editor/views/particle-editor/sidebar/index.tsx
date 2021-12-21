import * as React from 'react'
import { connect } from 'react-redux'

import Sidebar from '../../../components/sidebar/sidebar'
import Panel from '../../../components/ui/panel/panel'

import './style.sass'

const ParticleEditorSidebar = props => {
  return (
    <Sidebar title='Particle Editor' showHeader={true} showNav={true}>
      <Panel title='Test'>
        <div className='section'>
          <label>Width:</label>
        </div>
      </Panel>
    </Sidebar>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(ParticleEditorSidebar)
