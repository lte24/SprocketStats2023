import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Landing.css";
import { Typography } from "@mui/material";

interface LandingProps {}

interface LandingState {}

function Landing(props: LandingProps) {
  var isMobile = window.screen.width < 600;

  return (
    <div className="w-75">
      <div
        style={{
          borderBottom: "5px solid #ba95dc",
          marginLeft: "2%",
          paddingBottom: "5%",
        }}
      >
        <Typography
          variant="h1"
          style={{ fontSize: "5em", lineHeight: "90%", fontWeight: "400" }}
        >
          SPROCKET <br /> STATS
        </Typography>
      </div>
      <img
        src="\sprocketlogoDBDBDB.png"
        alt="sprocket logo"
        className="bg-image greysprocketlogo mx-5"
      />

      <div style={{ lineHeight: "100%", padding: "2%", marginLeft: "2%" }}>
        <Typography variant="body2" style={{ fontSize: "1.3em" }}>
          Sprocket Stats is a comprehensive, customizable, cross-platform
          scouting application for the FIRST Robotics Competition. Through
          collecting and analyzing robot performance data, this application
          assists your team in making informed strategic decisions.
        </Typography>
      </div>
    </div>
  );
}
export default Landing;
