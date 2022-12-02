import React, {  useEffect } from "react";
import Carduser from "../components/CardUser";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import hotelsActions from "../redux/actions/hotelsAction";


export default function MyHotels() {

    let {userHotels}= useSelector(state=>state.hotelReducer)
    let dispatch = useDispatch()
    let {getHotelsUser,deleteHotel} = hotelsActions
    let navigate = useNavigate()
    let{id} = useSelector(state => state.userReducer)
    useEffect(() => {
        dispatch(getHotelsUser(id))
    }, []);

let Delete = (e)=>{
    let id = e.target.value
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
        swal("!has been deleted!", {
            icon: "success",
        });
        dispatch(deleteHotel(id))
        } else {
        swal("Your hotel is safe!");
        }
        navigate('/myhotels')
    });
}



    return (
        <div className="w-100 min-h flex j-evenly wrap g-5 p-5 bg-hotel">
            <div className="w-100">
                <h1 className="text-center">My hotels</h1>
            </div>
            {userHotels.length > 0 ? userHotels.map((item) => <Carduser hotel={true} name={item.name}   erase={Delete} photo={item.photo} key={item._id} id={item._id} capacity={item.capacity} />) : <h2 className="min-h-50">Hotels not found</h2>}
        </div>
    );
}
