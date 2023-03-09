import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ButtonGroup } from "@mui/material";

function Timer(props) {
  const [time, setTime] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  useEffect(() => {
    let tempInterval = null;
    if (timerOn) {
      tempInterval = setInterval(() => {
        setTime(Date.now() - timeStart);
      }, 10);
    } else if (!timerOn && time !== 0) {
      clearInterval(tempInterval);
    }
    return () => clearInterval(tempInterval);
  }, [timerOn, time]);

  function startTimer() {
    setTimerOn(true);
    setTimeStart(Date.now() - time);
    props.parentCallback(
      props.field.name,
      hours + " : " + minutes + " : " + seconds + " : " + centiseconds
    );
  }
  function stopTimer() {
    setTimerOn(false);
    props.parentCallback(
      props.field.name,
      hours + " : " + minutes + " : " + seconds + " : " + centiseconds
    );
  }
  /**
   * ander is so cool
   */
  function resetTimer() {
    setTimerOn(false);
    setTime(0);
    setTimeStart(0);
    props.parentCallback(
      props.field.name,
      hours + ":" + minutes + ":" + seconds + ":" + centiseconds
    );
  }

  let centiseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
  let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
  return (
    <div className="Stopwatch" id={props.id}>
      <Typography variant="h5">{props.field.question}</Typography>
      {/* <h5>
        {this.props.question}
        {this.props.required ? <span style={{ color: "red" }}>*</span> : ""}
      </h5> */}
      <TextField
        className="Stopwatch-display mb-3"
        fullWidth
        label="Stop Watch"
        variant="outlined"
        sx={{ py: 1 }}
        value={hours + " : " + minutes + " : " + seconds + " : " + centiseconds}
      ></TextField>
      <div className="mb-4">
        <ButtonGroup>
          {!timerOn ? (
            <Button color="primary" variant="outlined" onClick={startTimer}>
              Start
            </Button>
          ) : (
            <Button variant="contained" onClick={stopTimer}>
              Stop
            </Button>
          )}
          <Button variant="contained" onClick={resetTimer}>
            Reset
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Timer;
