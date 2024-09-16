import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = ({ items }: any) => {
  const onChange = (key: string | string[]) => {};

  return (
    <Collapse items={items} defaultActiveKey={["0"]} onChange={onChange} />
  );
};

export default App;
