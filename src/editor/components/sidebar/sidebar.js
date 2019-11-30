const React = require('react')
const PanelList = require('./panel-list/panel-list.js')
const Panel = require('./panel/panel.js')
const style = require('./sidebar.sass')

module.exports = () => {
  return (
    <div id='sidebar'>
      <div>
        <h1>Title</h1>
      </div>
      <PanelList open={true}>
        <Panel title='Tools' open={false}>
          <p>Inside the Panel</p>
        </Panel>
        <Panel title='Grid' open={true}>
          <p>Grid Tools in here</p>
        </Panel>
        <Panel title='Layers' open={false}>
          <p>Layer Tools inside here</p>
        </Panel>
      </PanelList>
    </div>
  )
}
