import { useState } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { transactions } from "@/data/umkm";
import { cn } from "@/lib/utils";

const RiwayatTransaksiUMKM = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const filteredAndSortedTransactions = transactions
    .filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "amount-high":
          return b.amount - a.amount;
        case "amount-low":
          return a.amount - b.amount;
        case "date":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="umkm" />
      <div className="flex-1">
        <DashboardHeader userName="Warung Makan Sederhana" />
        <main className="p-6 space-y-6 animate-fade-in-up">
          <h1 className="text-3xl font-bold">Riwayat Transaksi</h1>
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
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {filteredAndSortedTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg hover:bg-muted transition-colors animate-fade-in-up",
                      transaction.type === "expense" ? "card-gradient" : "bg-secondary"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          transaction.type === "income"
                            ? "bg-green-100 text-green-600"
                            : "bg-white/20 text-white"
                        )}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : (
                          <TrendingDown className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{transaction.description}</p>
                        <p className={cn("text-sm", transaction.type === 'expense' ? 'text-white/80' : 'text-muted-foreground')}>{transaction.date}</p>
                      </div>
                    </div>
                    <p
                      className={cn(
                        "font-bold text-lg",
                        transaction.type === "income" ? "text-green-600" : "text-white"
                      )}
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