import * as PropTypes from 'prop-types'
import * as React from 'react'
import { AvatarStyle, OptionContext, allOptions } from 'avataaars'


export default class ComponentCode extends React.Component {
  static contextTypes = {
    optionContext: PropTypes.instanceOf(OptionContext),
  }

  textArea = null

  get optionContext() {
    return this.context.optionContext
  }

  UNSAFE_componentWillMount() {
    this.optionContext.addValueChangeListener(this.onOptionValueChange)
  }

  componentWillUnmount() {
    this.optionContext.removeValueChangeListener(this.onOptionValueChange)
  }

  render() {
    const { avatarStyle } = this.props
    const { optionContext } = this
    const props = []
    for (const option of allOptions) {
      const state = optionContext.getOptionState(option.key)
      if (!state || !state.available) {
        continue
      }
      const value = optionContext.getValue(option.key)
      props.push(`${option.key}=${value}`)
    }
    const propsStr = props.join('&')
    const code = `<img src='https://avataaars.io/?avatarStyle=${avatarStyle}&${propsStr}'
/>`
    return (
      <div>
        <h3 style={{ color: '#6A39D7' }}>
          &lt;img&gt; Code{' '}
          <a
            href='https://github.com/gkoberger/avataaars'
            style={{ fontSize: '0.8em' }}
            target='_blank'>
            <i className='fa fa-github' /> Repo
          </a>
        </h3>
        <p>You can include this as an SVG &lt;img&gt; from the API.</p>
        <textarea
          readOnly
          style={{ width: '100%', height: '10em' }}
          value={code}
          ref={this.onTextAreaRef}
          onFocus={this.onTextAreaClick}
        />
      </div>
    )
  }

  onTextAreaRef = (ref) => {
    this.textArea = ref
  }

   onTextAreaClick = (event) => {
    this.textArea?.focus()
    this.textArea?.select()
  }

  onOptionValueChange = (key, value) => {
    this.forceUpdate()
  }
}
