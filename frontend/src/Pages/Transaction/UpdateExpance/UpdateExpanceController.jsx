import React, { useState } from "react";
import UpdateExpanceUI from "./UpdateExpanceUI"

const UpdateExpanceController = () => {
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
            <UpdateExpanceUI loading={loading} formValues={formValues} setFormValues={setFormValues} />
        </>
    )
}

export default UpdateExpanceController;