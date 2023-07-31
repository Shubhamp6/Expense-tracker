import { areArraysEqual } from "@mui/base"
import { validateEmail } from "../../utils/helper"


const useValidate = () => {
    return (schema) => {
        if (schema && Array.isArray(schema)) {
            for (let field of schema) {

                if (field.required && (!field.value || field.value === '')) {
                    return field.field + " is required."
                }
                if (field.isEmail && !validateEmail(field.value)) {
                    return field.field + " is not valid."
                }
                if (field.isArray && (!Array.isArray(field.value) || field.value.length<0)){
                    return field.field + " is empty."
                }

                 if (field.custom && typeof field.custom =="function" && !field.custom() ) {
                    return field.field + " is invalid."
                }

            }
        }


        return true
    }

}
export default useValidate

// const xyz = {
//     required: true,
//     value: 'attual value',
//     field: 'name of field',
//     isEmail: true,

// }