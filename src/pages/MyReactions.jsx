import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardUserReactions } from '../components/CardUserReactions'
import reactionsActions from '../redux/actions/reactionsActions'

export const MyReactions = () => {

    let [myReactions, setMyReactions] = useState([])
    let dispatch = useDispatch()
    let {getMyReactions} = reactionsActions
    let {id} = useSelector(state => state.userReducer)
    let [update, setUpdate] = useState(false)

    useEffect(() => {
        dispatch(getMyReactions(id))
            .then(res => setMyReactions(res.payload.reactions))
            .catch(err => console.log(err))
    },[update])

    let reload = () => {
        setUpdate(!update)
    }

  return (
    <div className="w-100 min-h flex j-evenly wrap g-5 p-5 bg-hotel">
            <div className="w-100">
                <h1 className="text-center">My Reactions</h1>
            </div>
            {
            myReactions ?
            myReactions.map(el => {
                return (
                    <CardUserReactions itId={el._id} key={el._id} photo={el.itineraryId ? el.itineraryId.photo : el.showId.photo} itName={el.itineraryId ? el.itineraryId.name : el.showId.name} reload={reload} rName={el.name}/>
                )
            }) :
            <h2 className='text-center'>No Reactions</h2>
        }
    </div>
  )
}
