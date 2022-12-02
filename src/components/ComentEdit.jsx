import React, {useRef, useState,useEffect}from 'react'
import commentActions from '../redux/actions/commentAction'
import { useDispatch, useSelector } from 'react-redux'
import swal from "sweetalert";


export default function ComentEdit({_id,photo,coments,name,show,itin ,erase,user}) {
    let [push,setPush] = useState(false)
    let {token,id,logged} = useSelector(store=>store.userReducer)
    let editRef = useRef(null)
    let inputRef = useRef(null)
let dispatch = useDispatch()
let {getComent,editComent} = commentActions
let req = {
    itin,
    show
}

    useEffect(()=>{
        dispatch(getComent(req)) 
    },[])



let headers = {headers: {'Authorization': `Bearer ${token}`}}

let coment = (e)=>{
    datos.comment = e.target.value
}




let datos = {
    headers,
    userID:id
}
let edit = ()=>{
  datos.id = editRef.current.value
 
    swal({
        title: "Are you sure?",
        text: "Once edited, you will not be able to recover this",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    .then((willEdit) => {
        if (willEdit) {
        swal("!has been edited!", {
            icon: "success",
        });
        dispatch(editComent(datos))
        inputRef.current.value = ''
        dispatch(getComent(req))
        } else {
        swal("Your comment is same!");
        }
    });
}
  return (
    <div className={`flex  ${logged && id === user ?  'bg-user' : 'coment'}`}>
        <img className='img ' src={photo} alt='profile'  />
        <div className='w-100'>
            <article>
            <h4>{name}</h4>
            <p className='p-text'>{coments}</p>
            </article>
            {
                logged && id === user? 
                <>
                <button className='boton' value={_id}   onClick={()=>setPush(!push)} ref={editRef}>Edit</button>
                <button className='boton' value={_id} onClick={erase}>Delete</button>
                </> : ''
            }
        
        {push ? (<div className='flex j-evenly'>
        <input type='text' className='input-com' name='coment' onChange={coment} ref={inputRef}  placeholder='your comment...' />
        <button className='boton-1'  onClick={edit}>Edit</button>
</div>):''}
    </div>
    </div>
  )
}
