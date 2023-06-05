import { useState } from "react";
import { AppBar, Box, Button, Tab, Tabs, createTheme } from "@mui/material";

import Modal from "@mui/material/Modal";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

const theme = createTheme({
  palette: {
    background: {
      paper: "#282828",
    },
  },
});

const style = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
};

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(value);

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#f0e400",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={style.modal}
      >
        <Box sx={style.paper}>
          <AppBar
            position="static"
            style={{
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              style={{ borderRadius: 10 }}
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose} />}
          {value === 1 && <SignUp handleClose={handleClose} />}
        </Box>
      </Modal>
    </div>
  );
}
