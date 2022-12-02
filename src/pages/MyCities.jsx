import React, {useEffect} from 'react'
import CardCityUser from '../components/CardCityUser'
import { useDispatch, useSelector } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'

export const MyCities = () => {

    const {userCities} = useSelector(state => state.citiesReducer)
    const dispatch = useDispatch()
    const {getUserCities} = citiesActions
    let {id} = useSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(getUserCities(id))
    }, [])

  return (
    <div className="w-100 min-h flex j-evenly wrap g-5 p-5 bg-hotel">
        <div className="w-100">
                <h1 className="text-center">My cities</h1>
            </div>
        {
            userCities.length > 0 ?
            userCities.map(el => {
                return (
                    <CardCityUser key={el._id} cId={el._id} userId={el.userId} name={el.name} photo={el.photo} continent={el.continent} population={Intl.NumberFormat().format(el.population)} />
                )
            }) :
            <h2 className='text-center'>No Cities</h2>
        }
      
    </div>
  )

}
