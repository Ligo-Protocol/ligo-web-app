import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


import {
  modelDateInfo, 
  vehicleConfigurationInfo, 
  vinInfo,
  brandInfo,
  manufacturerInfo,
  modelInfo
} from "./FormHelpInfo";

import styles from "../../assets/css/features/listings/ListForm.module.css"

import TextField from '@mui/material/TextField';
const defaultValues = {
  //Car vocab
  modelDate: "",
  vehicleConfiguration: "",
  vehicleIdentificationNumber: "",
  brand: "",
  manufacturer: "",
  model: "",
};

const CarForm = ({accountdata}) => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Account address",accountdata);
    console.log(formValues);
    
    //Car vocab
    const modelDate:any = formValues.modelDate
    const cardetails = {
      modelDate: modelDate,
      vehicleConfiguration: formValues.vehicleConfiguration,
      brand: {
        name: formValues.brand
      },
      manufacturer: {
        name: formValues.manufacturer
      },
      model: formValues.model
    }
    console.log("Car Details",cardetails);
  };
  
  return (
    <div className={styles.center}>
      <div>
        <form onSubmit={handleSubmit}>
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
export default CarForm;
