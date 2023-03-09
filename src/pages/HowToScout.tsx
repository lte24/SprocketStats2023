import * as React from "react";
import PropTypes from "prop-types";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
// import { Button, Card, Col, Container, Form, Row, Nav } from "react-bootstrap";
import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

interface HowToScoutProps {}

interface HowToScoutState {}

function HowToScout(props: HowToScoutProps) {
  return (
    <div>
      <img
        src="\sprocketlogoDBDBDB.png"
        alt="sprocket logo"
        className="bg-image greysprocketlogo mx-5"
        style={{
          width: "100vw",
          height: "140%",
          zIndex: -1,
          lineHeight: "110px",
          right: "-30vw",
          top: "25%",
          position: "fixed",
          objectFit: "scale-down",
        }}
      />

      <p
        style={{
          fontFamily: "futura-pt",
          fontSize: "330%",
          fontWeight: 100,
          marginLeft: "5%",
          marginTop: "-1%",
        }}
      >
        How To Scout
      </p>

      <p>
        <i
          style={{
            fontFamily: "futura-pt",
            fontSize: "250%",
            fontWeight: 100,
            marginLeft: "8%",
            marginTop: "-4%",
            // lineHeight: '100%'
          }}
        >
          Def. Auton -{" "}
          <a
            style={{
              fontSize: "85%",
            }}
          >
            robot operating without human or remote control. At the beginning of
            match and ends <p style={{ marginLeft: "20.5%" }}>with a ring.</p>
          </a>
        </i>
      </p>

      <p>
        <i
          style={{
            fontFamily: "futura-pt",
            fontSize: "250%",
            fontWeight: 100,
            marginLeft: "8%",
            marginTop: "-4%",
            // lineHeight: '130%'
          }}
        >
          Def. Teleop -{" "}
          <a
            style={{
              fontSize: "85%",
            }}
          >
            operating the robot through remote control. Starts after the ring.{" "}
          </a>
        </i>
      </p>

      <i
        style={{
          fontFamily: "futura-pt",
          fontSize: "250%",
          fontWeight: 100,
          marginLeft: "8%",
          marginTop: "10%",
          // lineHeight: '80%'
        }}
      >
        Def. Endgame -{" "}
        <a
          style={{
            fontSize: "85%",
          }}
        >
          final bell rings, signalling robot to hurry over to metal ramps.
          <p />
          <i
            style={{
              marginLeft: "12%",
              marginTop: "-4%",
              // lineHeight: '140%',
              fontSize: "120%",
            }}
          >
            - Def. Parked -{" "}
            <a
              style={{
                fontSize: "85%",
              }}
            >
              when the robot stops moving after the timer ends
            </a>
          </i>
          <br />
          <p>
            <i
              style={{
                marginLeft: "12%",
                marginTop: "-4%",
                // lineHeight: '140%',
                fontSize: "120%",
              }}
            >
              - Def. Hanged -{" "}
              <a
                style={{
                  fontSize: "85%",
                }}
              >
                when the robot is able to hang onto the metal ramps
              </a>
            </i>
          </p>
        </a>
      </i>

      {/* <i style={{
        fontFamily: "futura-pt",
        fontSize: "250%",
        fontWeight: 100,
        marginLeft: "6%",
        marginTop: "-2%",
        lineHeight: '200%'
      }}>
        Def. Trench - <a href = 'insert link' style = 
        {{color: 'black', fontSize: '60%', fontWeight: 400}}
        >See Image</a></i>  */}
    </div>
  );
}

export default HowToScout;
