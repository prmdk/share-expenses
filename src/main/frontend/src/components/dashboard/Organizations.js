import React,{useEffect,useState} from 'react'
import Events from './Events'
import "./index.css"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import BalanceIcon from '@mui/icons-material/Balance';
import Final from './Final';
import { useHistory } from 'react-router-dom'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Constants} from "../../utils/SessionUtils";

export default function Organizations(props) {
  const name = props.name;
  const id = props.id;
  const[expenses,setExpenses] = useState();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const[split, setSplit]=useState(false);
  const [totalExpense,setTotalExpense] = useState(0);
  const[finalSplit,setFinalSplit]=useState([]);
  const[users,setUsers] = useState();
  const curruser = JSON.parse(localStorage.getItem("user-info"))

  const[expName,setExpName] = useState();
  const[expAmt,setExpAmt] = useState();
  const[expPaidBy,setExpPaidBy] = useState();
  const[expGrp,setExpGrp] = useState();
  const [personName, setPersonName] = useState([]);
  const[selectUsers,setSelectUsers]= useState([]);
  var usrSplitBtw = [];
  
  
  useEffect( () => {
    async function fetchData() {
     let expenses= await fetch(`/api/groups/expenses/${id}`,{
      method:'GET',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
      },});
      expenses = await expenses.json();
      setExpenses(expenses);
      let totalExp = 0;
      for(var i=0;i<expenses.length;i++){
        totalExp += expenses[i].expAmt;
      }
      setTotalExpense(totalExp);
      if(users==null){ 
     let paidby= await fetch(`/api/groups/users/${id}`,{
      method:'GET',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
      },});
      paidby = await paidby.json();
      setUsers(paidby);
      setSelectUsers(paidby);
    }
    }
    fetchData();

  },[]);


  const handleChange = (event) => {
    
    setPersonName(
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
    );
  };

  const openBox = (grpId) => {
    setSplit(false);
    setExpGrp(grpId);
    setOpen(true);
  }

