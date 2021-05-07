import * as React from 'react'
import { connect } from 'react-redux'
import style from './welcome.css'

class Welcome extends React.Component {
  render() {
    return (
      <div className='welcome-view'>
        <h1>Welcome Screen</h1>
        <div>
          <span>New Project</span>
          <span>Open Project</span>
        </div>
        <div>
          <h2>Recent Projects</h2>
          <span>rope swinging frog game.proj</span>
          <span>balloon mouse vs ghosts.proj</span>
          <span>froot shoot.proj</span>
          <span>land stander.proj</span>
          <span>the etceteraing of something and then.proj</span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Welcome)
