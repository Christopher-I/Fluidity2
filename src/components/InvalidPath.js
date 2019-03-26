import React from "react";
import { Link } from "react-router-dom";
import { Image, Container, Button, Card } from "semantic-ui-react";
import HeaderAndSearchBar from "./HeaderAndSearchBar";
import ErrorImage from "../images/errorpage.jpg";

class BlockInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidPath: ""
    };
  }

  render() {
    if (!this.state.isLoaded) {
      this.setState.isLoaded = true;
    }
    const { error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      this.setState.isLoaded = false;
      return (
        <Container>
          <HeaderAndSearchBar>
            <Card style={{ width: "1600px", height: "200x" }}>
              <Image src={ErrorImage} position="center" />
              <Card.Content>
                <Card.Header>Search not found Oops!</Card.Header>
                <Card.Description>
                  <div>
                    The search string you entered was:{" "}
                    {this.props.match.params.invalidPath}
                    <p>Sorry! This is an invalid search string.</p>
                    <Link to="/" replace>
                      <Button primary> Home</Button>
                    </Link>
                  </div>
                </Card.Description>
              </Card.Content>
            </Card>
          </HeaderAndSearchBar>
        </Container>
      );
    }
  }
}

export default BlockInfo;
