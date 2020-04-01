import React from "react";
import { ClassVersion } from "./ClassVersion";


const components = {
  CLASS: ClassVersion,
  DIRECT_FN: () => <span>not implemented</span>,
  IDIOMATIC_FN: () => <span>not implemented</span>
};

function App() {
  const states = {
    CLASS: "CLASS",
    DIRECT_FN: "DIRECT_FN",
    IDIOMATIC_FN: "IDIOMATIC_FN"
  };
  const [current, setCurrent] = React.useState(states.CLASS);

  const Component = components[current];

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          background: "aliceblue",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "2px"
        }}
      >
        {Object.keys(states).map(key => (
          <div
            style={{
              border: "solid 1px black",
              padding: "5px",
              marginRight: "5px",
              borderRadius: "2px"
            }}
            onClick={() => setCurrent(key)}
          >
            {key}
          </div>
        ))}
      </div>
      <Component />
    </div>
  );
}

export default App;
