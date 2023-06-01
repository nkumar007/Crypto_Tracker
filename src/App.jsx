import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box } from "@mui/system";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/coinpage/:id", element: <CoinPage /> },
      ],
    },
  ]);
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
