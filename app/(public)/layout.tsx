import React, { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return <main className="pb-24">{children}</main>;
};

export default PublicLayout;
