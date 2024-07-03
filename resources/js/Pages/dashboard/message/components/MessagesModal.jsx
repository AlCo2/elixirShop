import { router } from "@inertiajs/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal} from "@mui/material";
import { Fragment, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const style = {  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 450,
  width:'80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:2,
  p: 4,
};

function MessagesModal({message}) {
    const [open, setOpen] = useState(false);

    function AlertDialog() {
      const [open, setOpen] = useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      return (
        <Fragment>
          <Button disabled={message.status_id==3} onClick={handleClickOpen} variant="contained" size="small"><MdEmail/>Reply</Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Reply To"}
            </DialogTitle>
            <DialogContent>
              <div className="bg-liliana-background rounded-md">
                  <p className="p-2 font-Opensans">{message.message}</p>
              </div>
              <div>
                <p className="font-Opensans mb-2">Message</p>
                <textarea className="w-72"/>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error" size="small">Cancle</Button>
              <Button onClick={handleClose} autoFocus variant="contained" size="small">
                Reply
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
    }    

    const handleOpen = () => {
      if (message.status_id==1)
      {
        router.post('/message/read', {id:message.id}); 
      } 
      setOpen(true)
    };
    const handleClose = () => setOpen(false);
    return (
      <div>
        <button onClick={handleOpen} className='bg-black rounded-md border text-white opacity-70 p-2'><FaEye className='text-sm'/></button>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <p className="font-bold opacity-60">#{message.id}</p>
                    <IconButton size='small' onClick={handleClose}><FaXmark/></IconButton>
                </div>
                <div className="flex gap-2">
                    <p className="font-Opensans">{message.email}</p>
                </div>
                <div>
                    <p className="font-bold opacity-60">Message:</p>
                </div>
                <div className="bg-liliana-background rounded-md">
                    <p className="p-2 font-Opensans">{message.message}</p>
                </div>
                <div>
                    <p className="font-bold font-Roboto">{message.date}</p>
                </div>
                <div className="flex justify-end">
                  <AlertDialog/>
                </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
  export default MessagesModal;