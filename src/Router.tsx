import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { Backoffice } from "./pages/Backoffice";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/client-id/:id" element={<Home />} />
        <Route path="/backoffice/admin" element={<Backoffice />} />
      </Route>
    </Routes>
  );
};
