import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'
import '../App.css';

export default function Home() {

  const navigate = useNavigate();

  return (

    
    <div className="column login centered">

      <h1 className='h1'>Welcome to Gemini Task Manager!</h1>

      <TextField 
        id='username-field' 
        label="Username" 
        variant='outlined'
        fullWidth/>

      <TextField 
        id='password-field' 
        label="Password" 
        variant='outlined'
        fullWidth/>

      <button className='big-button centered' onClick={() => {navigate("/today");}}>Log in</button>

    </div>
  );
}