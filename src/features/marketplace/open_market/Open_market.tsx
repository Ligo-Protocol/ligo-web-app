import { Listings } from "../../listings/Listings";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "../../../assets/css/features/marketplace/open_market/openmarket.module.css"

export function Openmarket(){
    return(
        <>
        <div className={styles.center}>
        <h1>OPEN MARKETPLACE</h1>
        <div className={styles.primary}>
        <Link className={styles.link} to="/offerform">
            <Button variant="contained" style={{ background: "grey"}}>
                HOST YOUR CAR
            </Button>
        </Link>
        </div>
        <div>
        <Listings/>
        </div>
        </div>
        </>
    )
}