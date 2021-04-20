import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import store from "./configureStore";
import "../node_modules/lucid-ui/dist/lucid.css";
import Root from "./containers/Root";

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
