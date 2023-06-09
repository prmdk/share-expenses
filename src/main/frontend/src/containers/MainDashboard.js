import React,{useState,useEffect} from 'react'
import "./index.css"
import TextField from '@mui/material/TextField';
import TopContainer from '../components/dashboard/TopContainer';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Constants} from "../utils/SessionUtils";

export default function MainDashboard() {
  const[users,setUsers] = useState();
  useEffect( () => {
    async function fetchData() {
     let paidby= await fetch(`/api/user/all`,{
      method:'GET',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
      },});
      paidby = await paidby.json();
      localStorage.setItem('all-users',JSON.stringify(paidby));
      setUsers(paidby);
      console.log(paidby);
    }
    fetchData();
  },[]);

  const [personName, setPersonName] = useState([]);
  const currUser = JSON.parse(localStorage.getItem('user-info'))
  const handleChange = (event) => {
    
    setPersonName(
      // On autofill we get a stringified value.
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
    );
  };
  const [open, setOpen] = useState(false);
  const [grpName,setGrpName] = useState();
  const [grpType,setGrpType] = useState();
  const [grpBudget,setGrpBudget] = useState();
  const grpUser = [];
  const age = 10;
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
  };
  async function creategroup(){
    setOpen(false);
    //credentials
    for(var i=0;i<personName.length;i++){
      grpUser.push({"id":personName[i]})
    }
    console.log(grpUser)
    let item = {
      "grpName":grpName,
      "grpType":grpType,
      "grpBudget":grpBudget,
      "grpUser":grpUser
    }
    console.log(item)
    
    try{
      let result= await fetch('/api/groups/create',{
      method:'POST',
      headers:{
          "Content-Type":"application/json",
          "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
      },
      body:JSON.stringify(item)
      });
      result = await result.json();
      if(result != null || !result.error)
      {
        localStorage.setItem('groups',JSON.stringify(result));
        setOpen(false);
        
      }
      else{
        return;
      }
    }
    catch(e){
    console.log(e);
    }
    let totalgroups= await fetch(`/api/user/groups/${currUser.id}`,{
      method:'GET',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
      },});
      totalgroups = await totalgroups.json();
      localStorage.setItem('groups',JSON.stringify(totalgroups));
    
      window.location.reload();
  }
  return (
    <div className='maindashboard-main'>
        <div className='top-container'>
            <TextField label="Search" className='searchbar'/>
            <div className='top-object' onClick={()=>{setOpen(true)}}>
                <p className='top-text'>Add Group</p>
            </div>
        </div>
        <TopContainer/>
        <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Add Group</p>
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:'10px'}}>
          <TextField label="Name" onChange={(e)=>{setGrpName(e.target.value)}}/>
          <TextField label="Budget" onChange={(e)=>{setGrpBudget(e.target.value)}}/>
          <TextField label="Type" onChange={(e)=>{setGrpType(e.target.value)}} style={{width:'100%'}}/>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Members</InputLabel>
            <Select     
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={personName}
              multiple
              label="Members"
              onChange={handleChange}
            >{users?.map((name) => (
              <MenuItem
                key={name.id}
                value={name.id}
                
              >
                {name.userFirstName}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
          </div>
          <div style={{textAlign:'center',backgroundColor:'#674fa3',borderRadius:'0.5vw',padding:'2px',marginTop:'10px',cursor:'pointer'}}  onClick={()=>{creategroup()}}>
            <p style={{color:'white'}}>Create Group</p>
            </div>
        </Box>
      </Modal>
    </div>
  )
}
