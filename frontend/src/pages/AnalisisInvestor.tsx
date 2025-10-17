import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { investmentData, topUMKM } from "@/data/umkm";

const AnalisisInvestor = () => {
  const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#10b981", "#f59e0b"];

  const portfolioDistribution = [
    { name: "F&B", value: 60 },
    { name: "Retail", value: 25 },
    { name: "Jasa", value: 15 },
  ];

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="investor" />
      <div className="flex-1">
        <DashboardHeader userName="Investor Pro" />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">Analisis Investor</h1>

          {/* Investment Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Pertumbuhan Investasi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={investmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" name="Jumlah Investasi" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Portofolio</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={portfolioDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {portfolioDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Top Performing UMKM */}
            <Card>
              <CardHeader>
                <CardTitle>UMKM Performa Terbaik</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="space-y-4">
                {topUMKM.map((umkm, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{umkm.name}</p>
                      <p className="text-sm text-muted-foreground">Credit Score: {umkm.creditScore}</p>
                    </div>
                    <p className="font-semibold text-green-600">{umkm.profit}</p>
                  </div>
                ))}
              </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalisisInvestor;