import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userActions from '../redux/actions/userAction'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import swal from 'sweetalert'

export const LogInWrapper = () => {

    let [showLogin, setShowLogin] = useState(false)
    let location = useLocation()
    let navigate = useNavigate()
    let {name, photo, logged, token,id} = useSelector(state => state.userReducer)
    let {signOut} = userActions
    let dispatch = useDispatch()

    useEffect(() => {
        if(showLogin){
            document.addEventListener('mousedown', e => {
                if(!e.target.className.includes('nav-link') && !e.target.className.includes('user-icon') && !e.target.className.includes('name-anim')){
                    setShowLogin(false)
                }
            })
        }
    }, [showLogin])
    useEffect(() => {
        setShowLogin(false)
    }, [location])
    let keyHandler = (ev) => {
        if(ev.key === 'Escape'){
            setShowLogin(false)
        }
    }
    let loginHandler = () => {
        setShowLogin(!showLogin)
    }
    let signOutHandler = (e) => {
        e.preventDefault()
        swal({
            title: "Do you want to sign out?",
            text: "Confirm if you want to quit.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willSignOut) => {
            if (willSignOut) {
                dispatch(signOut(token))
                navigate('/login')
            };
        })
    }

  return (
         <div className="m-1 me-3" onKeyUp={keyHandler}>
            <button onClick={loginHandler}>
                <img className='user-icon' src={photo ? photo : "/img/user_icon.png"} alt="user icon" />
                {name ?
                <p className='text-center name-anim fs-5 fw-bold me-2'>{name}</p> : <></>}
            </button>
            <ul className={`${showLogin ? '' : 'hidden'} drop-list flex f-column g-1 p-1 list-border`}>
                {logged ?
                <>
                    <li><Link className='nav-link' to={`/profile/${id}`}>My Profile</Link></li>
                    <li><button onClick={signOutHandler} className='nav-link sign-out'>Sign Out</button></li>
                </> :
                <>
                    <li><Link className='nav-link' to="/login">Sign in</Link></li>
                    <li><Link className='nav-link' to='/signup'>Sign up</Link></li>
                </>
                }
            </ul>
        </div>
  )
}