import React from "react";
import { shallow } from "enzyme";
import PlaintextPreviewer from "./index";

it(
  ("displays a div preview with the value from sessionStorage or this.props.value",
  () => {
    const plainTextPreviewer = shallow(<PlaintextPreviewer />);
    expect(plainTextPreviewer.find("div").length).toBeGreaterThan(0);
  })
);
