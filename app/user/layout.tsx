import UserSidebar from "@/components/dashboard/shared/UserSidebar";
import UserTopNavbar from "@/components/dashboard/shared/UserTopNavbar";

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Sidebar: fixed only on large screens */}
      <div className="lg:fixed lg:z-50">
        <UserSidebar />
      </div>

      {/* Main content: pushed right on lg screens */}
      <div className="flex flex-col min-h-screen lg:pl-52">
        <UserTopNavbar />
        <main className="pl-5 pr-5 xl:pr-20 pt-20 pb-5 flex-1 bg-[#F1F7F9]">
          {children}
        </main>
      </div>
    </div>
  );
}
