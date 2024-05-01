import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'
import '../App.css';

export default function Home() {

  const navigate = useNavigate();

  return (

    <div className="body row login centered column">

      <h1 className='h1'>Welcome to Gemini Task Manager!</h1>

      <br/>

      <button className='button main-button centered' onClick={() => {navigate("/login")}}>Log in</button>
      <button className='button secondary-button centered' onClick={() => {navigate("/createUser");}}>Create a new user</button>

    </div>
  );
}