import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({openDialog,handleOpenDialog,fixedCode}) {
  
  console.log(`openDialog : ${openDialog}`)
 
  return (
    <React.Fragment>
         
      <BootstrapDialog
        onClose={handleOpenDialog}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <b>Fixed Code</b>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleOpenDialog}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom className={'w-64 h-24'}>
            {fixedCode}
          </Typography>
        </DialogContent>
        
      </BootstrapDialog>
    </React.Fragment>
  );
}
