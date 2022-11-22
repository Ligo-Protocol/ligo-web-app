import transakSDK from '@transak/transak-sdk'
import React from 'react';

export function TransakExchange(){
    async function CallTransak(){
    const transak = new transakSDK({
        apiKey: '0c20d94d-5e8f-476d-b0c3-eb32346e83e5',  // Your API Key
        environment: 'STAGING', // STAGING/PRODUCTION
        widgetHeight: '625px',
        widgetWidth: '500px',
        // Examples of some of the customization parameters you can pass
        fiatAmount: 100,
        defaultCryptoCurrency: '[ETH]', // Example 'ETH'
        walletAddress: '', // Your customer's wallet address
        themeColor: '#00FFFF', // App theme color
        fiatCurrency: 'USD', // If you want to limit fiat selection eg 'GBP'
        email: 'example@gmail.com', // Your customer's email address
        redirectURL: 'ligo.dev' // Redirect URL of your app    
    });

    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
            console.log(data)
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
        console.log(orderData);
        transak.close();
    });
}

    return(
        <>
        <button onClick={CallTransak}>Test Button</button>
        </>
)
}