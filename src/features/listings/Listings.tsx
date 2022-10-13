import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../__generated__/definition.js";
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

export function Listings() {
  const [responseData, setResponseData] = useState<any>([]);
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

      // Get current viewer
      const viewerResult = await compose.executeQuery(`
          query {
            viewer {
              id
            }
          }
        `);
      console.log("viewerResult", viewerResult);

      // Fetch offers
      const fetchResult: any = await compose.executeQuery(`
          query {
            offerIndex(last: 20) {
              edges {
                node {
                  id
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
                  }
                  areaServed {
                    postalCode
                  }
                  priceSpecification {
                    price
                    priceCurrency
                  }
                  advanceBookingRequirement {
                    value
                    unitCode
                  }
                }
              }
            }
          }
        `);
      console.log(
        "fetch Result--->>>>>>>>>>",
        fetchResult.data.offerIndex.edges
      );
      setResponseData(fetchResult.data.offerIndex.edges);
    };
    Resultprocessing(did).catch((error: any) => {
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
                  {item.node.seller ? item.node.seller.id : "test:id"}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color={"blue"}
                >
                  {item.node.areaServed
                    ? item.node.areaServed.address
                    : "test:California"}
                  ,
                  {item.node.areaServed
                    ? item.node.areaServed.postalCode
                    : "test:54201352"}
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  // eslint-disable-next-line no-useless-concat
                  image={
                    item.node.image
                      ? "https://" +
                        item.node.image +
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
                    {item.node.priceSpecification
                      ? item.node.priceSpecification.price
                      : "test" + 200}
                  </Typography>

                  <Typography gutterBottom component="div" color={"blue"}>
                    Advance Booking Requirement:
                    {item.node.advanceBookingRequirement
                      ? item.node.advanceBookingRequirement.value
                      : "test:(" + 1}
                    {item.node.advanceBookingRequirement
                      ? item.node.advanceBookingRequirement.unitCode
                      : " hour)"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.node.description
                      ? item.node.description
                      : "test:description"}
                  </Typography>
                </CardContent>
                <CardActions>
                <Link to={{pathname: `/${item.node.id}`}} >
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
