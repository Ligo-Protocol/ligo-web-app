import ResponsiveAppBar from "./Navbar/Navbar";
import CustomizedTimeline from "./Information";
import { Button } from "@mui/material";
import { BoxContent } from "./Boxcontent";

export function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <BoxContent />
      <CustomizedTimeline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <Button variant="contained" color="success">
          Get Started
        </Button>
      </div>
    </>
  );
}
