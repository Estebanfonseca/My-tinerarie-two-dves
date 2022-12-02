import React, {useEffect} from "react";
import NotFoundPage from "./pages/NotFoundPage";
import {Routes, Route} from 'react-router-dom'
import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import {SignUp} from './pages/SignUp.jsx'
import Login from "./pages/SingIn";
import Hotels from "./pages/Hotels";
import { Cities } from "./pages/Cities";
import { City } from "./pages/City";
import { NewCity } from "./pages/NewCity";
import { Hotel } from "./pages/Hotel";
import NewHotel from "./pages/NewHotel";
import MyHotels from "./pages/MyHotels";
import { MyCities } from "./pages/MyCities";
import { CityEdit } from "./pages/CityEdit";
import MyShows from "./pages/MyShows";
import { MyItineraries } from "./pages/MyItineraries";
import { ItineraryEdit } from "./pages/ItineraryEdit";
import { useDispatch, useSelector } from "react-redux";
import userActions from "./redux/actions/userAction";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { NewItinerary } from "./pages/NewItinerary";
import { NewReaction } from "./pages/NewReaction";
import { MyReactions } from "./pages/MyReactions";


function App() {

  let {signToken} = userActions
  let dispatch = useDispatch()
  let {logged, role,id} = useSelector(state => state.userReducer)
  
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'))
    if(token){
      dispatch(signToken(token.token.user))
    }
  }, [logged])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp userRole={'user'}/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/Hotels" element={<Hotels/>}/>
        <Route path="/Hotels/:id" element={<Hotel/>}/>
        <Route path="/cities" element={<Cities/>}/>
        <Route path="/cities/:id" element={<City/>}/>
        <Route element={<ProtectedRoute isAllowed={!!logged} reDirect={'/'}/> }>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/myreactions" element={<MyReactions/>}/>
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!logged && role === 'admin'} reDirect={'/'}/> }>
          <Route path="/newcity" element={<NewCity/>}/>
          <Route path="/editcity/:id" element={<CityEdit/>}/>
          <Route path="/mycities" element={<MyCities/>} />
          <Route path="/newhotel" element={<NewHotel/>}/>
          <Route path="/myhotels" element={<MyHotels />}/>
          <Route path="/newreaction" element={<NewReaction/>}/>
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!logged && role === 'user'} reDirect={'/'}/>}>
          <Route path="/myitineraries" element={<MyItineraries/>}/>
          <Route path="/newitinerary" element={<NewItinerary/>}/>
          <Route path="/edititinerary/:id" element={<ItineraryEdit/>}/>
          <Route path="/myshows" element={<MyShows id={id}/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </Layout>  
  );
}

export default App;