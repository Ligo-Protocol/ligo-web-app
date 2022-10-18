import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


import styles from "../../assets/css/features/listings/RentalReservationForm.module.css"

import TextField from '@mui/material/TextField';

const defaultValues = {
  //RentalCarReservation vocab
  bookingTime: "",
  provider: "",
  reservationFor: "",
  totalPrice: 0,
  underName: "",
  pickupLocation: "",
  pickupTime: ""
};

const RentalReservationForm = ({accountdata, responseData}) => {
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
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Account address",accountdata);
    console.log(formValues);
    
    //RentalCarReservation Vocab
    const RentalCarReservationDetails = {
      bookingTime: currentdate.format().substring(0,19)+"Z",
      provider: responseData.seller.id,
      reservationFor: responseData.id,
      totalPrice: responseData.priceSpecification.price,
      underName: formValues.underName,
      pickupLocation: formValues.pickupLocation,
      pickupTime: validPT.format().substring(0,19)+"Z"
    }
    console.log("Car Details",RentalCarReservationDetails);
  };

  // Pickup Time
  const [validPT, setValidPT] = React.useState<Dayjs | null>(
    dayjs().tz("America/Atikokan"),
  );
  
  const handlePickUpTimeChange = (newValue: Dayjs | null) => {
    setValidPT(newValue);
    console.log("New Pickup time",validPT);
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
                  />: null}
            </div>
            <div className={styles.longtext}>
                  {responseData?.priceSpecification?.price ?
                  <TextField
                    id="outlined-read-only-input"
                    label="Price"
                    fullWidth
                    defaultValue={responseData.priceSpecification.price.toString()+responseData.priceSpecification.priceCurrency+"/day"}
                    InputProps={{
                      readOnly: true,
                    }}
                  />: null}
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
export default RentalReservationForm;
