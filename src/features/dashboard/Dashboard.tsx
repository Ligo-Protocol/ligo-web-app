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
            <ul>
                <li><Link className={styles.link} to="openmarket"><Button ><PublicIcon/> Open marketplace</Button></Link></li>
                <li><Link className={styles.link} to="coopmarket"><Button ><GroupsIcon/>COOP marketplace</Button></Link></li>
                <li><Link className={styles.link}  to="privatemarket"><Button><GroupIcon/>Private marketplace</Button></Link></li>
                <li><Link className={styles.link}  to="activelistings"><Button><PlayArrowIcon/>Active listings</Button></Link></li>
                <li><Link className={styles.link}  to="bookmarks"><Button><BookmarksIcon/>Bookmarks</Button></Link></li>
                <li><Link className={styles.link}  to="dispute"><Button><LocalFireDepartmentIcon/>Disputes</Button></Link></li>
                <li><Link className={styles.link}  to="statistics"><Button><AnalyticsIcon/>Statistics</Button></Link></li>
                <li><Link className={styles.link}  to="messaging"><Button><MailOutlineIcon/>Messaging</Button></Link></li>
                <li><Link className={styles.link}  to="settings"><Button><SettingsIcon/> User settings</Button></Link></li>
            </ul>
        </div>
        <div className={styles.outlet}>
            <Outlet/>
        </div>
        </>
    )
}
