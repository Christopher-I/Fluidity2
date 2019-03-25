import React from "react";
import ReactDOM from "react-dom";
import Header from "../components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import BlockInfo from "./blockInfo";
import Transactions from "./TransactionDetails";
import {
  Container,
  Segment,
  Grid,
  Search,
  Link,
  Input,
  Menu,
  Form
} from "semantic-ui-react";

import Head from "next/head";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.getBlockInfo = this.getBlockInfo.bind(this);
    this.getAccountInfo = this.getAccountInfo.bind(this);
    this.state = {
      headerDecription1: "",
      headerContent1: "",
      headerDecription2: "",
      headerContent2: "",
      error: null,
      isLoaded: false,
      query: "",
      blockInfo: [],
      accountInfo: [],
      loading: false
    };
  }

  static getInitialProps(props) {
    const address = props.query.address;

    return {
      address
    };
  }

  handleFormSubmit = () => {
    console.log(this.state.query[1]);
    if (this.state.query.length > 10 && this.state.query[1] == "x") {
      this.getAccountInfo(this.state.query);
    } else {
      this.getBlockInfo(this.state.query);
    }
  };

  handleInputChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  getBlockInfo(event) {
    this.props.history.push(`/block/${this.state.query}`);
  }

  getAccountInfo(event) {
    this.props.history.push(`/address/${this.state.query}`);
  }

  render() {
    return (
      <Container>
        <style jsx global>{`
          body {
            background: #f0efef;
            color: #f0efef;
          }
        `}</style>
        <Segment>
          <Head>
            <link
              rel="stylesheet"
              href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"
            />
          </Head>

          <Menu
            style={{
              marginTop: "10px",
              marginBottom: "30px",
              height: "100px",
              background: "#33445e"
            }}
          >
            <div
              style={{
                marginTop: "30px",
                marginLeft: "10px",
                fontSize: "13px"
              }}
            >
              <div route="/">
                <a className="item" style={{ color: "#32CD32" }} href="/">
                  Home
                </a>
              </div>
            </div>
            <div style={{ marginTop: "10px" }} />
            <Menu.Menu position="right">
              <Menu.Item />
              <Menu.Item>
                <Form onSubmit={this.handleFormSubmit}>
                  <div
                    style={{
                      marginBottom: "15px",
                      color: "white",
                      fontSize: "15px"
                    }}
                  >
                    Ethereum Blockchain Explorer
                  </div>
                  <Form.Input
                    loading={this.props.loading}
                    style={{ width: "900px" }}
                    action={{ icon: "search" }}
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    placeholder="Search by Address/Block Number...example: 0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"
                  />
                </Form>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <div>{this.state.searchUpdated}</div>
          {this.props.children}
        </Segment>
      </Container>
    );
  }
}
export default withRouter(SearchBar);
