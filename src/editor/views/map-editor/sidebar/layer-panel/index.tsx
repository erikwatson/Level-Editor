import * as React from 'react'
import { connect } from 'react-redux'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import ButtonGroup from '../../../../components/ui/button-group/button-group'
import Button from '../../../../components/ui/button/button'
import Panel from '../../../../components/ui/panel/panel'
import Layer from './layer'
import './style.sass'

const LayerPanel = props => {
  return (
    <Panel title='Layers'>
      <div className='layerControls'>
        <ButtonGroup>
          <Button
            icon={faPlus}
            selected={false}
            onClick={e => {}}
            tip={'Add a Layer'}
          />
          <Button
            icon={faMinus}
            selected={false}
            onClick={e => {}}
            tip={'Remove a Layer'}
          />
        </ButtonGroup>
      </div>
      {props.layers.map((x, i) => {
        const selected = x.position === props.currentLayer ? 'selected' : ''
        const last = i === props.layers.length - 1 ? 'last' : ''

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
    layers: state.map.layers.present,
    currentLayer: state.map.currentLayer.present
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
