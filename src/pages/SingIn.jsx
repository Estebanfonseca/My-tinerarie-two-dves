import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import userActions from '../redux/actions/userAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let {signIn} = userActions
    let notify = (text)=>{
        toast.warn(text, {
            position: "top-center",
            className: "black-background",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }


    let [username,setUser] = useState([])
    let [password,setPass] = useState([])

    
    let dato = {
        email:username,
        password:password
    }
        
    
    
    let submit = (e)=>{
        e.preventDefault()
    dispatch(signIn(dato))
    .then(res => {
        if(res.payload.success){
            swal({
                title:'success',
                text:res.payload.response.message,
                icon:'success',
            })
            navigate('/')
        }else{
            let dato = res.payload.response
            typeof(dato) === 'string' ?
            notify(dato) :
            dato.message.forEach(item=>notify(item.message))
        }
        
    }).catch(err=>{
        console.log(err.message)
        
    })

    
    }
    let user =(e)=>{
        // eslint-disable-next-line 
        let valor = e.target.value
        valor = setUser(valor)
    }
    let pass =(e)=>{
        // eslint-disable-next-line 
        let valor = e.target.value
        valor=setPass(valor)
    }
    
    return (
    <form onSubmit={submit} className='form-log flex f-column align-center j-evenly w-100 h-75'>
        <h1 className="text-center">Sign in</h1>
    <div className='inputs j-center f-column '>
        <label>
        <legend>Email</legend>
        <input placeholder='User Email'  onChange={user} required/>
    </label>
    <label>
        <legend>Your password</legend>
        <input  placeholder='password'  type='password' onChange={pass} required/>
    </label>
    </div>
    <div className='flex separate j-center'>
        <button className='btn' onClick={submit} >LogIn</button>
        <hr></hr>
        <p>Or</p>
        <hr/>
    <div className='btn flex j-evenly align-center'>Login With Google<img className='google' src='/img/png-clipart-google-search-google-account-google-s-google-play-google-company-text.png' alt='google logo'/></div>
    </div>
    <hr/>
    <Link to="/signup" className='btn'>Register Here!</Link>
    <ToastContainer/>
    </form>
    )
}