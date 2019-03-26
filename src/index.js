import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/HeaderAndSearchBar";
import AllTransactions from "./components/AllTransactionsTable";
import BlockInformation from "./components/BlockInformation";
import InvalidPath from "./components/InvalidPath";
import "antd/dist/antd.css";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/address/:address" component={AllTransactions} />
      <Route path="/block/:blocknumber" component={BlockInformation} />
      <Route path="/invalidPath/:invalidPath" component={InvalidPath} />
    </div>
  </Router>,
  document.getElementById("root")
);
