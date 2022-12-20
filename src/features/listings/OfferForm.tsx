import React, { useState } from "react";
// import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// import { Offer } from "../ts-ligo-vocab/src/Offer";
import { createCeramicDoc } from "./createCeramicDoc";

// imports for uploading images
import process from "process";
import { Web3Storage } from "web3.storage";
import {descriptionInfo, 
  imageInfo, 
  areaServedInfo, 
  advanceBookingRequirementInfo, 
  modelDateInfo, 
  vehicleConfigurationInfo, 
  vinInfo,
  brandInfo,
  manufacturerInfo,
  modelInfo,
  priceInfo,
  priceCurrencyInfo,
  validFromInfo,
  validThroughInfo
} from "./FormHelpInfo";

import styles from "../../assets/css/features/listings/ListForm.module.css"

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
// import { Car } from "../../ts-ligo-vocab/src/Car";
// import { Offer, UnitPriceSpecification } from "../../ts-ligo-vocab/src";
// import HelpIcon Information

const defaultValues = {
  //Offer vocab
  description: "",
  image: "",
  seller: "did:example:carseller",
  areaServed: "",
  advanceBookingRequirement:0,

  //Car vocab
  modelDate: "",
  vehicleConfiguration: "",
  vehicleIdentificationNumber: "",
  brand: "",
  manufacturer: "",
  model: "",

  //PriceSpecification vocab
  price: 0,
  priceCurrency: "",
  validFrom: "2025-08-18",
  validThrough: "2025-08-18",
  eligibleQuantity: "",

  // //LigoAgreementState
  // startFuelLevel: "",
  // startOdometer: "",
  // startLocation: ""
};

