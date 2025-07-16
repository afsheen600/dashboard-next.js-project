// components/ClientDashboardWrapper.tsx
"use client";

import ClientAppWrapper from "@/app/components/ClientWrapper";
import DashboardContent from "@/app/pagesContent/DashboardContent";

interface ClientDashboardWrapperProps {
  dashboardData: any;
}

export default function ClientDashboardWrapper({
  dashboardData,
}: ClientDashboardWrapperProps) {
  return (
    <ClientAppWrapper dashboardData={dashboardData}>
      {({ isMobile, theme, user, dashboardData }) => (
        <DashboardContent
          isMobile={isMobile}
          isTablet={false}
          user={user}
          theme={theme}
          dashboardData={dashboardData}
        />
      )}
    </ClientAppWrapper>
  );
}
