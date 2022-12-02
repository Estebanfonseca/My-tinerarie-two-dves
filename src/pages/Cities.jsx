import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import Card from '../components/Card'
import apiUrl from '../url'
import {useDispatch, useSelector} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import filterCitiesActions from '../redux/actions/filterCitiesActions.js'

export const Cities = () => {

    let [checkCities, setCheckCities] = useState([])
    let searchRef = useRef(null)
    const dispatch = useDispatch()
    const {setChecked, setSearched} = filterCitiesActions
    const filter = useSelector(state => state.filterCitiesReducer)
    const {getCities, getFilteredCities} = citiesActions
    const {cities} = useSelector(state => state.citiesReducer)

    useEffect(() => {
        axios.get(`${apiUrl}/cities`)
            .then(res => setCheckCities(res.data.response))
            .catch(err => console.log(err.message))
    }, [])

    useEffect(() => {
        if(cities.length < 1 && filter.name === '' && filter.continent.length < 1){
            dispatch(getCities())
        } else{
            dispatch(getFilteredCities(filter))
        }
    }, [])

    useEffect(() => {
        dispatch(getFilteredCities(filter))
    }, [filter])

    let checkHandler = (e) => {
        let auxArray = [...filter.continent]
        if(e.target.checked){
            auxArray.push(e.target.value)
        }else{
            auxArray = auxArray.filter(el => el !== e.target.value)
        }
        let checked = auxArray
        dispatch(setChecked(checked))
    }

    let inputHandler = (e) => {
        let searched = searchRef.current.value.trim()
        dispatch(setSearched(searched))
    } 

    return (
        <div className='bg-city'>
            <div>
                <div className='flex j-evenly  pt-2'>
                    {
                        Array.from(new Set(checkCities.map(city => city.continent))).map(el => {
                            return (
                                        <label className='check-label' key={el}>
                                            <input checked={filter.continent.includes(el) ? true : false} onChange={checkHandler} type='checkbox' value={el} /> {el}
                                        </label>
                                    )
                        })
                    }
                </div>
                <div className='flex j-center mt-2'>
                    <input className='search-input' ref={searchRef} onChange={inputHandler} value={filter.name} type="text" placeholder='Search by city name'/>
                </div>
            </div>
            <div className='w-100 min-h flex j-evenly wrap g-5 p-5'>
                {
                    cities.length > 0 ?
                    cities.map(item=> <Card name={item.name} id={item._id} photo={item.photo} key={item._id} description={item.continent}/>) :
                    <h2>No matches in your search</h2>
                }
            </div>
        </div>
      )
}