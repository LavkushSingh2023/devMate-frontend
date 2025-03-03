import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile", 
    initialState: {
        showProfile: false
    },
    reducers: {
        toggleProfile: (state) => {
            state.showProfile = !state.showProfile
        }, 
        hideProfile: (state) => {
            state.showProfile = false
        }
    }
})

export const {toggleProfile, hideProfile} = profileSlice.actions
export default profileSlice.reducer