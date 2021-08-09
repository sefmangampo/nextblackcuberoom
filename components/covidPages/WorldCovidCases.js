import { useRef, useState, useEffect } from 'react'

import worldCovidCasesStyles from "../../styles/covidPages/WorldCovidCases.module.scss";

import DataGrid, { ColumnChooser, Column, LoadPanel as GridLoader, Export, Paging } from 'devextreme-react/data-grid'
import SelectBox from 'devextreme-react/select-box';
import Button from "devextreme-react/button";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { LoadPanel } from "devextreme-react/load-panel";
import { Template } from "devextreme-react/core/template";
import ScrollView from 'devextreme-react/scroll-view';
import { Popup } from 'devextreme-react/popup';
import Link from "next/link";

import { createCovidDataSource } from "../../data/covidStore";

export default function WorldCovidCases() {

    const renderPopupContent = () => {
        return (
            <div className={createCovidDataSource.popupContent}>
                <p>Hello, data used by the grid and chart comes from {" "}
                    <Link href="https://ourworldindata.org/coronavirus"><span style={{ color: "yellow", cursor: "pointer" }}>ourworldindata.org</span></Link>
                </p>
                <p>I think they update their data very frequently as seen from the dates
                </p>
                <p>There are lots of international institutions and private entities that collect data with varying measurements but I found this source to have more consistent API than others.  </p>

            </div>
        );
    };

    const [popupVisible, setPopupVisible] = useState(false)
    const selectBox = useRef(null);
    const dataGrid = useRef(null);
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [countriesDS, setCountriesDS] = useState(null);
    const [gridDS, setGridDS] = useState(null);
    const [location, setLocation] = useState("Philippines");
    const [continent, setContinent] = useState("");
    const [population, setpopulation] = useState(0);
    const [medianAge, setMedianAge] = useState("");
    const [populationDensity, setPopulationDensity] = useState("");
    const [gdp, setGDP] = useState("");
    const [hospitalBeds, setHospitalBeds] = useState("");

    const hidePopup = () => {
        setPopupVisible(false);
    }

    const showPopup = () => {
        setPopupVisible(true);
    }

    const renderCountryLabel = () => {
        return (
            <div>
                <h3>{location}</h3>
            </div>
        );
    };

    const onclick = (e) => {
        selectBox.current.instance.option("value", "Philippines");
    };

    const numberFormat = {
        type: "fixedPoint",
        precision: 0,
    };

    const onSelectionChanged = (e) => {
        if (!e.selectedItem) return;
        const {
            continent,
            population,
            median_age,
            population_density,
            location,
            gdp_per_capita,
            hospital_beds_per_thousand,
        } = e.selectedItem;

        const CheckForNA = (val) => (val == undefined ? "N/A" : val);

        setLocation(location);
        setContinent(continent);
        setMedianAge(CheckForNA(median_age));
        setPopulationDensity(CheckForNA(population_density));
        setGDP(CheckForNA(gdp_per_capita));
        setHospitalBeds(CheckForNA(hospital_beds_per_thousand));

        let formattedPopulation = parseInt(population).toLocaleString();
        setpopulation(formattedPopulation);

        const newDS = new DataSource({
            store: new ArrayStore({
                data: e.selectedItem.data,
                key: "date",
            }),
        });

        setGridDS(newDS);
    };


    const onToolbarPreparing = (e) => {
        const items = e.toolbarOptions.items;

        // const label = {
        //     location: "center",
        //     template: "CountryLabel",
        // };

        const filterDates = {
            text: "Filter by Date",
            location: "before",
            widget: "dxDateBox",
            options: {
                showClearButton: true,
                openOnFieldClick: true,
                width: 200,
                onValueChanged: (e) => {
                    if (e.value) gridDS.filter(["date", "=", e.value]);
                    else gridDS.filter(null);

                    gridDS.load();
                },
            },
        };

        // items.push(label);
        items.push(filterDates);
        e.toolbarOptions.items = items;
    };

    useEffect(() => {
        createCovidDataSource()
            .then((res) => {
                const dataSource = new DataSource({
                    store: new ArrayStore({
                        data: res,
                        value: "location",
                    }),
                    paginate: true,
                    pageSize: 10,
                });
                setCountriesDS(dataSource);
                selectBox.current.instance.option("value", "Philippines");

            })
            .catch((e) => {

                console.log(e);
            })
            .finally(() => {
                setLoaderVisible(false);
                setPopupVisible(true)
            })
    }, []);


    return (
        <div id="worldCovidContainer">
            <Popup
                visible={popupVisible}
                onHiding={hidePopup}
                height={350}
                width={300}
                closeOnOutsideClick={true}
                showCloseButton={true}
                title="Disclaimer"
                contentRender={renderPopupContent}
            />

            <LoadPanel
                shadingColor="rgba(0,0,0,0.4)"
                position={{ of: "#worldCovidContainer" }}
                visible={loaderVisible}
                shading={true}
                showPane={true}
                showIndicator={true}
            />
            <div className={worldCovidCasesStyles.headerStyle}>

                <div className={worldCovidCasesStyles.topHeaderStyle}>

                    <div className={worldCovidCasesStyles.selectBoxGroupStyle}>
                        <SelectBox
                            searchEnabled={true}
                            searchMode="contains"
                            showClearButton={true}
                            onSelectionChanged={onSelectionChanged}
                            displayExpr="location"
                            valueExpr="location"
                            dataSource={countriesDS}
                            ref={selectBox}
                            width={"60%"}
                        />
                        <Button
                            onClick={onclick}
                            text="PH"
                            type="default"
                            width={"80px"}
                        />
                        <Button icon={"help"} width={20} onClick={showPopup} />
                    </div>
                </div>
                <div className={worldCovidCasesStyles.midHeaderStyle}>
                    <p>
                        Country: <strong>{location}</strong>
                    </p>
                    <p>
                        Continent: <strong>{continent}</strong>
                    </p>
                    <p>
                        Population: <strong>{population}</strong>
                    </p>
                    <p>
                        Median Age: <strong>{medianAge}</strong>
                    </p>
                    <p>
                        Population Density: <strong>{populationDensity}</strong>
                    </p>
                    <p>
                        GDP per capita: <strong>{gdp}</strong>
                    </p>
                    <p>
                        Hospital beds per thousand:{" "}
                        <strong>{hospitalBeds}</strong>
                    </p>
                </div>
            </div>

            <div className={worldCovidCasesStyles.gridContainerStyle}>
                <ScrollView
                    className={worldCovidCasesStyles.scrollView}
                    direction={"horizontal"}>
                    <DataGrid
                        className={worldCovidCasesStyles.dataGrid}
                        ref={dataGrid}
                        wordWrapEnabled={true}
                        showBorders={true}
                        rowAlternationEnabled={true}
                        focusedRowEnabled={true}
                        dataSource={gridDS}
                        onToolbarPreparing={onToolbarPreparing}
                    >
                        <Template name="CountryLabel" render={renderCountryLabel} />
                        <Paging pageSize={7} />
                        <Export enabled={true} />
                        <GridLoader shading={true} shadingColor="rgba(0,0,0,0.4)" />
                        <ColumnChooser enabled={true} mode={"select"} />
                        <Column
                            dataField={"date"}
                            sortOrder={"desc"}
                            dataType="date"
                            width={100}
                        />
                        <Column
                            dataField={"total_cases"}
                            dataType="number"
                            format={numberFormat}
                            width={100}
                        />
                        <Column
                            dataField={"new_cases"}
                            dataType="number"
                            width={100}
                            format={numberFormat}
                        />
                        <Column
                            dataField={"total_cases_per_million"}
                            dataType="number"
                            format={numberFormat}
                            width={100}
                        />
                        <Column
                            dataField={"new_cases_per_million"}
                            dataType="number"
                            format={numberFormat}
                            width={100}
                        />
                        <Column dataField={"stringency_index"} visible={false} />
                        <Column dataField={"excess_mortality"} visible={false} />
                        <Column
                            dataField={"total_deaths"}
                            dataType="number"
                            format={numberFormat}
                            width={100}
                        />
                        <Column
                            dataField={"new_deaths"}
                            dataType="number"
                            format={numberFormat}
                            width={100}
                        />
                        <Column
                            dataField={"total_deaths_per_million"}
                            dataType="number"
                            format={numberFormat}
                            width={100}
                        />
                        <Column
                            dataField={"new_cases_smoothed"}
                            visible={false}
                            format={numberFormat}
                        />
                        <Column
                            dataField={"new_deaths_smoothed"}
                            visible={false}
                            format={numberFormat}
                        />
                        <Column
                            dataField={"new_cases_smoothed_per_million"}
                            visible={false}
                            format={numberFormat}
                        />
                        <Column
                            dataField={"new_deaths_smoothed_per_million"}
                            visible={false}
                            format={numberFormat}
                        />
                    </DataGrid>
                </ScrollView>
            </div>
        </div >
    )
}
