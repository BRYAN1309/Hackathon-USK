import { useState } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, User, Wallet, LineChart as LineIcon, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { transactionData } from "@/data/umkm";
import { userGamification } from "@/data/gamification";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardUMKM = () => {
  const [totalModal, setTotalModal] = useState(100000000);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleKlaim = () => {
    setTotalModal(prevModal => prevModal + 50000000);
    setNotificationOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="umkm" />
      <div className="flex-1">
        <DashboardHeader
          userName="Warung Makan Sederhana"
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
          handleKlaim={handleKlaim}
        />
        <main className="p-6 space-y-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard UMKM</h1>
          <p className="text-muted-foreground">
            Pantau performa keuangan, pertumbuhan usaha, dan insight kredit Anda secara real-time.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard
                  title="Total Pendapatan"
                  value="Rp 28JT"
                  icon={TrendingUp}
                  trend="+12% dari bulan lalu"
                  trendUp={true}
                  isGradient
                />
                <StatCard
                  title="Total Pengeluaran"
                  value="Rp 18.5JT"
                  icon={TrendingDown}
                  trend="-5% dari bulan lalu"
                  trendUp={false}
                  isGradient
                />
                <StatCard
                  title="Net Profit"
                  value="Rp 9.5JT"
                  icon={DollarSign}
                  trend="+8% dari bulan lalu"
                  trendUp={true}
                  isGradient
                />
                <StatCard
                  title="Investor Aktif"
                  value="3 Investor"
                  icon={User}
                  trend="Tingkat retensi 60%"
                  isGradient
                />
              </div>
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
             <div className="space-y-6">
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
                  <Button asChild className="w-full" variant="transparent-gradient">
                    <Link to="/dashboard-umkm/tugas">Lihat Semua Misi</Link>
                  </Button>
                </CardContent>
              </Card>
              <StatCard
                  title="Total Modal"
                  value={`Rp ${Math.round(totalModal / 1000000)}JT`}
                  icon={Wallet}
                />
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