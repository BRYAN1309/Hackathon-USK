import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  menuItems: Array<{
    label: string;
    path: string;
    icon: ReactNode;
  }>;
  userType: "umkm" | "investor";
}

const DashboardLayout = ({ children, menuItems, userType }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top Navbar */}
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">TemanUsaha</span>
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {userType === "umkm" ? "Dashboard UMKM" : "Dashboard Investor"}
            </span>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-background border-r border-border min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="ml-2">Logout</span>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
