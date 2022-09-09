import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

// import { Offer } from "../ts-ligo-vocab/src/Offer";
import { createCeramicDoc } from "./createCeramicDoc";

// imports for uploading images
import process from "process";
import { Web3Storage } from "web3.storage";

const defaultValues = {
  description: "",
  image: "",
  vehicleIdentificationNumber: "",
  modelDate: "",
  model: "",
  brandname: "",
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

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    // Creating offer from the form input
    const listoffer = {
      description: formValues.description,
      image: imageCid,
      itemOffered: {
        vehicleIdentificationNumber: formValues.vehicleIdentificationNumber,
        modelDate: formValues.modelDate,
        brand: {
          name: formValues.brandname,
        },
        model: formValues.model,
      },
      seller: formValues.seller,
      areaServed: {
        postalCode: formValues.postalcode,
      },
      priceSpecification: {
        price: formValues.price,
        priceCurrency: "USD",
      },
      advanceBookingRequirement: {
        value: formValues.value,
        unitCode: formValues.unitCode,
      },
    };
    const listCreator = await createCeramicDoc(listoffer);
    console.log(listCreator);
  };

  // Upload image functions
  const [selectedFile, setSelectedFile]: any = useState();
  const [imageCid, setimageCid]: any = useState();

  function fileSelectHandler(event: any) {
    setSelectedFile(event.target.files[0]);
  }

  async function fileUploadHandler(event: any) {
    const token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
    console.log("THE TOKEN ----------->>>>", token);
    if (!token) {
      return console.error(
        "A token is needed. You can create one on https://web3.storage"
      );
    }

    const storage = new Web3Storage({ token });
    const cid = await storage.put([selectedFile], {
      name: selectedFile.name,
    });
    setimageCid(cid);
    console.log("IMAGE CID ------------->>>", cid);
  }
  return (
    <div>
      <div className="uploadImagge">
        <input type="file" onChange={fileSelectHandler} />
        <Button onClick={fileUploadHandler}>Upload</Button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={4}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <TextField
                id="description-input"
                name="description"
                label="Description"
                type="text"
                multiline
                rows={4}
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
                id="modelDate-input"
                name="modelDate"
                label="Model Date"
                type="text"
                value={formValues.modelDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="brandname-input"
                name="brandname"
                label="Brand Name"
                type="text"
                value={formValues.brandname}
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
                label="Seller ID"
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
                onChange={handleNumberInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="value-input"
                name="value"
                label="Advanced booking requirement"
                type="number"
                value={formValues.value}
                onChange={handleNumberInputChange}
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
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ListForm;
