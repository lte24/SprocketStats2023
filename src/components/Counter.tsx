import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";

function Counter(props) {
  const [counter0, setCounter0] = useState(0);
  const [counter1, setCounter1] = useState(0);

  useEffect(() => {
    if (props.field.options[1]) {
      props.parentCallback(props.field.name, {
        [props.field.options[0].name]: counter0,
        [props.field.options[1].name]: counter1,
      });
    } else {
      props.parentCallback(props.field.name, {
        [props.field.options[0].name]: counter0,
      });
    }
  });

  return (
    <div className="py-3">
      <div>
        <Typography id={props.id}>{props.field.options[0].label}</Typography>
        <ButtonGroup>
          <Button
            onClick={() => {
              console.log("COUNTER0", counter0);
              if (counter0 > 0) setCounter0(counter0 - 1);
            }}
            variant="contained"
            style={{ margin: "5px", borderColor: "#ba95cd" }}
          >
            -
          </Button>
          <Button
            disabled
            variant="outlined"
            style={{
              margin: "5px",
              borderColor: "#ba95cd",
            }}
          >
            {counter0}
          </Button>
          <Button
            onClick={() => {
              console.log("COUNTER0", counter0);
              // console.log("COUNTER1", counterAmount["counter" + i ]);
              setCounter0(counter0 + 1);
            }}
            variant="contained"
            style={{ margin: "5px", borderColor: "#ba95cd" }}
          >
            +
          </Button>
        </ButtonGroup>
        {props.field.options[1] && (
          <div>
            <Typography id={props.id}>
              {props.field.options[1].label}
            </Typography>
            <ButtonGroup>
              <Button
                onClick={() => {
                  console.log("COUNTER1", counter1);
                  if (counter1 > 0) setCounter1(counter1 - 1);
                }}
                variant="contained"
                style={{ margin: "5px", borderColor: "#ba95cd" }}
              >
                -
              </Button>
              <Button
                disabled
                variant="outlined"
                style={{
                  margin: "5px",
                  borderColor: "#ba95cd",
                }}
              >
                {counter1}
              </Button>
              <Button
                onClick={() => {
                  console.log("COUNTER1", counter1);
                  // console.log("COUNTER1", counterAmount["counter" + i ]);
                  setCounter1(counter1 + 1);
                }}
                variant="contained"
                style={{ margin: "5px", borderColor: "#ba95cd" }}
              >
                +
              </Button>
            </ButtonGroup>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Counter;
