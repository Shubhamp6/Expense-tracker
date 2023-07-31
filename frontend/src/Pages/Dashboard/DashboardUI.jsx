import React from "react";
import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled, Grid, Avatar, InputBase, NativeSelect, MenuItem } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import { MenuIcon } from "./../../components/layouts/common/Logo"
import { center } from "../../assets/css/theme/common";
import Select from '@mui/material/Select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from "recharts";

const DashboardUI = ({ age, handleChange, GraphData, PieChartData }) => {
    const CustomLegend = ({ payload }) => {
        return (
            <ul style={{ listStyleType: 'none', padding: 0, position: "absolute", right: "0px",top:"-79px" ,zIndex:"2"}}>
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
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
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
                                    <MenuIcon />
                                </Box>
                                <Box mt={"15px"} sx={expanseOuter}>
                                    <Box sx={expanseInner}>
                                        <Box>
                                            <Avatar sx={{ bgcolor: "primary.main", width: "50px", height: "50px" }}>
                                                <FolderIcon />
                                            </Avatar>
                                        </Box>
                                        <Box sx={{
                                            display: "flex", justifyContent: "space-between", alignItems: "flex-start", flex: "1 0 0"
                                        }}>
                                            <Box>
                                                <Typography variant="h4" color={"white"}>Food</Typography>
                                                <Typography variant="p" color={"Gray"}>Oct 1 01:10PM</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h3">₹200.00</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={expanseInner}>
                                        <Box>
                                            <Avatar sx={{ bgcolor: "primary.main", width: "50px", height: "50px" }}>
                                                <FolderIcon />
                                            </Avatar>
                                        </Box>
                                        <Box sx={{
                                            display: "flex", justifyContent: "space-between", alignItems: "flex-start", flex: "1 0 0"
                                        }}>
                                            <Box>
                                                <Typography variant="h4" color={"white"}>Food</Typography>
                                                <Typography variant="p" color={"Gray"}>Oct 1 01:10PM</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h3">₹200.00</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={expanseInner}>
                                        <Box>
                                            <Avatar sx={{ bgcolor: "primary.main", width: "50px", height: "50px" }}>
                                                <FolderIcon />
                                            </Avatar>
                                        </Box>
                                        <Box sx={{
                                            display: "flex", justifyContent: "space-between", alignItems: "flex-start", flex: "1 0 0"
                                        }}>
                                            <Box>
                                                <Typography variant="h4" color={"white"}>Food</Typography>
                                                <Typography variant="p" color={"Gray"}>Oct 1 01:10PM</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h3">₹200.00</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={expanseInner}>
                                        <Box>
                                            <Avatar sx={{ bgcolor: "primary.main", width: "50px", height: "50px" }}>
                                                <FolderIcon />
                                            </Avatar>
                                        </Box>
                                        <Box sx={{
                                            display: "flex", justifyContent: "space-between", alignItems: "flex-start", flex: "1 0 0"
                                        }}>
                                            <Box>
                                                <Typography variant="h4" color={"white"}>Food</Typography>
                                                <Typography variant="p" color={"Gray"}>Oct 1 01:10PM</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h3">₹200.00</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
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
                                    value={age}
                                    onChange={handleChange}
                                    input={<BootstrapInput />}
                                    style={{ background: 'transparent', marginTop: "-7px" }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                background: "#1B191B",
                                                color: "white",
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value={10}>this week</MenuItem>
                                    <MenuItem value={20}>this month</MenuItem>
                                    <MenuItem value={30}>this year</MenuItem>
                                </Select>
                            </Box>
                            <Box mt={"15px"}>
                                <Box sx={expanseOuter}>
                                    <PieChart width={400} height={200}>
                                        <Pie
                                            data={PieChartData}
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
                                            {PieChartData.map((entry, index) => (
                                                <Cell key={index} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        {/* <Legend verticalAlign="middle" align="right" layout="vertical" /> */}
                                        <Legend
                                            content={<CustomLegend />}
                                            verticalAlign="middle"
                                            align="right"
                                            layout="horizontal"
                                        />
                                    </PieChart>
                                </Box>
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
                                value={age}
                                onChange={handleChange}
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
                                <MenuItem value={10}>this week</MenuItem>
                                <MenuItem value={20}>this month</MenuItem>
                                <MenuItem value={30}>this year</MenuItem>
                            </Select>
                        </Box>
                        <Box mt={"15px"} sx={{ width: "100%", height: "100%" }}>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={GraphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default DashboardUI;