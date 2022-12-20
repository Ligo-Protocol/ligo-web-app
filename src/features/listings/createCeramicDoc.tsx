import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../__generated__/definition.js";

const createCeramicDoc = async (offer) => {
  console.log("imported parameter offer", offer);
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
  // Authenticate the DID with the provider
  await did.authenticate();
  compose.setDID(did);
  console.log("DID", did, "did.authenticated = ", did.authenticated);

  // Get current viewer
  const viewerResult = await compose.executeQuery(`
      query {
        viewer {
          id
        }
      }
    `);
  console.log("viewerResult", viewerResult);

  // Create document
  const createResult = await compose.executeQuery(
    `
      mutation CreateOffer($content: OfferInput!) {
        createOffer(input:{content:$content}) {
          clientMutationId
        }
      }
    `,
    { content: offer }
  );

  console.log("createResult", createResult);

  // Fetch offers
  const fetchResult = await compose.executeQuery(`
      query {
        offerIndex(last: 1) {
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
                validFrom
                validThrough
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
  console.log("fetch Result", fetchResult);

  // Fetch a specific offer by ID
  const fetchResult1 = await compose.executeQuery(`
      query {
        node(id: "kjzl6kcym7w8y6ys9rg4cry5814jrhj5gz05ja582wqifr7pn7f1qquwfozryvp") {
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
    `);
  console.log("fetchResult1", fetchResult1);
};

export { createCeramicDoc };
