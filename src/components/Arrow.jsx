import React from 'react'

export default function Rows(props) {
    let {dir} = props
    let {onClick} = props
  return (
    <div className='row flex align-center j-center' onClick={onClick} >{dir}</div>
  )
}
