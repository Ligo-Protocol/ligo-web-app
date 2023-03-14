import fetch from "node-fetch";

// const transaction = [{ _id: "_user", username: "Icey" }];
const networkName = "fluree";
const datasetID = process.env.REACT_APP_FLUREE_DATASET_ID;
const APIKey = process.env.REACT_APP_FLUREE_API_KEY;

const url = `https://api.dev.flur.ee/fdb/${networkName}/${datasetID}`;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${APIKey}`,
};

const transactFluree = async(offer) => {
    console.log("TRANSACT OFFER", offer);
    const transaction = [
      {
          _id : "Offer",
          
          images: offer.image,
          description: offer.description,
  
          priceSpecification : {
          _id : "priceSpecification$1",
          price : offer.priceSpecification?.price,
          currency : offer.priceSpecification.priceCurrency},
          
          itemOffered : {
            _id : "itemOffered$1",
  
            vehicleIdentificationNumber: offer.itemOffered?.vehicleIdentificationNumber,
  
            brand: {
              _id : "brand$1",
              name: offer.itemOffered?.brand?.name
            },
            manufacturer: {
              _id : "manufacturer$1",
              legalName : offer.itemOffered?.manufacturer?.name
            }
          },
          advanceBookingRequirement : {
            _id : "advanceBookingRequirement$1",
            value : offer.advanceBookingRequirement.value
          },
          areaServed : {
            _id : "areaServed$1",
            postalCode : offer.areaServed.postalCode
          }
      }
      
  ];
  
    console.log(JSON.stringify(transaction))
    try {
        const resp = await fetch(`${url}/transact`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(transaction),
        });
        const data = await resp.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
}

export {transactFluree};