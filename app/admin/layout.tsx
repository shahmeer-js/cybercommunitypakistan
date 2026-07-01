import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <main className="pb-24">{children}</main>;
};

export default AdminLayout;
