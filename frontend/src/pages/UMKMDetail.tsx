import { useParams } from "react-router-dom";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Calendar, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const UMKMDetail = () => {
  const { id } = useParams();

  // Mock data
  const umkmDetail = {
    name: "Warung Sederhana",
    creditScore: 750,
    location: "Papua",
    category: "Makanan",
    age: "3 tahun",
    employees: "5 orang",
    description:
      "Warung makan tradisional yang menyajikan berbagai menu nusantara. Telah beroperasi selama 3 tahun dengan pelanggan setia dari berbagai kalangan. Fokus pada kualitas makanan dan pelayanan yang ramah.",
    modalDibutuhkan: "Rp 20.000.000",
    owner: "Ibu Siti",
    contact: "+62 812-3456-7890",
  };

  const financialData = [
    { month: "Jan", revenue: 4000000, expense: 2500000 },
    { month: "Feb", revenue: 3800000, expense: 2400000 },
    { month: "Mar", revenue: 5200000, expense: 3000000 },
    { month: "Apr", revenue: 4800000, expense: 2800000 },
    { month: "Mei", revenue: 6000000, expense: 3500000 },
    { month: "Jun", revenue: 5500000, expense: 3200000 },
  ];

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="investor" />
      <div className="flex-1">
        <DashboardHeader userName="Investor Pro" />
        <main className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{umkmDetail.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{umkmDetail.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{umkmDetail.age}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{umkmDetail.employees}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-bold text-primary text-lg">{umkmDetail.creditScore}</span>
              </div>
              <p className="text-sm text-muted-foreground">Credit Score</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Deskripsi</TabsTrigger>
              <TabsTrigger value="financial">Keuangan</TabsTrigger>
              <TabsTrigger value="documents">Dokumen</TabsTrigger>
            </TabsList>

            {/* Deskripsi Tab */}
            <TabsContent value="description" className="space-y-6 mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Tentang Usaha</h3>
                    <p className="text-muted-foreground">{umkmDetail.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Kategori</p>
                      <p className="font-medium">{umkmDetail.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pemilik</p>
                      <p className="font-medium">{umkmDetail.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Kontak</p>
                      <p className="font-medium">{umkmDetail.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Modal Dibutuhkan</p>
                      <p className="font-bold text-lg text-primary">{umkmDetail.modalDibutuhkan}</p>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto" size="lg">
                    Investasi Sekarang
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Keuangan Tab */}
            <TabsContent value="financial" className="space-y-6 mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Performa Keuangan 6 Bulan Terakhir</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        name="Pendapatan"
                      />
                      <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={2}
                        name="Pengeluaran"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Rata-rata Pendapatan</p>
                    <p className="text-2xl font-bold">Rp 4.9M</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Rata-rata Pengeluaran</p>
                    <p className="text-2xl font-bold">Rp 2.9M</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Net Profit Margin</p>
                    <p className="text-2xl font-bold text-green-600">41%</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Dokumen Tab */}
            <TabsContent value="documents" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="border border-border rounded-lg p-4 hover:bg-secondary transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">NIB (Nomor Induk Berusaha)</p>
                        <p className="text-sm text-muted-foreground">Surat Izin Usaha</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Lihat
                      </Button>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 hover:bg-secondary transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">KTP Pemilik</p>
                        <p className="text-sm text-muted-foreground">Identitas Pemilik Usaha</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Lihat
                      </Button>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 hover:bg-secondary transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">NMID (QRIS)</p>
                        <p className="text-sm text-muted-foreground">Nomor Merchant QRIS</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Lihat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default UMKMDetail;
