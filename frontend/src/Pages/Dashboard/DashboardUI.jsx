import React from "react";
import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled, Grid, Avatar, InputBase, NativeSelect, MenuItem, Skeleton, Select } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import { MenuIcon } from "./../../components/layouts/common/Logo"
import { center } from "../../assets/css/theme/common";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { DashboardPlaceholder, CryptoPlaceholder, GraphPlaceholder } from "./../../components/layouts/common/Logo";
import { GRAPHICAL_VIEW_DURATION } from "../../utils/constants";

const DashboardUI = ({ GraphData, PieChartData, expanseData, loading, graphDuraction, setGraphDuraction, weekGraphDayData, monthGraphDayData, yearGraphDayData, pieChartDuraction, setPieChartDuraction, yearChartData, monthChartData, weekChartData }) => {
    const navigate = useNavigate();
    const CustomLegend = ({ payload }) => {
        return (
            <ul style={{ listStyleType: 'none', padding: 0, position: "absolute", right: "0px", top: "-79px", zIndex: "2" }}>
                {payload.map((entry, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                marginRight: '5px',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: entry.color,
                            }}
                        ></span>
                        <span style={{ verticalAlign: 'middle' }}>{entry.value}</span>
                    </li>
                ))}
            </ul>
        );
    };

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: "transperent",
            color: "white",
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:focus': {
                borderRadius: 4,
                borderColor: "0.5px solid #64927C",
                boxShadow: "0px 0px 0px 3px rgba(100, 146, 124, 0.30)",
            },
        },
    }));

    const recentExpanse = (theme) => ({
        display: "flex",
        justifyContent: "space-between",
        alignTtems: "center",
        alignSelf: "stretch",
    })

    const dashboardUpper = (theme) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "80px",
        flex: "1 0 0",
        alignSelf: "stretch",
        flexDirection: "column",
    })
    const dashboardDown = (theme) => ({
        width: "100%"
    })
    const outerDashboard = (theme) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "30px",
        flex: "1 0 0",
        alignSelf: "stretch",
    })

    const expanseOuter = (theme) => ({
        height: "30vh",
        overflow: "scroll"
    })

    const expanseInner = (theme) => ({
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        alignSelf: "stretch"
    })

    return (
        <>
            <Box sx={outerDashboard}>
                <Box sx={dashboardUpper}>
                    <Grid container spacing={"80px"}>
                        <Grid item xs={6}>
                            <Box>
                                <Box sx={recentExpanse}>
                                    <Typography variant="h3">
                                        Recent expenses
                                    </Typography>
                                    <MenuIcon onClick={() => {
                                        navigate("/transactions")
                                    }} />
                                </Box>
                                <Box mt={"15px"} sx={expanseOuter}>
                                    {
                                        loading && <>
                                            <Box>
                                                <Skeleton variant="rectangular" height={"60px"} width={"100%"} />
                                                <Skeleton sx={{ marginTop: "8px" }} variant="rectangular" height={"60px"} width={"100%"} />
                                                <Skeleton sx={{ marginTop: "8px" }} variant="rectangular" height={"60px"} width={"100%"} />
                                            </Box>
                                        </>
                                    }
                                    {
                                        !loading && expanseData && expanseData.total == 0 && <>
                                            <Box sx={{ ...center, height: "30vh", marginTop: "15px" }}>
                                                <DashboardPlaceholder />
                                            </Box>
                                        </>
                                    }
                                    {
                                        !loading && expanseData && expanseData.total > 0 && expanseData.result && expanseData.result.map((row, index) => (
                                            <>
                                                <Box sx={expanseInner}>
                                                    <Box>
                                                        <Avatar sx={{ bgcolor: "light.main", width: "50px", height: "50px" }}>
                                                            {row && row.category && row.category.icon}
                                                        </Avatar>
                                                    </Box>
                                                    <Box sx={{
                                                        display: "flex", justifyContent: "space-between", alignItems: "flex-start", flex: "1 0 0"
                                                    }}>
                                                        <Box>
                                                            <Typography variant="h4" color={"white"}>{row && row.description}</Typography>
                                                            <Typography variant="p" color={"Gray"}>{new Date(row.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h3">₹{row && row.amount}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={recentExpanse}>
                                <Typography variant="h3">
                                    Expenditure
                                </Typography>
                                <Select
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={pieChartDuraction}
                                    onChange={(e) => {
                                        setPieChartDuraction(e.target.value)
                                    }}
                                    input={<BootstrapInput />}
                                    style={{ background: 'transparent', marginTop: "-7px" }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                background: '#1B191B',
                                                color: "white"
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="WEEK_DAYS_DATA" defaultChecked>this week</MenuItem>
                                    <MenuItem value="MONTH_DAYS_DATA">this month</MenuItem>
                                    <MenuItem value="MONTHLY_DATA">this year</MenuItem>
                                </Select>
                            </Box>
                            <Box mt={"15px"}>
                                {
                                    PieChartData.length == 0 && <>
                                        <Box sx={{ ...center, height: "30vh" }}>
                                            <CryptoPlaceholder />
                                        </Box>
                                    </>
                                }
                                {
                                    PieChartData.length > 0 && <>
                                        <Box sx={expanseOuter}>
                                            {pieChartDuraction == GRAPHICAL_VIEW_DURATION.WEEK_DAYS_DATA &&
                                                <PieChart width={400} height={200}>
                                                    <Pie
                                                        data={weekChartData}
                                                        cx={125}
                                                        cy={100}
                                                        innerRadius={50}
                                                        outerRadius={90}
                                                        fill="#8884d8"
                                                        paddingAngle={1}
                                                        dataKey="value"
                                                        cornerRadius={5}
                                                        style={{ strokeWidth: "0" }}
                                                    >
                                                        {weekChartData.map((entry, index) => (
                                                            <Cell key={index} fill={entry.fill} />
                                                        ))}
                                                    </Pie>
                                                    <Legend
                                                        content={<CustomLegend />}
                                                        verticalAlign="middle"
                                                        align="right"
                                                        layout="horizontal"
                                                    />
                                                </PieChart>
                                            }
                                            {pieChartDuraction == GRAPHICAL_VIEW_DURATION.MONTH_DAYS_DATA &&
                                                <PieChart width={400} height={200}>
                                                    <Pie
                                                        data={monthChartData}
                                                        cx={125}
                                                        cy={100}
                                                        innerRadius={50}
                                                        outerRadius={90}
                                                        fill="#8884d8"
                                                        paddingAngle={1}
                                                        dataKey="value"
                                                        cornerRadius={5}
                                                        style={{ strokeWidth: "0" }}
                                                    >
                                                        {monthChartData.map((entry, index) => (
                                                            <Cell key={index} fill={entry.fill} />
                                                        ))}
                                                    </Pie>
                                                    <Legend
                                                        content={<CustomLegend />}
                                                        verticalAlign="middle"
                                                        align="right"
                                                        layout="horizontal"
                                                    />
                                                </PieChart>
                                            }
                                            {pieChartDuraction == GRAPHICAL_VIEW_DURATION.MONTHLY_DATA &&
                                                <PieChart width={400} height={200}>
                                                    <Pie
                                                        data={yearChartData}
                                                        cx={125}
                                                        cy={100}
                                                        innerRadius={50}
                                                        outerRadius={90}
                                                        fill="#8884d8"
                                                        paddingAngle={1}
                                                        dataKey="value"
                                                        cornerRadius={5}
                                                        style={{ strokeWidth: "0" }}
                                                    >
                                                        {yearChartData.map((entry, index) => (
                                                            <Cell key={index} fill={entry.fill} />
                                                        ))}
                                                    </Pie>
                                                    <Legend
                                                        content={<CustomLegend />}
                                                        verticalAlign="middle"
                                                        align="right"
                                                        layout="horizontal"
                                                    />
                                                </PieChart>
                                            }
                                        </Box>
                                    </>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={dashboardDown}>
                    <Box>
                        <Box sx={recentExpanse}>
                            <Typography variant="h3">
                                Spending summary
                            </Typography>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={graphDuraction}
                                onChange={(e) => {
                                    setGraphDuraction(e.target.value)
                                    console.log(graphDuraction)
                                }}
                                input={<BootstrapInput />}
                                style={{ background: 'transparent', marginTop: "-7px" }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            background: '#1B191B',
                                            color: "white"
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="WEEK_DAYS_DATA" defaultChecked>this week</MenuItem>
                                <MenuItem value="MONTH_DAYS_DATA">this month</MenuItem>
                                <MenuItem value="MONTHLY_DATA">this year</MenuItem>
                            </Select>
                        </Box>
                        {
                            GraphData.length == 0 && <>
                                <Box sx={{ ...center, height: "30vh", marginTop: "15px", gap: "50px" }}>
                                    <GraphPlaceholder />
                                    <Box sx={{ width: "320px" }}>
                                        <Typography variant="h4">
                                            It looks a bit empty here!
                                        </Typography>
                                        <Typography variant="p">
                                            Your spending summary will appear on this section. Head over to the Transactions tab and click the “Add new” button to create a new transaction.
                                        </Typography>
                                    </Box>
                                </Box>
                            </>
                        }
                        {
                            GraphData.length > 0 && <>
                                <Box mt={"15px"} sx={{ width: "100%", height: "100%" }}>
                                    {
                                        graphDuraction == GRAPHICAL_VIEW_DURATION.WEEK_DAYS_DATA &&
                                        <ResponsiveContainer width="100%" height={250}>
                                            <AreaChart data={weekGraphDayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="day" />
                                                <YAxis />
                                                <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    }
                                    {
                                        graphDuraction == GRAPHICAL_VIEW_DURATION.MONTH_DAYS_DATA &&
                                        <ResponsiveContainer width="100%" height={250}>
                                            <AreaChart data={monthGraphDayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="day" />
                                                <YAxis />
                                                <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    }
                                    {
                                        graphDuraction == GRAPHICAL_VIEW_DURATION.MONTHLY_DATA &&
                                        <ResponsiveContainer width="100%" height={250}>
                                            <AreaChart data={yearGraphDayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Area type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    }
                                </Box>
                            </>
                        }
                    </Box>
                </Box>
            </Box >
        </>
    )
}
export default DashboardUI;