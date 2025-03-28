import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import loginReducer from "./showLoginSlice"
import profileReducer from "./showProfileSlice"
import searchProfileReducer from "./searchSlice"

const appStore = configureStore({
    reducer: {
        loggedInUser: userReducer,
        login: loginReducer,
        profile: profileReducer,
        searchProfile: searchProfileReducer
    }
})

export default appStore