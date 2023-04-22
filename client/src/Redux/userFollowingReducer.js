import {createSlice} from '@reduxjs/toolkit'

const userFollowingSlice=createSlice({
    name:'userFollowing',
    initialState:'0',
    reducers:{
        changeFollowing:(state,action)=>{
            return action.payload
        }
    },
    extraReducers:{
        logout:()=>{
            return false;
        }
    }
})

export const {changeFollowing}=userFollowingSlice.actions

export default userFollowingSlice.reducer;