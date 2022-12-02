import React, {useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import citiesActions from '../redux/actions/citiesActions'
import swal from 'sweetalert'
import{toast, ToastContainer} from 'react-toastify'
import axios from 'axios'
import apiUrl from '../url'

export const NewItinerary = () => {

    let formRef = useRef()
    let selectRef = useRef()
    let [selectDefault, setSelectDefault] = useState('')
    let {cities} = useSelector(state => state.citiesReducer)
    let {id, token} = useSelector(state => state.userReducer)
    let dispatch = useDispatch()
    let {getCities} = citiesActions
    let navigate = useNavigate()

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

    useEffect(() => {
        dispatch(getCities())
    },[])

    let handleSelect = (e) =>{
        setSelectDefault(selectRef.current.value)
    }
    let submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const values = Object.fromEntries(formData)
        let newItinerary = {
            cityId: values.city,
            name: values.name,
            description: values.description,
            photo: [values.photo1, values.photo2, values.photo3],
            price: values.price,
            duration: values.duration,
            userId: id,
        };
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
            axios.post(`${apiUrl}/itineraries`, newItinerary, headers)
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
                    <div className='bg-hotel w-100 min-h'>
                        <h1 className='text-center pt-2 mb-3'>New Itinerary</h1>
                        <form ref={formRef} className='flex f-column g-1 align-center' onSubmit={submitHandler}>
                            <label className='fw'>
                                <legend>Itinerary city:</legend>
                                <select className="fs-2" name="city" value={selectDefault} onChange={handleSelect} ref={selectRef} required>
                                    <option disabled value={""}>
                                    Select a city
                                    </option>
                                    {cities.map(el => <option key={el._id} value={el._id}>{el.name}</option>)}
                                </select></label>
                            <label className='fw'>
                            <legend>Itinerary name:</legend>
                            <input className='w-100' type="text" name='name' min='3' required /></label>
                            <label className='fw'>
                            <legend>Itinerary Url photo 1:</legend>
                                <input className='w-100' type='url' name="photo1" required />
                            </label>
                            <label className='fw'>
                            <legend>Itinerary Url photo 2:</legend>
                                <input className='w-100' type='url' name="photo2" required />
                            </label>
                            <label className='fw'>
                            <legend>Itinerary Url photo 3:</legend>
                                <input className='w-100' type='url' name="photo3" required />
                            </label>
                            <label className='fw'>
                            <legend>Itinerary description:</legend>
                            <input className='w-100' type="text" name='description' min='20' required /></label>
                            <label className='fw'>
                            <legend>Itinerary price:</legend>
                            <input className='w-100' type="number" name="price" min='1' required /></label>
                            <label className='fw'>
                            <legend>Itinerary duration:</legend>
                            <input className='w-100' type="number" name="duration" min='1' required /></label>
                            <div className='new-buttons flex j-evenly w-100 pb-2 pt-1'>
                                <input className='w-100 fs-2 btn p-1' type="submit" value="Submit" />
                                <Link to={'/myitineraries'} className='btn'>Go back</Link>
                            </div>
                        </form>
                        <ToastContainer/>
                    </div>
  )
}
