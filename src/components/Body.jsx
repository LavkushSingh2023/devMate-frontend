import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import {addUser} from "../utils/userSlice"

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store) => store.user)

    const  fetchUser = async () => {
        if(userData) return
        
        try{
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true
            })
            
            dispatch(addUser(res.data))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return(
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
                <Footer />
            </div>
        </>
    )
}

export default Body