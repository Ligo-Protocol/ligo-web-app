import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { ComposeClient } from '@composedb/client'
import { definition } from '../../__generated__/definition.js'
// import { Offer } from "../ts-ligo-vocab/src/Offer";

// const offer: Offer = {
//   description: "This is a sample entry of JSON data for the schema",
//   image: "https://image.com/img12.img",
//   itemOffered: {
//     // modelDate: '01-01-2019',
//     // vehicleIdentificationNumber: "5YJ3E1EA1KF064316",
//     // manufacturer: {
//     //   legalName: "Tesla, Inc.",
//     // },
//     // brand: {
//     //   name: "Tesla",
//     // },
//     model: "Model 3",
//     vehicleConfiguration: "Standard Range Plus",
//   },
//   seller: "did:example:hello",
//   // areaServed: {
//   //   postalCode: "81111",
//   // },
//   priceSpecification: {
//     price: 1000,
//     priceCurrency: "USD",
//   },
//   // advanceBookingRequirement: {
//   //   value: 5,
//   //   unitCode: "HUR",
//   // },
// };

const createCeramicDoc = async(offer) => {

    // Connect, Generate Seed and Authenticate
    const compose = new ComposeClient({ ceramic: 'https://ceramic-clay.oort.codyhatfield.me', definition: definition as any })
    // Generate seed
    const txt = new TextEncoder();
    function rng(){
      let uID = '';
          let length = 32;
      let possible = 'abcdef0123456789';
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
    // Authenticate the DID with the provider
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
    `)
    console.log("viewerResult",viewerResult)

    // Create document
    const createResult = await compose.executeQuery(`
      mutation CreateOffer($content: OfferInput!) {
        createOffer(input:{content:$content}) {
          clientMutationId
        }
      }
    `, {content: offer})

    console.log("createResult", createResult)

    // Fetch offers
    const fetchResult = await compose.executeQuery(`
      query {
        offerIndex(first: 5) {
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
    `)
    console.log("fetch Result",fetchResult)

    // Fetch a specific offer by ID
    const fetchResult1 = await compose.executeQuery(`
      query {
        node(id: "kjzl6kcym7w8y73zeefuu28gqvtu1qd210oyid7ft8rqwo3re1w89tdccooag1b") {
          id
          ... on Offer {
            seller {
              id
            }
            description
            image
          }
        }
      }
    `)
    console.log("fetchResult1",fetchResult1)
  };

export { createCeramicDoc };