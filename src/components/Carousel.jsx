import React, { useState, useEffect } from "react";
import Arrow from "./Arrow";
import Photo from "./Photo";
import { useSelector, useDispatch } from "react-redux";
import hotelsActions from "../redux/actions/hotelsAction";
import citiesActions from "../redux/actions/citiesActions";

export default function Carousel() {

    let {getHotels} = hotelsActions
    let {getCities} = citiesActions
    let dispatch = useDispatch()
    let {hotels} = useSelector(state => state.hotelReducer)
    let {cities} = useSelector(state => state.citiesReducer)
    let [num1, setNum1] = useState(0)
    let [num2, setNum2] = useState(0)
    let [num3, setNum3] = useState(4)
    let [num4, setNum4] = useState(4)
    let [count, setCount] = useState(0)
    let [idInt, setIdInt] = useState(0)


    useEffect(() => {
        dispatch(getHotels())
        dispatch(getCities())
    }, [])

    useEffect(() => {
        let idinterval = setInterval(() => {
            next();
        }, 5000);
        setIdInt(idinterval)
        return () =>
        clearInterval(idinterval);
    }, [count]);

    let prev = () => {
        num1 > 0 ? setNum1(--num1) : setNum1(cities.length - 1)
        num2 > 0 ? setNum2(--num2) : setNum2(hotels.length - 1)
        num3 > 0 ? setNum3(--num3) : setNum3(cities.length - 1)
        num4 > 0 ? setNum4(--num4) : setNum4(hotels.length - 1)
        clearInterval(idInt)
        setCount(++count)
    }
    let next = () => {
        num1 < cities.length - 1 ? setNum1(++num1) : setNum1(0)
        num2 < hotels.length - 1 ? setNum2(++num2) : setNum2(0)
        num3 < cities.length - 1 ? setNum3(++num3) : setNum3(4)
        num4 < hotels.length - 1 ? setNum4(++num4) : setNum4(4) 
        clearInterval(idInt)
        setCount(++count)
    }

    return (
        <div className="flex w-100">
            <Arrow dir="<" onClick={prev}></Arrow>
            <div className='carousel'>
                {hotels.length > 0 && cities.length > 0 ?
                <>
                <Photo id={cities[num1]._id} photo={cities[num1].photo} name={cities[num1].name}></Photo>
                <Photo id={hotels[num2]._id} photo={hotels[num2].photo} name={hotels[num2].name}></Photo>
                <Photo id={cities[num3]._id} photo={cities[num3].photo} name={cities[num3].name}></Photo>
                <Photo id={hotels[num4]._id} photo={hotels[num4].photo} name={hotels[num4].name}></Photo>
                </> :
                <></>}
            </div>
            <Arrow dir=">" onClick={next}></Arrow>
        </div>
    );
}