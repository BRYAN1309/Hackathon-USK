// src/pages/DashboardUMKM.tsx
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, User, BarChart3, LineChart as LineIcon, AlertTriangle, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart } from "recharts";
import { transactionData } from "@/data/umkm";
import { userGamification } from "@/data/gamification";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const roiData = [
  { month: "Jan", roi: 5 },
  { month: "Feb", roi: 8 },
  { month: "Mar", roi: 7 },
  { month: "Apr", roi: 9 },
  { month: "May", roi: 11 },
  { month: "Jun", roi: 12 },
];

const investorConfidenceData = [
  { factor: "Transparansi", value: 95 },
  { factor: "Stabilitas", value: 88 },
  { factor: "Kepatuhan", value: 91 },
  { factor: "Pertumbuhan", value: 86 },
];

const DashboardUMKM = () => {
  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="umkm" />
      <div className="flex-1">
        <DashboardHeader userName="Warung Makan Sederhana" />
        <main className="p-6 space-y-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard UMKM</h1>
          <p className="text-muted-foreground">
            Pantau performa keuangan, pertumbuhan usaha, dan insight kredit Anda secara real-time.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
               {/* Statistik Utama */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard
                  title="Total Pendapatan"
                  value="Rp 28JT"
                  icon={TrendingUp}
                  trend="+12% dari bulan lalu"
                  trendUp={true}
                />
                <StatCard
                  title="Total Pengeluaran"
                  value="Rp 18.5JT"
                  icon={TrendingDown}
                  trend="-5% dari bulan lalu"
                  trendUp={false}
                />
                <StatCard
                  title="Net Profit"
                  value="Rp 9.5JT"
                  icon={DollarSign}
                  trend="+8% dari bulan lalu"
                  trendUp={true}
                />
                <StatCard
                  title="Investor Aktif"
                  value="3 Investor"
                  icon={User}
                  trend="Tingkat retensi 60%"
                />
              </div>

               {/* Arus Transaksi Bulanan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineIcon className="w-5 h-5" /> Arus Transaksi Bulanan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
             {/* Sidebar Kanan */}
             <div className="space-y-6">
               {/* Gamification Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Level & Misi
                    </div>
                    <span className="text-sm font-semibold text-primary">{userGamification.level}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold">{userGamification.points}</p>
                    <p className="text-sm text-muted-foreground">Total Poin</p>
                  </div>
                  <Progress value={50} className="mb-4 h-2" />
                  <p className="text-xs text-muted-foreground text-center mb-4">
                    500 poin lagi untuk mencapai level Emas!
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/dashboard-umkm/tugas">Lihat Semua Misi</Link>
                  </Button>
                </CardContent>
              </Card>
               {/* Credit Score Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Credit Score</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                  <div className="relative">
                    <svg className="w-32 h-32">
                      <circle cx="64" cy="64" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="10"
                        strokeDasharray={`${(82 / 100) * 339.292} 339.292`}
                        strokeLinecap="round"
                        transform="rotate(-90 64 64)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">82</span>
                      <span className="text-xs text-muted-foreground">Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardUMKM;