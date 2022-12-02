import React, {useEffect, useState} from 'react'
import Comments from './Comments'
import { Reaction } from './Reaction'
import { useDispatch, useSelector } from 'react-redux'
import reactionsActions from '../redux/actions/reactionsActions'

export const Activity = ({itId, name, photo, description, price, duration, idS}) => {
  
  let [push,setPush]= useState(false)
  const [itineraryReactions, setItieneraryReactions] = useState()
  const [showReactions, setShowReactions] = useState()
  const {id} = useSelector(state => state.userReducer)
  const [updated, setUpdated] = useState(false)
  const dispatch = useDispatch()
  const {getItineraryReactions, getShowReactions} = reactionsActions

  useEffect(() => {
    if(itId){
      dispatch(getItineraryReactions(itId))
      .then(res => setItieneraryReactions(res.payload.reactions))
      .catch(err => console.log(err))
    }
    if(idS){
      dispatch(getShowReactions(idS))
      .then(res => setShowReactions(res.payload.reactions))
      .catch(err => console.log(err))
    }
  },[updated])
  
  let reload = () =>{
    setUpdated(!updated)
  }
  
  return (
    <>
    <div className='act-card flex f-column g-1'>
        <img className='act-img' src={photo} alt={name} />
        <h3 className='text-center'>{name}</h3>
        <p>{description}</p>
        <p>{duration}</p>
        <p>Price: $ {price.toFixed(2)}</p>

        <button className='btn' onClick={()=>setPush(!push)}>Comments</button>

        <div className='flex j-evenly gap-1'>
          {
            itineraryReactions ? 
            itineraryReactions.map(el => {
              return <Reaction key={el._id} reload={reload} name={el.name} userId={el.userId} itId={itId} icon={el.userId.includes(id) ? el.icon : el.iconBack}/>
            }) :
            showReactions ? 
            showReactions.map(el => {
              return <Reaction key={el._id} reload={reload} name={el.name} userId={el.userId} idS={idS} icon={el.userId.includes(id) ? el.icon : el.iconBack}/>
            }) :
            <></>
          }
        </div>

    </div>
    <div className='flex j-center g-1 mt-2 pb-2 w-100'>
            {push?(<Comments show={id} />): ''}
        </div>
    </>
  )
}