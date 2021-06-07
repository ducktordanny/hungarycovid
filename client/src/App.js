import { Component } from "react";
import {
  createInstance,
  OptimizelyFeature,
  OptimizelyProvider,
} from "@optimizely/react-sdk";

import Nav from "./Components/Nav/Nav";
import Routes from "./Components/Routes/Routes";
import Loading from "./Components/Loading";
import "./App.css";
// import Footer from './Components/Footer/Footer';

// discord link: https://discord.gg/CFqe7QgdAb
// https://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial

const optimizely = createInstance({
  sdkKey:
    window.location.hostname === "localhost"
      ? "Bg2a3dpkEQX8krmz16ZUL"
      : "72RtXq65K5pgBmj3BqemK",
  datafileOptions: {
    autoUpdate: true,
    updateInterval: window.location.hostname === "localhost" ? 1000 : 300000,
  },
});

class App extends Component {
  render() {
    return (
      <OptimizelyProvider
        optimizely={optimizely}
        user={{
          id: "everyone",
        }}
      >
        <Nav
          listElements={[
            { path: "/", name: "Főoldal" },
            { path: "/covid19", name: "Koronavírus" },
            // { path: "/police-actions", name: "Rendőri intézkedések" },
          ]}
        />
        <OptimizelyFeature feature="hungary-covid-bug">
          {(enabled, variables) =>
            enabled ? (
              <div className="issue-message">
                <Loading />
                <h1>
                  Probléma elhárítása folyamatban,
                  <br />
                  jöjjön vissza később!
                </h1>
              </div>
            ) : (
              <main>
                <Routes />
              </main>
            )
          }
        </OptimizelyFeature>
      </OptimizelyProvider>
    );
  }
}

export default App;
