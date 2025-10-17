import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepIndicator } from "@/components/StepIndicator";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.svg";

const RegisterInvestor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Identitas", "Detail Investasi", "Selesai"];

  const [formData, setFormData] = useState({
    // Step 1
    nama: "",
    email: "",
    password: "",
    nik: "",
    phone: "",
    ktp: null as File | null,
    // Step 2
    fokusInvestasi: "",
    tanggalAktif: "",
    jumlahPortfolio: "",
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Pendaftaran Berhasil!",
        description: "Akun investor Anda berhasil dibuat.",
      });
      navigate("/dashboard-investor");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <img src={logo} alt="TemanUsaha" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Daftar sebagai Investor</h1>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={3} steps={steps} />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Identitas */}
            {currentStep === 1 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input
                      id="nama"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nik">NIK</Label>
                    <Input
                      id="nik"
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Telepon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ktp">Upload Foto KTP</Label>
                    <Input
                      id="ktp"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, ktp: e.target.files?.[0] || null })}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Detail Investasi */}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fokusInvestasi">Fokus Investasi</Label>
                  <Select
                    value={formData.fokusInvestasi}
                    onValueChange={(value) => setFormData({ ...formData, fokusInvestasi: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih fokus investasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fnb">F&B</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="jasa">Jasa</SelectItem>
                      <SelectItem value="semua">Semua Kategori</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggalAktif">Tanggal Mulai Aktif</Label>
                  <Input
                    id="tanggalAktif"
                    type="date"
                    value={formData.tanggalAktif}
                    onChange={(e) => setFormData({ ...formData, tanggalAktif: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jumlahPortfolio">Jumlah Portfolio Aktif yang Diinginkan</Label>
                  <Input
                    id="jumlahPortfolio"
                    type="number"
                    value={formData.jumlahPortfolio}
                    onChange={(e) => setFormData({ ...formData, jumlahPortfolio: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* Step 3: Selesai */}
            {currentStep === 3 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Akun Investor Berhasil Dibuat!</h3>
                <p className="text-muted-foreground">
                  Selamat! Anda sekarang dapat mulai berinvestasi di UMKM.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && currentStep < 3 && (
                <Button variant="outline" onClick={handleBack}>
                  Kembali
                </Button>
              )}
              <Button
                onClick={handleNext}
                className={currentStep === 1 ? "w-full" : "ml-auto"}
              >
                {currentStep === 3 ? "Masuk ke Dashboard" : "Lanjut"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterInvestor;