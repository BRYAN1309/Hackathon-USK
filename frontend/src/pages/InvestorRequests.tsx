import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

// Data dummy untuk permintaan dari UMKM
const umkmRequests = [
  {
    id: 1,
    name: "Warung Sederhana",
    creditScore: 89,
    description: "Warung makan tradisional dengan menu nusantara yang membutuhkan dana untuk ekspansi cabang.",
    modalDibutuhkan: "Rp 20.000.000",
    location: "Papua",
  },
  {
    id: 4,
    name: "Kedai Kopi Asli",
    creditScore: 75,
    description: "Kedai kopi lokal yang ingin meningkatkan kapasitas produksi biji kopi sangrai.",
    modalDibutuhkan: "Rp 15.000.000",
    location: "Papua Barat",
  },
];

const InvestorRequests = () => {
  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="investor" />
      <div className="flex-1">
        <DashboardHeader userName="Investor Pro" />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">Permintaan Pendanaan</h1>
          <p className="text-muted-foreground">
            Berikut adalah daftar UMKM yang telah mengajukan permintaan pendanaan kepada Anda.
          </p>

          {/* Daftar Permintaan UMKM */}
          {umkmRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {umkmRequests.map((umkm) => (
                <Card key={umkm.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{umkm.name}</CardTitle>
                      <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">{umkm.creditScore}</span>
                      </div>
                    </div>
                    <CardDescription>{umkm.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{umkm.description}</p>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">Modal Diajukan</p>
                      <p className="font-bold text-lg text-primary">{umkm.modalDibutuhkan}</p>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild className="w-full">
                      <Link to={`/dashboard-investor/umkm/${umkm.id}`}>Lihat Detail & Investasi</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-background rounded-lg">
              <h3 className="text-xl font-semibold">Belum Ada Permintaan</h3>
              <p className="text-muted-foreground mt-2">Saat ini belum ada UMKM yang mengajukan permintaan dana.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InvestorRequests;