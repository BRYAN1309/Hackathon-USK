import { useState } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowRightLeft } from "lucide-react";

const investorTransactions = [
    { id: 1, date: "2024-06-10", description: "Investasi di Warung Sederhana", amount: -20000000, type: "investment" },
    { id: 2, date: "2024-06-05", description: "Payout dari Cafe Nusantara", amount: 1500000, type: "payout" },
    { id: 3, date: "2024-05-20", description: "Investasi di Resto Tradisional", amount: -15000000, type: "investment" },
    { id: 4, date: "2024-05-10", description: "Payout dari Warung Sederhana", amount: 1200000, type: "payout" },
    { id: 5, date: "2024-04-15", description: "Investasi di Kedai Kopi Asli", amount: -10000000, type: "investment" },
];


const RiwayatTransaksiInvestor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="investor" />
      <div className="flex-1">
        <DashboardHeader userName="Investor Pro" />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">Riwayat Transaksi Investor</h1>

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
                {investorTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                        <ArrowRightLeft className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <p
                      className={`font-bold text-lg ${
                        transaction.type === "payout" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "payout" ? "+" : "-"}
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

export default RiwayatTransaksiInvestor;