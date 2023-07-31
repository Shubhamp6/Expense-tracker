import React, { useState } from "react";
import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled, Grid, Avatar, InputBase, NativeSelect, MenuItem, TablePagination } from "@mui/material"
import { Calender, MenuIcon, Delete, Update } from "./../../components/layouts/common/Logo"
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import CustomDatePicker from "../../components/layouts/common/CustomDatePicker";
import { openModal, closeModal } from "../../store/actions/modalAction";
import { center } from "../../assets/css/theme/common";

const TransactionUI = ({ date, setDate, expanseData, filters, setFilters, addNewExpanceModal, updateExpance, AddCategory }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [currentExpenseItem, setCurrentExpenseItem] = useState(null);
    const transactionExpanseOuter = (theme) => ({

    })
    const addExpanceOuter = (theme) => ({
        marginTop: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignTtems: "center",
        alignSelf: "stretch",
    })
    const AddNew = styled(ButtonBase)(({ theme, Active }) => ({
        width: "110px",
        display: 'flex',
        borderRadius: "8px",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        alignSelf: "strech",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        backgroundColor: "#fff",
        color: "primary.main",
    }))
    const calendar = (theme) => ({
        display: "flex",
        padding: theme.spacing(1),
        gap: "3px",
        borderRadius: "8px",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "strech",
        background: "#1F1D1F",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        color: "light.main",
        marginLeft: "10px",
    })
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));
    const expanseOuter = (theme) => ({
        height: "62vh",
        overflow: "auto"
    })
    const categoryOuter = (theme) => ({
        height: "70vh",
        overflow: "scroll",
    })

    const expanseInner = (theme) => ({
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        alignSelf: "stretch",
        overflow: "auto",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
            boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.2)",
            // transform: "scale(1.1)",
            position: "relative",
            zIndex: 99,
        }
    })
    return (
        <>
            <Box>
                <Grid container spacing={"80px"}>
                    <Grid item xs={8}>
                        <Box sx={transactionExpanseOuter}>
                            <Box>
                                <Typography variant="h3">
                                    Recent expenses
                                </Typography>
                            </Box>
                            <Box sx={addExpanceOuter}>
                                <Box sx={{ display: "flex", height: "34px" }}>
                                    <AddNew onClick={() => {
                                        addNewExpanceModal();
                                    }}>
                                        <Typography color="green.main" > Add New</Typography>
                                    </AddNew>
                                    <ButtonBase sx={calendar}>
                                        <CustomDatePicker date={date} setDate={setDate} />
                                    </ButtonBase>
                                </Box>
                                <Box>
                                    <Search sx={{ height: "34px" }}>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </Search>
                                </Box>
                            </Box>
                            <Box>
                                <Box mt={"15px"} sx={expanseOuter}>
                                    {expanseData && expanseData.length > 0 &&
                                        expanseData.map((row, index) => (
                                            <Box sx={expanseInner}
                                                onMouseEnter={() => {
                                                    setIsMenuVisible(true);
                                                    setCurrentExpenseItem(index);
                                                }}
                                                onMouseLeave={() => setIsMenuVisible(false)}>
                                                <Box>
                                                    <Avatar sx={{ bgcolor: "primary.main", width: "50px", height: "50px" }}>
                                                        <FolderIcon />
                                                    </Avatar>
                                                </Box>
                                                <Box sx={{
                                                    display: "flex", justifyContent: "space-between", flex: "1 0 0"
                                                }}>
                                                    <Box>
                                                        <Typography variant="h4" color={"white"} sx={{ marginTop: "6px" }}>Food</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="p" color={"Gray"}>Date</Typography>
                                                        <Typography variant="h4" color={"white"}>Oct 1</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="h3">₹200.00</Typography>
                                                    </Box>
                                                    <Box sx={{ marginTop: "8px" }}>
                                                        {/* {!isMenuVisible && <MenuIcon />} */}
                                                        {isMenuVisible && currentExpenseItem == index && (
                                                            <Box sx={{ ...center, gap: "3px" }}>
                                                                <ButtonBase onClick={updateExpance}>
                                                                    <Update />
                                                                </ButtonBase>
                                                                <ButtonBase>
                                                                    <Delete />
                                                                </ButtonBase>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                                <Grid container>
                                    <Grid item xs={5}>

                                    </Grid>
                                    <Grid item xs={7}>
                                        {expanseData && expanseData.length > 0 && (
                                            <TablePagination
                                                rowsPerPageOptions={[10, 25, 100]}
                                                component="div"
                                                count={expanseData.length}
                                                rowsPerPage={parseInt(filters.pageSize)}
                                                page={parseInt(filters.pageNo) - 1}
                                                onPageChange={(e, pageNo) => {
                                                    setFilters({ ...filters, pageNo: pageNo + 1 });
                                                }}
                                                onRowsPerPageChange={(e) => {
                                                    setFilters({ ...filters, pageSize: e.target.value });
                                                }}
                                                sx={{
                                                    width: "100%",
                                                    color: "white",
                                                    backgroundColor: alpha("#fff", 0.15),
                                                    '&:hover': {
                                                        backgroundColor: alpha("#fff", 0.25),
                                                    },
                                                    borderRadius: "8px"
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        style: {
                                                            background: "#1B191B",
                                                            color: "white",
                                                        },
                                                    },
                                                }}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Box>
                                <Typography variant="h3">
                                    Categories
                                </Typography>
                            </Box>
                            <Box sx={addExpanceOuter}>
                                <Box sx={{ display: "flex", height: "34px" }}>
                                    <AddNew onClick={AddCategory}>
                                        <Typography color="green.main"> Add New</Typography>
                                    </AddNew>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box mt={"15px"} sx={categoryOuter}>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, index) => (
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
                                                    <MenuIcon />
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default TransactionUI;
