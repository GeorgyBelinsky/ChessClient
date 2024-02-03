import { useState } from 'react'
import './index.css'

const SwitchButton = ({ toggled, onClick }) => {
  const [isToggled, toggle] = useState(toggled)

  const callback = () => {
    toggle(!isToggled)
    onClick(!isToggled)
  }

  return (
    <label>
      <a>{isToggled ? "You have the first move" : "You have the second move"}</a>
      <input className="button_input" type="checkbox" defaultChecked={isToggled} onClick={callback} />
      <span />
    </label>
  )
}

export default SwitchButton;