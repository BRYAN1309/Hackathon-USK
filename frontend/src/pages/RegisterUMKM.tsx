import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepIndicator } from "@/components/StepIndicator";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/Logo.svg";

const RegisterUMKM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDigitalized, setIsDigitalized] = useState<string>("");

  const steps = ["Identitas", "Profil Bisnis", "Detail Digital", "Selesai"];

  const [formData, setFormData] = useState({
    // Step 1
    nama: "",
    email: "",
    password: "",
    nik: "",
    phone: "",
    ktp: null as File | null,
    // Step 2
    namaBisnis: "",
    kategori: "",
    umurBisnis: "",
    alamat: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
    jumlahKaryawan: "",
    // Step 3
    nmid: "",
    nr: "",
    nib: "",
  });

  const handleNext = () => {
    if (currentStep === 2 && isDigitalized === "no") {
      navigate("/digitalisasi-guide");
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Pendaftaran Berhasil!",
        description: "Usaha Anda berhasil didaftarkan.",
      });
      navigate("/dashboard-umkm");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <img src={logo} alt="TemanUsaha" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Daftar sebagai UMKM</h1>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={4} steps={steps} />

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

            {/* Step 2: Profil Bisnis */}
            {currentStep === 2 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="namaBisnis">Nama Bisnis</Label>
                    <Input
                      id="namaBisnis"
                      value={formData.namaBisnis}
                      onChange={(e) => setFormData({ ...formData, namaBisnis: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kategori">Kategori</Label>
                    <Select
                      value={formData.kategori}
                      onValueChange={(value) => setFormData({ ...formData, kategori: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kuliner">Kuliner</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="agribisnis">Agribisnis</SelectItem>
                        <SelectItem value="jasa">Jasa</SelectItem>
                        <SelectItem value="industri">Industri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="umurBisnis">Umur Bisnis (tahun)</Label>
                    <Input
                      id="umurBisnis"
                      type="number"
                      value={formData.umurBisnis}
                      onChange={(e) => setFormData({ ...formData, umurBisnis: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jumlahKaryawan">Jumlah Karyawan</Label>
                    <Input
                      id="jumlahKaryawan"
                      type="number"
                      value={formData.jumlahKaryawan}
                      onChange={(e) => setFormData({ ...formData, jumlahKaryawan: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <Input
                    id="alamat"
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  />
                </div>
                  <div className="space-y-2">
                    <Label htmlFor="provinsi">Provinsi</Label>
                    <Input
                      id="provinsi"
                      value={formData.provinsi}
                      onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                  <Label>Apakah bisnis Anda sudah terdigitalisasi?</Label>
                  <RadioGroup value={isDigitalized} onValueChange={setIsDigitalized}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Ya</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">Tidak</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            {/* Step 3: Detail Bisnis Digital */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="nmid">Nomor Rekening QRIS (NMID)</Label>
                  <Input
                    id="nmid"
                    value={formData.nmid}
                    onChange={(e) => setFormData({ ...formData, nmid: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nr">Nomor Rekening</Label>
                  <Input
                    id="nr"
                    value={formData.nr}
                    onChange={(e) => setFormData({ ...formData, nr: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nib">Nomor Izin Berusaha (NIB)</Label>
                  <Input
                    id="nib"
                    value={formData.nib}
                    onChange={(e) => setFormData({ ...formData, nib: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* Step 4: Selesai */}
            {currentStep === 4 && (
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
                <h3 className="text-2xl font-bold mb-2">Usaha Anda Berhasil Didaftarkan!</h3>
                <p className="text-muted-foreground">
                  Selamat! Akun UMKM Anda telah berhasil dibuat.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && currentStep < 4 && (
                <Button variant="outline" onClick={handleBack}>
                  Kembali
                </Button>
              )}
              <Button
                onClick={handleNext}
                className={currentStep === 1 ? "w-full" : "ml-auto"}
              >
                {currentStep === 4 ? "Masuk ke Dashboard" : "Lanjut"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterUMKM;
