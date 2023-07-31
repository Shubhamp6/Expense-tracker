import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { callApiAction } from "../../store/actions/commonAction";
import { grayInputStyle } from "./SearchBar";

// {
//     *lazyFun:async()=>
//     *label:
//     *onChange:async(changedVal)=>
//     titleKey: default:"title",
//     valueKey: default:"_id"
// }
const AsyncDropDown = (props) => {

    const param = useParams()

    const [buffer, setBuffer] = useState(null)
    const [filters, setFilters] = useState({
        pageNo: 1,
        pageSize: 25,
        search: '',
        
    })
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch()


    const fetchOptions = (data, onSucces = () => { }) => {
        setLoading(true)
        const bodyData = data ? data : { ...filters }
        dispatch(
            callApiAction(
                async () => await props.lazyFun(bodyData),
                (response) => {

                    setOptions(response.result)
                    
                    setLoading(false)
                    onSucces()
                },
                (err) => {
                    setLoading(false)
                }
            )
        )
    }
    useEffect(() => {

        if (!loading && buffer && Object.keys(buffer).length > 0) {
            fetchOptions({ ...buffer }, () => {
                if (buffer.search === filters.search) {
                    setBuffer(undefined)
                }
            })
        }
    }, [loading, buffer])

    useEffect(() => {
        if (!loading) {
            fetchOptions()
        }
        else
            setBuffer(filters)
    }, [filters, setBuffer])


    const Component = props.InputComponent ? props.InputComponent : TextField
    const OptionComponent = props.OptionComponent ? props.OptionComponent : null
    
    return <Autocomplete

        fullWidth={true}

        defaultValue={props.defaultVal}
        
        onChange={(e, newVal) => { props.onChange(newVal ) }}
        filterOptions={(x) => x}
        disablePortal
        renderOption={(props,option) => OptionComponent? <OptionComponent option={option} {...props}/>: option[!props.titleKey ? 'title' : props.titleKey]}
        getOptionLabel={(option) =>  option[!props.titleKey ? 'title' : props.titleKey]}
        options={options}
        loading={loading}
        renderInput={(params) => (
            <Component
                onChange={(e) => { setFilters({ ...filters, search: e.target.value }) }}
                margin="dense"
                {...params}

                label={props.label}
                InputProps={{
                    ...params.InputProps,
                    startAdornment: props.startAdornment ? props.startAdornment : <></>,
                    sx: (theme) => props.inputStyle ? props.inputStyle({ theme }) : {},
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {!props.hideEndAdornment && params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                }}
                
            />
        )}
    />
}
export default memo(AsyncDropDown)