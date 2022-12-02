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

export const CityEdit = () => {

    const cId = useParams().id
    const navigate = useNavigate()
    let [city, setCity] = useState({})
    let [name, setName] = useState('')
    let [photo, setPhoto] = useState('')
    let [continent, setContinent] = useState('')
    let [population, setPopulation] = useState('')
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
        axios.get(`${apiUrl}/cities/${cId}`)
            .then(res => {
                setCity(res.data.response)
                setName(res.data.response.name)
                setPhoto(res.data.response.photo)
                setContinent(res.data.response.continent)
                setPopulation(res.data.response.population)
            }) 
            .catch(err => console.log(err.message))
    },[])

    let nameHandler = (e) =>{
        setName(e.target.value)
    }
    let photoHandler = (e) =>{
        setPhoto(e.target.value)
    }
    let continentHandler = (e) =>{
        setContinent(e.target.value)
    }
    let popHandler = (e) =>{
        setPopulation(e.target.value)
    }
    let submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const values = Object.fromEntries(formData)
        let updateCity = {
            name: values.name,
            continent: values.continent,
            photo: values.photo,
            population: values.population,
            userId: id,
        };
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
            axios.put(`${apiUrl}/cities/${cId}`, updateCity, headers)
                .then(res => {
                    if(res.data.success){
                        swal({
                            title:'success',
                            text: res.data.message,
                            icon:'success',
                        })
                        navigate('/mycities')
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
                city.name ?
                (
                    <>
                        <h1 className='text-center pt-2 mb-3'>Edit {city.name} city</h1>
                        <form ref={formRef} className='flex f-column g-1 align-center' onSubmit={submitHandler}>
                            <label className='fw'>
                            <legend>City name:</legend>
                            <input onChange={nameHandler} className='w-100' type="text" name='name' min='3' value={name} required /></label>
                            <label className='fw'>
                            <legend>City Url photo:</legend>
                                <input onChange={photoHandler} className='w-100' type='url' name="photo" value={photo} required />
                            </label>
                            <label className='fw'>
                            <legend>City continent:</legend>
                                <select className="fs-2" name="continent" value={continent} onChange={continentHandler} required>
                                    <option disabled value={""}>Select a continent</option>
                                    <option value="Africa">Africa</option>
                                    <option value="Antartica">Antartica</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Europe">Europe</option>
                                    <option value="North America">North America</option>
                                    <option value="South America">South America</option>
                                    <option value="Oceania">Oceania</option>
                                </select></label>
                            <label className='fw'>
                            <legend>City population:</legend>
                            <input onChange={popHandler} className='w-100' type="number" name="population" min='1' value={population} required /></label>
                            <div className='new-buttons flex j-evenly w-100 pt-1'>
                                <input className='w-100 fs-2 btn p-1' type="submit" value="Edit" />
                                <Link to={'/mycities'} className='btn'>Go back</Link>
                            </div>
                        </form>
                    </>
                    
                ) :
                <h1>No cities</h1>
            }
            <ToastContainer/>
    </div>
  )
}
