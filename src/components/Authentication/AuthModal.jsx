import { useState } from "react";
import { AppBar, Box, Button, Tab, Tabs, createTheme } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

import Modal from "@mui/material/Modal";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { CryptoState } from "../../CryptoContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

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
    padding: 14,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    fontSize: 20,
  },
};

export default function AuthModal() {
  const [open, setOpen] = useState(false);

  const { setAlert } = CryptoState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

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
          <Box sx={style.google}>
            <span>OR</span>
            <Button
              onClick={signInWithGoogle}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<FcGoogle />}
              sx={{
                backgroundColor: "#db4a39",
                color: "white",
                "&:hover": {
                  backgroundColor: "#c53727",
                },
              }}
            >
              {value === 0 && (
                <span style={{ minWidth: "250px" }}>Login in with Google</span>
              )}
              {value === 1 && (
                <span style={{ minWidth: "250px" }}>
                  Sign Up in with Google
                </span>
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
