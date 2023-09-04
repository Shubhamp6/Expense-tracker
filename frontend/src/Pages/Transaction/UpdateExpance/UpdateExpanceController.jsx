import React, { useState } from "react";
import UpdateExpanceUI from "./UpdateExpanceUI"
import { updateTrasactionFieldApi } from "../../../apis/trasaction.api";
import { useDispatch } from "react-redux";
import { callApiAction } from "../../../store/actions/commonAction";
import { closeModal } from "../../../store/actions/modalAction";

const UpdateExpanceController = ({ row }) => {
    const [loading, setLoading] = useState(false);
    console.log(row)
    const [formValues, setFormValues] = useState({
        err: '',
        description: row.description,
        amount: row.amount,
        category_name: row.category.name,
        category_icon: row.category.icon,
        category_id: row.category.id
    })
    const dispatch = useDispatch()
    const updateExpnace = async (formValues, _id) => {
        setLoading(true);
        dispatch(callApiAction(
            async () => await updateTrasactionFieldApi({ ...formValues }, { id: _id }),
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
            <UpdateExpanceUI loading={loading} formValues={formValues} setFormValues={setFormValues} updateExpnace={updateExpnace} row={row} />
        </>
    )
}

export default UpdateExpanceController;