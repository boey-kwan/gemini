import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();


  return (
    <div>
      <button className="row-item" onClick={() => {
        navigate("/today");
      }}>Today's To-Do List</button>
      <button className="row-item" onClick={() => {
        navigate("/memories");
      }}>Memories</button>
    </div>
  );
}