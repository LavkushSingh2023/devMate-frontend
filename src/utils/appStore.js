import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import loginReducer from "./showLoginSlice"
import profileReducer from "./showProfileSlice"

const appStore = configureStore({
    reducer: {
        loggedInUser: userReducer,
        login: loginReducer,
        profile: profileReducer
    }
})

export default appStore