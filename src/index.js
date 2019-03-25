import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/SearchBar";
import Transactions from "./components/TransactionDetails";
import BlockInfo from "./components/blockInfo";

import "antd/dist/antd.css";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      query: "",
      blockInfo: [],
      accountInfo: []
    };
  }
}

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/address/:address" component={Transactions} />
      <Route path="/block/:blocknumber" component={BlockInfo} />
    </div>
  </Router>,
  document.getElementById("root")
);
