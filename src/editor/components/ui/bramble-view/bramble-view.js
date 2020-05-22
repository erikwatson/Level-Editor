const React = require('react')
const style = require('./bramble-view.sass')

const { game } = require('@erikwatson/bramble')

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

    game.setSize(container.offsetWidth, container.offsetHeight)
    game.setSmoothing(false)

    this.setState({
      width: container.width,
      height: container.height
    })
  }

  componentDidUpdate() {
    const container = document.querySelector('.bramble-view')
    game.setSize(container.offsetWidth, container.offsetHeight)
    game.setSmoothing(false)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)

    const container = document.querySelector('.bramble-view')

    game.attachTo(container)
    game.disableContextMenu()
    game.setUpdate(this.props.update)
    game.setRender(this.props.render)

    game.setSize(container.offsetWidth, container.offsetHeight)
    game.setSmoothing(false)

    game.start()

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
