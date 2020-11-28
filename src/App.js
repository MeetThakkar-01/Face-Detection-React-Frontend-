import Particles from "react-particles-js";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import Rank from "./components/Rank";

function App() {
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
  return (
    <div className="app">
      <Particles className="particles" params={particleParams} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;
