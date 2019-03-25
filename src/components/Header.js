import React from "react";
import { Container, Segment, Input, Menu } from "semantic-ui-react";
import AccountBalanceLabel from "./AccountBalanceLabel";

const HeaderExampleImage = props => (
  <Segment>
    <Menu
      style={{
        marginTop: "10px",
        marginBottom: "70px",
        height: "100px",
        background: "#33445e"
      }}
    >
      <div
        style={{
          marginTop: "25px",
          marginLeft: "10px",
          fontSize: "13px"
        }}
      >
        <div style={{ color: "grey" }}>Account ID</div>
        <div style={{ color: "#F0EFEF" }}>
          0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121
        </div>
      </div>
      <div style={{ marginLeft: "20px", marginTop: "25px" }}>
        <AccountBalanceLabel />
      </div>
      <Menu.Menu position="right">
        <Menu.Item>
          <Input
            style={{ width: "400px" }}
            action={{ icon: "search" }}
            placeholder="Enter Account/Block Number..."
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    {props.children}
  </Segment>
);

export default HeaderExampleImage;
