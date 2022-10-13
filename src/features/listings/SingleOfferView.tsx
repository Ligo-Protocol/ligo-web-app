import styles from "../../assets/css/features/listings/SingleOfferView.module.css";
import { useParams } from "react-router-dom";

import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../__generated__/definition.js";
import { useEffect,useState} from "react";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextField } from "@mui/material";
import { Typography } from "@material-ui/core";

export function SingleOfferView(){
    const [responseData, setResponseData] = useState<any>([]);
    let { offerid } = useParams();
    console.log("Passed offerId", offerid)
    // Connect, Generate Seed and Authenticate
    const compose = new ComposeClient({
      ceramic: "https://ceramic-clay.oort.codyhatfield.me",
      definition: definition as any,
    });
    // Generate seed
    const txt = new TextEncoder();
    function rng() {
      let uID = "";
      let length = 32;
      let possible = "abcdef0123456789";
      for (let i = 0; i < length; i++) {
        uID += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return uID;
    }
    const hex = rng();
    const seed = txt.encode(hex);
  
    console.log(seed);
    const DIDprovider = new Ed25519Provider(seed);
    const did = new DID({ provider: DIDprovider, resolver: getResolver() });
  
    useEffect(() => {
      const Resultprocessing = async (did) => {
        await did.authenticate();
        compose.setDID(did);
        console.log("did.authenticated = ", did.authenticated);
        const fetchResult1 = await compose.executeQuery(
            `
              query($nodeid: ID!) {
                node(id: $nodeid) {
                  id
                  ... on Offer {
                    seller {
                        id
                      }
                      description
                      image
                      itemOffered {
                        vehicleIdentificationNumber
                        modelDate
                        brand {
                          name
                        }
                        manufacturer {
                          name
                        }
                        model
                        vehicleConfiguration
                      }
                      areaServed {
                        postalCode
                      }
                      priceSpecification {
                        price
                        priceCurrency
                        validFrom
                        validThrough
                      }
                      advanceBookingRequirement {
                        value
                      }
                  }
                }
              }
            `,
            {nodeid:offerid}
            );
          
            console.log("Selected Offer ID", offerid);
            console.log("Single Offer details:", fetchResult1);
            setResponseData(await fetchResult1.data.node);

    };
      Resultprocessing(did).catch((error: any) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>{responseData?
          <>
          <div className={styles.center}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 800,
                  height: 1280,
                },
              }}
              >
              <Paper elevation={10} >
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

              </Paper>
            </Box>
          </div>
          </>
          : "N/A"}
        </>
    )
}