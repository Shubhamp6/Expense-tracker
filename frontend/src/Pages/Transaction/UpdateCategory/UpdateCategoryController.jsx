import React, { useState } from "react";
import UpdateCategoryUI from "./UpdateCategoryUI";
import { updateCategoryFieldApi } from "../../../apis/category.api";
import { callApiAction } from "../../../store/actions/commonAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/actions/modalAction";

const UpdateCategoryController = ({ row }) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        err: '',
        name: row.name,
        icon: row.icon,
    }) // Set your default emoji here
    console.log(row);
    const defaultEmoji = row.icon;
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEmojiClick = (emojiObject, event) => {
        setChosenEmoji(emojiObject);
        setFormValues({ ...formValues, icon: emojiObject.emoji })
        setShowPicker(false); // Hide the emoji picker after selecting an emoji
    };

    const handleEmojiButtonClick = () => {
        setShowPicker(true); // Show the emoji picker on button click
    };

    const updateCategory = async (formValues, _id) => {
        setLoading(true);
        console.log({ ...formValues, id: _id })
        dispatch(callApiAction(
            async () => await updateCategoryFieldApi({ ...formValues }, { id: _id }),
            (response) => {
                dispatch(closeModal());
                setLoading(false)
            },
            (err) => {
                setFormValues({ ...formValues, err: err })
                setLoading(false)
            }
        ))
    }
    return (
        <>
            <UpdateCategoryUI loading={loading} formValues={formValues} setFormValues={setFormValues} handleEmojiButtonClick={handleEmojiButtonClick} handleEmojiClick={handleEmojiClick} chosenEmoji={chosenEmoji} showPicker={showPicker} defaultEmoji={defaultEmoji} updateCategory={updateCategory} row={row} />
        </>
    )
}

export default UpdateCategoryController;