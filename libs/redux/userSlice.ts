import { createSlice } from "@reduxjs/toolkit";

export type UserState={
    id:string;
    profilePhoto:string;
}

const initialState={
    id:"",
    profilePhoto:"",

}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        
    }
})

export const {}=userSlice.actions
export default userSlice.reducer