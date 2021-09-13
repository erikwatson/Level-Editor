import * as React from 'react'
import { connect } from 'react-redux'

import Panel from '../../../../components/ui/panel/panel'
import Layer from './layer'

const LayerPanel = props => {
  let className = ''

  return (
    <Panel title='Layers'>
      {props.layers.map((x, i) => {
        const selected = x.position === props.currentLayer ? 'selected' : ''
        const last = i === props.layers.length - 1 ? 'last' : ''

        console.log(selected, last)

        return (
          <Layer
            {...x}
            onClick={e => {
              props.setLayer(x.position)
            }}
            className={`${selected} ${last}`}
          />
        )
      })}
    </Panel>
  )
}

const mapStateToProps = state => {
  return {
    layers: state.map.layers,
    currentLayer: state.map.currentLayer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLayer: layer => {
      dispatch({ type: 'SET_LAYER', value: layer })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerPanel)
