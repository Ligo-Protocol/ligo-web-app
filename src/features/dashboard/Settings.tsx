import { useState } from "react"

export function UserSettings({getUserInfo,getChainId,getAccounts,getBalance, getPrivateKey}){

    const [userdata, setUserInfo] = useState<any>();
    const [chaindata, setChainInfo] = useState<any>();
    const [accountdata, setAccInfo] = useState<any>();
    const [balancedata, setBalanceInfo] = useState<any>();
    const [privatedata, setPrivateInfo] = useState<any>();
   
    async function getInfo(){
        setUserInfo(await getUserInfo());
        setChainInfo(await getChainId()); 
        setAccInfo(await getAccounts());
        setBalanceInfo(await getBalance());
        setPrivateInfo(await getPrivateKey());

        console.log(userdata.email);
        console.log("Chain data", chaindata);
        console.log("accountdata", accountdata);
        console.log("balancedata", balancedata);
        console.log("privatekey", privatedata);
    }    
    
    return(
        <>
            <h1>Here are your user settings</h1>
            <button onClick={getInfo}>here</button>
            {userdata?userdata.email:"No userdata"}
            {chaindata?chaindata:"No chainID"}
            {accountdata?accountdata:"No Account Info"}
            {balancedata?balancedata:"No data on balance"}
            {/* <ul>
                <li>{user?user:null}</li>
                <li>{chainId?chainId:null}</li>
                <li>{balance?balance:null}</li>
                <li>{address?address:null}</li>
                <li>{privateKey?privateKey:null}</li>
            </ul> */}
        </>
    )
}