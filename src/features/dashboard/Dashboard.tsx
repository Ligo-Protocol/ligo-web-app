import { Link, Outlet } from "react-router-dom"
import styles from "../../assets/css/features/dashboard/dashboard.module.css"
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from "@mui/material";

export function Dashboard(){
    return(
        <>
        <div className={styles.sidebar}>
                <br/>
                <br/>
                <br/><Link className={styles.link} to="openmarket"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined" ><PublicIcon/> Open marketplace</Button></Link><br/>
                <br/><Link className={styles.link} to="coopmarket"><Button className={styles.sidebutton}  style={{ color: 'black' }} variant="outlined"><GroupsIcon/>COOP marketplace</Button></Link><br/>
                <br/><Link className={styles.link}  to="privatemarket"><Button className={styles.sidebutton}  style={{ color: 'black' }} variant="outlined"><GroupIcon/>Private marketplace</Button></Link><br/>
                <br/><Link className={styles.link}  to="activelistings"><Button className={styles.sidebutton}  style={{ color: 'black' }} variant="outlined"><PlayArrowIcon/>Active listings</Button></Link><br/>
                <br/><Link className={styles.link}  to="bookmarks"><Button  className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><BookmarksIcon/>Bookmarks</Button></Link><br/>
                <br/><Link className={styles.link}  to="dispute"><Button  className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><LocalFireDepartmentIcon/>Disputes</Button></Link><br/>
                <br/><Link className={styles.link}  to="statistics"><Button  className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><AnalyticsIcon/>Statistics</Button></Link><br/>
                <br/><Link className={styles.link}  to="messaging"><Button  className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><MailOutlineIcon/>Messaging</Button></Link><br/>
                <br/><Link className={styles.link}  to="settings"><Button className={styles.sidebutton}  style={{ color: 'black' }} variant="outlined"><SettingsIcon/> User settings</Button></Link><br/>
        </div>
        <div className={styles.outlet}>
            <Outlet/>
        </div>
        </>
    )
}
