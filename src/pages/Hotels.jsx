import React, {useEffect, useRef} from 'react'
import CardHotel from '../components/CardHotel'
import { useSelector, useDispatch } from 'react-redux'
import hotelsActions from '../redux/actions/hotelsAction'
import filterHotelsActions from '../redux/actions/filterHotelsActions'


export default function Hotels() {

    let filter = useSelector(store => store.filterHotelsReducer)
    let {setSearchedh, setOrder} = filterHotelsActions
    let searchRef = useRef(null)
    let orderRef = useRef(null)
    const {hotels} = useSelector(store => store.hotelReducer)
    let dispatch = useDispatch()
    let {getHotels, getHotelsByName, getHotelByFilter} = hotelsActions

    useEffect(() => {
        if(hotels.length < 1 && filter.nameh === '' && Number(filter.order) === 0){
            dispatch(getHotels())
        } else if(filter.order === 0){
            dispatch(getHotelsByName(filter.nameh))
        } else{
            dispatch(getHotelByFilter(filter))
        }
    }, [])

    useEffect(() => {
        if(Number(filter.order) === 0){
            dispatch(getHotelsByName(filter.nameh))
        } else{
            dispatch(getHotelByFilter(filter))
        }
    }, [filter.order, filter.nameh, filter])

    let inputs =(e)=>{
        let searchedh = searchRef.current.value.trim()
        dispatch(setSearchedh(searchedh))
    }

    let hand = (e) => {
        let ordered = orderRef.current.value
        dispatch(setOrder(ordered))
    }

    return (
    <div className='w-100 min-h flex j-evenly wrap g-5 p-5 bg-hotel'>
        <div className='w-100'>
            <form className='w-100 flex j-evenly mb-3 '>
                <input className='search-input' ref={searchRef} placeholder='Buscar...' onChange={inputs} value={filter.nameh} type='text'/>
                <select className='search-input' ref={orderRef} name='Select' value={filter.order} onChange={hand} >
                    <option value='0'>Select</option>
                    <option value='1' >Ascend</option>
                    <option value='-1'>Descend</option>
                </select>
            </form>
        </div>
        {
            hotels.length > 0 ?
            hotels.map(item=> <CardHotel name={item.name} photo={item.photo} key={item._id} id={item._id} description={item.capacity}/>):
            <h2 className='min-h-50'>Hotels not found</h2>
        }
    </div>
    )
}