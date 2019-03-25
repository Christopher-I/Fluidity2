import React from "react";
import ReactDOM from "react-dom";
import { Segment, Table, Label, Container } from "semantic-ui-react";
import "antd/dist/antd.css";

class AccountBalanceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: ""
    };
  }

  componentDidMount() {
    //call etherscan API and edit state with result
    fetch(
      "https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=YourApiKeyToken"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.result
          });
        },

        // Handle errors.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div style={{ color: "grey", fontSize: "13px" }}>
            Account Balance (ETH)
          </div>
          <div style={{ color: "#32CD32", fontSize: "20px" }}>
            {" "}
            {this.state.items / 1000000000000000000}
          </div>
        </div>
      );
    }
  }
}

export default AccountBalanceDetails;
