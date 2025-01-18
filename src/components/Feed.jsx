import { useDispatch, useSelector } from "react-redux"
import UserCard from "./UserCard"
import { useEffect } from "react"
import axios from "axios"
import {BASE_URL} from "../utils/constants"
import { addFeed } from "../utils/feedSlice"

const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch()

    const getFeed = async () => {
    if (feed.length > 0) return;

    try {
        const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
        dispatch(addFeed(res?.data));
    } catch (err) {
        console.error("API Error:", err);
    }
    };

    useEffect(() => {
        getFeed()
    },[])

    return(
        <div className="flex justify-center my-24">
            {feed?.length > 0 ? <UserCard user={feed[0]} /> : <p>Loading...</p>}
        </div>
    )
}

export default Feed