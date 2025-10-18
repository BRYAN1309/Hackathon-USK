import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { monthlyData, expenseCategories } from "@/data/umkm";

const AnalisisUMKM = () => {
  const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#10b981", "#f59e0b"];

  const formatYAxis = (tickItem: number) => {
    if (tickItem >= 1000000) {
      return `${tickItem / 1000000}jt`; 
    }
    return tickItem.toLocaleString("id-ID");
  };
  const tooltipFormatter = (value: number) => {
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="umkm" />
      <div className="flex-1">
        <DashboardHeader userName="Warung Makan Sederhana" />
        <main className="p-6 space-y-6 animate-fade-in-up">
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
                  <YAxis tickFormatter={formatYAxis} />
                  <Tooltip formatter={tooltipFormatter} /> {/* Apply the tooltip formatter */}
                  <Bar dataKey="pendapatan" fill="hsl(var(--primary))" name="Pendapatan" />
                  <Bar dataKey="pengeluaran" fill="hsl(var(--destructive))" name="Pengeluaran" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip formatter={tooltipFormatter} />
                    <Bar dataKey="profit" fill="#10b981" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribusi data</CardTitle>
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
                    <Tooltip formatter={tooltipFormatter} />
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