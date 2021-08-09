import React, { useEffect, useState, useRef } from "react";

import { createVaccinesDataSource } from "../../data/covidStore";

import worldVaccinationsStyle from "../../styles/covidPages/WorldVaccinations.module.scss";

import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import DateBox from "devextreme-react/date-box";
import { LoadPanel } from "devextreme-react/load-panel";
import SelectBox from "devextreme-react/select-box";
import { Validator, CustomRule } from "devextreme-react/validator";
import {
    Chart,
    Crosshair,
    Export,
    Grid,
    ArgumentAxis,
    TickInterval,
    Tooltip,
    Series,
    Label,
    Legend,
    Title,
    MinorTick,
    CommonSeriesSettings,
} from "devextreme-react/chart";


export default function WorldVaccinations() {
    const [countryDataSource, setCountryDataSource] = useState(null);
    const [vaccineDataSource, setVaccineDataSource] = useState(null);
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [initialMinDate, setInitialMinDate] = useState(
        new Date().toLocaleDateString()
    );
    const [initialMaxDate, setInitialMaxDate] = useState(
        new Date().toLocaleDateString()
    );
    const [chartData, setChartData] = useState([]);
    const newData = [];
    const [selectedCountry, setSelectedCountry] = useState("Philippines");
    const dateFormat = {
        type: "shortDate",
    };

    const selectBoxRef = useRef(null);
    const chartRef = useRef(null);

    const customizeTooltip = (arg) => {
        return {
            text: ` Total: ${parseInt(arg.value).toLocaleString()} (${arg.argumentText
                })`,
        };
    };

    const minDisableDates = (args) => args.date < Date.parse(minDate);
    const maxDisableDates = (args) => args.date > Date.parse(maxDate);

    const maxDateOnValueChange = (e) => {
        setInitialMaxDate(e.value);
        if (e.component.option("isValid")) setDataSourceFilter();
    };

    const maxDateValidator = (e) =>
        Date.parse(e.value) > Date.parse(initialMinDate);
    const minDateValidator = (e) =>
        Date.parse(e.value) < Date.parse(initialMaxDate);

    const setDataSourceFilter = () => {
        const ds = chartRef.current.instance.option("dataSource");
        ds.filter([
            ["date", ">=", initialMinDate],
            "and",
            ["date", "<=", initialMaxDate],
        ]);
        ds.load().then((e) => {
            chartRef.current.instance.refresh();
        });
    };

    const minDateOnValueChange = (e) => {
        setInitialMinDate(e.value);
        if (e.component.option("isValid")) setDataSourceFilter();
    };

    useEffect(() => {
        createVaccinesDataSource()
            .then((e) => {
                const ds = new DataSource({
                    store: new ArrayStore({
                        data: e,
                    }),
                });
                setCountryDataSource(ds);
                selectBoxRef.current.instance.option("value", selectedCountry);
                setLoaderVisible(false);
            })
            .catch((e) => {
                console.log(e);
                setLoaderVisible(false);
            });
    }, []);

    const onselectionchange = (e) => {
        if (!e.selectedItem) return;

        const rawData = e.selectedItem.data;

        setSelectedCountry(e.component.option("value"));

        let prev_people_fully_vaccinated = 0;

        setMinDate(rawData[0].date);
        setMaxDate(rawData[rawData.length - 1].date);
        setInitialMinDate(rawData[0].date);
        setInitialMaxDate(rawData[rawData.length - 1].date);

        rawData.forEach((item, index) => {
            const newItem = {};

            newItem.people_fully_vaccinated = item.people_fully_vaccinated;
            newItem.people_vaccinated = item.people_vaccinated;
            newItem.total_vaccinations = item.total_vaccinations;
            newItem.date = item.date;

            if (newItem.people_fully_vaccinated === undefined) {
                newItem.people_fully_vaccinated = prev_people_fully_vaccinated;
            } else {
                if (newItem.people_fully_vaccinated > prev_people_fully_vaccinated)
                    prev_people_fully_vaccinated = newItem.people_fully_vaccinated;
            }

            newData.push(newItem);
        });

        const ds = new DataSource({
            store: new ArrayStore({
                data: newData,
            }),
            paginate: false,
            reshapeOnPush: true,
        });
        ds.load();
        setChartData(e.selectedItem.data);
        setVaccineDataSource(ds);
    };

    let titleText = `${selectedCountry} Vaccination Status`;
    let subtitleText = `(${new Date(
        initialMinDate
    ).toLocaleDateString()}-${new Date(initialMaxDate).toLocaleDateString()})`;
    return (
        <div className={worldVaccinationsStyle.worldVaccineContainer}>
            <LoadPanel
                shadingColor="rgba(0,0,0,0.4)"
                visible={loaderVisible}
                shading={true}
                showPane={true}
                showIndicator={true}
            />
            <div className={worldVaccinationsStyle.headerStyle}>
                <div className="dx-fieldset">
                    <div className="dx-field">
                        <div className="dx-field-label">Country</div>
                        <div className="dx-field-value">
                            <SelectBox
                                ref={selectBoxRef}
                                showClearButton={true}
                                searchEnabled={true}
                                dataSource={countryDataSource}
                                displayExpr="country"
                                valueExpr="country"
                                onSelectionChanged={onselectionchange}
                            />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-label">From</div>
                        <div className="dx-field-value">
                            <DateBox
                                disabledDates={minDisableDates}
                                value={initialMinDate}
                                onValueChanged={minDateOnValueChange}
                            >
                                <Validator>
                                    <CustomRule
                                        reevaluate={true}
                                        validationCallback={minDateValidator}
                                        message="Please check your selected date"
                                    />
                                </Validator>
                            </DateBox>
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-label">To</div>
                        <div className="dx-field-value">
                            <DateBox
                                disabledDates={maxDisableDates}
                                onValueChanged={maxDateOnValueChange}
                                value={initialMaxDate}
                            >
                                <Validator>
                                    <CustomRule
                                        reevaluate={true}
                                        validationCallback={maxDateValidator}
                                        message="Please check your selected date"
                                    />
                                </Validator>
                            </DateBox>
                        </div>
                    </div>
                </div>
            </div>
            <Chart
                className={worldVaccinationsStyle.chartStyle}
                palette="Dark Moon"
                ref={chartRef}
                dataSource={vaccineDataSource}
            >
                <CommonSeriesSettings argumentField="date" type="line" />
                <Export enabled={true} />
                <Crosshair enabled={true} />
                <Legend itemTextPosition="bottom" orientation="horizontal" />
                <Title text={titleText} subtitle={subtitleText} />
                <Grid visible={true} />
                <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
                <ArgumentAxis>
                    <TickInterval months={2} />
                    <MinorTick visible={false} />
                    <Label format={dateFormat} />
                </ArgumentAxis>
                <Series valueField="total_vaccinations" name="Total vaccinations" />
                <Series valueField="people_vaccinated" name="Vaccinated People" />
                <Series
                    valueField="people_fully_vaccinated"
                    name="Fully vaccinated People"
                />
            </Chart>
        </div>
    );
}
