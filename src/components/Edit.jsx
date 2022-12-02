import React from 'react'
import apiUrl from '../url'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Edit({id}) {
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
            theme: "light",
            });
    }
    let submit = (e) =>{
        e.preventDefault()
        let editHotel = {}
        let vacio={}

        e.target.name.value === '' ? vacio.name = e.target.name.value : editHotel.name=e.target.name.value
        e.target.capacity.value === '' ? vacio.capacity = e.target.capacity.value : editHotel.capacity=e.target.capacity.value
        e.target.photo.value === '' ? vacio.photo = e.target.photo.value : editHotel.photo=e.target.photo.value
        
        axios.patch(`${apiUrl}/hotels/${id}`, editHotel)
            .then(res => {
                if(res.data.success){
                    swal({
                        title:'success',
                        text:'The Hotel Was edited',
                        icon:'success',
                    })
                    navigate('/myhotels')
                }else{
                    let error = res.data.message
                    error.forEach(item=>notify(item.message))
                }
                
            })
    }


  return (
    <div className='w-100'>
        <form className='edit flex f-column align-center ' onSubmit={submit}>
            <label className='fw'>
            <legend>Hotel name</legend>
            <input className='w-100' type="text" name='name' min='3' placeholder=' name...'/></label>
            <label className='fw'>
            <legend>Hotel capacity</legend>
            <input className='w-100' type="number" name="capacity" min='1' placeholder='capacity...'/></label>
            <label className='fw'>
            <legend>Urls photos</legend>
                <input className='w-100'  type='url' name="photo" placeholder='image'/>
            </label>
            <div className='new-buttons flex j-evenly w-100 pt-1'>
                <input className='w-100 fs-2 btn p-1' type="submit" value="Edit" />
            </div>
        </form>
        <ToastContainer/>
    </div>
  )
}
