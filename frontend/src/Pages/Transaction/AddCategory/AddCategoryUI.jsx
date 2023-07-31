import React from "react";
import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled, Grid, Avatar, InputBase, NativeSelect, MenuItem, TablePagination, DialogActions } from "@mui/material"
import CustomInput from "./../../../components/inputs/CustomInput"
import SubmitButton from "../../../components/button/SubmitButton";

const AddCategoryUI = ({ loading, formValues, setFormValues }) => {
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

                <Box sx={{ display: "flex", justifyContent: "end", width: "70px", marginLeft: "auto", marginTop: "10px" }}>
                    <SubmitButton title={'Add'}></SubmitButton>
                </Box>
            </Box>
        </>
    )
}

export default AddCategoryUI;