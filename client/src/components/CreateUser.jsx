import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'
import '../App.css';

export default function CreateUser() {

  const navigate = useNavigate();

  return (

    <div className="column login centered">

      <h1 className='h1'>Create New User</h1>

      <TextField 
        id='username-field' 
        label="New username" 
        variant='outlined'
        autoFocus={true}
        fullWidth
        style={{margin:"1em"}}/>

      <TextField 
        id='password-field' 
        label="New password" 
        variant='outlined'
        fullWidth
        style={{margin:"1em"}}/>

      <button className='main-button centered' onClick={() => {navigate("/today");}}>Submit</button>

    </div>
  );
}