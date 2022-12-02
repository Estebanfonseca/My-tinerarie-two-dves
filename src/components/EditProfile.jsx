import React from 'react'
import apiUrl from '../url'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';




export default function Editprofile({id}) {
    let navigate = useNavigate()
    
    let submit = (e) =>{
        e.preventDefault()
        let edit = {}
        let vacio={}

        e.target.name.value === '' ? vacio.name = e.target.name.value : edit.name=e.target.name.value
        e.target.age.value === '' ? vacio.age = e.target.age.value : edit.age=e.target.age.value
        e.target.photo.value === '' ? vacio.photo = e.target.photo.value : edit.photo=e.target.photo.value
        e.target.email.value === '' ? vacio.email = e.target.email.value : edit.email=e.target.email.value
            swal({
                title: "Are you sure?",
                text: "sure edit your profile",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                swal("!has been edited!", {
                    icon: "success",
                });
                axios.patch(`${apiUrl}/auth/me/${id}`, edit)
                window.location.reload(true)
                navigate(`/profile/${id}`)
                } else {
                swal("Your profile is safe!");
                }
                navigate(`/profile/${id}`)
            });
    }


  return (
    <div className='w-100 pt-5'>
        <form className='edit flex f-column align-center ' onSubmit={submit}>
            <label className='fw'>
            <legend>name</legend>
            <input className='w-100' type="text" name='name' min='3' placeholder=' name...'/></label>
            <label className='fw'>
            <legend>Age</legend>
            <input className='w-100' type="number" name="age" min='1' placeholder='Age..'/></label>
            <label className='fw'>
            <legend>Url photo</legend>
                <input className='w-100'  type='url' name="photo" placeholder='image..'/>
            </label>
            <label className='fw'>
            <legend>Email</legend>
                <input className='w-100'  type='email' name="email" placeholder='email...'/>
            </label>
            <div className='new-buttons flex j-evenly w-100 pt-1'>
                <input className='w-100 fs-2 btn p-1' type="submit" value="Edit" />
            </div>
        </form>

    </div>
  )
}
