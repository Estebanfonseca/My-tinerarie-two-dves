import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'

export default function CardHotel({name, photo, description,id}) {
    let [num,setNum]= useState(0)
    let [clean,setClean] = useState(0)

    function next(){
        if(num < photo.length-1){
            setNum(num +1)
        }else{
            setNum(0)
        }
        clearInterval(clean)
    }

useEffect(()=>{
    let idinterval = setInterval(()=>{
        next()
    },3000 )
    setClean(idinterval)
    return clearInterval(clean)
},[num])

  return (
    <div>
        <div className='card1 '>
            <img className='img ' src={photo[num]} alt={name} height="250" />
            <article className='card-body flex f-column g-1 j-between align-center'>
                <h4 className='text-center'>{name}</h4>
                <p className='text-center'>Capacity: {new Intl.NumberFormat().format(description)}</p>
                <Link className='card-button' to={`/Hotels/${id}`}>View shows...</Link>
            </article>
        </div>
    </div>
  )
}