import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Material UI App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome!
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          This is a simple React app using Material UI components.
        </Typography>

        <Button variant="contained" onClick={handleOpen}>
          Open Dialog
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Dialog Title</DialogTitle>

          <DialogContent>
            <DialogContentText>
              This dialog opens when you click the button and closes when you
              press one of the actions below.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
