import React, { useState } from "react";
import { ClassVersion } from "./ClassVersion";
import { DirectFn } from "./DirectFn";
import { IdiomaticFn } from "./IdiomaticFn";

const components = {
  CLASS: ClassVersion,
  DIRECT_FN: DirectFn,
  IDIOMATIC_FN: IdiomaticFn
};

function App() {
  const states = {
    CLASS: "CLASS",
    DIRECT_FN: "DIRECT_FN",
    IDIOMATIC_FN: "IDIOMATIC_FN"
  };

  const [visibility, setVisibility] = useState("all");
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
              borderRadius: "2px",
              boxShadow:
                current === key ? "inset 0 0 5px black" : "0 0 5px black"
            }}
            onClick={() => setCurrent(key)}
          >
            {key}
          </div>
        ))}
      </div>
      <div style={{ width: "500px", display: "flex" }}>
        <VisibilitySetter
          name="all"
          set={setVisibility}
          current={visibility}
        />
        <VisibilitySetter
          name="active"
          set={setVisibility}
          current={visibility}
        />
        <VisibilitySetter
          name="completed"
          set={setVisibility}
          current={visibility}
        />
      </div>
      <Component visibility={visibility} />
    </div>
  );
}

function VisibilitySetter({ set, name, current }) {
  return (
    <div
      style={{
        border: "solid 1px black",
        padding: "5px",
        marginRight: "5px",
        borderRadius: "2px",
        cursor: "pointer",
        boxShadow: current === name ? "inset 0 0 5px black" : "0 0 5px black"
      }}
      onClick={() => set(name)}
    >
      {name}
    </div>
  );
}

export default App;
