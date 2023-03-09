import {
  Paper,
  Table,
  TableRow,
  TablePagination,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";

import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CircleLoader from "../components/CircleLoader";

interface Template {
  [key: string]: any;
}

function DataTable(props) {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<Template>();
  const [expandableColumns, setExpandable] = useState([]);
  useEffect(() => {
    getColumns();
    getData();
  }, []);
  function getColumns() {
    var tempColumns = [];
    let tempTemplate;
    let tempExpandable = [];
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    axios
      .get(
        // `https://sprocketstats-backend.herokuapp.com/api/v1/templates/templateId/${props.match.params.templateId}`,
        `http://localhost:4000/api/v1/templates/templateId/${props.match.params.templateId}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        tempTemplate = res.data;
        setTemplate(res.data);
        for (let j in tempTemplate.inputFields[0].fields) {
          tempColumns.push({
            name: tempTemplate.inputFields[0].fields[j].name,
            label: tempTemplate.inputFields[0].fields[j].question,
            options: {
              filter: true,
              sort: true,
            },
          });
        }
        for (let i = 1; i < tempTemplate.inputFields.length; i++) {
          for (let j in tempTemplate.inputFields[i].fields) {
            tempExpandable.push({
              name: tempTemplate.inputFields[i].fields[j].name,
              label: tempTemplate.inputFields[i].fields[j].question,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
    console.log(tempExpandable);
    setExpandable(tempExpandable);
    console.log(tempColumns);
    setColumns(tempColumns);
  }

  function getData() {
    let entries;
    let tempData = [];
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    axios
      .get(
        `https://localhost:4000/api/v1/datasets/datasetId/${props.match.params.datasetId}/viewData`,
        config
      )
      .then((res) => {
        entries = res.data;
        entries.forEach((entry) => {
          for (const name in entry.fields) {
            if (typeof entry.fields[name] === "object") {
              let checkbox = [];
              for (let i in entry.fields[name]) {
                if (typeof entry.fields[name][i] == "boolean") {
                  if (entry.fields[name][i]) {
                    checkbox.push(i + ", ");
                  }
                } else {
                  checkbox.push(i + ": " + entry.fields[name][i] + "\n");
                }
              }
              entry.fields[name] = checkbox;
            }
          }
          tempData.push(entry.fields);
        });
        console.log(tempData);
        setData(tempData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  function getColumnHeaders() {}

  const options = {
    responsive: "vertical",
    selectableRows: "none",
    expandableRows: true,
    expandableRowsHeader: false,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowMeta);
      if (!template) return;
      return (
        <TableRow>
          <TableCell colSpan={rowData.length + 1} style={{ width: "100%" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {expandableColumns.map((column) => {
                      return (
                        <TableCell
                          key={rowMeta.rowIndex}
                          style={{ minWidth: 200 }}
                        >
                          {column.label}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    {expandableColumns.map((column) => {
                      return (
                        <TableCell style={{ maxWidth: "none" }}>
                          {data[rowMeta.rowIndex][column.name]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TableCell>
        </TableRow>
      );
    },
  };

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
          }}
        >
          <DataTable
            title={"Match Scouting"}
            data={data}
            columns={columns}
            options={options}
          />
        </Paper>
      )}
    </Grid>
  );
}

export default DataTable;
