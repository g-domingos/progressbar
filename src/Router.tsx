import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { Backoffice } from "./pages/Backoffice";
import { Clients } from "./pages/Clients";

import { Settings } from "./pages/Settings";
import { BackofficeClients } from "./pages/Backoffice/BackofficeClients";
import { Dashboard } from "./pages/Clients/Dashboard";
import { Sessions } from "./pages/Clients/Sessions";
import { LoginV2 } from "./pages/LoginV2";
import { TaskSettings } from "./pages/TaskSettings";
import { TalkToUs } from "./pages/TalkToUs";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/client-id/:id" element={<Home />} />
        <Route path="/clients/:id" element={<Clients />} />

        <Route path="/admin" element={<Backoffice />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/clients" element={<BackofficeClients />} />
        <Route path="/admin/task-settings/:id" element={<TaskSettings />} />

        <Route path="/clients/dashboard/:id" element={<Dashboard />} />
        <Route path="/clients/progress/:id" element={<Clients />} />
        <Route path="/clients/messages/:id" element={<Sessions />} />
        <Route path="/clients/contact/:id" element={<TalkToUs />} />
      </Route>
      <Route path="/login" element={<LoginV2 />} />
    </Routes>
  );
};
