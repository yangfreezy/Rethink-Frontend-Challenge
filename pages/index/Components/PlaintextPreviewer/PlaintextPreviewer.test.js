import React from "react";
import { shallow } from "enzyme";

import PlaintextPreviewer from "./index";

const testFile = {
  name: "test file name",
  value: "test value"
};

describe("PlaintextPreviewer tests", () => {
  const wrapper = shallow(
    <PlaintextPreviewer file={testFile} value={testFile.value} />
  );
  it("should have an edit button", () => {
    expect(wrapper.find("button").length).toBeGreaterThan(0);
  });
});
