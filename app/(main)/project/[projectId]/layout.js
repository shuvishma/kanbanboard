import React from "react";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

const ProjectLayout = async ({ children }) => {
  return (
    <div>
      <Suspense fallback={<span>Loading Project ....</span>}>
        {children}
      </Suspense>
    </div>
  );
};

export default ProjectLayout;
