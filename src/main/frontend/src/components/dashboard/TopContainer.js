import React,{useState,useEffect} from 'react';
import "./index.css";
import Organization from "./Organizations";
import {Constants} from "../../utils/SessionUtils";

export default function TopContainer() {
  let user = JSON.parse(localStorage.getItem('user-info'));
  
  const[group,setGroup] = useState([]);
  useEffect( () => {
    async function fetchData() {
      let groups= await fetch(`/api/user/groups/${user.id}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
        },});
        groups = await groups.json();
        localStorage.setItem('groups',JSON.stringify(groups));
        setGroup(JSON.parse(localStorage.getItem('groups')));
    }
    fetchData()
  },[]);
  
  return (
    <div className='organizations'>
      {
        group?.map(item => (
          <React.Fragment key={item.id}>
          <Organization name={item.groupName} id={item.id}/>
        </React.Fragment>
        ))
      }
    </div>
  )
}
