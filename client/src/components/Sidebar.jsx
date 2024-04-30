import '../App.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Icons = [
  { icon: <AccessTimeIcon className='sidebar-button'/>, id: 'time', label: 'Time' },
  { icon: <PlaceOutlined className='sidebar-button'/>, id: 'location', label: 'location' },
  { icon: <AutoStoriesOutlinedIcon className='sidebar-button'/>, id: 'description', label: 'Description' },
  { icon: <PhotoOutlinedIcon className='sidebar-button'/>, id: 'image', label: 'Image' },
]

export default function Sidebar(props) {

    return (
      <div className='column sidebar shadowed-card' style={{visibility: props.showSidebar ? 'visible' : 'hidden'}}>
        {
          Icons.map((icon) => {
            return (
              <button 
                
                onClick={() => props.onClickSidebarIcon(icon.id)} 
                style={{
                  color: props.showFields[icon.id] ? 'var(--primary-blue)' : 'black',
                }}>
                {icon.icon}
              </button>
            )
          })
        }
        
      </div>
    );
  }