import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Detail } from '../components/Detail'
import { Itinerary } from '../components/Itinerary'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../url'


export const City = () => {
    let [city, setCity] = useState([])
    let {id} = useParams()

    useEffect(() => {
        axios.get(`${apiUrl}/cities/${id}`)
            .then(res => setCity(res.data.response))
            .catch(err => err.message)
    },[])

  return (
    <div className='w-100 bg-city'>
        <h1 className='text-center'>City detail</h1>
        {city.name ?
            <div>
                <Detail name={city.name} photo={city.photo} continent={city.continent} population={'Population: ' + new Intl.NumberFormat().format(city.population)}/>
                <Itinerary/>
            </div> :
            <div className='min-h flex j-center align-center'>
                <h2 className='text-center'>There`s no Cities</h2>
            </div> 
        }
        <div className='flex j-center g-1 mt-2 p-1'>
        <button className='btn'>Comments</button>
            <Link to={'/cities'} className='btn'>Go back</Link>
        </div>

    </div>
  )
}