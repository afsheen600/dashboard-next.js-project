"use client";

import ClientAppWrapper from "@/app/components/ClientWrapper";
import SettingsContent from "@/app/pagesContent/SettingsContent";

export default function SettingsPageClient() {
  return (
    <ClientAppWrapper>
      {(clientProps) => (
        <SettingsContent
          isMobile={clientProps.isMobile}
          theme={clientProps.theme}
        />
      )}
    </ClientAppWrapper>
  );
}
