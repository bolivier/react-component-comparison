import React, { useState } from "react";
import "./tailwind.output.css";
import { ClassVersion } from "./ClassVersion";
import { DirectFn } from "./DirectFn";
import { IdiomaticFn } from "./IdiomaticFn";

const components = {
  CLASS: ClassVersion,
  DIRECT_FN: DirectFn,
  IDIOMATIC_FN: IdiomaticFn,
};

function App() {
  const states = {
    CLASS: "CLASS",
    DIRECT_FN: "DIRECT_FN",
    IDIOMATIC_FN: "IDIOMATIC_FN",
  };

  const [visibility, setVisibility] = useState("all");
  const [current, setCurrent] = React.useState(states.CLASS);

  const Component = components[current];

  return (
    <div className="w-1/3 mt-5 mx-auto">
      <div className=" border p-2">
        <div className="flex flex-col items-center p-3 border rounded mb-4">
          <h2 className="font-bold uppercase">select class</h2>
          <div className="flex justify-center">
            {Object.keys(states).map((key) => (
              <button
                className={`btn ${key === current ? "btn-active" : ""}`}
                onClick={() => setCurrent(key)}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-start">
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
    </div>
  );
}

function VisibilitySetter({ set, name, current }) {
  return (
    <div
      className={`btn ${current === name && "btn-active"}`}
      onClick={() => set(name)}
    >
      {name}
    </div>
  );
}

export default App;
