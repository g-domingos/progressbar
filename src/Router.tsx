import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { Backoffice } from "./pages/Backoffice";
import { Clients } from "./pages/Clients";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/client-id/:id" element={<Home />} />
        <Route path="/backoffice/admin" element={<Backoffice />} />
        <Route path="/clients/:id" element={<Clients />} />

      </Route>
    </Routes>
  );
};
