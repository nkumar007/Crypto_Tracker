import { Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

//api
import { TrendingCoins } from "../../config/api";

// context
import { CryptoState } from "../../CryptoContext";

export const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState();
  const fetchTrendingCoins = async () => {
    const data = await axios.get(TrendingCoins(currency));
    setTrending(data.data);
  };

  console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    return (
      <Link to={`/coins/${coin.id}`} key={coin.id}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Box
      component="div"
      sx={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Box>
  );
};
