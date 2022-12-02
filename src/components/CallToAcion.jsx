import React from 'react'
import { Link } from 'react-router-dom'

export const CallToAcion = ({path, legend}) => {
  return (
    <Link to={path} className="action-button">{legend}</Link>
  )
}
