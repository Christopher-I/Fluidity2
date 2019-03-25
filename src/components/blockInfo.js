import React from "react";
import ReactDOM from "react-dom";
import { Segment, Table, Container, Menu, Icon } from "semantic-ui-react";

import SearchBar from "./SearchBar";

class BlockInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      blockInfo: []
    };
  }

  static async getInitialProps(props) {
    const address = this.props.match.params.blocknumber;

    return {
      address
    };
  }
  getBlockInfo() {
    fetch(
      `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${
        this.props.match.params.blocknumber
      }&apikey=G3YFDTNGGMTBCRRQEZ65CC6NR6RB4HC47U`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            blockInfo: result.result
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
  componentDidMount() {
    console.log("updating.....");
    //call etherscan API and edit state with result
    this.getBlockInfo();
  }

  render() {
    if (!this.state.isLoaded) {
      console.log("is loaded is false");
      this.state.isLoaded = true;
      this.componentDidMount();
    }
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      this.state.isLoaded = false;
      return (
        <Container>
          <style jsx global>{`
            body {
              background: #f0efef;
              color: #f0efef;
            }
          `}</style>
          <SearchBar>
            <ul
              style={{
                marginLeft: "13px",
                fontSize: "15px",
                color: "grey"
              }}
            >
              <li> Block Number: {this.state.blockInfo.blockNumber}</li>
              <li> Time Stamp: {this.state.blockInfo.timeStamp}</li>
              <li>
                Block Miner:
                <a href={`/address/${this.state.blockInfo.blockMiner}`}>
                  {this.state.blockInfo.blockMiner}
                </a>
              </li>
              <li>
                {" "}
                Block Reward:{" "}
                {this.state.blockInfo.blockReward / 1000000000000000000}Ether
              </li>
            </ul>
          </SearchBar>
        </Container>
      );
    }
  }
}

export default BlockInfo;
