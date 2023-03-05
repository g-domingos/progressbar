import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="progressbar/client-id/:id" element={<Home />} />
      </Route>
    </Routes>
  );
};
