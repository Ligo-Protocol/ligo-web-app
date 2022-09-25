import { PriceSpecification } from "../../ts-ligo-vocab/src"
import { Car } from "../../ts-ligo-vocab/src/Car"
import { LigoAgreementState } from "../../ts-ligo-vocab/src";
// import { Offer } from "../../ts-ligo-vocab/src";

export function TestSchema(){
    async function tester(){
        const Omega:any = '(U+002E)';
    const priceSpec: PriceSpecification = {
         price: 1000,
         priceCurrency: "USD",
         validFrom: '2020-07-25T11:32:31',
         validThrough: '2020-08-25T11:32:31',
         eligibleQuantity: Omega
    };

    const date = new Date("2019-01-16");
    const car: Car = {
        modelDate: date,
        vehicleConfiguration:"limited edition",
        vehicleIdentificationNumber: "198LASIW1931ASL",
        brand: "Tesla",
        manufacturer: "Tesla",
        model: "S"
    };
    const fuellevel:any= 2000;
    const offer: LigoAgreementState = {
        startFuelLevel: fuellevel
    }
    

  

    console.log("PriceSpecificaiton",priceSpec)
    console.log("Car",car);
}


    return(
        <>
            <button onClick={tester}>Click here</button>
        </>
    )
}