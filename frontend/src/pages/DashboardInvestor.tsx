import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Wallet } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { investmentData, topUMKM } from "@/data/umkm";

const DashboardInvestor = () => {
  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="investor" />
      <div className="flex-1">
        <DashboardHeader userName="Investor Pro" />
        <main className="p-6 space-y-6 animate-fade-in-up">
          <h1 className="text-3xl font-bold">Dashboard Investor</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Investasi"
              value="Rp 70.000.000"
              icon={Wallet}
              trend="+20% dari bulan lalu"
              trendUp={true}
            />
            <StatCard
              title="ROI"
              value="18.5%"
              icon={TrendingUp}
              trend="+2.3% dari bulan lalu"
              trendUp={true}
            />
            <StatCard
              title="Total Revenue Portfolio"
              value="Rp 12.950.000"
              icon={DollarSign}
              trend="+15% dari bulan lalu"
              trendUp={true}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Pertumbuhan Investasi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={investmentData}>
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
            <CardHeader>
              <CardTitle>Top 3 UMKM</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topUMKM.map((umkm, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{umkm.name}</p>
                        <p className="text-sm text-muted-foreground">Credit Score: {umkm.creditScore}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{umkm.profit}</p>
                      <p className="text-sm text-muted-foreground">Profit</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardInvestor;