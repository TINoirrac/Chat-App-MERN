import axios from "axios"
import { searchUsersRoute } from "../api/apiRoutes"

export const searchServices=async(q)=>{
    try{
        const res = await axios.get(`${searchUsersRoute}/${q}`)
        console.log(res)
        return res.data
    }catch(error){
        console.log(error)
    }
}