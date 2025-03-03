import {createSlice} from "@reduxjs/toolkit"

const showLoginSlice = createSlice({
    name: "login",
    initialState: {showLogin: true},
    reducers: {
        show: (state) => { 
            state.showLogin = true
        },
        hide: (state) => {
            state.showLogin = false
        }
    }
})

export const {show, hide} = showLoginSlice.actions
export default showLoginSlice.reducer
