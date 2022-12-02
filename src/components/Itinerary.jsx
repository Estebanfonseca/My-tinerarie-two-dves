import React, { useEffect, useState } from 'react'
import { Activity } from './Activity'
import axios from 'axios'
import apiUrl from '../url'
import { useParams } from 'react-router-dom'

export const Itinerary = () => {

    let [activities, setActivities] = useState([])
    let [count, setCount] = useState(0)
    let {id} = useParams()

    useEffect(() => {
        axios.get(`${apiUrl}/itineraries?cityId=${id}`)
            .then(res => setActivities(res.data.response))
            .catch(err => err.message)
    }, [])

    useEffect(() => {
        let interval = setInterval(() => {
                            count < 2 ? setCount(++count) : setCount(0)
                        }, 3000)
                        return () => {
                            clearInterval(interval)
                        }
    }, [count])

  return (
    <div className='flex j-center  wrap g-3 mt-2'>
        {activities.length > 0 ?
        activities.map(el => <Activity key={el._id} itId={el._id} name={el.name} photo={el.photo[count]} description={el.description} duration={'Duration: ' + el.duration + ' hs.'} price={el.price}/>) :
        <h2>No itineraries yet</h2>
    }
    </div>
  )
}