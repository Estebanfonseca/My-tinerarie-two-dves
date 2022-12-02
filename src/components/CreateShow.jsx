import React ,{useState,useEffect} from 'react'
import apiUrl from '../url'
import axios from 'axios'
import swal from 'sweetalert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import showsActions from '../redux/actions/showAction'
import { useNavigate } from 'react-router-dom';






export default function CreateShow({id}) {
    let [selectDefault, setSelectDefault] = useState("");
    let [dato,setDato]= useState([])
    let {getShow}= showsActions
    let dispatch = useDispatch()
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
            theme: "dark",
            });
    }
    useEffect(()=>{
        axios.get(`${apiUrl}/hotels`)
        .then(res => setDato(res.data.response))
        .catch(err => console.log(err.message))
    },[])

    let handleSelect = (e) => {
        setSelectDefault(e.target.value);
    };
    let create = {
        hotelID:selectDefault,
        userID:id
    }
let name = (e)=>{
    create.name = e.target.value
    
}
let date = (e)=>{
    create.date = e.target.value
    
}
let price = (e)=>{
    create.price=e.target.value
    
}
let description = (e)=>{
    create.description = e.target.value
    
}
let photo = (e)=>{
    create.photo = e.target.value
    
}

    
    let submit = (e) =>{
        e.preventDefault()

        let headers = {headers: {'Authorization': `Bearer ${token}`}}
        axios.post(`${apiUrl}/shows`,create,headers)
            .then(res => {
                if(res.data.success){
                    swal({
                        title:'success',
                        text:'The show was created',
                        icon:'success',
                    })
                    dispatch(getShow(id))
                    navigate('/myshows')
                }else{
                    let error = res.data.message
                    error.forEach(item=>notify(item.message))
                }
                
            })
            .catch(err => {
                console.log(err)
                
            })
    }


  return (
    <div className='w-100'>
        <form className='edit flex f-column align-center ' onSubmit={submit} >
        <label className="inputs flex f-column">
                    <legend>Choose hotel</legend>
                    <select className="fs-2" name="hotel"  onChange={handleSelect}  required>
                        <option >
                            Select a hotel
                        </option>
                        {
                            dato? dato.map(item=> <option key={item._id} value={item._id}>{item.name}</option>) :''
                        }
                    </select>
                </label>
                <label className='fw'>
            <legend>Date of show</legend>
                <input className='w-100' onChange={date} type='date' name="date" placeholder='date..' required/>
            </label>
            <label className='fw'>
            <legend>Price of show</legend>
                <input className='w-100'  type='num' onChange={price} name="price" placeholder='price..' required/>
            </label>
            <label className='fw'>
            <legend>name of show</legend>
            <input className='w-100' type="text" name='name' onChange={name} min='3' placeholder=' name...' required/></label>
            
            <label className='fw'>
            <legend>description</legend>
            <input className='w-100' onChange={description} type="text" name='capacity' min='3' placeholder='description...' required/></label>
            
            <label className='fw'>
            <legend>Url photo</legend>
                <input className='w-100' onChange={photo} type='url' name="photo" placeholder='image...' required/>
            </label>
            <div className='new-buttons flex j-evenly w-100 pt-1'>
                <input className='w-100 fs-2 btn p-1' type="submit" value="create" onClick={submit} />
            </div>
        </form>
        <ToastContainer/>
    </div>
  )
}
