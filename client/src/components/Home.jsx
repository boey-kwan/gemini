import { useNavigate, useLocation } from "react-router-dom";
import { TextField } from '@mui/material'
import '../App.css';

export default function Home() {

  const navigate = useNavigate();

  // Determine the user and the date
  const location = useLocation();
  let username = "";
  if (location.pathname.split('/').length > 2) {
     username = location.pathname.split('/')[2];
  }
  const date = new Date();
  const dateString = date.toDateString();

  return (

    <div className="body row login centered">

      <h1 className='h1'>Welcome to Gemini Task Manager!</h1>

      <br/>

      <button className='button main-button' onClick={() => {navigate("/date/"+dateString+"/"+username)}}>Jump to today's tasks!</button>
      <button className='button secondary-button' onClick={() => {navigate("/memories");}}>See memories</button>

    </div>
  );
}