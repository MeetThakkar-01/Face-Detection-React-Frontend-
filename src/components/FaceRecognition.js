import React from "react";
import "./FaceRecognition.css";

function FaceRecognition({ box, imageUrl }) {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.toprow,
            right: box.rightcol,
            bottom: box.bottomrow,
            left: box.leftcol,
          }}
        ></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
