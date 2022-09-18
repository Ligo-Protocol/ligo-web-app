import { Link, Outlet } from "react-router-dom"

export function Dashboard(){
    return(
        <>
            <ul>
                <li><Link to="openmarket">Open marketplace</Link></li>
                <li><Link to="coopmarket">COOP marketplace</Link></li>
                <li><Link to="privatemarket">Private marketplace</Link></li>
                <li><Link to="activelistings">Active listings</Link></li>
                <li><Link to="bookmarks">Bookmarks</Link></li>
                <li><Link to="statistics">Statistics</Link></li>
                <li><Link to="messaging">Messaging</Link></li>
                <li><Link to="settings">User settings</Link></li>
            </ul>
            <Outlet/>
        </>
    )
}