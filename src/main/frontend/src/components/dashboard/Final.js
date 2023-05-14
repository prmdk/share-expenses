import React,{useEffect,useState} from 'react'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import "./index.css";
import {Constants} from "../../utils/SessionUtils";

export default function Final({payto,payby,amt}) {
    const[to,setTo] = useState();
    const[by,setBy] = useState();
  
  useEffect( () => {
    async function fetchData() {
    let paidby= await fetch(`/api/user/${payby}`,{
      method:'GET',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
      },});
      paidby = await paidby.json();
      setBy(paidby.userFirstName);
      
    paidby= await fetch(`/api/user/${payto}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
        },});
        paidby = await paidby.json();
        setTo(paidby.userFirstName);
       
    }
    fetchData()
 },[]);
  
  return (
    <div className='m-final'>
        <div className='l-final'>
            <p>{by}</p>
            <DoubleArrowIcon/>
            <p>{to}</p>
        </div>
        <div className='r-final'>
            <p style={{fontSize:'1vw',margin:0,padding:'10px'}}>₹{amt}</p>
        </div>
    </div>
  )
}
