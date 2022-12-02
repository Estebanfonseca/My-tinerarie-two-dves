import React, {useRef, useState, useEffect} from 'react'
import{toast, ToastContainer} from 'react-toastify'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import apiUrl from '../url'
import axios from 'axios'
import swal from 'sweetalert'

export const NewReaction = () => {

    let formRef = useRef()
    let selectRef = useRef()
    let [selectDefault, setSelectDefault] = useState('')
    let [radio, setRadio] = useState('itineraries')
    let [shows, setShows] = useState([])
    let {itineraries} = useSelector(state => state.itinerariesReducer)
    let dispatch = useDispatch()
    let {getItineraries} = itinerariesActions
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

    useEffect(() => {
        dispatch(getItineraries())
        axios.get(`${apiUrl}/shows`)
            .then(res => setShows(res.data.response))
    }, [])

    let submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const values = Object.fromEntries(formData)
        let newReaction
        if(values.itinerary){
                newReaction = {
                itineraryId: values.itinerary,
                name: values.name,
                icon: values.icon,
                iconBack: values.iconBack,
            }
        }
        if(values.show){
            newReaction = {
                showId: values.show,
                name: values.name,
                icon: values.icon,
                iconBack: values.iconBack,
            }
        }
        swal({
            title: "Are you sure?",
            text: "I want to submit new reaction.",
            icon:"warning",
            buttons: true,
            dangerMode: true,
        })
        .then((ok) => {
            if(ok){
                let headers = {headers: {'Authorization': `Bearer ${token}`}}
                    axios.post(`${apiUrl}/reactions`, newReaction, headers)
                        .then(res => {
                            if(res.data.success){
                                swal({
                                    title:'success',
                                    text: res.data.message,
                                    icon:'success',
                                })
                                e.target.reset()
                            }else{
                                res.data.message.forEach(el=> notify(el.message))
                            }
                        })
                        .catch((err) => {
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

    let handleSelect = () => {
        setSelectDefault(selectRef.current.value)
    }

    let handleRadio = (e) => {
        setRadio(e.target.value)
    }

  return (
    <div className='bg-hotel w-100 min-h'>
                        <h1 className='text-center pt-2 mb-3'>New Reaction</h1>
                        <form onChange={handleRadio}>
                            <fieldset>
                                <legend>Select activity:</legend>
                                <label>Itineraries
                                    <input type="radio" name="activity" value={'itineraries'} />
                                </label>
                                <label>Shows
                                    <input type="radio" name="activity" value={'shows'} />
                                </label>
                            </fieldset>
                        </form>
                        <form ref={formRef} className='flex f-column g-1 align-center' onSubmit={submitHandler}>
                                {radio === 'itineraries' ?
                                <>
                                <label className='fw'>
                                <legend>Reaction itinerary:</legend>
                                <select className="fs-2" name="itinerary" value={selectDefault} onChange={handleSelect} ref={selectRef} required>
                                    <option disabled value={""}>
                                    Select a itinerary
                                    </option>
                                    {itineraries.map(el => <option key={el._id} value={el._id}>{el.name}</option>)}
                                </select></label>
                                </> :
                                <>
                                <label className='fw'>
                                <legend>Reaction show:</legend>
                                <select className="fs-2" name="show" value={selectDefault} onChange={handleSelect} ref={selectRef} required>
                                    <option disabled value={""}>
                                    Select a show
                                    </option>
                                    {shows.length > 0 ?
                                    shows.map(el => <option key={el._id} value={el._id}>{el.name}</option>): <></>}
                                </select></label>
                                </>
                            }
                            <label className='fw'>
                            <legend>Reaction name:</legend>
                            <input className='w-100' type="text" name='name' min='3' required /></label>
                            <label className='fw'>
                            <legend>Reaction on Icon:</legend>
                                <input className='w-100' type='url' name="icon" required />
                            </label>
                            <label className='fw'>
                            <legend>Reaction off icon:</legend>
                                <input className='w-100' type='url' name="iconBack" required />
                            </label>
                            <div className='new-buttons flex j-evenly w-100 pb-2 pt-1'>
                                <input className='w-100 fs-2 btn p-1' type="submit" value="Submit" />
                                <Link to={'/'} className='btn'>Go back</Link>
                            </div>
                        </form>
                        <ToastContainer/>
                    </div>
  )
}
