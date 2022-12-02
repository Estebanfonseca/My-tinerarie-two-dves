import axios from 'axios'
import React, { useRef } from 'react'
import {Link} from 'react-router-dom'
import apiUrl from '../url'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert'

export const SignUp = ({userRole}) => {

    let formRef = useRef(null)
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

    let submit = (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const values = Object.fromEntries(formData)
        if(values.password !== values.confirmPassword){
            e.target.confirmPassword.focus()
            notify('Passwords do not match')
        } else{
            let newUser = {
                name: values.fName,
                lastName: values.lName,
                role: userRole,
                age: values.age,
                photo: values.photo,
                email: values.email,
                password: values.password,
            }
            swal({
                title: "Are you sure?",
                text: "I want to submit the form to sign up.",
                icon:"warning",
                buttons: true,
                dangerMode: true,
            })
            .then((ok) => {
                if(ok){
                    axios.post(`${apiUrl}/auth/sign-up`, newUser)
                    .then((res)=>{
                        if(res.data.success){
                            swal({
                                title:'success',
                                text:`${res.data.message}, please check your email to validate your user`,
                                icon:'success',
                            })
                            e.target.reset()
                        } else{
                            let error = res.data.message
                            error.forEach(item=>notify(item.message))
                        }
                    })
                    .catch(err => {
                        swal({
                            title:'Error',
                            text: err.message,
                            icon:'error',
                        })
                    })
                } else{
                    notify('Form has not been sent')
                }
            })
        }
    }

  return (
        <form className='form-log flex f-column align-center j-evenly w-100 h-75' onSubmit={submit} ref={formRef}>
            <h1 className="text-center">Sign up</h1>
            <div className='inputs j-center f-column'>
                <input className="fs-2" type="text" name='fName' placeholder='Enter your name...' required/>
                <input className="fs-2" type="text" name='lName' placeholder='Enter your last name...' required/>
                <input className="fs-2" type="number" name="age" placeholder='Enter your age...(18+)' min={18} max={100} required/>
                <input className="fs-2" type="url" name="photo" placeholder='Enter your photo`s url...' required/>
                <input className="fs-2" type="email" name="email" placeholder='Enter your email...' required/>
                <input className="fs-2" type="password" name="password" placeholder='Enter your password...' required/>
                <input className="fs-2" type="password" name="confirmPassword" placeholder='Confirm your password...' required/>
            </div>
            <div className='flex separate j-center'>
                <input className='btn' type="submit" value="Submit" />
                <hr></hr>
                <p>Or</p>
                <hr/>
                <div className='btn flex j-evenly align-center'>Login With Google <img className='google ' src='/img/png-clipart-google-search-google-account-google-s-google-play-google-company-text.png' alt='google logo'/> </div>
            </div>
            <hr/>
            <Link to="/login" className='btn'>Login Here!</Link>
            <ToastContainer/>
        </form>
  )
}