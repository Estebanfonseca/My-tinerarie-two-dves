import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate } from 'react-router-dom'
import citiesActions from '../redux/actions/citiesActions'
import swal from 'sweetalert'

export default function CardCityUser  ({name, cId, photo, continent, population}) {

    const navigate = useNavigate()
    const {deleteCity} = citiesActions
    const dispatch = useDispatch()
    let {token} = useSelector(state => state.userReducer)
    
    let deleteHandler = (e)=> {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                    dispatch(deleteCity({cId, token}))
                        .then((res) => {
                            swal("!has been deleted!", {
                                icon: "success",
                            });
                        })
                        .catch((err) => {
                            swal(err.payload.response, {
                                icon: "error",
                            })
                        })
            } else {
                swal("Your city is safe!");
            }
            navigate('/mycities')
        })
    }

    return (
        <div>
        <div className='card1'>
            <img className='img ' src={photo} alt={name} height="250" />
            <article className='card-body flex f-column g-1 align-center'>
                <h4 className='text-center'>{name}</h4>
                <p className='text-center'>Continent: {continent}</p>
                <p>Population: {population}</p>
                <div className='flex j-evenly w-100'>
                     <Link className='card-button' to={`/editCity/${cId}`}>Edit</Link>
                    <button onClick={deleteHandler} className='card-button'>Delete</button>
                </div>
                
            </article>
        </div>
        </div>
    )
}