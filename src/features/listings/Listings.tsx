import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../__generated__/definition.js";
import { useEffect, useState } from "react";

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
            offerIndex(first: 20) {
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

    // const fetchResult: any = Resultprocessing(did)
  }, []);

  // Authenticate the DID with the provider

  return (
    <>
      {responseData.map((item: any, index: number) => (
        <div key={index}>{item.node.seller ? item.node.seller.id : null}</div>
      ))}
      <div>sdfsdf</div>
    </>
  );
}
