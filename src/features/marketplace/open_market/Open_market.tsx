import { Listings } from "../../listings/Listings";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export function Openmarket(){
    return(
        <>
        <h1>Open marketplace</h1>
        
        <Link to="/form">
            <Button variant="outlined">
                Create and Offer!
            </Button>
        </Link>
        <Listings/>
        </>
    )
}