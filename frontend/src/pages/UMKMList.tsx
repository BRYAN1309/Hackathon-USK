import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp } from "lucide-react";
import { umkmData } from "@/data/umkm";

const UMKMList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredUMKM = umkmData
    .filter((umkm) =>
      umkm.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.creditScore - b.creditScore
        : b.creditScore - a.creditScore
    );

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="investor" />
      <div className="flex-1">
        <DashboardHeader userName="Investor Pro" />
        <main className="p-6 space-y-6 animate-fade-in-up">
          <h1 className="text-3xl font-bold">Cari UMKM</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Cari UMKM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Urutkan berdasarkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Credit Score (Tertinggi)</SelectItem>
                <SelectItem value="asc">Credit Score (Terendah)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUMKM.map((umkm) => (
              <Card key={umkm.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{umkm.name}</h3>
                      <p className="text-sm text-muted-foreground">{umkm.location}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">{umkm.creditScore}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{umkm.description}</p>
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">Modal Dibutuhkan</p>
                    <p className="font-bold text-lg">{umkm.modalDibutuhkan}</p>
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/dashboard-investor/umkm/${umkm.id}`}>Lihat Detail</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UMKMList;