import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import "../App.css";
import { useState } from "react";

export default function Login(props) {
	const navigate = useNavigate();
	const date = new Date();
	const dateString = date.toDateString();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("");

	return (
    <div className="row" style={{justifyContent: 'center', columnGap: '5%'}}>

      <div className="column login shadowed-card strong-shadow" >
        <h1 className='h1'>Log in</h1>
        <br/>

        <TextField 
          id='username-field' 
          label="Username" 
          variant='outlined'
          fullWidth
          onChange={()=>{
            setUsername(document.getElementById('username-field').value);
          }}
        />

        <TextField 
            id='password-field' 
            label="Password" 
            variant='outlined'
            fullWidth
            onChange={()=>{
              setPassword(document.getElementById('password-field').value);
            }}/>

        <button className='main-button outlined centered' onClick={() => {
          localStorage.setItem('username', username);
          localStorage.setItem('loggedIn', true);
          props.setLoggedIn(true);
          navigate("/home/"+ username);
        }}>Submit</button>
      </div>

      <div className="column login shadowed-card strong-shadow" >
        
        <h1 className='h1'>Create New User</h1>
        <br/>

        <TextField 
          id='new-username-field' 
          label="New username" 
          variant='outlined'
          fullWidth
          value={newUsername}
          onChange={()=>{
              setNewUsername(document.getElementById('new-username-field').value);
          }}/>

        <TextField 
          id='new-password-field' 
          label="New password" 
          variant='outlined'
          fullWidth
          value={newPassword}
          onChange={()=>{
              setNewPassword(document.getElementById('new-password-field').value);
          }}/>

        <button className='main-button outlined centered' onClick={() => {
          localStorage.setItem('username', newUsername);
          localStorage.setItem('loggedIn', "true");
          props.setLoggedIn(true);
          window.location.reload();
          navigate("/home/"+ newUsername);
          }}>Submit</button>

      </div>
    </div>
  );
}
