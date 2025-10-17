import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AnalisisUMKM = () => {
  const monthlyData = [
    { month: "Jan", pendapatan: 4000000, pengeluaran: 2500000, profit: 1500000 },
    { month: "Feb", pendapatan: 3800000, pengeluaran: 2400000, profit: 1400000 },
    { month: "Mar", pendapatan: 5200000, pengeluaran: 3000000, profit: 2200000 },
    { month: "Apr", pendapatan: 4800000, pengeluaran: 2800000, profit: 2000000 },
    { month: "Mei", pendapatan: 6000000, pengeluaran: 3500000, profit: 2500000 },
    { month: "Jun", pendapatan: 5500000, pengeluaran: 3200000, profit: 2300000 },
  ];

  const expenseCategories = [
    { name: "Bahan Baku", value: 45 },
    { name: "Gaji", value: 30 },
    { name: "Operasional", value: 15 },
    { name: "Lainnya", value: 10 },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#10b981", "#f59e0b"];

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="umkm" />
      <div className="flex-1">
        <DashboardHeader userName="Warung Makan Sederhana" />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">Analisis Keuangan</h1>

          {/* Revenue vs Expense */}
          <Card>
            <CardHeader>
              <CardTitle>Pendapatan vs Pengeluaran</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pendapatan" fill="hsl(var(--primary))" name="Pendapatan" />
                  <Bar dataKey="pengeluaran" fill="hsl(var(--destructive))" name="Pengeluaran" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profit Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Profit Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="profit" fill="#10b981" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Pengeluaran</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalisisUMKM;
