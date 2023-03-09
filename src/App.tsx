import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Routing from "./Routing";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import themeOptions from "./theme";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ThemeProvider,
  Avatar,
  MenuItem,
  Divider,
  Menu,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import * as style from "@dicebear/avatars-identicon-sprites";
import {
  useUserStore,
  setFirstName,
  setLastName,
  setUserName,
  setEmail,
  setSeed,
} from "./state/useUserStore";

// main issue: the variable doesnt seem to be saving into useUserStore

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setOpen] = useState(false);

  const seed = useUserStore((state) => state.seed);
  const isMobile = window.screen.width < 600;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!isOpen);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  function onPageLoad() {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    axios
      .get("http://localhost:4000/api/v1/users/me", config)
      .then((res) => {
        console.log("EVENT CODE IN RES", res.data.currentEvent);
        console.log(res.data);
        setLoggedIn(true);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUserName(res.data.username);
        setEmail(res.data.email);
        setSeed(
          "https://avatars.dicebear.com/api/identicon/:" +
            res.data.firstName +
            res.data.lastName +
            ".svg"
        );

        localStorage.setItem("eventCode", res.data.currentEvent);
        localStorage.setItem("first", res.data.firstName);
        localStorage.setItem("second", res.data.lastName);
      })
      .catch((err) => {
        setLoggedIn(false);
      });
  }

  useEffect(onPageLoad, []);

  return (
    <Router>
      <ThemeProvider theme={themeOptions}>
        <div id="outer-container">
          <main id="page=wrap">
            <div id="Nav">
              <div>
                <Sidebar
                  pageWrapId={"page-wrap"}
                  outerContainerId={"outer-container"}
                  isLoggedIn={isLoggedIn}
                />
              </div>
              {isLoggedIn && (
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={isOpen ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={isOpen ? "true" : undefined}
                      style={{
                        marginRight: "5%",
                      }}
                      href="/profile"
                    >
                      {!isMobile ? (
                        <Avatar
                          sx={{
                            height: "7vmin",
                            width: "7vmin",
                          }}
                          src={seed}
                        />
                      ) : (
                        <Avatar
                          sx={{
                            height: "10vmin",
                            width: "10vmin",
                          }}
                          src={seed}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
            <div className="TopMargin">
              <Routing />
            </div>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