async function gameOn() {
      if(split){
        setSplit(false)
      }
      else{
      try{
      let paidby=  await fetch(`/api/FinalSplit/${id}`,{
      method:'GET',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Autorization":"Bearer " + localStorage.getItem(Constants.JWT_TOKEN_KEY)
      },});
      paidby = await paidby.json();
      if(paidby != null)
      {
        setFinalSplit(paidby);
        console.log(paidby)
        setSplit(true);
      }
      else{
        return;
      }
      
    }
    catch(e){
      console.log(e);
    }
  }
  }

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
  async function createExpense(){
    setOpen(false);
    //credentials
    for(var i=0;i<personName.length;i++){
      usrSplitBtw.push({"id":personName[i]})
    }
    
    let item = {
      "expName":expName,
      "expAmt":expAmt,
      "expPaidBy":expPaidBy,
      "usrSplitBtw":usrSplitBtw,
      "expGrp":{"id":expGrp}
    }
    console.log(item)
    
    try{
      let result= await fetch('/api/expense/create',{
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
        setOpen(false); 
      }
      else{
        return;
      }
    }
    catch(e){
    console.log(e);
    }
    window.location.reload();
   
  }
  
  return (
    <>
    {split ?
    <>
    <div className='org-main'>
        <div className='org-heading'>
            <p className='org-name'>{name}</p>
            <div className='org-icons'>
                <div onClick={()=>{gameOn()}} style={{cursor:'pointer'}}><BalanceIcon style={{fontSize:"20px"}} /></div>
                <div onClick={()=>{openBox(id)}} style={{cursor:'pointer'}}  ><AddIcon style={{fontSize:"20px"}} /></div>
                {/* <div onClick={()=>{deleteGroup(id)}}  style={{cursor:'pointer'}}><DeleteOutlineIcon style={{fontSize:"20px"}} /></div> */}
            </div>
        </div>
    
        {
          finalSplit?.map(post=>(
            <React.Fragment key={post.id}>
              <Final payto={post.finalPayTo} payby={post.finalPayBy} amt={post.finalAmt} />
            </React.Fragment>
          )
          )
        }
        <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Add Expense</p>
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:'10px'}}>
          <TextField label="Name" onChange={(e)=>{setExpName(e.target.value)}}/>
          <TextField label="Amount" onChange={(e)=>{setExpAmt(e.target.value)}}/>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={expPaidBy}
            onChange={(e)=>{setExpPaidBy(e.target.value)}}
            input={<OutlinedInput placeholder='Members' />}
            style={{width:'100%'}}
          >
          {users?.map((name) => (
            <MenuItem
              key={name.id}
              value={name.id}
              
            >
              {name.userFirstName}
            </MenuItem>
          ))}
        </Select>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
           
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput placeholder='Members' />}
            style={{width:'100%'}}
          >
          {users?.map((name) => (
            <MenuItem
              key={name.id}
              value={name.id}
              
            >
              {name.userFirstName}
            </MenuItem>
          ))}
        </Select>
          </div>
          <div style={{textAlign:'center',backgroundColor:'#674fa3',borderRadius:'0.5vw',padding:'2px',marginTop:'10px',cursor:'pointer'}}  onClick={()=>{createExpense()}} >
            <p style={{color:'white'}}>Add Expense</p>
            </div>
        </Box>
      </Modal>
    </div>
    </>
    :
    <div className='org-main'>
        <div className='org-heading'>
            <p className='org-name'>{name}</p>
            <div className='org-icons'>
                <div onClick={()=>{gameOn()}} style={{cursor:'pointer'}}><BalanceIcon style={{fontSize:"20px"}} /></div>
                <div onClick={()=>{openBox(id)}} style={{cursor:'pointer'}}  ><AddIcon style={{fontSize:"20px"}} /></div>
                <div><p>₹{totalExpense}</p></div>
                {/* <div onClick={()=>{deleteGroup(id)}}  style={{cursor:'pointer'}}><DeleteOutlineIcon style={{fontSize:"20px"}} /></div> */}
            </div>
        </div>
        {
          expenses?.map(post => (
            <React.Fragment key={post.id}>
              <Events name={post.expName} paidBy={post.expPaidBy} amt={post.expAmt} />
            </React.Fragment>
          ))
        }
        <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Add Expense</p>
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:'10px'}}>
          <TextField label="Name" onChange={(e)=>{setExpName(e.target.value)}}/>
          <TextField label="Amount" onChange={(e)=>{setExpAmt(e.target.value)}}/>
          <FormControl fullWidth>
          <InputLabel id="paidby-select-label">Paid By</InputLabel>
          <Select
            labelId="paidby-select-label"
            id="paidby-simple-select"
            value={expPaidBy}
            label="Paid By"
            onChange={(e)=>{setExpPaidBy(e.target.value)}}            
          >
          {users?.map((name) => (
            <MenuItem
              key={name.id}
              value={name.id}              
            >
              {name.userFirstName}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <FormControl style={{width:'100%'}}>
          <InputLabel id="splitbw-select-label">Split Between</InputLabel>
          <Select
            labelId="splitbw-select-label"
            id="demo-multiple-name"
            multiple
            value={personName}
            onChange={handleChange}
            label="Split Between"
           
          >
          {users?.map((name) => (
            name.id != expPaidBy ?
            <MenuItem
              key={name.id}
              value={name.id}
              
            >
              {name.userFirstName}
            </MenuItem>
            :
            <>
            </>
          ))}
        </Select>
        </FormControl>
          </div>
          <div style={{textAlign:'center',backgroundColor:'#674fa3',borderRadius:'0.5vw',padding:'2px',marginTop:'10px',cursor:'pointer'}}  onClick={()=>{createExpense()}} >
            <p style={{color:'white'}}>Add Expense</p>
            </div>
        </Box>
      </Modal>
        
    </div>
}
</>
  )
}
