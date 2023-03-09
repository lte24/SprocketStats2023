import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, Typography } from "@mui/material";
import { render } from "react-dom";

function CheckBox(props) {
  let options = { ...props.optionsList };
  function handleChange(e) {
    console.log(options);
    options[e.target.name] = e.target.checked;
    props.parentCallback(props.field.name, {
      ...options,
      [e.target.name]: e.target.checked,
    });
  }

  var checkboxes = [];
  function createCheckboxes() {
    for (var i in props.field.options) {
      checkboxes.push(
        <FormControlLabel
          control={
            <Checkbox
              name={props.field.options[i].name}
              defaultChecked={false}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          }
          label={props.field.options[i].label}
          labelPlacement="top"
        />
      );
    }
    return checkboxes;
  }

  return (
    <div className="py-3">
      <Typography variant="h5" id={props.id}>
        {props.field.question}
      </Typography>
      {createCheckboxes()}
    </div>
  );
}

export default CheckBox;
