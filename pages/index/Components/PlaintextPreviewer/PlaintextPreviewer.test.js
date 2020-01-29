import React from "react";
import { shallow } from "enzyme";

import PlaintextPreviewer from "./index";

const testFile = {
  name: "test file name",
  type: "text/plain",
  lastModified: new Date("2011-07-29T16:01:35")
};

const testValue = "testValue";

describe("PlaintextPreviewer tests", () => {
  const wrapper = shallow(
    <PlaintextPreviewer file={testFile} value={testValue} />
  );
  it("should have an edit button", () => {
    expect(wrapper.find("button").length).toBeGreaterThan(0);
  });
});
