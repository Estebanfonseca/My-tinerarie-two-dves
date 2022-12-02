import React, { useRef } from 'react'
import swal from 'sweetalert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import commentActions from '../redux/actions/commentAction';





export default function NewComment({show , itin}) {
    let {id}=useSelector(store => store.userReducer)
    let dispatch = useDispatch()
    let {createComent,getComent}= commentActions
    let inputRef = useRef(null)
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

    let coment = (e)=>{
        datos.comment= e.target.value
    }
    let req ={
        show,
        itin
    }
    
    
    let datos = {
        userID:id
    }

    show? datos.showID = show : datos.itinerarieID=itin

    let submit = (e) =>{
        e.preventDefault()
        dispatch(createComent(datos))
            .then(res => {
                if(res.payload.comment.success){
                    swal({
                        title:'success',
                        text:'commented',
                        icon:'success',
                    })
                    dispatch(getComent(req))
                    inputRef.current.value = ''
                }else{
                    let error = res.payload.comment.message
                    console.log(error)
                    error.forEach(item=>notify(item.message))
                }
                
            })
    }
  return (
    <div className='flex j-evenly'>
        <input type='text' className='input-com' name='coment' onChange={coment} ref={inputRef} placeholder='your comment...' />
        <button className='boton-1' onClick={submit}>Comment</button>
        <ToastContainer/>
    </div>
  )
}
