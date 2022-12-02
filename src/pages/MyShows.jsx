import React, { useEffect ,useState} from "react";
import Carduser from "../components/CardUser";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import showsActions from "../redux/actions/showAction";
import CreateShow from "../components/CreateShow";


export default function MyShows({id}) {
    let {show} = useSelector(state=>state.showsReducer)
    let navigate = useNavigate()
    let {getShow,deleteShow}= showsActions
    let dispatch = useDispatch()
    let [push,setPush]= useState(false)
    let {token} = useSelector(state=>state.userReducer)
    



    useEffect(() => {
        dispatch(getShow(id))
        
    }, []);

    


    let erase = (e)=>{
    let id = e.target.value
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    let datos = {
        id,
        headers
    }
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
        dispatch(deleteShow(datos))
        } else {
        swal("Your show is safe!");
        }
        navigate('/myshows')
    });
    
    
}


    return (
        <div className="w-100 min-h flex j-evenly wrap g-5 p-5 bg-hotel">
            <div className="w-100">
                <h1 className="text-center">My shows</h1>
                <button className="btn" onClick={()=>setPush(!push)}>Add New Show</button>
                {push?(<CreateShow id={id} />): ''}
            </div>
            {show.length > 0 ? show.map((item) => <Carduser show={true} name={item.name}  erase={erase} photo={item.photo} key={item._id} id={item._id} date={item.date.slice(0,10) } description={item.description} price={item.price.toFixed(2)} />) : <h2 className="min-h-50">Hotels not found</h2>}
        </div>
    );
}
