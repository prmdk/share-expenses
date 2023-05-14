import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import './index.css'
import split from './split.gif'
import ClipLoader from "react-spinners/CircleLoader";
import { useHistory } from 'react-router-dom';

import {isValidSession, Constants} from "../utils/SessionUtils"


export default function Login() {


  //const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  //const [showPassword, setShow] = useState(false)
  const [error,setError]=useState();
  const [errorMsg,setErrorMsg]=useState();
  const history = useHistory();

  if (isValidSession(localStorage))  {
    history.push('/dashboard');
    window.location.reload();
  }
  useEffect(() => {
    if (isValidSession(localStorage)) {
        history.push("/dashboard");
    }
  });

    var index = Math.floor(Math.random() * 10);
  if (index === 9) { index = index - 1 }
  const quote = ["Go ahead -- hold your breath!", "Alt-F4 speeds things up...", "We're working very Hard .... Really", "You are number 2843684714 in the queue", "We are not liable for any broken screens as a result of waiting", "Well, this is embarrassing", "It's not you. It's me", "My other loading screen is much faster", "Web developers do it with <style>"];

  async function login() {

    //credentials
    setLoading(true);
    let item = { username, password }
    let user;
    try {
      let result = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item)
      });
      result = await result.json();
      if (result.error == null) {
        localStorage.setItem(Constants.USER_INFO_KEY, JSON.stringify(result[Constants.USER_INFO_KEY]));
        localStorage.setItem(Constants.JWT_TOKEN_KEY, result[Constants.JWT_TOKEN_KEY]);
        localStorage.setItem(Constants.LAST_ACCESSED_AT_KEY, JSON.stringify(new Date()));
        user = JSON.parse(localStorage.getItem(Constants.USER_INFO_KEY));
        let groups = await fetch(`/api/user/groups/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(Constants.JWT_TOKEN_KEY)
          },
        });
        groups = await groups.json();
        localStorage.setItem(Constants.GROUPS_KEY, JSON.stringify(groups));
        setLoading(false);
        history.push("/dashboard");
      }
      else {
        setLoading(false);
        setError(true);
        setErrorMsg('Incorrect Username or Password!');
        return;
      }
    }
    catch (e) {
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
          <br />
          <p className="login-quote" >{quote[index]}</p>

        </>
        :
        <div className='m-login'>
          <div className='login-s'>
            <p className='login-head'>Expense <span style={{ color: '#674fa3' }}>Sharing</span></p>
            <div className='login-box'>
              <TextField
                error={error}
                label="Username" onChange={(e) => { setUsername(e.target.value) }} />

              <TextField
                required
                error={error}
                helperText={errorMsg}
                name="password"
                type="password"
                label="Password" onChange={(e) => { setPassword(e.target.value) }} />
              <div style={{ textAlign: 'center', backgroundColor: '#674fa3', borderRadius: '0.5vw', cursor: 'pointer' }} onClick={login} >
                <p style={{ color: 'white' }}>Login</p>
              </div>
              <p>Don't have an account?<span onClick={() => { history.push("/register") }} style={{ cursor: 'pointer' }} >Register</span></p>
            </div>
          </div>
        </div>
      }
    </>

  )
}
