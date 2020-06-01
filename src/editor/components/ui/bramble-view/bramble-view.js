const React = require('react')
const style = require('./bramble-view.sass')

const { game } = require('@erikwatson/bramble')

let g = null

class BrambleView extends React.Component {
  constructor(props) {
    super(props)

    this.onResize = this.onResize.bind(this)

    this.state = {
      width: props.width ? props.width : null,
      height: props.height ? props.height : null
    }
  }

  onResize(event) {
    const container = document.querySelector('.bramble-view')

    g.setSize(container.offsetWidth, this.state.height)
    g.setSmoothing(false)

    this.setState({
      width: container.offsetWidth,
      height: this.state.height
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const container = document.querySelector('.bramble-view')

    const width =
      this.state.width !== null ? this.state.width : container.offsetWidth
    const height =
      this.state.height !== null ? this.state.height : container.offsetHeight

    g.setSize(width, height)
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

    const width =
      this.state.width !== null ? this.state.width : container.offsetWidth
    const height =
      this.state.height !== null ? this.state.height : container.offsetHeight

    g.setSize(width, height)
    g.setSmoothing(false)

    g.start()

    this.setState({
      width: width,
      height: height
    })
  }

  render() {
    const styles = {
      overflowX: this.props.scrollX === true ? 'scroll' : 'hidden',
      overflowY: this.props.scrollY === true ? 'scroll' : 'hidden'
    }

    return <div className='bramble-view' style={styles} />
  }
}

module.exports = BrambleView
