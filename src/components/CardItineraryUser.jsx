import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate } from 'react-router-dom'
import itinerariesActions from '../redux/actions/itinerariesActions'
import swal from 'sweetalert'

export default function CardItineraryyUser  ({name, itId, photo, description, price, duration}) {

    const navigate = useNavigate()
    const {deleteItinerary} = itinerariesActions
    const dispatch = useDispatch()
    let {token} = useSelector(state => state.userReducer)
    
    let deleteHandler = ()=> {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                    dispatch(deleteItinerary({itId, token}))
                    .then(res => {
                        swal('Has been deleted!', {
                            icon: "success",
                        })
                    })
                    .catch(err => {
                        swal(err.payload.response, {
                            icon: "error",
                        })
                    })
            } else {
                swal("Your itinerary is safe!");
            }
            navigate('/myitineraries')
        })
    }

    return (
        <div>
        <div className='act-card flex f-column g-1'>
            <img className='img ' src={photo[0]} alt={name} height="250" />
            <article className='card-body flex f-column g-1 align-center'>
                <h4 className='text-center'>{name}</h4>
                <p className='text-center'>Description: {description}</p>
                <p>Price: ${price}</p>
                <p>Duration: {duration} hs.</p>
                <div className='flex j-evenly w-100'>
                     <Link className='card-button' to={`/edititinerary/${itId}`}>Edit</Link>
                    <button onClick={deleteHandler} className='card-button'>Delete</button>
                </div>
                
            </article>
        </div>
        </div>
    )
}