import React from "react";
import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled, Grid, Avatar, InputBase, NativeSelect, MenuItem, TablePagination, CircularProgress } from "@mui/material"
import { center } from "../../assets/css/theme/common";
import { ExpensierLogo } from "../../components/layouts/common/Logo";
import CustomInput from "../../components/inputs/CustomInput";
import { CreateUserPerson } from "../../components/layouts/common/Logo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SighUpUI = ({ loading, formValues, setFormValues, onSubmit }) => {
    const navigate = useNavigate();
    const SighUp = styled(ButtonBase)(({ theme }) => ({
        width: "285px",
        display: 'flex',
        borderRadius: "20px",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        alignSelf: "strech",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: "#fff",
        color: "primary.main",
    }))
    return (
        <>
            <Box sx={{ ...center, bgcolor: "#1B191B", height: "100vh", color: "light.main" }}>
                <Box sx={{ display: "inline-flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "40px" }}>
                    <Box height={"60px"} sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <Box>
                            <ExpensierLogo />
                        </Box>
                        <Box>
                            <Typography variant="h3">
                                Create Account
                            </Typography>
                            <Box sx={{ display: "flex" }}>
                                <Typography variant="p">
                                    Have an Account!&nbsp;&nbsp;
                                </Typography>
                                <Typography variant="p" sx={{ textDecoration: "underline", cursor: "pointer" }} LinkComponent={Link} onClick={() => {
                                    navigate("/")
                                }}>
                                    Log In
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ marginLeft: "5px", width: "280px", height: "1px", background: "white", ...center }}>

                    </Box>
                    <Box sx={{ border: "white" }}>
                        <Typography variant="p" color="error">{formValues.err}</Typography>
                        <Box sx={{ width: "285px" }}>
                            <CustomInput
                                inputProps={{ sx: { color: "text.white" } }}
                                disabled={loading}
                                type="text"
                                label="Name*"
                                color="light"
                                value={formValues.name}
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        err: "",
                                        name: e.target.value,
                                    })
                                }
                                focused
                            />
                            <CustomInput
                                inputProps={{ sx: { color: "text.white" } }}
                                disabled={loading}
                                type="text"
                                label="Email*"
                                color="light"
                                value={formValues.email}
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        err: "",
                                        email: e.target.value,
                                    })
                                }
                                focused
                            />
                            <CustomInput
                                inputProps={{ sx: { color: "text.white" } }}
                                disabled={loading}
                                type="password"
                                label="Password*"
                                color="light"
                                value={formValues.password}
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        err: "",
                                        password: e.target.value,
                                    })
                                }
                                focused
                            />
                        </Box>
                    </Box>
                    <SighUp loading={loading} onClick={onSubmit}>
                        {
                            loading && <>
                                <CircularProgress />
                            </>
                        }
                        {
                            !loading && <>
                                <CreateUserPerson />
                                <Typography sx={{ ...center }} color="primary.main" >Create Account</Typography>
                            </>
                        }
                    </SighUp>
                </Box>
            </Box>
        </>
    )
}

export default SighUpUI;