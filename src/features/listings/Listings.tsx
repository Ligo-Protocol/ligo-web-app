import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";

import fetch from "node-fetch";

// const query = { select: ["*"], from: "_collection" };
const networkName = "fluree";
const datasetID = process.env.REACT_APP_FLUREE_DATASET_ID;
const APIKey = process.env.REACT_APP_FLUREE_API_KEY;

const url = `https://api.dev.flur.ee/fdb/${networkName}/${datasetID}`;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${APIKey}`,
};

export function Listings() {
  const [responseData, setResponseData] = useState<any>([]);

  useEffect(() => {
    const Resultprocessing = async (query) => {
      try {
        const resp = await fetch(`${url}/query`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(query),
        });
        const data = await resp.json();
        setResponseData(data);
        console.log("RETURNED DATA",data);
      } catch (error) {
        console.error(error);
      }
    };
    const query = {
      "select": [
        "images",
        "description",
        { 
          "itemOffered": ["*", "vehicleIdentificationNumber", { "brand": ["name"] }, { "manufacturer": ["legalName"] }], 
          "priceSpecification": ["currency", "price"],
          "areaServed": ["postalCode"],
          "advanceBookingRequirement" : ["value"],
        }
      ],
      "from": "Offer"
    };

    Resultprocessing(query).catch((error: any) => {
      console.log(error);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={4}
          justifyContent="space-evenly"
          alignItems="center"
        >
          {responseData.map((item: any, index: number) => (
            <div key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color={"blue"}
                >
                  {item.areaServed
                    ? item.areaServed.address
                    : "test:California"}
                  ,
                  {item.areaServed
                    ? item.areaServed.postalCode
                    : "test:54201352"}
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  // eslint-disable-next-line no-useless-concat
                  image={
                    item.images
                      ? "https://" +
                        item.images +
                        ".ipfs.w3s.link/" +
                        "new_name.jpg"
                      : "https://bafybeih4lgsylefq3nw2ucdhvflsylkm5acr2dje5zexazbig4o6xmgfuq.ipfs.w3s.link/new_name.jpg"
                  }
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color={"green"}
                  >
                    $
                    {item.priceSpecification
                      ? item.priceSpecification.price
                      : "test" + 200}
                  </Typography>

                  <Typography gutterBottom component="div" color={"blue"}>
                    Advance Booking Requirement:
                    {item.advanceBookingRequirement
                      ? item.advanceBookingRequirement.value
                      : "test:(" + 1}
                    {item.advanceBookingRequirement
                      ? item.advanceBookingRequirement.unitCode
                      : " hour)"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description
                      ? item.description
                      : "test:description"}
                  </Typography>
                </CardContent>
                <CardActions>
                <Link to={{pathname: `/${item.images}`}} >
                    <Button variant="outlined" color="secondary">
                      View Offer
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          ))}
        </Grid>
      </Box>
    </>
  );
}
