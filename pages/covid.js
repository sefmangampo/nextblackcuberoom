import React from "react";
import { TabPanel, Item } from "devextreme-react/tab-panel";
import "devextreme/dist/css/dx.material.orange.dark.css";

import covidStyles from "../styles/Covid.module.scss";
import WorldCovidCases from "../components/covidPages/WorldCovidCases";
import WorldVaccinations from "../components/covidPages/WorldVaccinations";

const renderWorldCovidGrid = () => <WorldCovidCases />;

const renderWorldVaccinations = () => <WorldVaccinations />;

export default function covid() {
  return (
    <div className={covidStyles.container}>
      <div className="tabPanelContainer">
        <TabPanel swipeEnabled={false}>
          <Item title="Global Covid Cases" component={renderWorldCovidGrid} />
          <Item
            title="Global Vaccination"
            component={renderWorldVaccinations}
          />
        </TabPanel>
      </div>
    </div>
  );
}
