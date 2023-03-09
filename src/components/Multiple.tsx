import { Button, ButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Multiple(props) {
  var buttons = [0, 0, 0, 0, 0, 0];
  const [value, setValue] = useState("");
  const [error, setError] = useState(props.fieldName);

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  function handleRadio(e) {
    const cleanText = e.target.innerText.replace(/\n/g, "");
    setValue(cleanText);
    props.parentCallback(props.field.name, cleanText);
  }

  return (
    <div id={props.id}>
      <Typography variant="h5">{props.field.question}</Typography>
      <ButtonGroup
        sx={{ pt: 1, pb: 1, display: "inline-flex", flexWrap: "wrap" }}
      >
        {buttons.map((button, i) => {
          // console.log("props.field.options[i]hello", props.field.options[i]);
          if (!props.field.options[i]) return;
          return (
            <Button
              color={error ? "error" : "primary"}
              onClick={handleRadio}
              size="large"
              variant={
                props.field.options[i].name === value ? "contained" : "outlined"
              }
            >
              {props.field.options[i].name}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

export default Multiple;
