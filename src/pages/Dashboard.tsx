import { useUserStore } from "../state/useUserStore";
import React, { useState } from "react";
import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Hidden,
  autocompleteClasses,
} from "@mui/material";


function Dashboard() {
  const { firstName } = useUserStore.getState();
  const screenSize = window.screen.width;
  return (
    <Grid
      style={{
        backgroundColor: "#d89ce4",
      }}
    >
      <Grid item style={{}}>
        <Box
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            style={{
              color: "#d89ce4",
              fontSize: "380%",
              marginLeft: "5%",
              lineHeight: "100%",
            }}
          >
            HELLO <br />
            {firstName.toLocaleUpperCase()}!
          </Typography>

          <Button
            style={{
              backgroundColor: "#d89ce4",
              marginTop: "3%",
              marginLeft: "5%",
              color: "#ffffff",
              height: "5%",
              fontSize: "170%",
            }}
            href="/dataentry/5e6482f54c0ab94074ee4752/635f30dcd8d60836449c42a9"
          >
            MATCH SCOUT
          </Button>
          <br />

          <Button
            style={{
              backgroundColor: "#d89ce4",
              marginTop: "5%",
              marginLeft: "5%",
              marginBottom: "7%",
              color: "#ffffff",
              textAlign: "left",
              height: "5%",
              fontSize: "170%",
            }}
            href="/dataentry/6229af2cb3f44f3153808d06/635f30dcd8d60836449c42a9"
          >
            PIT SCOUT
          </Button>
          <img
            src="\logo-without-rocket.svg"
            alt="sprocket logo"
            style={{
              width: "100%",
              marginTop: "-24%",
              contain: "relative",
              transform: "rotate(-20deg)",
              position: "fixed",
              zIndex: "1",
            }}
          />
        </Box>
        <div
          style={{
            backgroundColor: "#d89ce4",
            position: "fixed",
            paddingTop: "10%",
            paddingBottom: "35%",
            height: "100%",
            width: "100%",
            zIndex: "3",
          }}
        >
          <Select
            style={{
              width: "50%",
              marginTop: "5%",
              marginLeft: "25%",
              marginBottom: "10%",
            }}
          >
            <MenuItem>Match 1</MenuItem>
            <MenuItem>Match 2</MenuItem>
            <MenuItem>Match 3</MenuItem>
            <MenuItem>Match 4</MenuItem>
            <MenuItem>Match 5</MenuItem>
            <MenuItem>Match 6</MenuItem>
            <MenuItem>Match 7</MenuItem>
            <MenuItem>Match 8</MenuItem>
            <MenuItem>Match 9</MenuItem>
            <MenuItem>Match 10</MenuItem>
          </Select>

          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: "20%",
              marginLeft: "10%",
              width: "80%",
              position: "absolute",
            }}
          >
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
export default Dashboard;