const OfferForm = ({accountdata}) => {
  const [formValues, setFormValues] = useState(defaultValues);
  // const [selectedFile, setSelectedFile]: any = useState();
  const [newFile, setnewFile]: any = useState();
  const [imageCid, setimageCid]: any = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
 
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Account address",accountdata);
    console.log(formValues);
    // Creating offer from the form input

    //Car vocab
    const modelDate:any = formValues.modelDate
    const cardetails = {
      modelDate: modelDate,
      vehicleIdentificationNumber: formValues.vehicleIdentificationNumber,
      vehicleConfiguration: formValues.vehicleConfiguration,
      brand: {
        name: formValues.brand
      },
      manufacturer: {
        name: formValues.manufacturer
      },
      model: formValues.model
    }

    //PriceSpecification
    // const validFdetail = new Date(validF.toISOString()) ;
    // console.log("validFdetail",validFdetail);
    // const validTdetail = new Date(validT.toISOString()) ;
    const pricedetails = {
      price: formValues.price,
      priceCurrency: formValues.priceCurrency,
      validFrom: validF.format('YYYY-MM-DD'),
      validThrough: validT.format('YYYY-MM-DD')
    }



    //Offer vocab
    const areaServeddata:any = formValues.areaServed;
    const advancedBookingRequirement:any = formValues.advanceBookingRequirement;
    const sellerID:string = "did:pkh:"+accountdata.toString();
    console.log("SellerID",sellerID)
    const listoffer = {
      description: formValues.description,
      image: imageCid,
      seller: sellerID,
      areaServed: {
        postalCode:areaServeddata
      },
      advanceBookingRequirement: {
        value: advancedBookingRequirement
      },
      itemOffered: cardetails,
      priceSpecification: pricedetails
    };
    const listCreator = await createCeramicDoc(listoffer);
    console.log(listCreator);
  };

  // Upload image functions
  async function fileSelectHandler(event: any) {
    // Changing filename for easy retrieval from web3storage by ipfs

    setnewFile(
      new File([event.target.files[0]], "new_name.jpg", {
        type: event.target.files[0].type,
      })
    );
  }

  async function fileUploadHandler(event: any) {
    try{
      const token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
      console.log("THE TOKEN ----------->>>>", token);
      if (!token) {
        return console.error(
          "A token is needed. You can create one on https://web3.storage"
        );
      }

      const storage = new Web3Storage({ token });
      const cid = await storage.put([newFile], {
        name: "image",
      });
      setimageCid(cid);
      console.log("IMAGE CID ------------->>>", cid);
  }
    catch(error){
      console.log("Ligo web app failed to store and retried web3 storage CID.",error);
  }
  }

  const [validF, setValidF] = React.useState<Dayjs | null>(
    dayjs('2025-08-18T21:11:54'),
  );
  const [validT, setValidT] = React.useState<Dayjs | null>(
    dayjs('2026-08-18T21:11:54'),
  );

  const handleValidFromChange = (newValue: Dayjs | null) => {
    setValidF(newValue);
    console.log(validF);
  };
  const handleValidThroughChange = (newValue: Dayjs | null) => {
    setValidT(newValue);
    console.log(validT);
  };
  
  return (
    <div className={styles.center}>
    <h3>Offer details: </h3>
      <div className={styles.primary}>
        <input type="file" onChange={fileSelectHandler} />
        <Button onClick={fileUploadHandler}>Upload</Button>
        <Tooltip title={imageInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div
          >
            <div className={styles.description}>
              <TextField
                id="description-input"
                name="description"
                label="Description"
                type="text"
                multiline
                minRows={6}
                InputProps={{ inputProps: { min: 0, max:100}}}
                value={formValues.description}
                onChange={handleInputChange}
              />
              <Tooltip title={descriptionInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
          
             <div className={styles.inputbox}>
              <TextField
                id="areaServed-input"
                name="areaServed"
                label="Area Served"
                type="text"
                value={formValues.areaServed}
                onChange={handleInputChange}
              />
              <Tooltip title={areaServedInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>

            <div className={styles.inputbox}>
            <TextField
                id="advanceBookingRequirement-input"
                name="advanceBookingRequirement"
                label="Advanced booking requirement"
                type="number"
                InputProps={{ inputProps: { min: 0} }}
                value={formValues.advanceBookingRequirement}
                onChange={handleNumberInputChange}
              />
              <Tooltip title={advanceBookingRequirementInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            
            </div>
            
            <h3>Car details: </h3>
            <div className={styles.inputbox}>
              <TextField
                id="modelDate-input"
                name="modelDate"
                label="Model Date"
                type="text"
                value={formValues.modelDate}
                onChange={handleInputChange}
              />
              <Tooltip title={modelDateInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={styles.inputbox}>
              <TextField
                id="vehicleConfiguration-input"
                name="vehicleConfiguration"
                label="vehicleConfiguration"
                type="text"
                value={formValues.vehicleConfiguration}
                onChange={handleInputChange}
              />
              <Tooltip title={vehicleConfigurationInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={styles.inputbox}>
              <TextField
                id="vehicleIdentificationNumber-input"
                name="vehicleIdentificationNumber"
                label="VehicleIdentificationNumber"
                type="text"
                value={formValues.vehicleIdentificationNumber}
                onChange={handleInputChange}
              />
              <Tooltip title={vinInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
           
            <div className={styles.inputbox}>
              <TextField
                id="brand-input"
                name="brand"
                label="Brand Name"
                type="text"
                value={formValues.brand}
                onChange={handleInputChange}
              />
              <Tooltip title={brandInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={styles.inputbox}>
              <TextField
                id="manufacturer-input"
                name="manufacturer"
                label="Manufacturer"
                type="text"
                value={formValues.manufacturer}
                onChange={handleInputChange}
              />
              <Tooltip title={manufacturerInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={styles.inputbox}>
              <TextField
                id="model-input"
                name="model"
                label="Model"
                type="text"
                value={formValues.model}
                onChange={handleInputChange}
              />
              <Tooltip title={modelInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
           
           <h3>Price Specification details: </h3>
            <div className={styles.inputbox}>
              <TextField
                id="price-input"
                name="price"
                label="Price"
                type="number"
                InputProps={{ inputProps: { min: 0} }}
                value={formValues.price}
                onChange={handleNumberInputChange}
              />
              <Tooltip title={priceInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={styles.inputbox}>
              <FormControl>
                <Select
                  name="priceCurrency"
                  label="Price Currency"
                  value={formValues.priceCurrency}
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
              <Tooltip title={priceCurrencyInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className={styles.inputbox}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Valid From"
                  value={validF}
                  onChange={handleValidFromChange}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
              <Tooltip title={validFromInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
          </div>
          <div className={styles.inputbox}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Valid Through"
                  value={validT}
                  onChange={handleValidThroughChange}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
              <Tooltip title={validThroughInfo}>
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
          </div>
          <div className={styles.submit}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OfferForm;
