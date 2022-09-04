import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../../lib/web3RPC";
import "../../assets/css/App.css";
import UploadImage from "../listings/uploadImage";
import { Login } from "./Login";


const clientId:any = process.env.REACT_APP_CLIENT_ID; // get from https://dashboard.web3auth.io

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

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
    return address;
  };

  if (provider) {
    return (
    <>
    <div>
    <UploadImage/>
    <button onClick={getUserInfo} className="card">
      User Info
    </button>
    <button onClick={getAccounts} className="card">
      Accounts
    </button>
    </div>
    <div>
    <button onClick={logout} className="card">
      Log Out
    </button>
    </div>
    </>
    );
  }

  return (
    <Login login={login}/>
  );
}

export default Auth;