const React = require('react')
const Panel = require('./panel/panel.js')
const style = require('./sidebar.sass')

module.exports = () => {
  return (
    <div id='sidebar'>
      <div>
        <h1>Title</h1>
      </div>

      <hr />

      <div>
        <Panel title='Tools' open={true}>
          <p>Inside the Panel</p>
        </Panel>
        <Panel title='Grid' open={false}>
          <p>Grid Tools in here</p>
        </Panel>
        <Panel title='Layers'>
          <p>Layer Tools inside here</p>
        </Panel>
      </div>
    </div>
  )
}
