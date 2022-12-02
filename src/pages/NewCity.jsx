import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiUrl from "../url";
import swal from 'sweetalert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";



export const NewCity = () => {
    let [selectDefault, setSelectDefault] = useState("");
    let navigate = useNavigate();
    let formRef = useRef(null)
    let selectRef = useRef(null)
    let {id, token} = useSelector(state => state.userReducer)

    let notify = (text)=>{
        toast.warn(text, {
            position: "top-center",
            className: "black-background",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    let submit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const values = Object.fromEntries(formData)
        let newCity = {
            name: values.name,
            continent: values.continent,
            photo: values.photo,
            population: values.population,
            userId: id,
        };
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
            axios.post(`${apiUrl}/cities`, newCity, headers)
                .then((res) => {
                    if(res.data.success){
                        let id = res.data.id
                        swal({
                            title:'success',
                            text:res.data.message,
                            icon:'success',
                        })
                        navigate(`/cities/${id}`)
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
    };
    let handleSelect = (e) => {
        setSelectDefault(selectRef.current.value);
    };

    return (
        <div className="w-100 h-75 flex f-column g-3 new-div  form-log">
            <h1 className="text-center">New City</h1>
            <form className="new-form flex f-column g-1  fs-3 fw" onSubmit={submit} ref={formRef}>
                <label className="inputs flex f-column">
                    <legend>City name</legend>
                    <input className="fs-2" type="text" name="name" placeholder="Enter city name..." required />
                </label>
                <label className="inputs flex f-column">
                    <legend>Choose continent</legend>
                    <select className="fs-2" name="continent" value={selectDefault} onChange={handleSelect} ref={selectRef} required>
                        <option disabled value={""}>
                            Select a continent
                        </option>
                        <option value="Africa">Africa</option>
                        <option value="Antartica">Antartica</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </label>
                <label className="inputs flex f-column">
                    <legend>Population</legend>
                    <input className="fs-2" type="number" name="population" min={1} placeholder="Enter city population..." required />
                </label>
                <label className="inputs flex f-column">
                    <legend>Url photo</legend>
                    <input className="fs-2" type="url" name="photo" placeholder="Enter city URL image" required/>
                </label>
                <div className="new-buttons flex j-evenly">
                    <input className="w-50 fs-2 btn" type="reset" value="Clear Form" />
                    <input className="w-50 fs-2 btn" type="submit" value="Submit" />
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};
