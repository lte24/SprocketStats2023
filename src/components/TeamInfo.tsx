import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
interface Sums {
  [key: string]: number;
}

//This page could be done with loops but I am too fucking lazy and my brain is fried before comp
//Absolutely redo this page next year
function TeamInfo(props) {
  const [proportions, setProportions] = useState<Sums>({});
  const [averages, setAverages] = useState<Sums>({});
  const [comments, setComments] = useState([]);
  let handler = {
    get: function (target, name) {
      return target.hasOwnProperty(name) ? target[name] : 0;
    },
  };
  let stats = {};
  useEffect(() => {
    getTeamStats();
    console.log(props.pitEntry);
    // if (props.teamEntries.length > 0) {
    //   console.log("hi");
    // }
  }, []);

  function getTeamStats() {
    let tempSum = {};
    let tempRates = {};
    let rates = new Proxy(tempRates, handler);
    let sums = new Proxy(tempSum, handler);
    let tempComments = [];
    // props.matchEntries.forEach((entry) => {
    //   Object.keys(entry.fields).forEach((field) => {
    //     console.log(entry.fields[field]);
    //     if (
    //       typeof entry.fields[field] === "object" &&
    //       entry.fields[field] != null
    //     ) {
    //       Object.keys(entry.fields[field]).forEach((option) => {
    //         if (typeof entry.fields[field][option] === "number") {
    //           sums[field + option] = entry.fields[field][option];
    //         } else {
    //           sums[field + option] = 1;
    //         }
    //       });
    //     }
    //     // else if (typeof entry[field] === 'string')
    //     // {

    //     // }
    //     else if (typeof entry.fields[field] === "number") {
    //       sums[field] = entry.fields[field];
    //     }
    //   });
    // });
    let entryFields = props.matchEntries
      .map((entry) => {
        return entry.fields;
      })
      .filter(
        (obj) => obj.matchType !== "Practice" && !obj.markForReview.review
      );
    console.log(entryFields);
    entryFields.forEach((entry) => {
      rates["exitTarmac"] +=
        entry["leftTarmac"] === "Yes" || entry["leftTarmac"] === "Yes\n"
          ? 1
          : 0;
      rates["climbed"] +=
        entry["climbed"] === "Attempted" || entry["climbed"] === "Attempted\n"
          ? 1
          : 0;
      rates["rungLow"] +=
        entry["maxRung"] === "Low" || entry["maxRung"] === "Low\n" ? 1 : 0;
      rates["rungMid"] +=
        entry["maxRung"] === "Mid" || entry["maxRung"] === "Mid\n" ? 1 : 0;
      rates["rungHigh"] +=
        entry["maxRung"] === "High" || entry["maxRung"] === "High\n" ? 1 : 0;
      rates["rungTraversal"] +=
        entry["maxRung"] === "Traversal" || entry["maxRung"] === "Traversal\n"
          ? 1
          : 0;
      rates["collectOrNo"] +=
        entry["collectOrNo"] === "Yes" || entry["collectOrNo"] === "Yes\n"
          ? 1
          : 0;
      rates["shootOrNo"] +=
        entry["shootOrNo"] === "Yes" || entry["shootOrNo"] === "Yes\n" ? 1 : 0;
      rates["robotDefenseOrNo"] +=
        entry["robotDefenseOrNo"] === "Yes" ||
        entry["robotDefenseOrNo"] === "Yes\n"
          ? 1
          : 0;
      sums["lowPortAutonFail"] += entry.lowPortAuton.fail;
      sums["lowPortAutonSuccess"] += entry.lowPortAuton.success;
      sums["highPortAutonFail"] += entry.highPortAuton.fail;
      sums["highPortAutonSuccess"] += entry.highPortAuton.success;
      sums["lowPortTeleopFail"] += entry.lowPortTeleop.fail;
      sums["lowPortTeleopSuccess"] += entry.lowPortTeleop.success;
      sums["highPortTeleopFail"] += entry.highPortTeleop.fail;
      sums["highPortTeleopSuccess"] += entry.highPortTeleop.success;
      sums["terminalFail"] += entry.terminal.failure;
      sums["terminalSuccess"] += entry.terminal.success;
      sums["driverSkill"] += entry.driverSkill;
      sums["robotSpeed"] += entry.robotSpeed;
      sums["defense"] += entry.defense;
      // console.log(entry);
      // Object.keys(entry).forEach((field) => {
      //   if (typeof entry[field] === "number") {
      //     sums[field] += entry[field];
      //   }
      // });
      tempComments.push(entry.comments);
    });
    Object.keys(rates).forEach((i) => {
      rates[i] /= entryFields.length;
    });
    Object.keys(sums).forEach((i) => {
      sums[i] /= entryFields.length;
    });
    rates = {
      ...rates,
      rungLow: rates.rungLow / rates.climbed,
      rungMid: rates.rungMid / rates.climbed,
      rungHigh: rates.rungHigh / rates.climbed,
      rungTraversal: rates.rungTraversal / rates.climbed,
    };
    setProportions(rates);
    setAverages(sums);
    setComments(tempComments);
    console.log(rates);
    console.log(sums);
  }

  return (
    <Grid className="py-5">
      <hr />
      <Typography variant="h4">Team {props.teamNumber}</Typography>
      <br />

      <Typography variant="h5">Average Stats</Typography>
      <br></br>
      <Typography variant="h5">Auton</Typography>
      <Typography>
        Low Port Successes: {averages.lowPortAutonSuccess}
      </Typography>
      <Typography>Low Port Fails: {averages.lowPortAutonFail}</Typography>
      <Typography>High Port Successes: {averages.highPortAutonFail}</Typography>
      <Typography>High Port Fails: {averages.highPortAutonFail}</Typography>
      <Typography>
        Exited Tarmac Rate: {Math.floor(100 * proportions.exitTarmac) + "%"}
      </Typography>
      <hr />
      <Typography variant="h5">Teleop</Typography>
      <Typography>
        Low Port Successes: {averages.lowPortTeleopSuccess}
      </Typography>
      <Typography>Low Port Fails: {averages.lowPortTeleopFail}</Typography>
      <Typography>
        High Port Successes: {averages.highPortTeleopSuccess}
      </Typography>
      <Typography>High Port Fails: {averages.highPortTeleopFail}</Typography>
      <Typography>Terminal Fails: {averages.terminalFail}</Typography>
      <Typography>Terminal Success: {averages.terminalSuccess}</Typography>
      <hr />

      <Typography variant="h5">Endgame</Typography>
      <Typography>
        Climb Attempt Rate: {Math.floor(100 * proportions.climbed) + "%"}
      </Typography>
      <Typography>
        Low Rung Percent of Attempted:{" "}
        {Math.floor(100 * proportions.rungLow) + "%"}
      </Typography>
      <Typography>
        Mid Rung Percent of Attempted:{" "}
        {Math.floor(100 * proportions.rungMid) + "%"}
      </Typography>
      <Typography>
        High Rung Percent of Attempted:{" "}
        {Math.floor(100 * proportions.rungHigh) + "%"}
      </Typography>
      <Typography>
        Traversal Rung Percent of Attempted:{" "}
        {Math.floor(100 * proportions.rungTraversal) + "%"}
      </Typography>
      <hr />

      <Typography variant="h5">Match Review</Typography>
      <Typography>
        Did the Robot Collect Cargo:{" "}
        {Math.floor(100 * proportions.collectOrNo) + "%"}
      </Typography>
      <Typography>
        Did the Robot Shoot Cargo:{" "}
        {Math.floor(100 * proportions.shootOrNo) + "%"}
      </Typography>
      <Typography>Driver Skill: {averages.driverSkill}</Typography>
      <Typography>Robot Speed: {averages.robotSpeed}</Typography>
      <Typography>
        Did the Robot play Defense:{" "}
        {Math.floor(100 * proportions.robotDefenseOrNo) + "%"}
      </Typography>
      <Typography>Defense: {averages.defense}</Typography>
      <Typography>Comments: </Typography>
      {comments.map((comment) => (
        <div>
          <Typography>{comment + "\n"} </Typography>
          <br />
        </div>
      ))}
      <hr />

      <Typography variant="h5">Robot Info</Typography>
      {props.pitEntry.length > 0 ? (
        <img
          src={props.pitEntry[0].imageLink}
          style={{ width: 300, float: "left" }}
        ></img>
      ) : (
        <Typography>No image found</Typography>
      )}
    </Grid>
  );
}

export default TeamInfo;
