import { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, TrendingUp, Calendar, Users, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { umkmDetail, financialData } from "@/data/umkm";

const UMKMDetail = () => {
  const { id } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [sharingType, setSharingType] = useState("percentage");
  const [percentage, setPercentage] = useState("");
  const [roi, setRoi] = useState("");

  const handleInvest = () => {
    // Logika untuk mengirim data investasi
    console.log({
      investmentAmount,
      sharingType,
      percentage,
      roi,
    });
    setShowSuccess(true);
  };

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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Deskripsi</TabsTrigger>
              <TabsTrigger value="financial" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Keuangan</TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Dokumen</TabsTrigger>
              <TabsTrigger value="invest" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Investasi</TabsTrigger>
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

            {/* Investasi Tab */}
            <TabsContent value="invest" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mulai Investasi</CardTitle>
                  <CardDescription>Isi form di bawah untuk berinvestasi pada UMKM ini.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="investmentAmount">Jumlah Investasi (Rp)</Label>
                    <Input
                      id="investmentAmount"
                      type="number"
                      placeholder="Contoh: 50000000"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Opsi Bagi Hasil</Label>
                    <RadioGroup value={sharingType} onValueChange={setSharingType} className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="percentage" id="percentage" />
                        <Label htmlFor="percentage">Persentase Saham</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="roi" id="roi" />
                        <Label htmlFor="roi">ROI</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {sharingType === "percentage" && (
                    <div>
                      <Label htmlFor="percentage-input">Persentase Saham (%)</Label>
                      <Input
                        id="percentage-input"
                        type="number"
                        placeholder="Contoh: 15"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                      />
                    </div>
                  )}

                  {sharingType === "roi" && (
                    <div>
                      <Label htmlFor="roi-input">Imbal Hasil Investasi (ROI) (%)</Label>
                      <Input
                        id="roi-input"
                        type="number"
                        placeholder="Contoh: 20"
                        value={roi}
                        onChange={(e) => setRoi(e.target.value)}
                      />
                    </div>
                  )}

                  <Button onClick={handleInvest} className="w-full">
                    Investasi Sekarang
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">Investasi Berhasil!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Investasi Anda telah berhasil diajukan. Anda akan mendapatkan notifikasi selanjutnya.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccess(false)} className="w-full mt-4">
            Selesai
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UMKMDetail;