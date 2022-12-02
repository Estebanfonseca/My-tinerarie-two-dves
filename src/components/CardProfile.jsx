import Editprofile from './EditProfile'
import React,{useState} from 'react'

export default function CardProfile({name,photo,age,email,role,id}) {
    let [push,setPush]= useState(false)
  return (
    <div className='flex j-evenly f-column w-100 h-60 p-5'>
    <div className='carduser flex w-75  '>
        <img className='img ' src={photo} alt={name} height="250" />
        <article className='card-body flex f-column g-1 align-center w-50'>
            <h3 className='text-center'><strong>Name:</strong> {name}</h3>
            <p className='text-center'><strong>Role:</strong> {role}</p>
            <p className='text-center'><strong>Age:</strong> {age}</p>
            <p className='text-center'><strong>Email:</strong> {email}</p>
            <button className='btn' onClick={()=>setPush(!push)}>Edit</button>
        </article>
    </div>
    <div>{push?(<Editprofile id={id} />): ''}</div>
    
    </div>
  )
}
