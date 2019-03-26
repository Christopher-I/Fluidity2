import React from "react";
import { Table, Tag, Tabs } from "antd";
import { Container } from "semantic-ui-react";
import HeaderAndSearchBar from "./HeaderAndSearchBar";
import "../align.css";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    //error check to ensure address is ethereum address
    if (this.props.match.params.address[1] !== "x") {
      this.props.history.push(
        `/invalidPath/${this.props.match.params.address}`
      );
    }

    this.state = {
      error: null,
      isLoaded: false,
      loading: true,
      ERC20Loading: true,
      items: [],
      ERC20Data: [],
      columns: [],
      ERC20columns: [],
      data: [],
      etherPrice: ""
    };
  }

  static getInitialProps(props) {
    let address = this.props.match.params.address;

    return {
      address
    };
  }

  getEtherPrice() {
    fetch(
      "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=G3YFDTNGGMTBCRRQEZ65CC6NR6RB4HC47U"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            etherPrice: result.result.ethusd,
            isLoaded: true
          });
        },

        // Handle errors.
        error => {
          this.setState({
            error
          });
        }
      );
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

  getERC20Transactions() {
    fetch(
      `http://api.etherscan.io/api?module=account&action=tokentx&address=${
        this.props.match.params.address
      }&startblock=0&endblock=999999999&sort=asc&apikey=G3YFDTNGGMTBCRRQEZ65CC6NR6RB4HC47U`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            ERC20Loading: false,
            ERC20Data: result.result
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

  getAllTransactions() {
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

  getColumnsAndSetData() {
    this.state.columns = [
      {
        title: "Block Number",
        dataIndex: "blockNumber",
        key: "blockNumber",
        render: text => <a href={"/block/" + text}>{text}</a>
      },
      {
        title: "From",
        dataIndex: "from",
        key: "from",
        render: text => <a href={text}>{text}</a>
      },
      {
        title: "",
        key: "from1",
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
        key: "to",
        render: text => <a href={text}>{text}</a>
      },
      {
        title: "Value(ETH)",
        dataIndex: "value",
        key: "value",
        render: text => {
          return (
            <p color="green"> {(text / 1000000000000000000).toFixed(2)} </p>
          );
        }
      }
    ];

    this.state.ERC20columns = [
      {
        title: "Block Number",
        dataIndex: "blockNumber",
        key: "blockNumber",
        render: text => <a href={"/block/" + text}>{text}</a>
      },
      {
        title: "From",
        dataIndex: "from",
        key: "from2",
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
        key: "to",
        render: text => <a href={text}>{text}</a>
      },
      {
        title: "Token Symbol",
        dataIndex: "tokenSymbol",
        key: "tokenSymbol",
        render: text => <p>{text}</p>
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
        render: (text, row) => {
          return (
            <p color="green">
              {" "}
              {(text / Math.pow(10, row.tokenDecimal)).toFixed(3)}{" "}
            </p>
          );
        }
      }
    ];
  }

  componentDidMount() {
    //start loading
    this.setState.loading = true;
    this.setState.ERC20Loading = true;

    //call neccesary function to gather and organize data
    this.getEtherPrice();
    this.getColumnsAndSetData();
    this.getAllTransactions();
    this.getERC20Transactions();
    this.getBalance();
  }

  //call render method
  render() {
    //declare state variables
    const {
      error,
      isLoaded,
      etherPrice,
      balance,
      columns,
      loading,
      data,
      ERC20Loading,
      ERC20columns,
      ERC20Data
    } = this.state;
    //declare tabs
    let TabPane = Tabs.TabPane;
    //check if data has been loaded if not, call componentDidMount to reload data
    if (!isLoaded) {
      this.componentDidMount();
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      this.setState.isLoaded = false; //reset data loaded valve,
      return (
        <Container style={{ width: "2500px" }}>
          <HeaderAndSearchBar loading={this.state.loading}>
            <div
              className="rowC"
              style={{
                marginBottom: "30px"
              }}
            >
              <h4
                style={{
                  marginLeft: "15px",
                  fontSize: "15px",
                  color: "black"
                }}
              >
                Address:
              </h4>
              <h4
                style={{
                  marginLeft: "13px",
                  fontSize: "15px",
                  color: "grey"
                }}
              >
                {this.props.match.params.address}
              </h4>
              <h4
                style={{ marginLeft: "20px", fontSize: "15px", color: "black" }}
              >
                Balance(ETH):
              </h4>
              <h4
                style={{
                  marginLeft: "10px",
                  fontSize: "15px",
                  color: "#32CD32"
                }}
              >
                {(balance / 1000000000000000000).toFixed(5)}
              </h4>

              <h4
                style={{ marginLeft: "20px", fontSize: "15px", color: "black" }}
              >
                Balance(USD):
              </h4>
              <h4
                style={{
                  marginLeft: "10px",
                  fontSize: "15px",
                  color: "#32CD32"
                }}
              >
                {((etherPrice * balance) / 1000000000000000000).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD"
                  }
                )}
              </h4>
            </div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="All transactions" key="1">
                <Table
                  rowKey={record => record.blockNumber}
                  loading={loading}
                  columns={columns}
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
                  dataSource={data}
                />
              </TabPane>
              <TabPane tab="ERC20 Transactions" key="2">
                <Table
                  rowKey={record => record.blockNumber}
                  loading={ERC20Loading}
                  columns={ERC20columns}
                  scroll={{ x: 1300 }}
                  expandedRowRender={record => (
                    <div style={{ margin: 0 }}>
                      <p>
                        Full Transfer Value : {record.value}
                        {record.tokenSymbol}
                      </p>
                      <p>Token Name : {record.tokenName}</p>
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
                  dataSource={ERC20Data}
                />
              </TabPane>
            </Tabs>
          </HeaderAndSearchBar>
        </Container>
      );
    }
  }
}

export default MyComponent;
