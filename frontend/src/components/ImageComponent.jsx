import { Close, FileOpen } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, Fade, IconButton, Modal, Skeleton } from "@mui/material";
import { useState } from "react";


const ImageComponent = ({ src, alt, sx = {}, ...props }) => {
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => {

        setLoading(true)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (

        <> <Dialog

            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            fullWidth
        >
            <DialogTitle sx={{ justifyContent: "flex-end", display: "flex" }}>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent   >

                <Box sx={{ width: "100%", background: "lightgray", position: "relative" }}>

                    <img onLoad={() => { setLoading(false) }} src={src} alt={alt} style={sx} {...props} onClick={handleOpen} />

                </Box>
            </DialogContent>
        </Dialog>

            <Box sx={{ width: "100%", position: "relative" }}>
                {loading && <Box sx={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", minHeight: "200px" }}>
                    <Skeleton sx={{ height: "100%", width: "100%" }} animation="wave">

                    </Skeleton>
                </Box>}
                <img src={src} onLoad={() => { setLoading(false) }} alt={alt} style={{ ...sx, cursor: "pointer" }} {...props} onClick={handleOpen} />
            </Box>

        </>)
}



export const PdfComponent = ({ src, alt, sx = {}, ...props }) => {
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => {

        setLoading(true)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (

        <> <Dialog

            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            fullWidth
        >
            <DialogTitle sx={{ justifyContent: "flex-end", display: "flex" }}>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent   >

                <Box sx={{ width: "100%", background: "lightgray", position: "relative" }}>

                    <embed onLoad={() => { setLoading(false) }} src={src} alt={alt} style={sx} {...props} onClick={handleOpen} />

                </Box>
            </DialogContent>
        </Dialog>

            <Box sx={{ width: "100%", position: "relative" }}>
                {loading && <Box sx={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", minHeight: "200px" }}>
                    <Skeleton sx={{ height: "100%", width: "100%" }} animation="wave">

                    </Skeleton>
                </Box>}
                <Box sx={{ border: "2px solid grey", borderRadius: "10px",display:"flex",alignItems:"flex-end",flexDirection:"column",background:"grey" }}>
                    {/* <IconButton onClick={handleOpen}>
                        <FileOpen color="light" />
                    </IconButton> */}
                    <embed src={src} onLoad={() => { setLoading(false) }} alt={alt} style={{ ...sx, height: "500px", cursor: "pointer" }} {...props} />
                </Box>


            </Box>

        </>)
}

export default ImageComponent