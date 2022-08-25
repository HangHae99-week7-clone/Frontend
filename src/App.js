import React from "react";
import "./App.css";
import Router from "./router/router";



function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function () {};
  }

  return <Router />;
}

export default App;
