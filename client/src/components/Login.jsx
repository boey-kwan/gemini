import { Link, useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'
import '../App.css';
import { useState } from "react";

export default function Login() {

  const navigate = useNavigate();
  const date = new Date();
  const dateString = date.toDateString();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (

    <div className="column login centered">

      <h1 className='h1'>Log in</h1>

      <TextField 
        id='username-field' 
        label="Username" 
        variant='outlined'
        autoFocus={true}
        fullWidth
        style={{margin:"1em"}}
        onChange={()=>{
            setUsername(document.getElementById('username-field').value);
        }}/>

      <TextField 
        id='password-field' 
        label="Password" 
        variant='outlined'
        fullWidth
        style={{margin:"1em"}}
        onChange={()=>{
            setPassword(document.getElementById('password-field').value);
        }}/>

      <button className='main-button centered'>
        <Link to={`/date/${dateString}/${username}`}>Log in</Link>
      </button>

    </div>
  );
}