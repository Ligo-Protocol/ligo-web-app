import { useState } from "react"
import { TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
            <Button onClick={getInfo}>Click to show Wallet Address and Private Key</Button>
            {accountdata? <div>
                
                <TextField 
                    id="outlined-read-only-input"
                    label="Wallet address"
                    defaultValue={accountdata}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <IconButton onClick={() => {navigator.clipboard.writeText(accountdata)}}
                    ><ContentCopyIcon/></IconButton>
            </div>  :null }
                      
            <br/>
            {privatedata?
            <div>
                <Button onClick={onClick}>{isTextHidden ? 'Show Private Key' : 'Hide'}</Button>
                {!isTextHidden ?  
                <>
                <TextField 
                    id="outlined-read-only-input"
                    label="Private Key"
                    defaultValue={privatedata}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <IconButton onClick={() => {navigator.clipboard.writeText(privatedata)}}
                    ><ContentCopyIcon/></IconButton>
                </> : null}
            </div> :null}
    
        </>
    )
}