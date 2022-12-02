import React,{useState} from 'react'
import Edit from './Edit'
import EditShow from './EditShow'


export default function Carduser  ({name, photo, description,id, erase ,price ,capacity,date ,show,hotel}) {
    
let [push,setPush]= useState(false)

    return (
        <div>
        <div className='card2'>
            <img className='img ' src={photo} alt={name} height="250" />
            <article className='card-body flex f-column g-1 align-center'>
                <h4 className='text-center'>{name}</h4>
                {
                    capacity?
                    <p><strong>capacity:</strong> {capacity}</p> :''
                }
                {
                    description?
                    <p className='text-center'> <strong>Description:</strong> {description}</p>:''
                }
                {
                    date?
                    <p><strong>Date:</strong> {date}</p>:''
                }
                {
                    price?
                    <p><strong></strong>price:$ {price}</p>:''
                }
                <div className='flex j-evenly w-100'>
                    <button className='card-button' value={id}  onClick={()=>setPush(!push)}>Edit</button>
                <button className='card-button' value={id} onClick={erase} >Delete</button>
                </div>
                
            </article>
        </div>
        {
            hotel?push?(<Edit id={id} />): '':''
        }
        {
            show?push?(<EditShow id={id} />):'':''
        }
        
        </div>
    )
}