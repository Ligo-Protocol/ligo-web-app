import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import logo from "../images/logo-white.png";
import { ConnectButton, Icon, Select, DatePicker, Input, Button } from "web3uikit";
import { useState } from "react";

const Home = () => {
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [location, setLocation] = useState(" ");
  const [cartype, setType] = useState(" ");
  const [markettype, setMarket] = useState(" ");

  return (
    <>
      <div className="container">
        <div className="containerGradient">
        </div>
        <div className="topBanner">
          <div>
            <img className="logo" src={logo} alt="logo"></img>
          </div>
          <div className="tabs">
            <div className="selected"><a href="https://ligo.dev/docs/">Documentation</a></div>
            <div><a href="https://ligo.dev/">About Us</a></div>
            <div><a href="https://docs.google.com/forms/d/e/1FAIpQLSe82qaf-NKFq6xkYEbHGnFqS8npNGuSzO3xbT_fejklEkFeAA/viewform">Join Waitlist</a></div>
          </div>
          <div className="lrContainers">
            <ConnectButton />
          </div>
        </div>
        <div className="tabContent">
          <div className="searchFields">
            <div className="inputs">
              Location
              <Select
                defaultOptionIndex={0}
                onChange={(data) => setLocation(data.label)}
                options={[
                  {
                    id: "ny",
                    label: "New York"
                  },
                  {
                    id: "aus",
                    label: "Austin"
                  },
                  {
                    id: "nj",
                    label: "New Jersey"
                  },
                  {
                    id: "hyd",
                    label: "Hyderabad"
                  },
                ]}
              />
            </div>
            <div className="vl" />
            <div className="inputs">
              Pickup Date
              <DatePicker
                id="pickUpDate"
                onChange={(event) => setPickUpDate(event.date)}
              />
            </div>
            <div className="vl" />
            <div className="inputs">
              Return Date
              <DatePicker
                id="returnDate"
                onChange={(event) => setReturnDate(event.date)}
              />
            </div>
            <div className="vl" />
            <div className="inputs">
              Type of Car
              <Select
                defaultOptionIndex={0}
                onChange={(data) => setType(data.label)}
                options={[
                  {
                    id: "sedan",
                    label: "Sedan"
                  },
                  {
                    id: "SUV",
                    label: "SUV"
                  },
                  {
                    id: "compact",
                    label: "Compact"
                  },
                  {
                    id: "Electric",
                    label: "Electric"
                  },
                ]}
              />
            </div>
            <div className="vl" />
            <div className="inputs">
              Market Type
              <Select
                defaultOptionIndex={0}
                onChange={(data) => setMarket(data.label)}
                options={[
                  {
                    id: "open",
                    label: "Open Market"
                  },
                  {
                    id: "close",
                    label: "Close Market"
                  },
                  {
                    id: "coop",
                    label: "Coop Market"
                  },
                ]}
              />
            </div>
            <Link to={"/rentals"} state={{
              location: location,
              pickUpDate: pickUpDate,
              returnDate: returnDate,
              cartype: cartype,
              markettype: markettype,

            }}>
              <div className="searchButton">
                <Icon fill="#ffffff" size={24} svg="search" />
              </div>
            </Link>
          </div>
        </div>
        <div className="randomLocation">
          <div className="title">Your Blockchain Powered Car Sharing Platform</div>
          <div className="text">
            Let us decide and dicover new roads to drive.
          </div>
          <div className="button">
            <Button
              size="large"
              text="Get Started"
              onClick={() => console.log(returnDate)}
            /></div>
        </div>
      </div>
    </>
  );
};

export default Home;
