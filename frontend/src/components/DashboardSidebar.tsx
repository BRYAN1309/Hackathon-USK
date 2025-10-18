import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, Clock, LogOut, Building2, Search, FileText, User, Award } from "lucide-react";
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
    { icon: User, label: "Profil", path: `${basePath}/profil` },
    { icon: Award, label: "Tugas", path: `${basePath}/tugas` },
    { icon: BarChart3, label: "Analisis", path: `${basePath}/analisis` },
    { icon: Clock, label: "Riwayat Transaksi", path: `${basePath}/riwayat` },
    { icon: Building2, label: "Cari Investor", path: `${basePath}/cari-investor` },
  ];

  const investorLinks = [
    { icon: Home, label: "Halaman Utama", path: basePath },
    { icon: Search, label: "Cari UMKM", path: `${basePath}/umkm-list` },
    { icon: FileText, label: "Permintaan", path: `${basePath}/requests` },
    { icon: BarChart3, label: "Analisis", path: `${basePath}/analisis` },
    { icon: Clock, label: "Riwayat Transaksi", path: `${basePath}/riwayat` },
  ];

  const links = type === "umkm" ? umkmLinks : investorLinks;

  return (
    <aside className="w-64 sidebar-gradient min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/20">
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
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/20">
        <Button
          variant="ghost"
          className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
          onClick={() => window.location.href = "/"}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};