import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'
import '../App.css';

export default function Login() {

  const navigate = useNavigate();

  return (

    <div className="column login centered">

      <h1 className='h1'>Log in</h1>

      <TextField 
        id='username-field' 
        label="Username" 
        variant='outlined'
        autoFocus={true}
        fullWidth
        style={{margin:"1em"}}/>

      <TextField 
        id='password-field' 
        label="Password" 
        variant='outlined'
        fullWidth
        style={{margin:"1em"}}/>

      <button className='main-button centered' onClick={() => {navigate("/today");}}>Log in</button>

    </div>
  );
}