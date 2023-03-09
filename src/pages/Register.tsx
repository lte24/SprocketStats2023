import { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface RegisterProps {}

interface RegisterState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  teamCode: string;
}

function Register(props: RegisterProps, state: RegisterState) {
  const isMobile = window.screen.width < 600;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [showConPass, setShowConPass] = useState(false);
  const handleClickConPass = () => setShowConPass(!showConPass);

  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    teamCode: "cQRC1EYP",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: false,
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    teamCode: false,
    confirmPassword: false,
  });
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  }
  function checkForm() {
    let tempValid = true;
    let tempError = error;
    for (let i in error) {
      if (user[i] === "") {
        tempError[i] = true;
        tempValid = false;
      } else {
        tempError[i] = false;
      }
    }
    console.log(tempError);
    setError(tempError);

    return tempValid;
  }
  function onSubmit() {
    if (checkForm()) {
      axios
        .post(
          "http://localhost:4000/api/v1/users/register",
          // `https://sprocketstats-backend.herokuapp.com/api/v1/users/register`,
          {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            teamCode: "cQRC1EYP",
          }
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("jwt", res.headers["x-auth-token"]);
          window.location.replace("/dashboard");
        })
        .catch((err) => console.log(err.response));
    } else {
      alert("Do not leave any fields blank");
    }
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
          REGISTER
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5%",
          }}
        >
          <TextField
            error={error.email}
            name="email"
            onChange={handleChange}
            type="email"
            variant="standard"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src="\Envelope.svg" />
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5%",
          }}
        >
          <TextField
            error={error.firstName}
            name="firstName"
            onChange={handleChange}
            type="firstName"
            variant="standard"
            label="First Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src="\Person-Icon.svg" />
                </InputAdornment>
              ),
            }}
            sx={{
              marginRight: "2%",
              width: "39%",
              "& label": { color: "black" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "black",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "black" },
            }}
          />
          <TextField
            error={error.lastName}
            name="lastName"
            onChange={handleChange}
            type="lastName"
            variant="standard"
            label="Last Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src="\Person-Icon.svg" />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "39%",
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
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5%",
          }}
        >
          <TextField
            error={error.username}
            label="USERNAME"
            name="username"
            onChange={handleChange}
            type="username"
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5%",
          }}
        >
          <TextField
            error={error.password}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5%",
          }}
        >
          <TextField
            error={error.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            label="CONFIRM PASSWORD"
            type={showConPass ? "text" : "password"}
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
                    onClick={handleClickConPass}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5%",
          }}
        >
          <Button
            variant="contained"
            onClick={onSubmit}
            // size="lg"
            style={{
              color: "#ffffff",
              backgroundColor: "#B48DDE",
              height: "3%",
              width: "fit-content",
              fontSize: 28,
            }}
          >
            Sign Up
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "2%",
            color: "#B48DDE",
            marginTop: "-1.5%",
          }}
        >
          Already have an account?
          <a
            href="\login"
            style={{
              display: "inline",
              position: "relative",
              marginLeft: "0.4%",
              color: "#B48DDE",
            }}
          >
            Login.
          </a>
        </div>
      </Grid>
    </Grid>
  );
}
export default Register;
