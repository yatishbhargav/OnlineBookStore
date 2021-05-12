import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const useStyles=makeStyles(theme=>({
    dialogWrapper:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    },
    dialogTitle:{
        paddingRight:'0px'
    }
}));

export default function Popup(props) {
    
    const {children,title,openPopup,setOpenPopup}=props;
    const classes=useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" className={classes.dialogWrapper}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <IconButton onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}