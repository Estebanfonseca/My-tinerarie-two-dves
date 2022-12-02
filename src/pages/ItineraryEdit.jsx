import axios from 'axios'
import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import apiUrl from '../url'
import swal from 'sweetalert'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'

export const ItineraryEdit = () => {

    const itId = useParams().id
    const navigate = useNavigate()
    let [itinerary, setItinerary] = useState({})
    let [name, setName] = useState('')
    let [photo, setPhoto] = useState([])
    let [description, setDescription] = useState('')
    let [price, setPrice] = useState('')
    let [duration, setDuration] = useState('')
    let formRef = useRef(null)
    let {id, token} = useSelector(state => state.userReducer)

    let notify = (text)=>{
        toast.warn(text, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    useEffect(()=> {
        axios.get(`${apiUrl}/itineraries/${itId}`)
            .then(res => {
                setItinerary(res.data.response)
                setName(res.data.response.name)
                setPhoto(res.data.response.photo)
                setDescription(res.data.response.description)
                setPrice(res.data.response.price)
                setDuration(res.data.response.duration)
            }) 
            .catch(err => console.log(err.message))
    },[])

    let nameHandler = (e) =>{
        setName(e.target.value)
    }
    let photo1Handler = (e) =>{
        setPhoto([e.target.value, photo[1], photo[2]])
    }
    let photo2Handler = (e) =>{
        setPhoto([photo[0], e.target.value, photo[2]])
    }
    let photo3Handler = (e) =>{
        setPhoto([photo[0], photo[1], e.target.value])
    }
    let descriptionHandler = (e) =>{
        setDescription(e.target.value)
    }
    let priceHandler = (e) =>{
        setPrice(e.target.value)
    }
    let durationHandler = (e) => {
        setDuration(e.target.value)
    }
    let submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const values = Object.fromEntries(formData)
        let updateItinerary = {
            name: values.name,
            description: values.description,
            photo: [values.photo1, values.photo2, values.photo3],
            price: values.price,
            duration: values.duration,
            userId: id,
        };
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
            axios.put(`${apiUrl}/itineraries/${itId}`, updateItinerary, headers)
                .then(res => {
                    if(res.data.success){
                        swal({
                            title:'success',
                            text: res.data.message,
                            icon:'success',
                        })
                        navigate('/myitineraries')
                    }else{
                        res.data.message.forEach(el=> notify(el.message))
                    }
                })
                .catch((err) => {
                    swal({
                        title:'Error',
                        text: err.message,
                        icon:'error',
                })
        })
    }

  return (
    <div className='w-100 min-h-edit bg-city'>
            {
                itinerary.name ?
                (
                    <>
                        <h1 className='text-center pt-2 mb-3'>Edit {itinerary.name} itinerary</h1>
                        <form ref={formRef} className='flex f-column g-1 align-center' onSubmit={submitHandler}>
                            <label className='fw'>
                            <legend>Itinerary name:</legend>
                            <input onChange={nameHandler} className='w-100' type="text" name='name' min='3' value={name} required /></label>
                            <label className='fw'>
                            <legend>Itinerary Url photo 1:</legend>
                                <input onChange={photo1Handler} className='w-100' type='url' name="photo1" value={photo[0]} required />
                            </label>
                            <label className='fw'>
                            <legend>Itinerary Url photo 2:</legend>
                                <input onChange={photo2Handler} className='w-100' type='url' name="photo2" value={photo[1]} required />
                            </label>
                            <label className='fw'>
                            <legend>Itinerary Url photo 3:</legend>
                                <input onChange={photo3Handler} className='w-100' type='url' name="photo3" value={photo[2]} required />
                            </label>
                            <label className='fw'>
                            <legend>Itinerary description:</legend>
                            <input onChange={descriptionHandler} className='w-100' type="text" name='description' min='20' value={description} required /></label>
                            <label className='fw'>
                            <legend>Itinerary price:</legend>
                            <input onChange={priceHandler} className='w-100' type="number" name="price" min='1' value={price} required /></label>
                            <label className='fw'>
                            <legend>Itinerary duration:</legend>
                            <input onChange={durationHandler} className='w-100' type="number" name="duration" min='1' value={duration} required /></label>
                            <div className='new-buttons flex j-evenly w-100 pt-1'>
                                <input className='w-100 fs-2 btn p-1' type="submit" value="Edit" />
                                <Link to={'/myitineraries'} className='btn'>Go back</Link>
                            </div>
                        </form>
                    </>
                    
                ) :
                <h1>No itineraries</h1>
            }
            <ToastContainer/>
    </div>
  )
}
