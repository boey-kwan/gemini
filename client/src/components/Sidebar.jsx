import '../App.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';

export default function Sidebar(props) {

    return (
      <div className='column sidebar shadowed-card' style={{paddingLeft:'1em', visibility: props.showSidebar ? 'visible' : 'hidden'}}>
        <AccessTimeIcon onClick={() => props.onClickSidebarIcon("time")}/>
        <PlaceOutlined onClick={() => props.onClickSidebarIcon("location")}/>
        <AutoStoriesOutlinedIcon onClick={() => props.onClickSidebarIcon("description")}/>
        <PhotoOutlinedIcon onClick={() => props.onClickSidebarIcon("image")}/>
        
      </div>
    );
  }