import React from "react";
import PlaintextPreviewer from "./index";

test(
  ("displays a div preview with the value from sessionStorage or this.props.value",
  () => {
    const plainTextPreviewer = <PlaintextPreviewer />;
    expect(plainTextPreviewer.find("div").length).toBeGreaterThan(0);
  })
);
