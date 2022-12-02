import React from 'react'
import apiUrl from '../url'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'

export default function Edit({id}) {
    let navigate = useNavigate()
    let {token} = useSelector(state => state.userReducer)
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
        let editShow = {}
        let vacio={}

        e.target.name.value === '' ? vacio.name = e.target.name.value : editShow.name=e.target.name.value
        e.target.description.value === '' ? vacio.description = e.target.description.value : editShow.description=e.target.description.value
        e.target.price.value === '' ? vacio.price = e.target.price.value : editShow.price=e.target.price.value
        e.target.photo.value === '' ? vacio.photo = e.target.photo.value : editShow.photo=e.target.photo.value
        e.target.date.value === '' ? vacio.date = e.target.date.value : editShow.date=e.target.date.value
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
        axios.patch(`${apiUrl}/shows/${id}`,editShow,headers)
            .then(res => {
                if(res.data.success){
                    swal({
                        title:'success',
                        text:'The show Was edited',
                        icon:'success',
                    })
                    navigate('/myshows')
                }else{
                    let error = res.data.message
                    error.forEach(item=>notify(item.message))}
            })
    }


  return (
    <div className='w-100'>
        <form className='edit flex f-column align-center ' onSubmit={submit}>
            <label className='fw'>
            <legend>Show name</legend>
            <input className='w-100' type="text" name='name' min='3' placeholder=' name...'/></label>
            <label className='fw'>
            <legend>Show description</legend>
            <input className='w-100' type="text" name="description" min='1' placeholder='Description...'/></label>
            <label className='fw'>
            <legend>Urls photos</legend>
                <input className='w-100'  type='url' name="photo" placeholder='image..'/>
            </label>
            <label className='fw'>
            <legend>Show Date</legend>
                <input className='w-100'  type='date' name="date" placeholder='Date..'/>
            </label>
            <label className='fw'>
            <legend>Show Price</legend>
                <input className='w-100'  type='number' name="price" placeholder='price..'/>
            </label>
            <div className='new-buttons flex j-evenly w-100 pt-1'>
                <input className='w-100 fs-2 btn p-1' type="submit" value="Edit" />
            </div>
        </form>
        <ToastContainer/>
    </div>
  )
}