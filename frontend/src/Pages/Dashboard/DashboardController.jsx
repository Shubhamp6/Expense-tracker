import React, { useEffect, useState } from "react";
import DashboardUI from "./DashboardUI";
import { useDispatch } from "react-redux";
import { callApiAction } from "../../store/actions/commonAction";
import { getTrasactionApi } from "../../apis/trasaction.api";
import { LIST_VIEW_TIME, TRANSACTION_FETCH_TYPE, GRAPHICAL_VIEW_TYPE, GRAPHICAL_VIEW_DURATION, WEEK_DAYS, YEAR_MONTHS } from "../../utils/constants";
import { generateShades } from "../../utils/pieChartColor";

const DashboardController = () => {
    const [loading, setLoading] = useState(false);
    const [graphDuraction, setGraphDuraction] = useState(GRAPHICAL_VIEW_DURATION.WEEK_DAYS_DATA)
    const [pieChartDuraction, setPieChartDuraction] = useState(GRAPHICAL_VIEW_DURATION.WEEK_DAYS_DATA)
    const [expanseData, setExpanseData] = useState();
    const [weekGraphDayData, setWeekGraphDayData] = useState([]);
    const [monthGraphDayData, setMonthGraphDayData] = useState([]);
    const [yearGraphDayData, setYearGraphDayData] = useState([]);
    const [weekChartData, setWeekChartData] = useState([]);
    const [monthChartData, setMonthChartData] = useState([]);
    const [yearChartData, setYearChartData] = useState([]);
    const dispatch = useDispatch();
    const [GraphData, setGraphData] = useState([])
    const [PieChartData, setPieChartData] = useState([]);
    const [color, setColor] = useState([]);
    // const GraphData = [
    // {
    //     "name": "Page A",
    //     "uv": 4000,
    //     "pv": 2400,
    //     "amt": 2400
    // },
    // {
    //     "name": "Page B",
    //     "uv": 3000,
    //     "pv": 1398,
    //     "amt": 2210
    // },
    // {
    //     "name": "Page C",
    //     "uv": 2000,
    //     "pv": 9800,
    //     "amt": 2290
    // },
    // {
    //     "name": "Page D",
    //     "uv": 2780,
    //     "pv": 3908,
    //     "amt": 2000
    // }
    // ]
    // const PieChartData = [
    //     { name: "Label 1", value: 30, fill: "#255F5B" },
    //     { name: "Label 2", value: 25, fill: "#2C3E35" },
    //     { name: "Label 3", value: 20, fill: "#497F76" },
    //     { name: "Label 4", value: 15, fill: "#A7DDBC" }
    // ]
    const fetchTransaction = () => {
        setLoading(true)
        dispatch(callApiAction(
            async () => await getTrasactionApi({ transactionFetchType: TRANSACTION_FETCH_TYPE.LIST_VIEW, listViewTime: LIST_VIEW_TIME.ALL, pageSize: 10 }),
            (response) => {
                setExpanseData(response)
                setLoading(false)
            },
            (err) => {
                setLoading(false)
            }
        ))
    }
    const fetchTransactionForGraph = () => {
        dispatch(callApiAction(
            async () => await getTrasactionApi({ transactionFetchType: TRANSACTION_FETCH_TYPE.GRAPHICAL_VIEW, listViewTime: LIST_VIEW_TIME.ALL, graphicalViewType: GRAPHICAL_VIEW_TYPE.NO_FILTER, graphicalViewDuration: graphDuraction }),
            (response) => {
                setGraphData(response.result)
            },
            (err) => {
                console.log(err)
            }
        ))
    }
    const fetchTransactionForChart = () => {
        dispatch(callApiAction(
            async () => await getTrasactionApi({ transactionFetchType: TRANSACTION_FETCH_TYPE.GRAPHICAL_VIEW, graphicalViewType: GRAPHICAL_VIEW_TYPE.FILTER_BY_CATEGORY, graphicalViewDuration: pieChartDuraction }),
            (response) => {
                setPieChartData(response.result)
                setColor(generateShades("#64927C", response.total));
            },
            (err) => {
                console.log(err)
            }
        ))
    }
    useEffect(() => {
        fetchTransaction();
    }, [])

    useEffect(() => {
        fetchTransactionForChart();
        setWeekChartData([]);
        setMonthChartData([]);
        setYearChartData([]);
    }, [pieChartDuraction])

    useEffect(() => {
        setWeekGraphDayData([]);
        setMonthGraphDayData([]);
        setYearGraphDayData([]);
        fetchTransactionForGraph();
    }, [graphDuraction])

    useEffect(() => {
        if (graphDuraction == GRAPHICAL_VIEW_DURATION.WEEK_DAYS_DATA) {
            GraphData.map((row, index) => {
                setWeekGraphDayData(weekGraphDayData => [...weekGraphDayData, {
                    amount: row.amount,
                    day: WEEK_DAYS[row._id.dayOfWeek],
                    key: index
                }])
            })
        }
        if (graphDuraction == GRAPHICAL_VIEW_DURATION.MONTH_DAYS_DATA) {
            GraphData.map((row, index) => {
                setMonthGraphDayData(monthGraphDayData => [...monthGraphDayData, {
                    amount: row.amount,
                    day: row._id.dayOfMonth,
                    key: index
                }])
            })
        }
        if (graphDuraction == GRAPHICAL_VIEW_DURATION.MONTHLY_DATA) {
            GraphData.map((row, index) => {
                setYearGraphDayData(yearGraphDayData => [...yearGraphDayData, {
                    amount: row.amount,
                    month: YEAR_MONTHS[row._id.month],
                    key: index
                }])
            })
        }
    }, [GraphData])

    useEffect(() => {
        if (pieChartDuraction == GRAPHICAL_VIEW_DURATION.WEEK_DAYS_DATA) {
            PieChartData.map((row, index) => {
                setWeekChartData(weekChartData => [...weekChartData, {
                    name: row._id.category.name,
                    value: row.amount,
                    fill: color[index]
                }])
            })
        }
        if (pieChartDuraction == GRAPHICAL_VIEW_DURATION.MONTH_DAYS_DATA) {
            PieChartData.map((row, index) => {
                setMonthChartData(monthChartData => [...monthChartData, {
                    name: row._id.category.name,
                    value: row.amount,
                    fill: color[index]
                }])
            })
        }
        if (pieChartDuraction == GRAPHICAL_VIEW_DURATION.MONTHLY_DATA) {
            PieChartData.map((row, index) => {
                setYearChartData(yearChartData => [...yearChartData, {
                    name: row._id.category.name,
                    value: row.amount,
                    fill: color[index]
                }])
            })
        }
    }, [PieChartData])
    return (
        <>
            <DashboardUI GraphData={GraphData} PieChartData={PieChartData} expanseData={expanseData} loading={loading} graphDuraction={graphDuraction} setGraphDuraction={setGraphDuraction} weekGraphDayData={weekGraphDayData} monthGraphDayData={monthGraphDayData} yearGraphDayData={yearGraphDayData} pieChartDuraction={pieChartDuraction} setPieChartDuraction={setPieChartDuraction} yearChartData={yearChartData} monthChartData={monthChartData} weekChartData={weekChartData} />
        </>
    )
}

export default DashboardController;