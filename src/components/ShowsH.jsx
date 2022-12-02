import React, { useEffect, useState } from 'react'
import { Activity } from './Activity'
import axios from 'axios'
import apiUrl from '../url'
import { useParams } from 'react-router-dom'

export const ShowsH = () => {

    let [activities, setActivities] = useState([])
    let {id} = useParams()

    useEffect(() => {
        axios.get(`${apiUrl}/shows?hotelID=${id}`)
            .then(res => setActivities(res.data.response))
            .catch(err => err.message)
    }, [])

  return (
    <div className='flex j-center  wrap g-3 mt-2'>
        { activities.length > 0 ?
        activities.map(el => <Activity key={el._id} idS={el._id} name={el.name} photo={el.photo} description={el.description} duration={'Date: ' + el.date.slice(0,10)} price={el.price}/>) :
        <h2>No shows yet</h2>
    }
    </div>
  )
}