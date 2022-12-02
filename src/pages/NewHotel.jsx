import React, { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

export default function NewHotel() {

    let formRef = useRef(null)
    let navigate = useNavigate()
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
            theme: 'dark'
            });
    }

    let submit = (e) =>{
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const values = Object.fromEntries(formData)
        let photo = values.photo || '/img/no-image.png'

        let newhotel = {
            name: values.name,
            photo: photo,
            capacity: values.population,
            cityID:"636d3af27ccd7c6ea97b82e2",
            userID: id
        }
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
        axios.post('http://localhost:8080/api/hotels', newhotel, headers)
            .then(res => {
                if(res.data.success){
                    let id = res.data.response._id
                    swal({
                        title:'success',
                        text:res.data.message,
                        icon:'success',
                    }) 
                    navigate(`/hotels/${id}`)
                }else{
                    let error = res.data.message
                    error.forEach(item=>notify(item.message))
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
    <div className='w-100 h-75 flex f-column g-3 new-div form-log'>

        <h1 className="text-center">New Hotel</h1>
        <form className='new-form flex f-column g-1 fs-3 fw' ref={formRef} onSubmit={submit}>
            <label className='inputs flex f-column '>
            <legend>Hotel name</legend>
            <input className="fs-2 " type="text" name='name' min='3' placeholder='Enter Hotel name...' required/></label>
            <label className='inputs flex f-column'>
            <legend>Hotel capacity</legend>
            <input className="fs-2 " type="number" name="population" min='1' placeholder='Enter Hotel capacity...' required/></label>
            <label className='inputs flex f-column'>
            <legend>Urls photos</legend>
                <input className="fs-2 " type='url' name="photo" placeholder='Enter 3 Hotel URLs image'/>
            </label>
            <div className='new-buttons flex j-evenly'>
                <input className='w-50 fs-2 btn' type="reset" value="Clear Form" />
                <input className='w-50 fs-2 btn' type="submit" value="Submit" />
            </div>
        </form>
        <ToastContainer/>
    </div>
  )
}