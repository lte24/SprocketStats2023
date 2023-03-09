import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CircleLoader from "../components/CircleLoader";
import TeamInfo from "../components/TeamInfo";

//TODO:
//I have way too many for loops in here so find a way to reduce the number of for loops
//Also find a more efficient way to find the entries for each team
function TeamData(props) {
  const [matchData, setMatchData] = useState([]);
  const [pitData, setPitData] = useState([]);
  const [teamNumber, setTeamNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamComponent, setTeamComponent] = useState(<div></div>);
  const [error, setError] = useState(false);
  useEffect(() => {}, []);
  function getTeam() {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    let matchEntries = [];
    let pitEntry = {};
    axios
      .get(
        `https://sprocketstats-backend.herokuapp.com/api/v1/datasets/datasetId/635f3325d8d60836449c42ac/teamNumber/${teamNumber}`,
        config
      )
      .then((res) => {
        pitEntry = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    axios
      .get(
        `https://sprocketstats-backend.herokuapp.com/api/v1/datasets/datasetId/635f30dcd8d60836449c42a9/teamNumber/${teamNumber}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          setError(true);
          setTeamComponent(<div />);
        } else {
          setTeamComponent(<CircleLoader />);
          setError(false);
          setTeamComponent(
            <TeamInfo
              matchEntries={res.data}
              pitEntry={pitEntry}
              teamNumber={teamNumber}
            />
          );
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }

  function handleChange(e) {
    setTeamNumber(e.target.value);
  }
  return (
    <Grid container justifyContent="center">
      {loading ? (
        <div>
          <CircleLoader />
          <br />
          <Typography>
            Due to large entry counts, the table might take time to load, please
            be patient!
          </Typography>
        </div>
      ) : (
        <Paper
          variant="elevation"
          elevation={24}
          sx={{
            width: "75em",
            overflow: "hidden",
            margin: "1em",
            maxHeight: "fit-content",
            p: 5,
          }}
        >
          <Typography variant="h3">View Team Data</Typography>
          <br />
          <Typography variant="h5">Team Number</Typography>
          <TextField
            variant="standard"
            type="number"
            error={error}
            helperText={!loading ? "" : "Invalid Team Code"}
            onChange={handleChange}
          ></TextField>
          <br />
          <br />
          <Button
            onClick={() => {
              getTeam();
            }}
            variant="contained"
            size="large"
          >
            Search
          </Button>
          {teamComponent}
        </Paper>
      )}
    </Grid>
  );
}
export default TeamData;
