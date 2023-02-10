import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export const Router = () => {
  return (
    <Routes>
      <Route path="progressbar/client-id/:id" element={<Home />} />
    </Routes>
  );
};
