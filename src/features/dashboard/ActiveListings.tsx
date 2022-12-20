import { useEffect } from "react";
import { LigoClient } from "@js-ligo/client";
import { AccountId } from "caip";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import ethProvider from "eth-provider";
import { createFullNode } from "@waku/create";
import { waitForRemotePeer } from "@waku/core/lib/wait_for_remote_peer";
import { Protocols } from "@waku/interfaces";
import {
  Fleet,
  getPredefinedBootstrapNodes,
} from "@waku/core/lib/predefined_bootstrap_nodes";
import { promises as fs } from "fs";
import { VeramoJsonStore, VeramoJsonCache } from "@veramo/data-store-json";


const KMS_SECRET_KEY =
  "8842bddaf538d0beb69f516d1f66a08084b8e87a9d1f44b6ab0fe23cd8f44b67";

let dataStore: VeramoJsonStore;

async function buildAndConnectClient() {
  const provider = ethProvider() as unknown as ExternalProvider;
  const web3Provider = new Web3Provider(provider);
  const account = new AccountId({
    address: (await web3Provider.listAccounts())[0],
    chainId: `eip155:1`,
  });

  const waku1:any = await createFullNode().then((waku) =>
    waku.start().then(() => waku)
  );

  const testNodes = getPredefinedBootstrapNodes(Fleet.Test);
  waku1.addPeerToAddressBook(testNodes[0].getPeerId(), testNodes);
  await waku1.dial(testNodes[0], [Protocols.Relay, Protocols.Store]);
  await Promise.all([
    waitForRemotePeer(waku1, [Protocols.Relay, Protocols.Store]),
  ]);

  try {
    dataStore = {
      notifyUpdate: async (
        _oldState: VeramoJsonCache,
        _newState: VeramoJsonCache
      ) => {
        return;
      },
      ...(JSON.parse(
        (await fs.readFile("./test/test-datastore.json")).toString("utf8")
      ) as VeramoJsonStore),
    };
  } catch (e) {
    dataStore = {
      notifyUpdate: async (
        _oldState: VeramoJsonCache,
        _newState: VeramoJsonCache
      ) => {
        return;
      },
    };
  }

  const client = new LigoClient(provider, account);
  await client.connect(
    { domain: "localhost" },
    KMS_SECRET_KEY,
    dataStore,
    waku1
  );

  return { client, account };
}


export function ActiveListings(){
   
        const test = async () => {
            try{
                localStorage.clear();
                const { client } = await buildAndConnectClient();
                const offerResponses = await client.getProposedAgreements([
                    "ceramic://id",
                  ]);
                console.log("Offer Responses",offerResponses);
                await fs.writeFile("./test/test-datastore.json", JSON.stringify(dataStore));
              }
              catch(error){
                console.log("Ligo web app could not propose agreement to the host",error)
              }
        };

    return(
        <>
            <h1>Here are your active listings</h1>
            <h2>Agreements Proposals</h2>
            <button onClick={test}>test</button>

        </>
    )
}