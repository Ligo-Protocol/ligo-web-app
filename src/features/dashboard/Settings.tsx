import { useState } from "react"
import { TextField } from "@material-ui/core";

export function UserSettings({getUserInfo,getChainId,getAccounts,getBalance, getPrivateKey}){

    const [userdata, setUserInfo] = useState<any>();
    const [chaindata, setChainInfo] = useState<any>();
    const [accountdata, setAccInfo] = useState<any>();
    const [balancedata, setBalanceInfo] = useState<any>();
    const [privatedata, setPrivateInfo] = useState<any>();

    const [isTextHidden, setTextHidden] = useState(true);

    const onClick = () => setTextHidden(!isTextHidden);
   
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
            <br/>
            <div>
      <button onClick={onClick}>{isTextHidden ? 'Show' : 'Hide'}</button>
      {!isTextHidden ?  <TextField
      fullWidth 
          id="outlined-read-only-input"
          label="Private Key"
          defaultValue={privatedata}
          InputProps={{
            readOnly: true,
          }}
        /> : null}
    </div>
        </>
    )
}