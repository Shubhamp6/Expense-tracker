import React from "react";
import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled, Grid, Avatar, InputBase, NativeSelect, MenuItem, TablePagination, DialogActions } from "@mui/material"
import CustomInput from "./../../../components/inputs/CustomInput"
import AsyncDropDown from "./../../../components/inputs/AsyncDropDown"
import SubmitButton from "../../../components/button/SubmitButton";

const UpdateExpanceUI = ({ loading, formValues, setFormValues }) => {
    return (
        <>
            <Box>
                <Box>
                    <Typography variant="p" color="error">{formValues.err}</Typography>
                </Box>
                <Box>
                    <CustomInput
                        disabled={loading}
                        type="text"
                        label="Decription*"
                        value={formValues.decription}
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                err: "",
                                decription: e.target.value,
                            })
                        }
                    />
                </Box>
                <Grid container spacing={"10px"}>
                    <Grid item xs={6}>
                        <CustomInput
                            disabled={loading}
                            type="number"
                            label="Amount*"
                            value={formValues.amount}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    err: "",
                                    amount: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <AsyncDropDown
                            InputComponent={(props) => <CustomInput label="Category*" placeholder="Select Category"  {...props} />}
                            // lazyFun={async (props) => {
                            //     return await fetchBranches({ ...props })
                            // }}
                            label="Category"
                            onChange={async (changedVal) => {
                                setFormValues({
                                    ...formValues,
                                    err: "",
                                    category_id: changedVal._id,
                                })
                            }}
                            titleKey={'name'}
                            valueKey={"_id"}
                        // OptionComponent={({ option, ...rest }) => {
                        //     return <Box sx={{ width: "100%", display: "flex", alignItems: "center" }} {...rest}>
                        //         <Typography ml={3} variant="h5">{option.name}</Typography>
                        //     </Box>
                        // }}

                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "end", width: "70px", marginLeft: "auto", marginTop: "10px" }}>
                    <SubmitButton title={'Update'}></SubmitButton>
                </Box>
            </Box>
        </>
    )
}

export default UpdateExpanceUI;