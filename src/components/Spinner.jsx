import React, { Component } from "react";
import { ThreeDots } from "react-loader-spinner";

export default class Spinner extends Component {
  render() {
    return (
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ display: "flex", justifyContent: "center" }}
        wrapperClass=""
      />
    );
  }
}
