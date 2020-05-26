const React = require('react')
const style = require('./bramble-view.sass')

const { game } = require('@erikwatson/bramble')

let g = null

class BrambleView extends React.Component {
  constructor(props) {
    super(props)

    this.onResize = this.onResize.bind(this)

    this.state = {
      width: props.width ? props.width : 720,
      height: props.height ? props.height : 405
    }
  }

  onResize(event) {
    const container = document.querySelector('.bramble-view')

    g.setSize(container.offsetWidth, container.offsetHeight)
    g.setSmoothing(false)

    this.setState({
      width: container.width,
      height: container.height
    })
  }

  componentDidUpdate() {
    const container = document.querySelector('.bramble-view')
    g.setSize(container.offsetWidth, container.offsetHeight)
    g.setSmoothing(false)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)

    const container = document.querySelector('.bramble-view')

    if (!g) {
      g = game.create()
    }

    g.attachTo(container)
    g.disableContextMenu()
    g.setUpdate(this.props.update)
    g.setRender(this.props.render)

    g.setSize(container.offsetWidth, container.offsetHeight)
    g.setSmoothing(false)

    g.start()

    this.setState({
      width: container.width,
      height: container.height
    })
  }

  render() {
    return <div className='bramble-view' />
  }
}

module.exports = BrambleView
