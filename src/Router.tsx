import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { Backoffice } from "./pages/Backoffice";
import { Clients } from "./pages/Clients";

import { Settings } from "./pages/Settings";
import { BackofficeClients } from "./pages/Backoffice/BackofficeClients";
import { Dashboard } from "./pages/Clients/Dashboard";
import { Sessions } from "./pages/Clients/Sessions";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/client-id/:id" element={<Home />} />
        <Route path="/clients/:id" element={<Clients />} />

        <Route path="/backoffice/admin" element={<Backoffice />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/clients" element={<BackofficeClients />} />

        <Route path="/clients/dashboard/:id" element={<Dashboard />} />
        <Route path="/clients/progress/:id" element={<Clients />} />
        <Route path="/clients/messages/:id" element={<Sessions />} />
      </Route>
    </Routes>
  );
};
