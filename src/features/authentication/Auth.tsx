import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
// import RPC from "../../lib/web3RPC";
import "../../assets/css/App.css";
// import { createCeramicDoc } from "../listings/createCeramicDoc";
import ResponsiveAppBar from "../../pages/Navbar/Navbar";

import { Home } from "../../pages/Home";
import { About } from "../../pages/About";
import { Listings } from "../listings/Listings";
import ListForm from "../listings/ListForm";
import { Contact } from "../../pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from "../../pages/PageNotFound";

const clientId: any = process.env.REACT_APP_CLIENT_ID; // get from https://dashboard.web3auth.io

function Auth() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [ isLogged, setIsLogged ] = useState<boolean>(false);
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x4",
            rpcTarget:
              "https://rinkeby.infura.io/v3/9834efc01c904696a10cb3c37c72727c", // This is the public RPC we have added, please pass on your own endpoint while creating an app
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

  // const getUserInfo = async () => {
  //   if (!web3auth) {
  //     console.log("web3auth not initialized yet");
  //     return;
  //   }
  //   const user = await web3auth.getUserInfo();
  //   console.log(user);
  // };

  // const getAccounts = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const address = await rpc.getAccounts();
  //   console.log(address);
  //   return address;
  // };

  if (provider) {
    return (
      <>
        <div>
        <ResponsiveAppBar logged={logout} isLogged={isLogged}/>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="form" element={<ListForm />} />
            <Route path="listings" element={<Listings />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  return (
    <>
      <ResponsiveAppBar logged={login} isLogged={isLogged}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Auth;
