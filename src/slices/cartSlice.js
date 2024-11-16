import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast';


const initialState = {
    totalItems : localStorage.getItem("totalItems") ?
    JSON.parse(localStorage.getItem("totalItems")) : 0
}

const authSlice = createSlice({
    name: "cart",
    initialState:initialState,

    reducers:{
        setTotalItems(state,value){
            state.totalItems =  value.payload;
        },
    }
})

export const {setTotalItems} = authSlice.actions;
export default authSlice.reducer;