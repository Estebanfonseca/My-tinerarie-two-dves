import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../url";

const getShow = createAsyncThunk('getShow',async(id)=>{
    try{
        let res = await axios.get(`${apiUrl}/shows?userID=${id}`)
        return {
            show: res.data.response
        }
    }catch (error) {
        return{
            error: 'Error'
        }
    }
})

const deleteShow = createAsyncThunk('deleteShow',async(datos)=>{
    let id = datos.id
    let token = datos.headers
    let coment = datos.comment
    try{
        let res = await axios.delete(`${apiUrl}/shows/${id}`,coment,token)
        return {
            _id: res.data.response._id
        }
    }catch (error) {
        return{
            error: 'Error'
        }
    }
})
const createShow = createAsyncThunk('createShow',async(datos)=>{
    try{
        let res = await axios.post(`${apiUrl}/shows${datos}`)
        return {
            show:res.data.response
        }
    }catch (error) {
        return{
            error: 'Error'
        }
    }
})

const showsActions = {
    getShow,
    deleteShow,
    createShow
}

export default showsActions