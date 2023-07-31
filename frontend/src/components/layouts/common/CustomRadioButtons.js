import { FormControlLabel, Radio, RadioGroup, styled } from "@mui/material"


const CustomRadioGroup = styled(RadioGroup)(({ theme }) => ({
    width: "100%",
    border: "1px solid " + theme.palette.text.primary,
    padding:theme.spacing(2),
    
    borderRadius:theme.shape.borderRadius
}))

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
   display:"flex",
   flex:1
}))

const CustomRadioButtons = ({ options, ...props }) => {
    return <CustomRadioGroup
        row        
        mt={2}
        {...props}
    >
        {
            options.map((item) => <CustomFormControlLabel value={item.value} key={item.value} control={<Radio />} label={item.label} />)
        }

    </CustomRadioGroup>
}
export default CustomRadioButtons