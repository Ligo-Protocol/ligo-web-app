// import styles from "../../../assets/css/features/listings/SingleOfferView.module.css"
import { useParams } from "react-router-dom";

import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../__generated__/definition.js";
import { useEffect,useState} from "react";


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
        <>
        <h1>Single Offer View</h1>
        {responseData.id}
        {responseData.priceSpecification.price}
        </>
    )
}