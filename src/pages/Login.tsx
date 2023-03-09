import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import {
  TextField,
  Grid,
  Typography,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material/";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { setColor } from "../state/useUserStore";

interface LoginProps {}
interface LoginState {
  username: string;
  password: string;
}

function Login(props: LoginProps, state: LoginState) {
  const isMobile = window.screen.width < 600;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [user, setUser] = useState({
    username: String,
    password: String,
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    // console.log(user);
  }
  function onSubmit(target) {
    let userLogin = {
      username: user.username,
      password: user.password,
    };
    console.log(userLogin);

    axios
      .post(
        "http://localhost:4000/api/v1/users/login",
        user
        // `https://sprocketstats-backend.herokuapp.com/api/v1/users/login`,
      )
      .then((res) => {
        localStorage.setItem("jwt", res.headers["x-auth-token"]);
        window.location.replace("/Dashboard");
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log("ASKJDHASkjdHKJSAd");
      });
  }

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
      }}
    >
      <Grid item>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {!isMobile ? (
            <img
              src="\Team-Logo-Black.svg"
              style={{ height: "13%", width: "13%", marginTop: "2%" }}
            />
          ) : (
            <img
              src="\Team-Logo-Black.svg"
              style={{ height: "40%", width: "40%" }}
            />
          )}
        </div>
        <Typography
          variant="h2"
          style={{
            fontSize: 50,
            display: "flex",
            justifyContent: "center",
          }}
        >
          LOGIN
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5%",
          }}
        >
          <TextField
            name="username"
            onChange={handleChange}
            type="username"
            label="USERNAME"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src="\Person-Icon.svg" />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "80%",
              "& label": { color: "black" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "black",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "black" },
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            name="password"
            onChange={handleChange}
            label="PASSWORD"
            type={showPassword ? "text" : "password"}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src="\Lock-Icon.svg" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    children={<VisibilityIcon />}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "80%",
              "& label": { color: "black" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "black",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "black" },
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isMobile ? (
            <Button
              variant="contained"
              onClick={onSubmit}
              size="large"
              style={{
                backgroundColor: "#ba95dc",
                marginTop: "10%",
                color: "#ffffff",
                width: "fit-content",
                height: "5%",
                fontSize: 28,
              }}
            >
              LOG IN
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={onSubmit}
              size="large"
              style={{
                backgroundColor: "#ba95dc",
                marginTop: "5%",
                color: "#ffffff",
                width: "fit-content",
                height: "5%",
                fontSize: 28,
              }}
            >
              LOG IN
            </Button>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
