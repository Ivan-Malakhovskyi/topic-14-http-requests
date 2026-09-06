import React, { Component } from "react";

export class UserSearch extends Component {
  state = { user: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.userName.value;
    console.log(value);

    this.setState({ article: value });
  };

  async componentDidUpdate() {
    try {
    } catch (error) {}
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="userName" />
        <button type="submit">Search</button>
      </form>
    );
  }
}
