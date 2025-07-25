import { setAllAppliedJobs } from "@/redux/jobSlice";

import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
const  APPLICATION_API_END_POINT = import.meta.env.VITE_APPLICATION_API;

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;