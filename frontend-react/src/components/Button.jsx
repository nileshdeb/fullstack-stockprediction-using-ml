import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props) => {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${props.class}`}
      to={props.url}
    >
      {props.text}
    </Link>
  )
}

export default Button
