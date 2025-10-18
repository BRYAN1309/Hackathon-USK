import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, Clock, LogOut, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

interface DashboardSidebarProps {
  type: "umkm" | "investor";
}

export const DashboardSidebar = ({ type }: DashboardSidebarProps) => {
  const location = useLocation();
  const basePath = type === "umkm" ? "/dashboard-umkm" : "/dashboard-investor";

  const umkmLinks = [
    { icon: Home, label: "Halaman Utama", path: basePath },
    { icon: BarChart3, label: "Analisis", path: `${basePath}/analisis` },
    { icon: Clock, label: "Riwayat Transaksi", path: `${basePath}/riwayat` },
  ];

  const investorLinks = [
    { icon: Home, label: "Halaman Utama", path: basePath },
    { icon: BarChart3, label: "Analisis", path: `${basePath}/analisis` },
    { icon: Clock, label: "Riwayat Transaksi", path: `${basePath}/riwayat` },
    { icon: Building2, label: "List UMKM", path: `${basePath}/umkm-list` },
  ];

  const links = type === "umkm" ? umkmLinks : investorLinks;

  return (
    <aside className="w-64 bg-background border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative w-full">
            <img
              src={logo}
              alt="TemanUsaha"
              className="block mx-auto w-48 h-auto md:w-56 drop-shadow-md transition-transform duration-300 hover:scale-105"
              style={{ position: "relative", left: "30px" }}
            />
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => window.location.href = "/"}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};