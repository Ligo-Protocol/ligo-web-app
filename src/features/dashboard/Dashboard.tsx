import * as React from 'react';
import { Link, Outlet } from "react-router-dom"
import styles from "../../assets/css/features/dashboard/dashboard.module.css"
/* import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from "@mui/material"; */
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
export function Dashboard() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 450 }}
        >

            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Open marketplace" {...a11yProps(0)} />
                <Tab label="COOP marketplace" {...a11yProps(1)} />
                <Tab label="Private marketplace" {...a11yProps(2)} />
                <Tab label="Active listings" {...a11yProps(3)} />
                <Tab label="Bookmarks" {...a11yProps(4)} />
                <Tab label="Disputes" {...a11yProps(5)} />
                <Tab label="Statistics" {...a11yProps(6)} />
                <Tab label="Messaging" {...a11yProps(7)} />
                <Tab label="User settings" {...a11yProps(8)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Link className={styles.link} to="openmarket"> Open Marketplace </Link>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Link className={styles.link} to="coopmarket">COOP Marketplace </Link>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Link className={styles.link} to="privatemarket"> Private Marketplace </Link>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Link className={styles.link} to="activelistings"> Listings </Link>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Link className={styles.link} to="bookmarks"> Bookmarks </Link>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Link className={styles.link} to="dispute"> Disputes </Link>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <Link className={styles.link} to="statistics"> Statistics </Link>
            </TabPanel>
            <TabPanel value={value} index={7}>
                <Link className={styles.link} to="messaging"> Messaging </Link>
            </TabPanel>
            <TabPanel value={value} index={8}>
                <Link className={styles.link} to="Settings"> User settings </Link>
            </TabPanel>

            <div className={styles.outlet}>
                <Outlet />
            </div>
        </Box>



        /* <>
            <div className={styles.sidebar}>
                <br />
                <br />
                <br /><Link className={styles.link} to="openmarket"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined" ><PublicIcon /> Open marketplace</Button></Link><br />
                <br /><Link className={styles.link} to="coopmarket"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><GroupsIcon />COOP marketplace</Button></Link><br />
                <br /><Link className={styles.link} to="privatemarket"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><GroupIcon />Private marketplace</Button></Link><br />
                <br /><Link className={styles.link} to="activelistings"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><PlayArrowIcon />Active listings</Button></Link><br />
                <br /><Link className={styles.link} to="bookmarks"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><BookmarksIcon />Bookmarks</Button></Link><br />
                <br /><Link className={styles.link} to="dispute"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><LocalFireDepartmentIcon />Disputes</Button></Link><br />
                <br /><Link className={styles.link} to="statistics"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><AnalyticsIcon />Statistics</Button></Link><br />
                <br /><Link className={styles.link} to="messaging"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><MailOutlineIcon />Messaging</Button></Link><br />
                <br /><Link className={styles.link} to="settings"><Button className={styles.sidebutton} style={{ color: 'black' }} variant="outlined"><SettingsIcon /> User settings</Button></Link><br />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </> */
    )
}
