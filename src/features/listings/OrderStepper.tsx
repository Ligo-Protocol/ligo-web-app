import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SingleOfferView } from './SingleOfferView';
import Paper from '@mui/material/Paper';

// Offer based imports
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../__generated__/definition.js";
import { useEffect,useState} from "react";

import styles from "../../assets/css/features/listings/OrderStepper.module.css"
import { useParams } from 'react-router-dom';
import AgreementForm from './AgreementForm';

const steps =['View Offer', 'Book Reservation', 'Create Order'];

export default function OrderStepper({accountdata,client}) {
  // Get Offer ID
  let { offerid } = useParams();

  // Get Offer details 

    const [responseData, setResponseData] = useState<any>([]);
    console.log("Passed offerId", offerid)
    // Connect, Generate Seed and Authenticate
    const compose = new ComposeClient({
      ceramic: "https://ceramic-clay.oort.codyhatfield.me",
      definition: definition as any,
    });
    // Generate seed
    const txt = new TextEncoder();
    function rng() {
      let uID = "";
      let length = 32;
      let possible = "abcdef0123456789";
      for (let i = 0; i < length; i++) {
        uID += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return uID;
    }
    const hex = rng();
    const seed = txt.encode(hex);

    console.log(seed);
    const DIDprovider = new Ed25519Provider(seed);
    const did = new DID({ provider: DIDprovider, resolver: getResolver() });

    useEffect(() => {
      const Resultprocessing = async (did) => {
        await did.authenticate();
        compose.setDID(did);
        console.log("did.authenticated = ", did.authenticated);
        const fetchResult1 = await compose.executeQuery(
            `
              query($nodeid: ID!) {
                node(id: $nodeid) {
                  id
                  ... on Offer {
                    seller {
                        id
                      }
                      description
                      image
                      itemOffered {
                        vehicleIdentificationNumber
                        modelDate
                        brand {
                          name
                        }
                        manufacturer {
                          name
                        }
                        model
                        vehicleConfiguration
                      }
                      areaServed {
                        postalCode
                      }
                      priceSpecification {
                        price
                        priceCurrency
                        validFrom
                        validThrough
                      }
                      advanceBookingRequirement {
                        value
                      }
                  }
                }
              }
            `,
            {nodeid:offerid}
            );
          
            console.log("Selected Offer ID", offerid);
            console.log("Single Offer details:", fetchResult1);
            setResponseData(await fetchResult1.data.node);

    };
      Resultprocessing(did).catch((error: any) => {
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
                  {activeStep===1? <AgreementForm accountdata={accountdata} responseData={responseData} client={client}/> : null}
                  {activeStep===2? "Will See" : null}

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
