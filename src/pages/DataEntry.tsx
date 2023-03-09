import ShortAnswer from "../components/ShortAnswer";
import LinearScale from "../components/LinearScale";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Multiple from "../components/Multiple";
import CheckBox from "../components/Checkbox";
import Counter from "../components/Counter";
import Button from "@mui/material/Button";
import LongAnswer from "../components/LongAnswer";
import { useUserStore } from "../state/useUserStore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
} from "@mui/material";
import Timer from "../components/Timer";
import { useParams } from "react-router-dom";
import * as React from "react";
import { State } from "zustand";
interface Template {
  [key: string]: any;
}


function getSubstring(str, start, end) {
  var char1 = str.indexOf(start) + 1;
  var char2 = str.lastIndexOf(end);
  return str.substring(char1, char2);
}



function DataEntry(props) {
  const [sections, setSections] = useState([]); // <-- comment/uncomment this later but for testing purposes

  // how does this even work I am so lost help me please


  // const [entry, setEntry] = useState({}); // commented for testing purposes
  var [entry, setEntry] = useState({});
  var [currentEntry, setCurrentEntry] = useState({});

  const [templateForm, setTemplateForm] = useState<Template>();
  const [openModal, setOpenModal] = useState(false);
  const [fieldErrors, setFieldErrors] = useState([]);



  // KEYCOUNTER WOOOOOOOOOOOOO
  var [keyCounter, setKeyCounter] = useState(1);


  // making an array to hold all of the keys that were stored when there was no wifi
  // const [offlineKeys, setOfflineKeys] = useState([]);
  const [offlineKeys, setOfflineKeys] = useState([]);

  let error = [];
  let tempFields = {};
  let template;

  const unloadCallback = (event) => {
    // event.preventDefault();
    event.returnValue = false;
    return "";
  };
  window.addEventListener("beforeunload", unloadCallback, true);
  const { templateId, datasetId } = useParams();
  useEffect(() => {
    generateFields();
  }, []);

  async function generateFields() {
    console.log(localStorage.getItem("jwt"));

    let config = {
      // Header to check if logged in; also required to send data
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    // console.log(props.match.params.templateId);

    await axios
      .get(
        // gets data from backend
        // `https://sprocketstats-backend.herokuapp.com/api/v1/templates/templateId/${props.match.params.templateId}`,
        `http://localhost:4000/api/v1/templates/templateId/${templateId}`,
        config
      )
      .then((res) => {
        // template is from mongoDB
        // has what components we need: longAnswer, number, etc.
        template = res.data;
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    var section = [];
    var tempEntry = {};

    // goes through the first array
    for (var i in template.inputFields) {
      // what we put data into
      var fields = [];
      error.push([]);

      // goes through the types of input fields
      for (var j in template.inputFields[i].fields) {
        error[i].push(false);
        tempEntry[template.inputFields[i].fields[j].name] = null;
        // console.log(template.inputFields[i].fields[j].type);

        // For ShortAnswer component that only allows numbers
        if (template.inputFields[i].fields[j].type === "Number") {
          fields.push(
            <ShortAnswer
              id={i + " " + j}
              // Used to name the field on the actual page
              field={template.inputFields[i].fields[j]}
              sx={{ py: 8 }}
              // reads and changes the variable so whatever the user puts in is stored
              parentCallback={getInput}
              // If this isn't filled in, there'll be an error and the form won't be able to be sent
              error={error[i][j]}
              // only allow numbers in here (ex. Team Number)
              type="number"
            />,
            // localStorage.setItem("Number", JSON.stringify("number")),
            // localStorage.getItem("Number")
          );


          // ShortAnswer component that takes text and numbers
        } else if (template.inputFields[i].fields[j].type === "Short") {
          fields.push(
            <ShortAnswer
              id={i + " " + j}
              field={template.inputFields[i].fields[j]}
              sx={{ py: 8 }}
              parentCallback={getInput}
              error={error[i][j]}
            />
          );

          // Slider component (LinearScale.tsx)
        } else if (template.inputFields[i].fields[j].type === "Linear") {
          fields.push(
            <LinearScale
              id={i + " " + j}
              field={template.inputFields[i].fields[j]}
              sx={{ py: 8 }}
              parentCallback={getInput}
            />
          );

          // Multiple buttons (buttons in a group)
          // ex. |Practice|Qual|Playoffs|
        } else if (template.inputFields[i].fields[j].type === "Multiple") {
          fields.push(
            <Multiple
              parentCallback={getInput}
              id={i + " " + j}
              field={template.inputFields[i].fields[j]}
              sx={{ py: 8 }}
              error={error[i][j]}
            />
          );

          // Checkboxes at the end
        } else if (template.inputFields[i].fields[j].type === "Checkbox") {
          // Collects the names of each checkbox
          tempEntry[template.inputFields[i].fields[j].name] = {};

          // Applies names to each checkbox
          template.inputFields[i].fields[j].options.forEach((e) => {
            tempEntry[template.inputFields[i].fields[j].name][e.name] = false;
          });

          // Actual usage of checkbox component
          fields.push(
            <CheckBox
              id={i + " " + j}
              field={template.inputFields[i].fields[j]}
              parentCallback={getInput}
              optionsList={tempEntry[template.inputFields[i].fields[j].name]}
            />
          );

          // Counter component
          // ex. Shots made/missed
        } else if (template.inputFields[i].fields[j].type === "Double Number") {
          fields.push(
            <div>
              {/* Typography changes font/font-size */}
              <Typography variant="h5">
                {/* the actual name of that specific field (ex. shots made) */}
                {template.inputFields[i].fields[j].question}
              </Typography>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Counter
                  field={template.inputFields[i].fields[j]}
                  parentCallback={getInput}
                  id={i + " " + j}
                />
              </div>
            </div>
          );
          tempEntry[template.inputFields[i].fields[j].name] = {};
          template.inputFields[i].fields[j].options.forEach((e) => {
            tempEntry[template.inputFields[i].fields[j].name][e.name] = 0;
          });

          // LongAnswer component
          // Large box (ex. comments box)
        } else if (template.inputFields[i].fields[j].type === "Long") {
          fields.push(
            <LongAnswer
              parentCallback={getInput}
              id={i + " " + j}
              field={template.inputFields[i].fields[j]}
              sx={{ py: 8 }}
              error={error[i][j]}
            />
          );

          // Timer component
        } else if (template.inputFields[i].fields[j].type === "Stop Watch") {
          fields.push(
            <Timer
              parentCallback={getInput}
              id={i + " " + j}
              field={template.inputFields[i].fields[j]}
              sx={{ py: 8, width: "25%" }}
              error={error[i][j]}
            />
          );
        }
      }

      // The actual section name (ex. Auton, Teleop)
      section.push(
        <div>
          <hr />
          <Typography variant="h2">
            {template.inputFields[i].sectionName}
          </Typography>
          {fields}
        </div>
      );
    }

    console.log(error);
    setSections(section);
    setTemplateForm(template);
    setFieldErrors(error);
    tempFields = tempEntry;
    setEntry(tempFields);
    console.log(tempFields);
    for (var k = 0; k < 10; k++) {
      console.log(tempFields[k]);
    }
    // console.log(error);

    // Seperates sections (need to double check)
    setSections(section);

    // Makes data follow the template
    setTemplateForm(template);

    // If there's any errors, it'll make the field red/send user back to it
    setFieldErrors(error);

    // Honestly I'm not too sure. Might be a backend function? Need to double check
    tempFields = tempEntry;
    setEntry(tempFields);
    // console.log(tempFields);
  }

  function getInput(name, value) {
    tempFields[name] = value;
    setEntry(tempFields);
  }

  // var key does not change
  var key = 'entry '

  function addToLocalStorage() {

    // this is for before the new localStorage entry
    // console.log(
    //   getSubstring(
    //     localStorage.getItem(key),
    //     '{"teamNumber":',
    //     ',"matchType'
    //   )
    // );
    // console.log(JSON.parse('entry', entry));

    if (localStorage.getItem(key + keyCounter) != null) {
      // this is for before the new localStorage entry
      console.log('key is: ' + key + keyCounter + '\n' +
        getSubstring(
          localStorage.getItem(key + keyCounter),
          '{"teamNumber":',
          ',"matchType'
        )
      );
    } else {
      console.log('there was nothing in the local storage previously');
    }


    // local storage update
    localStorage.setItem(key + keyCounter, JSON.stringify(entry));


    // after the local storage update
    console.log(
      getSubstring('key is: ' + key + keyCounter + '\n' +
        localStorage.getItem(key + keyCounter),
        '{"teamNumber":',
        ',"matchType'
      )
    );

    setKeyCounter(keyCounter += 1);

  }

  // Ensures there's no empty/wrong data types in entered fields
  function checkForm() {


    error = fieldErrors;
    for (let i in templateForm.inputFields) {
      for (let j in templateForm.inputFields[i].fields) {
        // console.log(templateForm.inputFields[i].fields[j].required);
        if (
          templateForm.inputFields[i].fields[j].required &&
          entry[templateForm.inputFields[i].fields[j].name] === null
        ) {
          alert(
            templateForm.inputFields[i].fields[j].question + " is required"
          );
          error[i][j] = true;
          document
            .getElementById(i + " " + j)
            .scrollIntoView({ behavior: "smooth", block: "center" });
          return false;
        }
        error[i][j] = false;
      }
    }
    console.log("form valid");

    setFieldErrors(error);
    return true;
  }

  // localStorage testing
  // useEffect(() => {
  //   localStorage.setItem('entry', JSON.stringify(entry));
  // }, [entry]);

  // console.log(window.localStorage.getItem('entry'));

  // useEffect(() => {
  //   const entry = JSON.parse(localStorage.getItem('entry'));
  //   if (entry) {
  //   setEntry(entry);
  //   }
  // }, []);


  // What happens after you click submit
  function submitForm() {
    console.log(entry);
    console.log(offlineKeys);

    if (navigator.onLine) {
      setCurrentEntry(entry);
      while (offlineKeys.length > 0) {


        console.log("this is offlineKeys: " + offlineKeys);
        // setEntry(JSON.parse(localStorage.getItem(offlineKeys.at(offlineKeys.length - 1)))); // not working
        // setEntry(JSON.parse(localStorage.getItem('entry 2')));
        // JSON.parse(localStorage.getItem(offlineKeys.at(offlineKeys.length-1)));


        entry = JSON.parse(localStorage.getItem(offlineKeys.at(offlineKeys.length - 1)));


        console.log("this is the entry to be submitted:");
        console.log(entry);
        let config = {
          headers: {
            "x-auth-token": localStorage.getItem("jwt"),
          },
        };

        axios
          .post(
            `http://localhost:4000/api/v1/datasets/datasetId/${datasetId}/entry`,
            {
              // This sends the actual data to the server
              isErroneous: false,
              // addToLocalStorage(),
              fields: {
                ...entry,
                scouterName:
                  useUserStore.getState().firstName +
                  " " +
                  useUserStore.getState().lastName,
              },
            },
            config
          )
          .then((res) => {
            window.removeEventListener("beforeunload", unloadCallback, true);
            console.log(res.data);
            // addToLocalStorage();
            // window.location.reload();
          })
          .catch((err) => {
            console.log(
              useUserStore.getState().firstName +
              " " +
              useUserStore.getState().lastName
            );
            alert(err.response.data);
          });

        if (offlineKeys.length == 1) {
          entry = currentEntry;
        }

        setOfflineKeys(offlineKeys.pop());



      }

    }

    // entry = recentEntry;
    // this was unecessary
    //if(checkForm()){
    //   addToLocalStorage();
    // }

    if (checkForm()) {


      // testing navigator.onLine
      // weefee = wifi
      if (navigator.onLine) {
        console.log("connected to weefee");
      }
      else if (!navigator.onLine) {
        console.log("not connected to weefee")
      }
      //////////////////////////////

      // if offline, add to the array and then yea
      if (!navigator.onLine) {
        // setOfflineKeys(offlineKeys.push(key + keyCounter)); //?????????? why
        offlineKeys.push(key + keyCounter);
        if(offlineKeys.length == 1){
          alert("You have " + offlineKeys.length + " entry stored");
        }
        else if(offlineKeys.length > 1) {
          alert("You have " + offlineKeys.length + " entries stored");
        }
      }

      addToLocalStorage();



      // setEntry(currentEntry);

      if (navigator.onLine) {

        let config = {
          headers: {
            "x-auth-token": localStorage.getItem("jwt"),
          },
        };



        axios
          .post(
            `http://localhost:4000/api/v1/datasets/datasetId/${datasetId}/entry`,
            {
              // This sends the actual data to the server
              isErroneous: false,
              // addToLocalStorage(),
              fields: {
                ...entry,
                scouterName:
                  useUserStore.getState().firstName +
                  " " +
                  useUserStore.getState().lastName,
              },
            },
            config
          )
          .then((res) => {
            window.removeEventListener("beforeunload", unloadCallback, true);
            console.log(res.data);
            // addToLocalStorage();
            // window.location.reload();
          })
          .catch((err) => {
            console.log(
              useUserStore.getState().firstName +
              " " +
              useUserStore.getState().lastName
            );
            alert(err.response.data);
          });

        // localStorage testing ig
        // console.log({
        //   isErroneous: false,
        //   fields: {
        //     ...entry,
        //     scouterName:
        //       localStorage.getItem("firstName") +
        //       " " +
        //       localStorage.getItem("lastName"),
        //   },
        // });
        // keyCounter += 1;

        localStorage.clear();
      }
    }

    else {
      alert("One or more required fields is incomplete");
    }

  }


  // Base HTML before components load/base layout (submit button)
  return (
    <Container className="mx-auto w-75 border p-5">
      <div className="mx-auto pb-5">{sections}</div>
      <div className="mx-auto">
        <Button
          onClick={() => {
            setOpenModal(checkForm());
          }}
          variant="contained"
          size="large"
        >
          Submit
        </Button>
      </div>
      <Dialog open={openModal} fullWidth>
        <DialogTitle>{"Submit"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitForm}>Submit</Button>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DataEntry;
