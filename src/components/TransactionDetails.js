import React from "react";
import ReactDOM from "react-dom";
import { Table, Tag } from "antd";
import { Segment, Container, Menu, Icon } from "semantic-ui-react";
import SearchBar from "./SearchBar";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      loading: true,
      items: [],
      columns: [],
      data: []
    };
  }

  static getInitialProps(props) {
    let address = this.props.match.params.address;

    return {
      address
    };
  }

  getBalance() {
    fetch(
      `https://api.etherscan.io/api?module=account&action=balance&address=${
        this.props.match.params.address
      }&tag=latest&apikey=G3YFDTNGGMTBCRRQEZ65CC6NR6RB4HC47U`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,

            balance: result.result
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

  getTransactions() {
    fetch(
      `http://api.etherscan.io/api?module=account&action=txlist&address=${
        this.props.match.params.address
      }&startblock=0&endblock=99999999&sort=asc&apikey=G3YFDTNGGMTBCRRQEZ65CC6NR6RB4HC47U`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            loading: false,
            data: result.result
          });
        },

        // Handle errors.
        error => {
          this.setState({
            isLoaded: true,
            loading: false,
            error
          });
        }
      );
  }

  componentDidMount() {
    //call etherscan API and edit state with result

    this.state.columns = [
      {
        title: "Block Number",
        dataIndex: "blockNumber",
        key: "name1",
        render: text => <a href={"/block/" + text}>{text}</a>
      },
      {
        title: "From",
        dataIndex: "from",
        key: "name2",
        render: text => <a href={text}>{text}</a>
      },
      {
        title: "",
        key: "from3",
        dataIndex: "from",
        render: text => {
          if (text === this.props.match.params.address) {
            return <Tag color="red">out</Tag>;
          } else {
            return <Tag color="green">in</Tag>;
          }
        }
      },
      {
        title: "To",
        dataIndex: "to",
        key: "name3",
        render: text => <a href={text}>{text}</a>
      },
      {
        title: "Value(ETH)",
        dataIndex: "value",
        key: "address1",
        render: text => {
          if (text == 0) {
            return <p color="green"> ERC20 </p>;
          } else {
            return (
              <p color="green"> {(text / 1000000000000000000).toFixed(2)} </p>
            );
          }
        }
      }
    ];
    this.getTransactions();
    this.getBalance();
  }

  render() {
    if (!this.state.isLoaded) {
      this.state.isLoaded = true;
      this.componentDidMount();
    }
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container style={{ width: "2500px" }}>
          <SearchBar loading={this.state.loading}>
            <div
              style={{
                marginBottom: "40px"
              }}
            >
              <a
                style={{ marginLeft: "10px", fontSize: "15px", color: "black" }}
              >
                <a
                  style={{
                    marginLeft: "13px",
                    fontSize: "15px",
                    color: "black"
                  }}
                >
                  Address:
                </a>
                <a
                  style={{
                    marginLeft: "13px",
                    fontSize: "15px",
                    color: "grey"
                  }}
                >
                  {this.props.match.params.address}
                </a>
              </a>
              <a
                style={{ marginLeft: "20px", fontSize: "15px", color: "black" }}
              >
                Balance(ETH):
                <a
                  style={{
                    marginLeft: "10px",
                    fontSize: "15px",
                    color: "#32CD32"
                  }}
                >
                  {(this.state.balance / 1000000000000000000).toFixed(5)}
                </a>
              </a>
            </div>

            <Table
              columns={this.state.columns}
              expandedRowRender={record => (
                <div style={{ margin: 0 }}>
                  <p>
                    Full Transfer Value :{" "}
                    {(record.value / 1000000000000000000).toFixed(15)} Ether
                  </p>
                  <p>
                    Date(MM-DD-YYYY):{" "}
                    {new Date(record.timeStamp * 1000).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                  <p>Hash : {record.hash} </p>
                  <p>Nonce : {record.nonce}</p>
                  <p>Block Hash : {record.blockHash} </p>
                  <p>Transaction Index : {record.transactionIndex}</p>
                  <p>Gas : {record.gas} </p>
                  <p>Gas Price : {record.gasPrice}</p>
                  {/*<p>Input : {record.input}</p>*/}
                  <p>Contract Address : {record.contractAddress}</p>
                  <p>Cumulative Gas Used : {record.cumulativeGasUsed}</p>
                  <p>Gas Used : {record.gasUsed}</p>
                  <p>Confirmations : {record.confirmations}</p>
                </div>
              )}
              dataSource={this.state.data}
            />
          </SearchBar>
        </Container>
      );
    }
  }
}

export default MyComponent;
