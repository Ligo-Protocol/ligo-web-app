import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../web3RPC";
import "../App.css";

import { CeramicClient } from '@ceramicnetwork/http-client'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'

const clientId = "BJz8jmxX2qjfYVLZtN6wDaoPiy2cEgQd_dBFvhjvmJGp0g0Ms-SLlI0BC61D1JoBligqVR-K7JXZ_3ejgzLlaiI"; // get from https://dashboard.web3auth.io

function Auth() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {

      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x4",
          rpcTarget: "https://rinkeby.infura.io/v3/9834efc01c904696a10cb3c37c72727c", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
      });

      setWeb3auth(web3auth);

      await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    console.log("TEST: logged in!");
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  // Ceramic Tile Document functions

  const createCeramicTileDoc = async() => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }

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
    "description": 'This is the description', 
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


  const loggedInView = (
    <><div>
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={getChainId} className="card">
        Get Chain ID
      </button>
      <button onClick={getAccounts} className="card">
        Get Accounts
      </button>
      <button onClick={getBalance} className="card">
        Get Balance
      </button>
      <button onClick={sendTransaction} className="card">
        Send Transaction
      </button>
      <button onClick={signMessage} className="card">
        Sign Message
      </button>
      <button onClick={getPrivateKey} className="card">
        Get Private Key
      </button>
      </div>
      <div>
      <button onClick={createCeramicTileDoc} className="card">
        Create JSON listing as Cercamic Tile Document
      </button>
      </div>
      <div>
      <button onClick={logout} className="card">
        Log Out
      </button>
      </div>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        Ligo Protocol
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a href="https://github.com/Ligo-Protocol/" target="_blank" rel="noopener noreferrer">
          Source code: Ligo Protocol
        </a>
      </footer>
    </div>
  );
}

export default Auth;
