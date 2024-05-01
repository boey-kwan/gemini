import '../App.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
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
      <div className='column' style={{visibility: props.showSidebar ? 'visible' : 'hidden', zIndex: 9}}>
        <div className='column sidebar shadowed-card' >
          {/* {
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
          } */}

          <button 
            className={props.showFields['time'] ? 'sidebar-button clicked' : 'sidebar-button'}
            onClick={() => props.onClickSidebarIcon('time')} 
  >
            <AccessTimeIcon style={{ fontSize: 'calc(var(--icon-size-default) + 2*3px)', padding: '3px' }} className={props.showFields['time'] ? 'white' : null}/>
          </button>

          <button 
            className={props.showFields['location'] ? 'sidebar-button clicked' : 'sidebar-button'}
            onClick={() => props.onClickSidebarIcon('location')} >
            <PlaceOutlined style={{ fontSize: 'calc(var(--icon-size-default) + 2*3px)', padding: '3px' }} className={props.showFields['location'] ? 'white' : null}/>
          </button>

          <button 
            className={props.showFields['description'] ? 'sidebar-button clicked' : 'sidebar-button'}
            onClick={() => props.onClickSidebarIcon('description')} >
            <AutoStoriesOutlinedIcon style={{ fontSize: 'calc(var(--icon-size-default) + 2*3px)', padding: '3px' }} className={props.showFields['description'] ? 'white' : null}/>
          </button>

          <button 
            className={props.showFields['image'] ? 'sidebar-button clicked' : 'sidebar-button'}
            onClick={() => props.onClickSidebarIcon('image')} >
            <PhotoOutlinedIcon style={{ fontSize: 'calc(var(--icon-size-default) + 2*3px)' }} className={props.showFields['image'] ? 'white' : null}/>
          </button>
          
        </div>
        <div className='shadowed-card' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio:1, borderRadius:'50%'}}>
          <button className='trashcan' onClick={() => props.deleteTask(props.id)}>
              <DeleteOutlinedIcon style={{ fontSize: 'calc(var(--icon-size-default) + 2*3px)'}}/>
          </button>
        </div>
      </div>
    );
    
}