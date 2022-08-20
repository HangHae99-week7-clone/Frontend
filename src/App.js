import React from "react";
import "./App.css";
import Header from "./components/common/Header";
import Main from "./pages/Main";
import Write from "./pages/Write";
import Router from "./router/router";

function App() {
  return (
    <>
      {/* <Router /> */}
      <Header />
      {/* <Write /> */}
      <Main />
    </>
  );
}

export default App;
