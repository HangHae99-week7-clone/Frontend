import React from "react";
import "./App.css";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Write from "./pages/Write";
import Router from "./router/router";

function App() {
  return (
    <>
      {/* <Router /> */}
      <Header />
      {/* <Write /> */}
      {/* <Main /> */}
      <Search />
      <Footer />
    </>
  );
}

export default App;
