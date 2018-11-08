import { css } from "emotion";
import container, { innerContent, listContainer, summaryContainer } from "emotion-styles/container";
import { lightText } from "emotion-styles/inline";
import { actionTab, activeTab, unactiveTab } from "emotion-styles/tabbed";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { colors, text } from "./emotion-styles/src/variables/colors";

const Appliances = () =>
  <div >
    <div>
      <h3 className={activeTab}>Appliances</h3>
      <h3 className={unactiveTab}>Maximus pontimus</h3>
      <h3 className={actionTab}>+</h3>
    </div>

    <div>
      <div className={listContainer}>
        <h2>list</h2>
      </div>
      <div className={summaryContainer}>
        <div>
          <div>
            <h2>Summary</h2>
          </div>
          <div>
            <h2>Latest Activity</h2>
          </div>
          <div>
            <h2>Statistics</h2>
          </div>
        </div>
      </div>
    </div>
  </div>;

export default Appliances;
