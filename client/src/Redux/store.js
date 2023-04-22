
import {configureStore} from '@reduxjs/toolkit'
import usernameReducer from './usernameReducer'
import  userImageReducer from './userImageReducer'
import userFollowingReducer from './userFollowingReducer'


const store=configureStore({
    reducer:{
        username:usernameReducer
        ,
        userImage:userImageReducer,
        userFollowing:userFollowingReducer

    }    
})

export default store;