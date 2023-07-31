import React, { useState } from "react";
import AddCategoryUI from "./AddCategoryUI";

const AddCategoryController = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        err: '',
        emoji: '',
        description: '',
    })
    return (
        <>
            <AddCategoryUI loading={loading} formValues={formValues} setFormValues={setFormValues} />
        </>
    )
}

export default AddCategoryController;