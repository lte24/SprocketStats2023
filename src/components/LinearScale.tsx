import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
// import { Col, Row } from "react-bootstrap";
import { Typography } from "@mui/material";
import { useState } from "react";
// import { Row, Column } from "react-foundation";

const LinearScale = (props) => {
  const [value, setvalue] = useState(3);
  return (
    <div id={props.id} className="py-3">
      <Typography variant="h5">{props.field.question}</Typography>
      {/* <Row> */}
      <Slider
        aria-label={props.field.question}
        onChange={(e) => {
          const target = e.target as HTMLTextAreaElement;
          props.parentCallback(props.field.name, target.value);
        }}
        // marks={[
        //   {
        //     value: props.field.options[0].min,
        //     label: props.field.options[0].minLabel,
        //   },
        //   {
        //     value: props.field.options[0].max,
        //     label: props.field.options[0].maxLabel,
        //   },
        // ]}
        valueLabelDisplay="auto"
        min={parseInt(props.field.options[0].min)}
        max={parseInt(props.field.options[0].max)}
      />
      {/* </Row>
      <Row>
        <Column> */}
      <Typography>{props.field.options[0].minLabel}</Typography>
      {/* </Column>
        <Column> */}
      <Typography sx={{ textAlign: "right" }}>
        {props.field.options[0].maxLabel}
      </Typography>
      {/* </Column>
      </Row> */}
    </div>
  );
};

export default LinearScale;
