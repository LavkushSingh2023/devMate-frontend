import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios"
import { useDispatch } from "react-redux"
import {BASE_URL} from "../utils/constants"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [Age, setAge] = useState(user.Age)
    const [gender, setGender] = useState(user.gender)    
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const saveProfile = async () => {
        try{
            setError("")
            const res = await axios.patch(BASE_URL + "/profile/edit", 
                {firstName, lastName, Age, gender, photoUrl},
                {withCredentials: true}
            )
            dispatch(addUser(res?.data?.["Updated User"]))
            return navigate("/profile")
        }catch(err){
            console.log("ERROR in saving data: " + err)
            setError("Failed to save profile. Please try again.");
        }
    }

    return (
        <div className="flex justify-center my-16">
            <div className="flex justify-center ">
                <div className="card bg-base-100 image-full w-96 shadow-xl m-5">
                    <div className="card-body">
                        <h2 className="card-title flex justify-center">Edit Profile</h2>
                        <div>
                            <label htmlFor="firstName">firstName</label>
                            <br />
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="m-2 p-2 rounded"
                            />
                            <br />
                            <label htmlFor="text">lastName</label>
                            <br />
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="m-2 p-2 rounded"
                            />
                            <br />                        
                            <label htmlFor="text">photo URL</label>
                            <br />
                            <input
                                type="text"   
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}                             
                                className="m-2 p-2 rounded"
                            />
                            <br />
                            <label htmlFor="text">Age</label>
                            <br />
                            <input
                                type="number"
                                value={Age}
                                onChange={(e) => setAge(e.target.value)}
                                className="m-2 p-2 rounded"
                            />
                            <br />
                            <label htmlFor="text">gender</label>
                            <br />
                            <select name="gender" id="" value={gender} onChange={(e) => setGender(e.target.value)} className="m-2 p-2 rounded">
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="others">others</option>
                            </select>
                        </div>
                        <div className="card-actions justify-center">
                            <p className="text-red-700">{error}</p>
                            <button className="btn btn-primary" onClick={saveProfile}>
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-5">
                <UserCard user={{firstName, lastName, photoUrl, Age, gender}}/>
            </div>            
        </div>
    )
}
      
export default EditProfile