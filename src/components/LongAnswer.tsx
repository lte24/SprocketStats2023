import { TextField, Typography } from "@mui/material";

function LongAnswer(props) {
  function handleChange(e) {
    console.log(e);
    props.parentCallback(props.field.name, e.target.value);
  }
  return (
    <div id={props.id}>
      <Typography variant="h5">{props.field.question}</Typography>
      <TextField
        error={props.error}
        id="outlined-multiline-static"
        multiline
        minRows={8}
        onChange={handleChange}
        fullWidth
        label="Enter here"
      />
    </div>
  );
}

export default LongAnswer;
