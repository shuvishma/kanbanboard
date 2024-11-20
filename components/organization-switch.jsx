"use client";
import React from "react";
import {
  OrganizationSwitcher,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const OrgSwitcher = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const pathName = usePathname();

  if (!isLoaded || !isUserLoaded) return null;

  return (
    <div>
      <SignedIn>
        <OrganizationSwitcher
          vhidePersonal
          afterCreateOrganizationUrl={"/organization/:slug"}
          afterSelectOrganizationUrl={"/organization/:slug"}
          createOrganizationMode={
            pathName === "/onboarding" ? "navigation" : "modal"
          }
          createOrganizationUrl="/onboarding"
          appearance={{
            elements: {
                organizationSwitcherTrigger : "border border-gray-300 rouded-md px-5 py-2",
                organizationSwitcherTriggerIcon: "text-white"
            }
          }}
        />
      </SignedIn>
    </div>
  );
};

export default OrgSwitcher;
