import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import reactionsActions from '../redux/actions/reactionsActions'



export const Reaction = ({name, icon, userId, itId, reload, idS}) => {

    let {token} = useSelector(state => state.userReducer)
    let dispatch = useDispatch()
    let {updateItReactions, updateShReactions} = reactionsActions
    
    let clickHandler = () => {
        if(itId){
            dispatch(updateItReactions({token, name, itId}))
            .then(res => reload())
            .catch(err => console.log(err))
        }
        if(idS){
            dispatch(updateShReactions({token, name, idS}))
            .then(res => reload())
            .catch(err => console.log(err))
        }
    }

  return (

    <div>
        <img onClick={clickHandler} className='reactions' src={icon} alt={name} />
        <p className='text-center'>{userId.length}</p>
    </div>
  )
}
