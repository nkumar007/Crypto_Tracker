import { Typography, Box, Container } from "@mui/material";

import { Carousel } from "./Carousel";

export const Banner = () => {
  return (
    <Box
      component="div"
      sx={{
        backgroundImage: "url(./banner2.jpg)",
      }}
    >
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 25,
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "40%",
            // marginBottom: 15,
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              marginBottom: 15,
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Track the prices of popular Crypto Assets
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
};
