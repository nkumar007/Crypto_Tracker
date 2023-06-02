import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { styled } from "@mui/system";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-date-fns";

// eslint-disable-next-line react/prop-types
export const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);
  const [chartKey, setChartKey] = useState(0);

  const Container = styled("div")({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    "@media (max-width: 900px)": {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  });

  const fetchHistoricData = async () => {
    // eslint-disable-next-line react/prop-types
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const destroyChart = () => {
    setChartKey((prevKey) => prevKey + 1);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {!historicData || !flag ? (
          <CircularProgress
            style={{ color: "#f0e400" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              key={chartKey}
              data={{
                labels: historicData.map((coin) => new Date(coin[0])),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#f0e400",
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "day",
                      displayFormats: {
                        day: "MMM d",
                      },
                    },
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Price",
                    },
                  },
                },
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                    destroyChart();
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};
