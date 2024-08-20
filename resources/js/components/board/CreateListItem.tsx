import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {createEditor} from 'lexical';
import {Editor} from '../common/editor/RichTextEditor'
import useApi from '../../hooks/useApi';
import AddIcon from '@mui/icons-material/Add';
import { redirect } from 'react-router-dom';

type ListItemProps ={
    board_id: number,
}

export default function CreateListItem({board_id}:ListItemProps) {
  const [open, setOpen] = React.useState(false);

  const [desc, setDesc] = React.useState('');
  const api = useApi().lists;    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon />}>
        Add new list
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const name = formJson.name;   
            console.log(desc);
            api.store(board_id, {name , description: desc});
                     
            handleClose();
            redirect(`/boards/${board_id}`);
          },
        }}
      >
        <DialogTitle>Add new list to board</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
         <Editor storeTo={{desc, setDesc}} ></Editor>
         <div id="report-container"></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
