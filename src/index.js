//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap/dist/css/bootstrap.min.css";

//include your index.scss file into the bundle
import "./styles/index.scss";

//import your own components
import Home from "./components/Home.jsx";

//render your react application
ReactDOM.render(<Home />, document.querySelector("#root"));
