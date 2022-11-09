import { useEffect } from "react";

export function Messaging({client}){
    useEffect(() => {
        const init = async () => {
          try {
               const offerResponses = await client.getOfferResponses();
                console.log("Offer Responses", offerResponses);
                const receivedCid = await offerResponses? offerResponses[0]?.agreementCid:null
                const api_url = "https://ipfs.io/api/v0/dag/get/"+receivedCid.toString()
                const url_response = await fetch(api_url);
                const data = await url_response.json();
                console.log(data);       
    
          } catch (error) {
            console.error(error);
          }
        };
    
        init();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return(
        <>
        <h1>Your networking app here</h1>
        </>
    )
}