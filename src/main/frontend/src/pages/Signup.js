import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import './index.css'
import split from './split.gif'
import ClipLoader from "react-spinners/CircleLoader";
import { useHistory } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';


export default function Signup({}) {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [loading,setLoading] = useState();
  const [firstName,setFirstName]= useState();
  const [lastName,setLastName] = useState();
  const [showPassword,setShow] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [dirty, setDirty] = useState(false);
    const props = {
      helperText: "Enter a valid email"
    };
    const handleChange = event => {
        const val = event.target.value;                
        
        if(isEmail(val)) {
            setIsValid(true);
        } else {
            setIsValid(false);              
        }
        
        setEmail(val);
    }

  const history = useHistory();
  if(localStorage.getItem('user-info')){
    history.push('/dashboard')
    window.location.reload();
  }
  useEffect(()=> {
    if(localStorage.getItem('user-info')) {
        history.push("/dashboard")
    }
  }, [])
  var index = Math.floor(Math.random() * 10);
  if(index===9)
  {index=index-1}
  const quote = ["Go ahead -- hold your breath!","Alt-F4 speeds things up...","We're working very Hard .... Really","You are number 2843684714 in the queue","We are not liable for any broken screens as a result of waiting","Well, this is embarrassing","It's not you. It's me","My other loading screen is much faster","Web developers do it with <style>"];

  async function signup(){
        
    //credentials
    setLoading(true);
    let item = {
      "userFirstName":firstName,
      "userLastName":lastName,
      "userName":email,
      "userPassword":password,
      "userMatchingPassword":password
    }
    let user;
    try{
      let result= await fetch('/api/user/register',{
      method:'POST',
      headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify(item)
      });
      result = await result.json();
      if(result.error == null)
      {
        localStorage.setItem('user-info',JSON.stringify(result["user-info"]));
        localStorage.setItem('jwtToken',JSON.stringify(result["jwtToken"]));
        user = JSON.parse(localStorage.getItem('user-info'));
        history.push("/login");     
      }
      else{
        setLoading(false);
        setApiError(true);
        return;
      }
    }
    catch(e){
      setLoading(false);
        setApiError(true);
        
    console.log(e);
    }
    
}
  return (
    <>
            {loading ?
            <>
            <div className="login-screen">
            <ClipLoader color={'#C715DE'} loading={loading} size={100} />
            </div>
            <br/>
            <p className="login-quote" >{quote[index]}</p>   
        
            </>
            :
            <div className='m-login'>
            <div className='login-s'>
            <p className='login-head'>Expense <span style={{color:'#674fa3'}}>Sharing</span></p>
            <div className='login-box'>
            <TextField
              error={apiError}
               label="First Name" onChange={(e)=>{setFirstName(e.target.value)}}/>
          
            <TextField error={apiError} label="Last Name" onChange={(e)=>{setLastName(e.target.value)}}/>
            <TextField         
                    error={apiError || (dirty && isValid === false)}                                        
                    onBlur={() => setDirty(true)}
                    label="Email"
                    variant="outlined" 
                    helperText={dirty && isValid === false ? props.helperText:''}
                    onChange={(e) => handleChange(e)}
                    style={{marginTop: 1}}
                />
            <TextField 
           error={apiError}
            required
            
            name="password"
            
            type={showPassword?"text":"password"}
            label="Password" onChange={(e)=>{setPassword(e.target.value)}}
            helperText={apiError ? 'User Registration failed, Please check Input Data!':''}
            />
            <div style={{textAlign:'center',backgroundColor:'#674fa3',borderRadius:'0.5vw',cursor:'pointer'}} onClick={signup} >
            <p style={{color:'white'}}>Sign Up</p>
            </div>
                {/* <button className='login-button' placeholder='Login' /> */}
            </div>
            <p>Have an account?<span onClick={()=>{history.push("/login")}} style={{cursor:'pointer'}} > Sign in </span></p>

            </div>
            </div>
            }
            </>
    
  )
}
