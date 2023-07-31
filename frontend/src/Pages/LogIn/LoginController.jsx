import React, { useState } from "react";
import LoginUI from "./LoginUI";
import { useNavigate } from "react-router-dom";
import { signInAction } from "../../store/actions/userReducerAction";
import { useDispatch } from "react-redux";

const LoginController = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        err: '',
        password: '',
        email: '',
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(formValues);
        dispatch(signInAction(formValues, (err) => {
            setFormValues({ ...formValues, err }); setLoading(false)
        },
        () => navigate('/dashboard')))
    }
    return (
        <>
            <LoginUI loading={loading} formValues={formValues} setFormValues={setFormValues} onSubmit={onSubmit} />
        </>
    )
}

export default LoginController;