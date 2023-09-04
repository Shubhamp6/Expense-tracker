import React, { useState } from "react";
import AddExpanceUI from "./AddExpanceUI";
import { useDispatch } from "react-redux";
import { callApiAction } from "../../../store/actions/commonAction";
import { addTransactionApi } from "../../../apis/trasaction.api";
import { closeModal } from "../../../store/actions/modalAction";

const AddExpanceController = ({ fetchTransaction }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        err: '',
        description: '',
        amount: null,
        category_name: '',
        category_id: "",
        category_icon: ""
    })
    const addExpance = (formValues) => {
        console.log(formValues);
        setLoading(true);
        dispatch(callApiAction(
            async () => await addTransactionApi({ ...formValues }),
            (response) => {
                dispatch(closeModal());
                setLoading(false)
                fetchTransaction();
            },
            (err) => {
                setFormValues({ ...formValues, err: err })
                console.log(err)
                setLoading(false)
            }
        ))
    }
    return (
        <>
            <AddExpanceUI loading={loading} formValues={formValues} setFormValues={setFormValues} addExpance={addExpance} />
        </>
    )
}

export default AddExpanceController;