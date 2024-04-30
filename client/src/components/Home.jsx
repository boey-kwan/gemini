import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'
import '../App.css';

export default function Home() {

  const navigate = useNavigate();

  return (

    <div className="row login centered">

      <h1 className='h1'>Welcome to Gemini Task Manager!</h1>

      <button className='main-button centered' onClick={() => {navigate("/login");}}>Log in</button>
      <button className='secondary-button centered' onClick={() => {navigate("/createUser");}}>Create user</button>

    </div>
  );
}