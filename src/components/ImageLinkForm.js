import React, { Component } from "react";
import "./ImageLinkForm.css";

export default class ImageLinkForm extends Component {
  render() {
    return (
      <div>
        <p className="f3">{"Add Picture to Detect Faces... Give it a try!!"}</p>
        <div className="center">
          <div className="center pa4 br3 shadow-5 form">
            <input
              type="text"
              className="f4 pa2 w-70 center"
              onChange={this.props.onInputChange}
            />
            <button
              className="w-30 grow f4 link ph3pv2 dib white bg-light-purple"
              onClick={this.props.onButtonSubmit}
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    );
  }
}
