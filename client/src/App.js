import React, {Component, useState} from "react";

import {Button} from "@material-ui/core";

import logo from "./logo.svg";

import "./App.css";

const App = () => {
  let [file, setFile] = useState("");
  let [message, setMessage] = useState("");
  const selectFileChange = e => {
    var file = e.target.files[0];
    console.log(file);
    setFile(file);
  };
  const sendFile = async () => {
    var formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/world", {
      method: "POST",
      body: formData,
    });
    const body = await response.json();
    console.log(body);
    if (!body.error) {
      setMessage("Archivo enviado correctamente");
    }
  };
  return (
    <div className="App">
      <h1>APAP</h1>
      <h3>Nomina</h3>
      <div>
        <div>
          <Button
            className="button"
            variant="contained"
            color="primary"
            component="label"
          >
            Seleccionar archivo
            <input
              type="file"
              style={{display: "none"}}
              accept=".csv"
              onChange={selectFileChange}
            />
          </Button>
        </div>
        <p>{file.name}</p>
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={sendFile}
        >
          Enviar archivo
        </Button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default App;
