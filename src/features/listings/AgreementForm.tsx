import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { LigoAgreement } from "@js-ligo/vocab";

import styles from "../../assets/css/features/listings/AgreementForm.module.css";
import TextField from '@mui/material/TextField';

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

  const waku1: any = await createFullNode().then((waku) =>
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

const defaultValues = {
  //RentalCarReservation vocab
  bookingTime: "",
  provider: "",
  reservationFor: "",
  totalPrice: 0,
  underName: "",
  pickupLocation: "",
  pickupTime: "",
  //Order vocab
  acceptedOffer: "",
  customer: "",
  seller: "",
  orderDate: "",
  paymentMethod: "",
  paymentMethodId: "",
  paymentUrl: "",
};


const AgreementForm = ({ accountdata, responseData }) => {
  // Form variable and functions
  const [formValues, setFormValues] = useState(defaultValues);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const currentdate: Dayjs = dayjs().tz("America/Atikokan"); // '2022-10-16T11:26:29-05:00'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const customerID: string = "did:pkh:" + accountdata.toString();


  const handleSubmit = async (event) => {
    event.preventDefault();

    //RentalCarReservation Vocab
    const RentalCarReservationDetails = {
      bookingTime: currentdate.format().substring(0, 19) + "Z",
      provider: responseData.seller.id,
      reservationFor: responseData.id,
      totalPrice: responseData.priceSpecification.price,
      underName: formValues.underName,
      pickupLocation: formValues.pickupLocation,
      pickupTime: validPT.format().substring(0, 19) + "Z"
    }

    //Order vocab
    const OrderDetails = {
      acceptedOffer: responseData.id,
      customer: customerID,
      seller: responseData.seller.id,
      orderDate: currentdate.format().substring(0, 19) + "Z",
      //paymentMethod: formValues.paymentMethod
    }

    const AgreementDetails: LigoAgreement = {
      order: OrderDetails,
      reservation: RentalCarReservationDetails
    }
    const SellerAddress = OrderDetails.seller.toString().substring(8)
    console.log("LigoAgreement", AgreementDetails);

    const DID_B = "did:ethr:goerli:" + SellerAddress;

    try {
      // localStorage.clear();
      const { client } = await buildAndConnectClient();
      await client.proposeAgreement("ceramic://id", DID_B, AgreementDetails);
      await fs.writeFile("./test/test-datastore.json", JSON.stringify(dataStore));
    }
    catch (error) {
      console.log("Ligo web app could not propose agreement to the host", error)
    }
  };

  // Pickup Time
  const [validPT, setValidPT] = React.useState<Dayjs | null>(
    dayjs().tz("America/Atikokan"),
  );

  const handlePickUpTimeChange = (newValue: Dayjs | null) => {
    setValidPT(newValue);
  };

  return (
    <div className={styles.center}>
      <div>
        <h3>Rental car reservation details: </h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.longtext}>
            {responseData?.seller?.id ?
              <TextField
                id="outlined-read-only-input"
                label="Seller ID"
                fullWidth
                defaultValue={responseData.seller.id}
                InputProps={{
                  readOnly: true,
                }}
              /> : null}
          </div>
          <div className={styles.longtext}>
            {responseData?.priceSpecification?.price ?
              <TextField
                id="outlined-read-only-input"
                label="Price"
                fullWidth
                defaultValue={responseData.priceSpecification.price.toString() + responseData.priceSpecification.priceCurrency + "/day"}
                InputProps={{
                  readOnly: true,
                }}
              /> : null}
          </div>
          <div className={styles.longtext}>
            <TextField
              id="underName-input"
              name="underName"
              label="Your Name"
              fullWidth
              type="text"
              value={formValues.underName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.longtext}>
            <TextField
              id="pickupLocation-input"
              name="pickupLocation"
              label="Pick Up Location"
              fullWidth
              type="text"
              value={formValues.pickupLocation}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.longtext}>
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Pick Up Time"
                value={validPT}
                onChange={handlePickUpTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Tooltip title="Pick Up Time">
              <IconButton>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </div>
          <h3>Order Details :</h3>

          <div className={styles.longtext}>
            {responseData?.id ?
              <TextField
                id="outlined-read-only-input"
                label="Offer ID"
                defaultValue={responseData.id}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              /> : null}
          </div>
          <div className={styles.longtext}>
            {responseData?.seller?.id ?
              <TextField
                id="outlined-read-only-input"
                label="Seller ID"
                fullWidth
                defaultValue={responseData.seller.id}
                InputProps={{
                  readOnly: true,
                }}
              /> : null}
          </div>
          <div className={styles.longtext}>
            <TextField
              id="outlined-read-only-input"
              label="Your ID/Customer ID"
              fullWidth
              defaultValue={customerID}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={styles.longtext}>
            <label>Payment Method</label>
            <FormControl>
              <Select
                name="paymentMethod"
                label="Price Currency"
                value={formValues.paymentMethod}
                onChange={handleInputChange}
              >
                <MenuItem key="USD" value="USD">
                  USD
                </MenuItem>
                <MenuItem key="BTC" value="BTC">
                  BTC
                </MenuItem>
                <MenuItem key="ETH" value="ETH">
                  ETH
                </MenuItem>
              </Select>
            </FormControl>
            <Tooltip title="Your preferred payment method">
              <IconButton>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={styles.center}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AgreementForm;