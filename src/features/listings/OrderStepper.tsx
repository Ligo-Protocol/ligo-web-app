import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SingleOfferView } from './SingleOfferView';
import RentalReservationForm from './RentalReservationForm';
import OrderForm from './OrderForm';
import Paper from '@mui/material/Paper';

import { useEffect,useState} from "react";

import styles from "../../assets/css/features/listings/OrderStepper.module.css"
import { useParams } from 'react-router-dom';

import fetch from "node-fetch";

const steps =['View Offer', 'Book Reservation', 'Create Order'];

// const query = { select: ["*"], from: "_collection" };
const networkName = "fluree";
const datasetID = process.env.REACT_APP_FLUREE_DATASET_ID;
const APIKey = process.env.REACT_APP_FLUREE_API_KEY;

const url = `https://api.dev.flur.ee/fdb/${networkName}/${datasetID}`;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${APIKey}`,
};

export default function OrderStepper({accountdata}) {
  // Get Offer ID
  let { offerid } = useParams();

  // Get Offer details 

    const [responseData, setResponseData] = useState<any>([]);
    // eslint-disable-next-line no-useless-concat
    const offeridtarget = "Offer/images = " + "\""+offerid + "\""; 
    console.log(offeridtarget)
    
    useEffect(() => {
      const Resultprocessing = async (query) => {
        try {
          const resp = await fetch(`${url}/query`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(query),
          });
          const data = await resp.json();
          setResponseData(data[0]);
          console.log("RETURNED DATA",data);
        } catch (error) {
          console.error(error);
        }
      };
      const query = {
        "select": [
          "images",
          "description",
          { 
            "itemOffered": ["*", "vehicleIdentificationNumber", { "brand": ["name"] }, { "manufacturer": ["legalName"] }], 
            "priceSpecification": ["currency", "price"],
            "areaServed": ["postalCode"],
            "advanceBookingRequirement" : ["value"],
          }
        ],
        "from": "Offer",
        "where": offeridtarget
      };
  
      Resultprocessing(query).catch((error: any) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  //Stepper Variables and functions
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  //Single Offer View Variable and functions

  //Book Reservation Variables and functions

  

  return (
      <div className={styles.center}>
        <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 800,
            height: 1000,
          },
        }}
        >
        <Paper elevation={10} >
        <Box sx={{ width: '100%' }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  {activeStep===0? <SingleOfferView responseData={responseData} /> :null}
                  {activeStep===1? <RentalReservationForm accountdata={accountdata} responseData={responseData}/> : null}
                  {activeStep===2? <OrderForm accountdata={accountdata} responseData={responseData}/> : null}

                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? 'Finish'
                          : 'Complete Step'}
                      </Button>
                    ))}
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
        </Paper>
        </Box>
      </div>
  );
}
