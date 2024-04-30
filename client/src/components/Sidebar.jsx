import '../App.css'

export default function Sidebar(props) {

    return (
      <div className='column sidebar' style={{paddingLeft:'1em', visibility: props.showSidebar ? 'visible' : 'hidden'}}>

        <button onClick={() => props.onClickSidebarIcon("time")}> Time </button>
        <button onClick={() => props.onClickSidebarIcon("location")}> Location </button>
        <button onClick={() => props.onClickSidebarIcon("description")}> Description </button>
        <button onClick={()=> props.onClickSidebarIcon("image")}> Image </button>
        
      </div>
    );
  }