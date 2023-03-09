import React from "react";
// import { Nav } from "react-bootstrap";
import { push as Menu } from "react-burger-menu";
import "./Sidebar.css";

function onSubmit() {
  localStorage.clear();
  window.location.href = "/";
}

export default (props) => {
  console.log(props.isLoggedIn);
  return (
    <div id="outer-container">
      {/* <Nav> */}
      {props.isLoggedIn ? (
        <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
          <a className="menu-item" href="/">
            HOME
          </a>
          <a className="menu-item" href="/dashboard">
            DASHBOARD
          </a>

          <a
            className="menu-item"
            // format is dataentry/template/dataset
            href="/dataentry/63cca858934160925900414b/63cca5ef93416092590040f9"
          >
            MATCH SCOUTING
          </a>
          <a
            className="menu-item"
            href="/dataentry/63cca86f934160925900414c/63cca5c693416092590040f8"
          >
            PIT SCOUTING
          </a>
          <a
            className="menu-item"
            href="/viewdata/5e6482f54c0ab94074ee4752/635f30dcd8d60836449c42a9"
          >
            VIEW MATCH DATA
          </a>
          <a
            className="menu-item"
            href="/viewdata/6229af2cb3f44f3153808d06/635f3325d8d60836449c42ac"
          >
            VIEW PIT DATA
          </a>
          <a
            className="menu-item"
            href="/teamdata/6229af2cb3f44f3153808d06/635f3325d8d60836449c42ac"
          >
            VIEW TEAM DATA
          </a>

          <img
            src="/account-logout.svg"
            alt="LOGOUT"
            className="nav-item"
            onClick={onSubmit}
            style={{
              filter:
                "invert(100%) sepia(100%) saturate(0%) hue-rotate(73deg) brightness(103%) contrast(103%)",
              position: "absolute",
              left: "10px",
              bottom: "25px",
              height: "50px",
              width: "50%",
            }}
          ></img>
        </Menu>
      ) : (
        <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
          <a className="menu-item" href="/">
            HOME
          </a>
          <a className="menu-item" href="/Register">
            REGISTER
          </a>
          <a className="menu-item" href="/Login">
            LOGIN
          </a>
        </Menu>
      )}
      {/* </Nav> */}
    </div>
  );
};
