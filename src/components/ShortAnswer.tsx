import { TextField, Typography, ThemeProvider } from "@mui/material";

function ShortAnswer(props) {
  function handleChange(e) {
    const target = e.target as HTMLTextAreaElement;

    if (props.type === "number") {
      // console.log(parseInt(target.value));
      props.parentCallback(props.field.name, parseInt(target.value));
    } else {
      props.parentCallback(props.field.name, target.value);
    }
  }
  // const theme = createMuiTheme({
  //   palette: {
  //     primary: {},
  //   },
  // });
  return (
    <div className="w-100 py-3">
      <Typography variant="h5">{props.field.question}</Typography>

      {/* <ThemeProvider theme={theme}> */}
      <TextField
        error={props.error}
        onChange={handleChange}
        type={props.type}
        id={props.id}
        label="Enter Here"
        variant="standard"
        style={{
          width: "13em",
        }}
      />
      {/* </ThemeProvider> */}
    </div>
  );
}

export default ShortAnswer;
