import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactionsActions from '../redux/actions/reactionsActions'

export const CardUserReactions = ({itId, photo, itName, rName, reload}) => {

    let {token} = useSelector(state => state.userReducer)
    let dispatch = useDispatch()
    let {deleteReaction} = reactionsActions

    let deleteHandler = () => {
        dispatch(deleteReaction({token, itId}))
            .then(res => reload())
            .catch(err => console.log(err))
    }

  return (
    <div className={`card1 ${
        rName === 'like' ? 'like' : rName === 'not-like' ? 'not-like' : rName === 'love' ? 'love' : rName === 'surprise' ? 'surprise' : ''
        }`}>
            <img className='img' src={photo} alt={itName} height="250" />
            <article className='card-body flex f-column g-1 align-center'>
                <h4 className='text-center'>{itName}</h4>
                <h5 className='text-center fs-5'>
                    {rName !== 'love' ? `It ${rName} you` : `You ${rName} it`}
                </h5>
                <div className='flex j-evenly w-100'>
                    <button onClick={deleteHandler} className='card-button'>Delete reaction</button>
                </div>
                
            </article>
        </div>
  )
}
