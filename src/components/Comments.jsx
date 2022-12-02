import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewComment from './NewComment'
import commentActions from '../redux/actions/commentAction'
import ComentEdit from './ComentEdit';
import swal from "sweetalert";

export default function Comments({show, itin}) {
let {comment} = useSelector(store=>store.comentReducer)
let dispatch = useDispatch()
let {token} = useSelector(store=>store.userReducer)
let {getComent,delComent} = commentActions

let req = {
  itin,show
}
useEffect(()=>{
 dispatch(getComent(req))
},[])

let headers = {headers: {'Authorization': `Bearer ${token}`}}

    let erase = (e)=>{
        let id = e.target.value
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
            dispatch(delComent(datos))
            dispatch(getComent(req))
            } else {
            swal("Your comment is safe!");
            }
        });
      }


  return (
    <div className='w-100 coment-body' >
        <h3 className='text-center'>Comments</h3>
        <NewComment show={show} itin={itin}/>
        {
            comment.length > 0 ? comment.map(item=> <ComentEdit key={item._id} user={item.userID._id} erase={erase} show={show} itin={itin} _id={item._id} photo={item.userID.photo} coments={item.comment} name={item.userID.name} />):''
        }
        
    </div>
  )
}
