import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { Backoffice } from "./pages/Backoffice";
import { Clients } from "./pages/Clients";
import { useState } from "react";
import React from "react";
import { Settings } from "./pages/Settings";
import { BackofficeClients } from "./pages/Backoffice/BackofficeClients";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/client-id/:id" element={<Home />} />
        <Route path="/backoffice/admin" element={<Backoffice />} />
        <Route path="/clients/:id" element={<Clients />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/clients" element={<BackofficeClients />} />
      </Route>
    </Routes>
  );
};
