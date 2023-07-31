import React, { useState } from "react";
import SighUpUI from "./SighUpUI";

const SighUpController = () => {
    const [loading, setLoading] = useState(false);
    const[formValues, setFormValues] = useState({
        err: '',
        name: '',
        email: '',
        password:''
    })
    return (
        <>
            <SighUpUI loading={loading} formValues={formValues} setFormValues={setFormValues} />
        </>
    )
}

export default SighUpController;