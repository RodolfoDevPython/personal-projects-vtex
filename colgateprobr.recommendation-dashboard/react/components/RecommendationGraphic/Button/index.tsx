import React from 'react'

import style from './style.css'

interface Props {
  selected?: boolean
  label: string
  onClick: () => void
}

const Button = (props: Props) => {
  return (
    <button
      className={
        props.selected ? style.buttonSelected : style.buttonNotSelected
      }
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
}

export default Button
