import React from "react";
import AdminTabs from "./components/admin-tabs";
import ViewRegistrations from "./components/view-registrations";
import { saveEvent } from "./actions";

export default async function AdminHome() {
  return (
    <AdminTabs onSaveAction={saveEvent}>
      <ViewRegistrations />
    </AdminTabs>
  );
}