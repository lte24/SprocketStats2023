import {
  Button,
  Avatar,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserStore } from "../state/useUserStore";

function Profile() {
  const isMobile = window.screen.width < 600;
  const { firstName, lastName, seed, userName, email } =
    useUserStore.getState();

  const [enterCode, setEnterCode] = useState("");

  function handleChange(e) {
    setEnterCode(e.target.value);
  }

  function onPageLoad() {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    axios
      .get(
        "http://localhost:4000/api/v1/events/eventId/" +
          // "https://sprocketstats-backend.herokuapp.com/api/v1/events/eventId/" +
          localStorage.getItem("eventCode"),
        config
      )
      .then((res) => {
        localStorage.setItem("eventName", res.data.name); // eventName
        console.log(localStorage.getItem("eventCode"));
        console.log(localStorage.getItem("eventName"));
      })
      .catch((err) => {});
  }

  // function handleSelect(e) {
  //   setColor(e.target.value);
  //   setSeed(
  //     "https://avatars.dicebear.com/api/identicon/:" +
  //       firstName +
  //       lastName +
  //       ".svg?color[]=" +
  //       color
  //   );
  // }

  function onSubmit() {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    axios
      .patch(
        "https://sprocketstats-backend.herokuapp.com/api/v1/users/currentEvent",
        { eventCode: enterCode },
        config
      )
      .then((res) => {
        localStorage.setItem("eventName", res.data.eventName);
        console.log(
          "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          res
        );
        alert("Sucess.");
        window.location.reload();
      })
      .catch((err) => {
        console.log("EVENTCODE", localStorage.getItem("eventCode"));
        console.log("EVENTNAME", localStorage.getItem("eventName"));
        console.log(err);
        alert("Code doesn't exist.");
      });
  }

  useEffect(onPageLoad, []);

  return (
    <Grid
      container
      spacing={10}
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{
        marginTop: "-7em",
        justifyContent: "center",
        marginLeft: "-15%",
      }}
    >
      <Grid item>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            marginLeft: "-10%",
          }}
        >
          {!isMobile ? (
            <Avatar
              sx={{
                width: "40%",
                height: "40%",
              }}
              src={seed}
            />
          ) : (
            <Avatar
              sx={{
                width: "50%",
                height: "50%",
              }}
              src={seed}
            />
          )}
        </div>
        <Typography
          variant="h2"
          style={{
            fontSize: 50,
            display: "flex",
            marginLeft: "-10%",
          }}
        >
          {userName}
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontSize: 15,
            display: "flex",
            marginLeft: "-10%",
          }}
        >
          {"Name: " + firstName + " " + lastName}
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontSize: 15,
            display: "flex",
            marginLeft: "-10%",
          }}
        >
          {"Email: " + email}
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontSize: 15,
            display: "flex",
            marginLeft: "-10%",
          }}
        >
          {/* doesnt change when the code changes */}
          {"Current Event: " + localStorage.getItem("eventCode")}
        </Typography>
        <div
          style={{
            justifyContent: "left",
            marginBottom: "1.5%",
            marginLeft: "-10%",
          }}
        >
          <TextField
            name="eventCode"
            onChange={handleChange}
            type="text"
            variant="standard"
            label="Event Code"
            sx={{
              width: "80vmin",
              "& label": { color: "black" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "black",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "black" },
            }}
          />
        </div>
        <div
          style={{
            marginTop: "5%",
            fontSize: "200%",
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button variant="contained" onClick={onSubmit}>
            Enter
          </Button>
        </div>
        {/* <div
          style={{
            marginTop: "5%",
            display: "flex",
            justifyContent: "left",
          }}
        >
          <FormControl sx={{ m: "1%", width: "80%" }}>
            <InputLabel id="demo-simple-select-helper-label">
              <Typography variant="body1">Profile Picture Color</Typography>
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={color}
              label="Profile Color"
              onChange={handleSelect}
            >
              <MenuItem value="amber">Amber</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="blueGrey">Blue Grey</MenuItem>
              <MenuItem value="brown">Brown</MenuItem>
              <MenuItem value="cyan">Cyan</MenuItem>
              <MenuItem value="deepOrange">Deep Orange</MenuItem>
              <MenuItem value="deepPurple">Deep Purple</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="grey">Grey</MenuItem>
              <MenuItem value="indigo">Indigo</MenuItem>
              <MenuItem value="lightBlue">Light Blue</MenuItem>
              <MenuItem value="lightGreen">Light Green</MenuItem>
              <MenuItem value="lime">Lime</MenuItem>
              <MenuItem value="orange">Orange</MenuItem>
              <MenuItem value="pink">Pink</MenuItem>
              <MenuItem value="purple">Purple</MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="teal">Teal</MenuItem>
              <MenuItem value="yellow">Yellow</MenuItem>
            </Select>
          </FormControl>
        </div> */}
      </Grid>
    </Grid>
  );
}

export default Profile;
