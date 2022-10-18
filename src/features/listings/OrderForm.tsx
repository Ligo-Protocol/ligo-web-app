import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import dayjs, { Dayjs } from 'dayjs';

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@mui/material/TextField';

import styles from "../../assets/css/features/listings/OrderForm.module.css"

const defaultValues = {
  //Order vocab
  acceptedOffer: "",
  customer: "",
  seller: "",
  orderDate: "",
  paymentMethod: "",
  paymentMethodId: "",
  paymentUrl: "",
};

const OrderForm = ({accountdata,responseData}) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const currentdate: Dayjs = dayjs()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const customerID:string = "did:pkh:"+accountdata.toString();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Account address",accountdata);
    console.log(formValues);
    
    //Order vocab
    const OrderDetails = {
      acceptedOffer: responseData.id,
      customer: customerID,
      seller: responseData.seller.id,
      orderDate: currentdate.format().substring(0, 19)+"Z",
      paymentMethod: formValues.paymentMethod
    }
    console.log("Order Details",OrderDetails);
  };
  
  return (
    <div className={styles.center}>
      <div>
            <h3>Order details: </h3>
        <form onSubmit={handleSubmit}>
          
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
                  />: null}
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
                  />: null}
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
export default OrderForm;
