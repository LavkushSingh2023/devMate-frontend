import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("t21425814@gmail.com")
    const [password, setPassword] = useState("LsT@00000")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try{
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, {withCredentials: true})
            dispatch(addUser(res?.data?.user))
            return navigate("/")
        }catch(err){
            setError(err?.response?.data)
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="card bg-base-100 image-full w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title flex justify-center">LogIn</h2>
                        <div>
                            <label htmlFor="emailId">EmailId</label>
                            <br />
                            <input
                                type="text"
                                id="emailId"
                                className="m-2 p-2 rounded"
                                value={emailId} 
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                            <br />
                            <label htmlFor="password">Password</label>
                            <br />
                            <input
                                type="password"
                                id="password"
                                className="m-2 p-2 rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="card-actions justify-center">
                            <p className="text-red-700">{error}</p>
                            <button className="btn btn-primary" onClick={handleLogin}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
