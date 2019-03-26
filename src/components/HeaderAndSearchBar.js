import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Segment, Icon, Menu, Form } from "semantic-ui-react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.getBlockInfo = this.getBlockInfo.bind(this);
    this.getAccountInfo = this.getAddressInfo.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      query: "",
      blockInfo: [],
      accountInfo: [],
      loading: false
    };
  }

  //redirect page depending on user input
  handleFormSubmit = () => {
    if (this.state.query.length > 10 && this.state.query[1] === "x") {
      this.getAddressInfo(this.state.query);
    } else if (!isNaN(this.state.query)) {
      this.getBlockInfo(this.state.query);
    } else {
      this.invalidPath(this.state.query);
    }
  };

  //update state with search input
  handleInputChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  //Push page to invalid page if user entry is not recognized
  invalidPath(event) {
    this.props.history.push(`/invalidPath/${this.state.query}`);
  }
  //Push page to block information page if user enters block number
  getBlockInfo(event) {
    this.props.history.push(`/block/${this.state.query}`);
  }
  //Push page to address information page if user enters address number
  getAddressInfo(event) {
    this.props.history.push(`/address/${this.state.query}`);
  }

  render() {
    return (
      <Container>
        <Segment>
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
                <a className="item" style={{ color: "teal" }} href="/">
                  <Icon name="home" size="large" />
                </a>
              </div>
            </div>
            <div style={{ marginTop: "10px" }} />
            <Menu.Menu position="right">
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
