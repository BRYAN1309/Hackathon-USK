import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, User, BarChart3, LineChart as LineIcon, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart } from "recharts";
import { transactionData, creditScoreData } from "@/data/umkm";

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

          {/* Statistik Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* Bagian Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex items-center justify-between">
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

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" /> ROI Growth Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="roi" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Credit Score & Health Score */}
          {/* Credit Score & Health Score */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Score Saat Ini</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
                <div className="relative">
                  <svg className="w-48 h-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="12"
                      strokeDasharray={`${(82 / 100) * 502} 502`}
                      strokeLinecap="round"
                      transform="rotate(-90 96 96)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">82</span> 
                    <span className="text-sm text-muted-foreground">Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investor Confidence Index</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart layout="vertical" data={investorConfidenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="factor" />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Insight Finansial */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Insight & Rekomendasi Finansial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Arus kas bulan ini stabil — pertahankan dengan mengontrol pengeluaran tetap di bawah 65% pendapatan.</li>
                <li>Credit score Anda sangat baik. Anda layak untuk program “Smart Expansion Funding”.</li>
                <li>ROI meningkat 12% dalam 6 bulan terakhir — waktu ideal untuk menambah cabang baru.</li>
                <li>Investor Confidence naik ke 91% karena transparansi laporan keuangan.</li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardUMKM;
