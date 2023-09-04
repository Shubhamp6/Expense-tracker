import React from "react";
import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled, Grid, Avatar, InputBase, NativeSelect, MenuItem, TablePagination, DialogActions } from "@mui/material"
import CustomInput from "./../../../components/inputs/CustomInput"
import AsyncDropDown from "./../../../components/inputs/AsyncDropDown"
import SubmitButton from "../../../components/button/SubmitButton";
import { getCategoryApi } from "../../../apis/category.api";

const AddExpanceUI = ({ loading, formValues, setFormValues, addExpance }) => {
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
                        label="description*"
                        value={formValues.description}
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                err: "",
                                description: e.target.value,
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
                            InputComponent={(props) => <CustomInput label="Category*" placeholder="Select Category"  {...props} defaultValue={formValues.category_id} />}
                            lazyFun={async (props) => {
                                return await getCategoryApi({ ...props })
                            }}
                            label="Category"
                            onChange={async (changedVal) => {
                                setFormValues({
                                    ...formValues,
                                    err: "",
                                    category_name: changedVal.name,
                                    category_id: changedVal._id,
                                    category_icon: changedVal.icon
                                })
                            }}
                            titleKey={'name'}
                            valueKey={"_id"}
                            OptionComponent={({ option, ...rest }) => {
                                return <Box sx={{ width: "100%", display: "flex", alignItems: "center", position: "relative", zIndex: 4 }} {...rest}>
                                    <Typography ml={3} variant="h5">{option.icon}&nbsp;&nbsp;{option.name}</Typography>
                                </Box>
                            }}

                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "end", width: "70px", marginLeft: "auto", marginTop: "10px" }}>
                    <SubmitButton loading={loading} title={'Add'} onClick={() => {
                        addExpance(formValues)
                    }}></SubmitButton>
                </Box>
            </Box>
        </>
    )
}

export default AddExpanceUI;