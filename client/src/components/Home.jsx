import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();


  return (
    <div className="row">
      <button  onClick={() => {
        navigate("/today");
      }}>Today's To-Do List</button>
      <button  onClick={() => {
        navigate("/memories");
      }}>Memories</button>
    </div>
  );
}