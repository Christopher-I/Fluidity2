import React from "react";
import { Container, Card } from "semantic-ui-react";
import HeaderAndSearchBar from "./HeaderAndSearchBar";

class BlockInformation extends React.Component {
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
    //call etherscan API and edit state with result
    this.getBlockInfo();
  }

  render() {
    const { error, isLoaded, blockInfo } = this.state;
    //check if data has been loaded from API call
    if (!isLoaded) {
      this.setState.isLoaded = true;
      this.componentDidMount();
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      this.setState.isLoaded = false; // reset loaded valve to indicate that data has been loaded
      return (
        <Container>
          <HeaderAndSearchBar>
            <Card style={{ width: "600px", height: "200x" }}>
              <Card.Content>
                <Card.Header>Block Number: {blockInfo.blockNumber}</Card.Header>

                <Card.Description>
                  Time Stamp: {blockInfo.timeStamp}
                </Card.Description>
                <Card.Description>
                  Date:{" "}
                  {new Date(blockInfo.timeStamp * 1000).toLocaleDateString(
                    "en-US"
                  )}
                </Card.Description>
                <Card.Description>
                  Mined by:
                  <a href={`/address/${this.state.blockInfo.blockMiner}`}>
                    {blockInfo.blockMiner}
                  </a>
                </Card.Description>
                <Card.Description>
                  Block Reward: {blockInfo.blockReward / 1000000000000000000}
                  Ether
                </Card.Description>
                <ul
                  style={{
                    marginLeft: "13px",
                    fontSize: "15px",
                    color: "grey"
                  }}
                />
              </Card.Content>

              <Card.Content extra style={{ width: "600px", height: "200x" }}>
                Uncle Inclusion Reward:{" "}
                {blockInfo.uncleInclusionReward / 1000000000000000000}
                Ether
              </Card.Content>
            </Card>
          </HeaderAndSearchBar>
        </Container>
      );
    }
  }
}

export default BlockInformation;
