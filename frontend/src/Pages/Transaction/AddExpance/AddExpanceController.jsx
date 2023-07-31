import React, { useState } from "react";
import AddExpanceUI from "./AddExpanceUI";

const AddExpanceController = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        err: '',
        decription: '',
        amount: null,
        category_name: '',
        category_id: null,
    })
    return (
        <>
            <AddExpanceUI loading={loading} formValues={formValues} setFormValues={setFormValues} />
        </>
    )
}

export default AddExpanceController;