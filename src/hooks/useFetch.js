import {useState,useEffect} from 'react';
import axios, { Axios }  from 'axios';

const useFetch=(url)=>{
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);

    useEffect(()=>{
        const fetchData=async ()=>{
            setLoading(true);
            try { 
                const config = {
                    headers: {
                    'Accept-Encoding': 'gzip, deflate, br'
                    }
                };
               await axios.get(url,config).then((res)=>{
                console.log('Accept-Encoding status:', res.status);
                setData(res.data);
                console.log(res)
               });
               
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }   
        fetchData();
        
    },[url])
    const refetch=async ()=>{
            setLoading(true);
            try {
                 const res=await axios.get(url);
                 setData(res.data);
                 console.log(res.data)
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        return {data,loading,error,refetch}     
        
}
export default useFetch;