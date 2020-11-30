import Particles from "react-particles-js";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import Rank from "./components/Rank";
import Clarifai from "clarifai";
import { useState } from "react";
import FaceRecognition from "./components/FaceRecognition";
import Signin from "./components/Signin";
import Register from "./components/Register";

const app = new Clarifai.App({
  apiKey: "044d9ddef1bd4db18faf1035d0fbc6ea",
});

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignIn] = useState(false);

  const calculateFaceLocation = (response) => {
    const clarifaiFace =
      response.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById("inputimage");
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftcol: clarifaiFace.left_col * width,
      toprow: clarifaiFace.top_row * height,
      rightcol: width - clarifaiFace.right_col * width,
      bottomrow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    console.log(box);
    setBox(box);
  };

  const particleParams = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
    },
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setimageUrl(input);
    app.models
      .predict("c0c0ac362b03416da06ab3fa36fb58e3", input)
      // .predict(
      // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
      // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
      // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
      // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
      // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
      // so you would change from:
      // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      // to:
      //   Clarifai.FACE_DETECT_MODEL,
      //   "https://d1sr9z1pdl3mb7.cloudfront.net/wp-content/uploads/2020/08/12142443/mask-detection.png"
      // )
      .then((response) => {
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setSignIn(false);
    } else if (route === "home") {
      setSignIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="app">
      <Particles className="particles" params={particleParams} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            onButtonSubmit={onButtonSubmit}
            onInputChange={onInputChange}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register />
      )}
    </div>
  );
}

export default App;
