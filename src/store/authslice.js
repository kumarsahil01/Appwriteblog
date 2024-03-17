import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
           state.status=true,
           state.userData=action.payload
        },
        logout:(state,payload)=>{
           state.status=false,
           state.userData=null
        }
    }
})

//when we have to export the reducer function we use the actions 
export const {login,logout} =authSlice.actions
export default authSlice.reducer