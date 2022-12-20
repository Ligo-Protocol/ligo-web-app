import styles from "../../assets/css/features/listings/SingleOfferView.module.css"
import { TextField } from "@mui/material";
import { Typography } from "@material-ui/core";

export function SingleOfferView({responseData}){
    return(
        <>{responseData?
          <>
          <div className={styles.center}>

              <div className={styles.longtext}>
                  {responseData?.id ?
                  <TextField
                    id="outlined-read-only-input"
                    label="Offer ID"
                    defaultValue={responseData.id}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />: null}
                </div>
                <div className={styles.longtext}>
                  {responseData?.seller?.id ?
                  <TextField
                    id="outlined-read-only-input"
                    label="Seller ID"
                    fullWidth
                    defaultValue={responseData.seller.id}
                    InputProps={{
                      readOnly: true,
                    }}
                  />: null}
                </div>
                <div className={styles.image}>
                  {responseData?.image ?
                  <img src={"https://" +
                  responseData.image +
                    ".ipfs.w3s.link/" +
                    "new_name.jpg"
              } alt="Offered Car" width="600"/>
  
                :"N/A"}
                </div>
                <div className={styles.center}>
                  <p>
                    {responseData?.description ?
                    responseData.description: "N/A"}<br/>
                    {responseData?.areaServed?.postalCode ? 
                    <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="inherit"
                  >
                    {responseData.areaServed.postalCode}(Area Served).
                  </Typography> : "N/A"}
                  </p>
                </div>
                 <hr/>
                <div className={styles.center}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="inherit"
                  >
                   {responseData?.itemOffered?.brand?.name ? responseData.itemOffered.brand.name: "Brand Name : N/A"},
                   {responseData?.itemOffered?.model ? responseData.itemOffered.model: "Model Name : N/A"},
                   {responseData?.itemOffered?.modelDate ? responseData.itemOffered.modelDate: "Model Date : N/A"}
                  </Typography>
                </div>
                <div className={styles.center}>
                  {responseData?.itemOffered?.vehicleIdentificationNumber ?
                    <TextField
                      id="outlined-read-only-input"
                      label="Vehicle Identification Number"
                      defaultValue={responseData.itemOffered.vehicleIdentificationNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                    />: null}
                </div>
                      <hr/>
                <div className={styles.center}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color="inherit"
                      >
                      {responseData?.priceSpecification?.price ? responseData.priceSpecification.price: "Price : N/A"} 
                      {responseData?.priceSpecification?.priceCurrency ? responseData.priceSpecification.priceCurrency: "Price Currency : N/A"} / day
                   </Typography>
                </div>
                      <br/>
                <div className={styles.center}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        color="primary"
                      >This offer is valid from &nbsp;
                      {responseData?.priceSpecification?.validFrom ? responseData.priceSpecification.validFrom: "Price : N/A"}&nbsp; to &nbsp; 
                      {responseData?.priceSpecification?.validThrough ? responseData.priceSpecification.validThrough: "Price Currency : N/A"}.
                   </Typography>
                </div>
          </div>
          </>
          : "N/A"}
        </>
    )
}