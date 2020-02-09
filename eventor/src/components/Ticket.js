import React, { Component } from "react";
import { Jumbotron, Breadcrumb } from "react-bootstrap";

const URL = "http://127.0.0.1:5468";

class Ticket extends Component {
  
  state = {
    loading: true,
    title: null,
    body: null,
    event: null
  };

  async componentDidMount() {
    const options = {
      headers: { "Content-Type": "application/json" }
    };

    const response = await fetch(
      `${URL}${this.props.location.pathname}`,
      options
    );
    const value = await response.json();
    console.log(value);
    this.setState({
      loading: false,
      title: value.id,
      body: value.content,
      event: value.event
    });
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/tasks">Taskboard</Breadcrumb.Item>
          <Breadcrumb.Item active>{this.state.title}</Breadcrumb.Item>
        </Breadcrumb>
        <Jumbotron>
          {this.state.loading ? (
            <div>Loading..</div>
          ) : (
            <div>
              <h1>{this.state.title}</h1>
              <p>
                {console.log(this.props.location.pathname)}
                {this.state.body}
              </p>
            </div>
          )}
        </Jumbotron>
      </div>
    );
  }
}

export default Ticket;
