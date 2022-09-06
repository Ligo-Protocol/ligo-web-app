import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { Offer } from "../ts-ligo-vocab/src/Offer";
import { createCeramicDoc } from "./createCeramicDoc";

const defaultValues = {
  description: "",
  image: "",
  vehicleIdentificationNumber: "",
  vehicleModelDate: "",
  model: "",
  seller: "",
  postalcode: "",
  price: 0,
  value: 0,
  unitCode: "",
};

const ListForm = () => {
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
    console.log(formValues);
    // Creating offer from the form input
    const listoffer: Offer = {
      description: formValues.description,
      image: formValues.image,
      itemOffered: {
        model: formValues.model,
      },
      seller: formValues.seller,
      priceSpecification: {
        // price: formValues.price,
        priceCurrency: "USD",
      },
    };
    const listCreator = await createCeramicDoc(listoffer);
    console.log(listCreator);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="description-input"
            name="description"
            label="Description"
            type="text"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="image-input"
            name="image"
            label="Image"
            type="text"
            value={formValues.image}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="vehicleIdentificationNumber-input"
            name="vehicleIdentificationNumber"
            label="VehicleIdentificationNumber"
            type="text"
            value={formValues.vehicleIdentificationNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="vehicleModelDate-input"
            name="vehicleModelDate"
            label="VehicleModelDate"
            type="text"
            value={formValues.vehicleModelDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="model-input"
            name="model"
            label="Model"
            type="text"
            value={formValues.model}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="seller-input"
            name="seller"
            label="Seller"
            type="text"
            value={formValues.seller}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="postalcode-input"
            name="postalcode"
            label="Area Served Postalcode"
            type="text"
            value={formValues.postalcode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="price-input"
            name="price"
            label="Price"
            type="number"
            value={formValues.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="value-input"
            name="value"
            label="Advanced booking requirement"
            type="number"
            value={formValues.value}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <Select
              name="unitCode"
              value={formValues.unitCode}
              onChange={handleInputChange}
            >
              <MenuItem key="HUR" value="HUR">
                Hours
              </MenuItem>
              <MenuItem key="MIN" value="MIN">
                Minutes
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};
export default ListForm;
