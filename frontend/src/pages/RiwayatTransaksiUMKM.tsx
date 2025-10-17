import { useState } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

const RiwayatTransaksiUMKM = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const transactions = [
    { id: 1, date: "2024-06-15", description: "Penjualan Harian", amount: 250000, type: "income" },
    { id: 2, date: "2024-06-14", description: "Pembelian Bahan Baku", amount: -150000, type: "expense" },
    { id: 3, date: "2024-06-13", description: "Penjualan Harian", amount: 280000, type: "income" },
    { id: 4, date: "2024-06-12", description: "Gaji Karyawan", amount: -500000, type: "expense" },
    { id: 5, date: "2024-06-11", description: "Penjualan Harian", amount: 320000, type: "income" },
    { id: 6, date: "2024-06-10", description: "Listrik & Air", amount: -200000, type: "expense" },
  ];

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="umkm" />
      <div className="flex-1">
        <DashboardHeader userName="Warung Makan Sederhana" />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">Riwayat Transaksi</h1>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Urutkan berdasarkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Tanggal</SelectItem>
                <SelectItem value="amount-high">Jumlah (Tertinggi)</SelectItem>
                <SelectItem value="amount-low">Jumlah (Terendah)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions List */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "income"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : (
                          <TrendingDown className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <p
                      className={`font-bold text-lg ${
                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : ""}
                      Rp {Math.abs(transaction.amount).toLocaleString("id-ID")}
                    </p>
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

export default RiwayatTransaksiUMKM;
