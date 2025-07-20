import SettingsSidebar from "@/components/dashboard/user/settings/SettingsSidebar";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <SettingsSidebar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
