import React ,{useEffect}from 'react'
import { useDispatch , useSelector} from 'react-redux'
import profileAction from '../redux/actions/profileAction'
import { Link, useParams } from 'react-router-dom'
import CardProfile from '../components/CardProfile'

export default function Profile() {
let {id} = useParams()

let dispatch = useDispatch()
let {getUser} = profileAction
let {user} = useSelector(state => state.profileReducer)

useEffect(()=>{
  dispatch(getUser(id))
},[])





  return (
    <div className='p-1'>
      <h1 className='text-center'>My Profile</h1>
      <div>
      <CardProfile name={user.name} age={user.age} photo={user.photo}  email={user.email} role={user.role} id={user._id} />
      </div>
      <div className='flex j-center align-center'>
        <Link className='btn' to={'/myreactions'}>My Reactions</Link>
      </div>
      
    </div>
  )
}
