import React from 'react';

export function WyrePayment(){
    async function Pay(){
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Bearer TEST-SK-NJBM7HCD-73XMAE9P-Q87BW8WX-LCW9HXXB'
            },
            body: JSON.stringify({
              lockFields: ['amount', 'destCurrency', 'dest', 'sourceCurrency'],
              referrerAccountId: 'AC_Q4AZHYVQNXU',
              amount: '10',
              sourceCurrency: 'USD',
              destCurrency: 'DAI',
              dest: 'ethereum:0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413',
              firstName: 'Crash',
              lastName: 'Bandicoot',
              country: 'US',
              postalCode: '90140',
              state: 'CA'
            })
          };
          fetch('https://api.testwyre.com/v3/orders/reserve', options)
            .then(response => response.json())
            .then(response => window.location.href = response?.url)
            .catch(err => console.error(err));
    }

    return(
        <>
        <button onClick={Pay}>Pay by Wyre</button>
        </>
    )
}