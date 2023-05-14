import React,{useState,useEffect} from 'react';
import "./index.css";
import {Constants} from "../../utils/SessionUtils";

export default function OutlineBox ({id}) {
  const[paidBy,setPaidBy] = useState();
  useEffect( () => {
    async function fetchData() {
     let paidby= await fetch(`/api/user/${id}`,{
      method:'GET',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
      },});
      paidby = await paidby.json();
      setPaidBy(paidby);
      //console.log(paidby);
    }
    fetchData()
  },[]);
   return (
     
    <div className="outlinebox">
        <p className='box-text'>{paidBy?.userFirstName}</p>
    </div>
     
  )
}
