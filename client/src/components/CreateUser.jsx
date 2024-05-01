import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'
import '../App.css';

export default function CreateUser() {

  const navigate = useNavigate();
  const date = new Date();
  const dateString = date.toDateString();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (

    <div className="column login centered">

      <h1 className='h1'>Create New User</h1>

      <TextField 
        id='username-field' 
        label="New username" 
        variant='outlined'
        autoFocus={true}
        fullWidth
        style={{margin:"1em"}}
        onChange={()=>{
            setUsername(document.getElementById('username-field').value);
        }}/>

      <TextField 
        id='password-field' 
        label="New password" 
        variant='outlined'
        fullWidth
        style={{margin:"1em"}}
        onChange={()=>{
            setPassword(document.getElementById('password-field').value);
        }}/>

      <button className='main-button centered' onClick={() => {navigate("/date/"+dateString + "/" + username);}}>Submit</button>

    </div>
  );
}