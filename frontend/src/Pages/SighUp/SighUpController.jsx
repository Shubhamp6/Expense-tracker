import React, { useState } from "react";
import SighUpUI from "./SighUpUI";
import { addUserApi } from "../../apis/user.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callApiAction } from "../../store/actions/commonAction";

const SighUpController = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        err: '',
        name: '',
        email: '',
        password: ''
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        console.log("1");
        e.preventDefault()
        setLoading(true)

        dispatch(
            callApiAction(
                async () => await addUserApi(formValues),
                async (response) => {
                    setLoading(false)
                    navigate("/")
                },
                (err) => {
                    setLoading(false)
                    setFormValues({ ...formValues, err })
                }
            )
        )
    }
    return (
        <>
            <SighUpUI loading={loading} formValues={formValues} setFormValues={setFormValues} onSubmit={onSubmit}/>
        </>
    )
}

export default SighUpController;