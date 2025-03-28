import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchProfile",
    initialState: {search: ""},
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        }
    }
})

export const {setSearch} = searchSlice.actions
export default searchSlice.reducer