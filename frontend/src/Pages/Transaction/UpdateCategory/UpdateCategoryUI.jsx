import React from "react";
import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled, Grid, Avatar, InputBase, NativeSelect, MenuItem, TablePagination, DialogActions } from "@mui/material"
import CustomInput from "./../../../components/inputs/CustomInput"
import SubmitButton from "../../../components/button/SubmitButton";
import Picker from 'emoji-picker-react';

const UpdateCategoryUI = ({ loading, formValues, setFormValues, handleEmojiButtonClick, handleEmojiClick, chosenEmoji, showPicker, defaultEmoji, updateCategory, row}) => {
    return (
        <>
            <Box>
                <Box>
                    <Typography variant="p" color="error">{formValues.err}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box>
                        <button onClick={handleEmojiButtonClick} style={{ fontSize: "34px", marginTop: "10px" }}>
                            {chosenEmoji ? chosenEmoji.emoji : defaultEmoji}
                        </button>
                        {showPicker && (
                            <Picker
                                onEmojiClick={(emoji, e) => {
                                    handleEmojiClick(emoji, e)
                                }}
                            />
                        )}
                    </Box>
                    <CustomInput
                        disabled={loading}
                        type="text"
                        label="Name*"
                        value={formValues.name}
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                err: "",
                                name: e.target.value,
                            })
                        }
                    />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "end", width: "70px", marginLeft: "auto", marginTop: "10px" }}>
                    <SubmitButton loading={loading} title={'Update'} onClick={() => {
                        updateCategory(formValues,row._id);
                    }}></SubmitButton>
                </Box>
            </Box>
        </>
    )
}

export default UpdateCategoryUI;