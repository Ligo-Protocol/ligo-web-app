import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../../lib/web3RPC";
import "../../assets/css/App.css";
// import { createCeramicDoc } from "../listings/createCeramicDoc";
import ResponsiveAppBar from "../../pages/Navbar/Navbar";

import { Home } from "../../pages/Home";
// import { Listings } from "../listings/Listings";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PageNotFound } from "../../pages/PageNotFound";
import { Openmarket } from "../marketplace/open_market/Open_market";
import  Coopmarket  from "../marketplace/coop_market/Coop_market";
import  Privatemarket  from "../marketplace/private_market/Private_market";
import { ActiveListings } from "../dashboard/ActiveListings";
import { Messaging } from "../messages/Messaging";
import { Bookmarks } from "../dashboard/Bookmarks";
import { UserSettings } from "../dashboard/Settings";
import { Statistics } from "../dashboard/Statistics";
import { FileDisputes } from "../disputes/FileDisputes";
import {Dashboard} from "../dashboard/Dashboard";
import OfferForm from "../listings/OfferForm";
import OrderStepper from "../listings/OrderStepper";

import { LigoClient } from "@js-ligo/client";
import { CustomStorageProvider } from "../listings/CustomStorage"; 
import { Wallet as EthereumWallet } from "@ethersproject/wallet";
import { AccountId } from "caip";
import { EventEmitter } from "events";
import { fromString, toString } from "uint8arrays";
import LitJsSdk from "@lit-protocol/sdk-browser";
import {ethers} from 'ethers';
import { Chatbox } from "../chatbox/Chatbox";

const clientId: any = process.env.REACT_APP_CLIENT_ID; // get from https://dashboard.web3auth.io


class EthereumProvider extends EventEmitter {
  wallet: EthereumWallet;

  constructor(wallet: EthereumWallet) {
    super();
    this.wallet = wallet;
  }

  send(
    request: { method: string; params: Array<any> },
    callback: (err: Error | null | undefined, res?: any) => void
  ): void {
    if (request.method === "eth_chainId") {
      callback(null, { result: "1" });
    } else if (request.method === "personal_sign") {
      let message = request.params[0] as string;
      if (message.startsWith("0x")) {
        message = toString(fromString(message.slice(2), "base16"), "utf8");
      }
      callback(null, { result: this.wallet.signMessage(message) });
    } else if (request.method === "eth_accounts") {
      callback(null, { result: [this.wallet.address] });
    } else {
      callback(new Error(`Unsupported method: ${request.method}`));
    }
  }

  enable() {
    return [this.wallet.address];
  }
}

function Auth() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [ isLogged, setIsLogged ] = useState<boolean>(false);
  const [accountdata, setAccInfo] = useState<any>();
  const [client, setLigoClient] = useState<LigoClient | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: 
            "0x1",
            // "0x5",
            rpcTarget:
              "https://mainnet.infura.io/v3/9834efc01c904696a10cb3c37c72727c",
              // "https://goerli.infura.io/v3/9834efc01c904696a10cb3c37c72727c", 
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }

        

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
    setIsLogged(true);
    console.log("TEST: logged in!");

    // For sending accounts info to other pages
    const rpc = new RPC(web3auth.provider);
    setAccInfo(await rpc.getAccounts());

    // For xmtp connection
    localStorage.clear();
    const PK ="0x"+await rpc.getPrivateKey();
    console.log(PK) 
    const wallet = await new ethers.Wallet(PK);
    localStorage.clear();
    const { client } = await buildAndConnectClient(wallet)
    setLigoClient(client)
    console.log(client)
    localStorage.clear();
  };


  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    return user;
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setIsLogged(false);
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    return await rpc.getChainId();
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    return await rpc.getAccounts();
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    return await rpc.getBalance();
  };

  // const sendTransaction = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   return await rpc.sendTransaction();
  // };

  // const signMessage = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   return await rpc.signMessage();
  // };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    return await rpc.getPrivateKey();
  };
  
async function buildAndConnectClient(_wallet?: EthereumWallet) {
  const wallet = _wallet ?? EthereumWallet.createRandom();
  const provider = new EthereumProvider(wallet);
  const storageProvider = new CustomStorageProvider();
  const account = new AccountId({
    address: wallet.address,
    chainId: `eip155:1`,
  });
  const client = new LigoClient(
    provider,
    wallet,
    account,
    storageProvider,
    LitJsSdk
  );
  await client.connect({ domain: "localhost" });

  return { client, account };
}

  if (provider) {
    return (
      <>

        <BrowserRouter>
        <div>
        <ResponsiveAppBar logged={logout} isLogged={isLogged}/>
        </div>
          <Routes>
            <Route path="chat" element={<Chatbox />} />
            <Route path="/:offerid" element={<OrderStepper accountdata={accountdata} client={client}/>} />
            <Route path="offerform" element={<OfferForm accountdata={accountdata}/>} />
            <Route path="/" element={<Dashboard />} >
              <Route path="openmarket" element={<Openmarket />} />
              <Route path="coopmarket" element={<Coopmarket />} />
              <Route path="privatemarket" element={<Privatemarket />} />
              <Route path="activelistings" element={<ActiveListings />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="messaging" element={<Messaging client={client} />} />
              <Route path="dispute" element={<FileDisputes />} />
              <Route path="settings" element={<UserSettings getUserInfo={getUserInfo} getChainId={getChainId} getAccounts={getAccounts} getBalance={getBalance} getPrivateKey={getPrivateKey} />} />
             </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  return (
    <><div>
      <ResponsiveAppBar logged={login} isLogged={isLogged}/>
      </div>
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home logged={login}/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default Auth;
