import { CloudUploadOutlined, FileCopy, FileOpenOutlined, FileUploadOutlined } from "@mui/icons-material"
import { Box, Button, ButtonBase, LinearProgress, Typography, styled } from "@mui/material"
import { memo, useEffect, useState } from "react"
import { CenteredBox } from "../layouts/common/boxes"
import { useDispatch } from "react-redux"
import { callApiAction } from "../../store/actions/commonAction"
import { uploadFile, uploadImage } from "../../apis/file.api"

const FileUploadButtonContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    border: "2px dashed " + theme.palette.grey.main,
    minHeight: "70px",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    alignItems: "center",
    position: "relative",
    background: theme.palette.grey[300],
    padding: theme.spacing(2)
}))

const FileViewContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    border: "2px solid " + theme.palette.grey.main,
    marginTop:theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
   
    alignItems: "center",
    justifyContent:"flex-start",
    background: theme.palette.grey[200],
    wordBreak:"break-word",
    padding: theme.spacing(2)
}))

const File = styled('input')(({ theme }) => ({
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    width: "100%",
    opacity: 0,
    zIndex: 11
}))
const FileInput = ({ onlyImage, onChange=()=>{},
    defaultFiles = [],
    inputProps,
    title = "Upload File",
    description = "Only JPG ,PNG, JPEG are allowed." }) => {


    const [loading, setLoading] = useState(false)
    const [percentage, setPercentage] = useState(0)

    const [uploadedFiles, setUploadeFiles] = useState(defaultFiles)
    const [files, setFiles] = useState([])

    const dispatch = useDispatch()


    useEffect(() => {
        if (uploadedFiles.length > 0) {
            onChange(uploadedFiles)
        }
    }, [uploadedFiles])

    const onFileUpload = (e) => {
        setLoading(true)
        const formData = new FormData()
        setFiles(e.target.files)
        formData.append(onlyImage ? 'image' : 'file', e.target.files[0])

        dispatch(callApiAction(
            async () => await onlyImage ?
                uploadImage(formData, (progressEvent) => {
                    setPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                }) : uploadFile(formData, (progressEvent) => {
                    setPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                }),
            (response) => {
                setLoading(false)
                if (onlyImage)
                    setUploadeFiles([response.imageUrl])
                else
                    setUploadeFiles([response.fileUrl])
            },
            (err) => {
                setLoading(false)
            }
        ))

    }
    return <Box>

        <FileUploadButtonContainer type="button" p={3}>

            <Box>
                <Typography variant="display1" lineHeight="100%"><CloudUploadOutlined fontSize="inherit" /> </Typography>
            </Box>
            <Box sx={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "flex-start" }} ml={3}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="h6">{description}</Typography>
            </Box>
            {loading && <Box sx={{ display: "flex", position: "absolute", top: "0px", left: "0px", height: "100%", width: "100%", backdropFilter: "blur(60px)" }}>
                <LinearProgress variant="determinate" value={percentage} sx={{ width: "100%" }} />
            </Box>}
            <Box ml={3}>
                <Button type="button" p={3} variant="outlined">
                    Select File
                </Button>
            </Box>
            <File type="file" onChange={onFileUpload} {...inputProps} />
        </FileUploadButtonContainer>

        <Box>
       {
        files.length >0 && Array.from(files).map((file,index)=> <FileViewContainer key={index} >
        <Typography variant="h4" lineHeight="100%"><FileCopy fontSize="inherit" /> </Typography>
        <Typography variant="h4" ml={3}>{file.name}</Typography>
    </FileViewContainer>)
       }
        </Box>
    </Box>
}
export default memo
    (FileInput)