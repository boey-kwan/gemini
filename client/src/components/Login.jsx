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
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (

    <div>

      <div className="column login centered">

      <h1 className='h1'>Log in</h1>

      <TextField 
        id='username-field' 
        label="Username" 
        variant='outlined'
        fullWidth
        style={{margin:"1em"}}
        onChange={()=>{
          setUsername(document.getElementById('username-field').value);
        }}
      />

      <TextField 
          id='password-field' 
          label="Password" 
          variant='outlined'
          fullWidth
          style={{margin:"1em"}}
          onChange={()=>{
            setPassword(document.getElementById('password-field').value);
          }}/>

      <button className='main-button centered' onClick={() => {
          navigate("/home/"+ username);

      }}>Submit</button>

    <div className="column login centered">
      
      <h1 className='h1'>Create New User</h1>

      <TextField 
        id='new-username-field' 
        label="New username" 
        variant='outlined'
        fullWidth
        style={{margin:"1em"}}
        value={newUsername}
        onChange={()=>{
            setNewUsername(document.getElementById('new-username-field').value);
        }}/>

      <TextField 
        id='new-password-field' 
        label="New password" 
        variant='outlined'
        fullWidth
        style={{margin:"1em"}}
        value={newPassword}
        onChange={()=>{
            setNewPassword(document.getElementById('new-password-field').value);
        }}/>

      <button className='main-button centered' onClick={() => {
        navigate("/home/"+ newUsername);
        }}>Submit</button>

    </div>

      </div>
        
    </div>
  );
}