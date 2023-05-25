import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box } from "@mui/system";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { CoinsPage } from "./pages/CoinsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/homepage", element: <HomePage /> },
        { path: "/coinpage/:id", element: <CoinsPage /> },
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
