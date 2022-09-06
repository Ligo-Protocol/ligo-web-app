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
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {responseData.map((item: any, index: number) => (
            <div key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.node.image ? item.node.image : null}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.node.seller ? item.node.seller.id : null}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.node.description ? item.node.description : null}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </Grid>
      </Box>
    </>
  );
}
