import { CeramicClient } from '@ceramicnetwork/http-client'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'


const createCeramicTileDoc = async() => {
    
    // Connect, Generate Seed and Authenticate
    const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com');
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
    ceramic.did = did;
    console.log("did.authenticated = ", did.authenticated);

    // 3. Create Schema Document
    const Ddoc = await TileDocument.create(ceramic, {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'MySchema',
      type: 'object',
      properties: {
        "description" : {
          type: 'string',
          maxLength: 500,
        },
        "image" : {
          type: 'string',
          maxLength: 500,          
        },
        "itemOffered" : {
          "type": "object",
        "properties": 
          {
            "vehicleIdentificationNumber" : {
              type: 'string',
              maxLength: 500,          
            },
            "vehicleModelDate" : {
              type: 'string',
              maxLength: 500,          
            },
            "model" : {
              type: 'string',
              maxLength: 500,          
            },
          },
          "required" : ["vehicleIdentificationNumber", "vehicleModelDate", "model"]
        },
        "seller" : {
          "type": "object",
        "properties": 
          {
            "givenName" : {
              type: 'string',
              maxLength: 150,          
            },
            "familyName" : {
              type: 'string',
              maxLength: 150,          
            },
            "email" : {
              type: 'string',
              maxLength: 500,          
            },
            "telephone" : {
              type: 'string',
              maxLength: 500,          
            },
            "contactPoint" : {
              type: 'string',
              maxLength: 500,          
            },
          },
          "required" : ["givenName", "familyName", "telephone"]
        },
        "areaServed" : {
          "type": "object",
        "properties": 
          {
            "address" : {
              type: 'string',
              maxLength: 500,          
            },
            "addressCountry" : {
              type: 'string',
              maxLength: 500,          
            },
            "latitude" : {
              type: 'string',
              maxLength: 150,          
            },
            "longitude" : {
              type: 'string',
              maxLength: 150,          
            },
          },
          "required" : ["address"]
        },
        "priceSpecification" : {
          "type": "object",
        "properties": 
          {
            "price" : {
              type: 'integer'      
            },
            "priceCurrency" : {
              type: 'string',
              maxLength: 500,          
            },
          },
          "required" : ["price", "priceCurrency"]
        },
        "acceptedPaymentmethod" : {
          "type": "object",
        "properties": 
          {
            "crypto" : {
              type: 'boolean'         
            },
            "bank" : {
              type: 'boolean'      
            },
            "card" : {
              type: 'boolean'      
            },
          },
          "required" : ["crypto", "bank", "card"]
        },
        "advanceBookingRequirement" : {
          "type": "object",
        "properties": 
          {
            "time" : {
              type: 'integer'         
            },
            "units" : {
              type: 'string',
              maxLength : 100      
            }
          },
          "required" : ["time", "units"]
        },

      },
      "required" : ["description", "image"]
    })
    // The stream ID of the created document can then be accessed as the `id` property
    const schemaID = Ddoc.commitId;
    const schema = schemaID
    console.log("SchemaID/CommitID", schema);

    // 4. Create TileDocument
    const doc = await TileDocument.create(ceramic, 
    { 
    "description": 'This is a sample entry of JSON data for the schema', 
    "image" : "https://image.com/img12.img", 
    "itemOffered" : {
      "vehicleIdentificationNumber" : "19749301501751",
      "vehicleModelDate" : "2017", 
      "model" : "Tesla"
    },
    "seller" : {
      "givenName" : "Thefirstname",
      "familyName" : "Thelastname",
      "telephone" : "109710937501"
    },
    "areaServed" : {
      "address" : "California"
    },
    "priceSpecification" : {
      "price" : 1000,
      "priceCurrency" : "USD" 
    },
    "acceptedPaymentmethod" : {
      "crypto" : true,
      "card" : false,
      "bank" : true
    },
    "advanceBookingRequirement" : {
      "time" : 5,
      "units" : "hours"
    },
     },
    { schema });
    // The stream ID of the created document can then be accessed as the `id` property
    console.log("doc.id", doc.id.baseID);

    // 5. Loading TileDocument
    const loadDoc = await (await TileDocument.load(ceramic, doc.id.baseID)).content;
    console.log("Loaded Doc", loadDoc);
  };

export { createCeramicTileDoc };