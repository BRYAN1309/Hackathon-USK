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
import { registerUMKM } from "@/api/umkm";
import { registerUser } from "@/api/user";
import logo from "@/assets/logo.svg";

const RegisterUMKM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDigitalized, setIsDigitalized] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const steps = ["Identitas", "Profil Bisnis", "Selesai"];

  const provinces = [
    "Bali",
    "Nusa Tenggara Barat", 
    "Nusa Tenggara Timur",
    "Sulawesi Utara",
    "Gorontalo",
    "Sulawesi Tengah",
    "Sulawesi Barat",
    "Sulawesi Selatan",
    "Sulawesi Tenggara",
    "Maluku Utara",
    "Maluku",
    "Papua Barat",
    "Papua Barat Daya",
    "Papua Pegunungan", 
    "Papua Tengah",
    "Papua Selatan",
    "Papua"
  ];

  const businessCategories = [
    { value: "fnb", label: "Food & Beverage" },
  ];

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
    kategori: "fnb",
    umurBisnis: "",
    alamat: "",
    provinsi: "",
    jumlahKaryawan: "",
    nmid: "",
    nr: "",
    nib: "",
    fotoBisnis: null as File | null,
  });

  const handleStep1Submit = async () => {
    if (!formData.nama || !formData.email || !formData.password || !formData.nik || !formData.phone || !formData.ktp) {
      toast({
        title: "Error",
        description: "Harap lengkapi semua field yang wajib diisi",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const userForm = {
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        nik: formData.nik,
        phone_number: formData.phone,
        foto_ktp: formData.ktp,
      };

      const response = await registerUser(userForm);
      
      console.log("Register User Response:", response);
      
      // Handle both possible response structures
      const extractedUserId = response?.data?.user?.id || response?.data?.[0]?.id;
      
      if (extractedUserId) {
        setUserId(extractedUserId);
        toast({
          title: "Berhasil",
          description: "Registrasi user berhasil",
        });
        return true;
      } else {
        throw new Error("User ID tidak ditemukan dalam response");
      }
    } catch (error: any) {
      console.error("Error registrasi user:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Gagal melakukan registrasi user",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async () => {
    if (!formData.namaBisnis || !formData.kategori || !formData.alamat || !formData.provinsi) {
      toast({
        title: "Error",
        description: "Harap lengkapi field nama bisnis, kategori, alamat, dan provinsi",
        variant: "destructive",
      });
      return false;
    }

    if (!userId) {
      toast({
        title: "Error",
        description: "User ID tidak ditemukan, silakan kembali ke step 1",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const umkmFormData = new FormData();
      
      // Required fields - match backend field names exactly
      umkmFormData.append("nama_bisnis", formData.namaBisnis);
      umkmFormData.append("kategori_bisnis", formData.kategori);
      umkmFormData.append("lokasi", formData.provinsi);
      umkmFormData.append("user_id", userId.toString());
      umkmFormData.append("alamat_bisnis", formData.alamat);

      // Optional fields - only append if not empty
      if (formData.umurBisnis) {
        umkmFormData.append("usia_bisnis", formData.umurBisnis);
      }
      
      if (formData.jumlahKaryawan) {
        umkmFormData.append("jumlah_karyawan", formData.jumlahKaryawan);
      }
      
      if (formData.nr) {
        umkmFormData.append("nomor_rekening", formData.nr);
      }
      
      if (formData.nmid) {
        umkmFormData.append("nmid", formData.nmid);
      }
      
      if (formData.nib) {
        umkmFormData.append("surat_izin_usaha", formData.nib);
      }

      if (formData.fotoBisnis) {
        umkmFormData.append("foto_bisnis", formData.fotoBisnis);
      }

      console.log("=== UMKM FormData Debug ===");
      console.log("User ID:", userId);
      for (let [key, value] of umkmFormData.entries()) {
        console.log(key, value);
      }
      console.log("=== End Debug ===");

      const response = await registerUMKM(umkmFormData);
      
      console.log("Register UMKM Response:", response);
      
      // Handle array response structure
      if (response?.status === "success" || response?.data) {
        toast({
          title: "Berhasil",
          description: "Registrasi UMKM berhasil",
        });
        return true;
      }
      
      return true;
    } catch (error: any) {
      console.error("Error registrasi UMKM:", error);
      
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
        
        // Check if it's an HTML error response
        if (typeof error.response.data === 'string' && error.response.data.includes('<!doctype html>')) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(error.response.data, 'text/html');
          const errorText = doc.querySelector('p')?.textContent || 'Unknown server error';
          console.error("Parsed error message:", errorText);
        }
      }
      
      let errorMessage = "Gagal melakukan registrasi UMKM. Silakan coba lagi.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const success = await handleStep1Submit();
      if (success) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (isDigitalized === "no") {
        navigate("/digitalisasi-guide");
        return;
      }
      
      if (isDigitalized === "yes") {
        const success = await handleStep2Submit();
        if (success) {
          setCurrentStep(3);
        }
      } else {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
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
          <div className="relative w-full">
            <img
              src={logo}
              alt="TemanUsaha"
              className="block mx-auto w-48 h-auto md:w-56 drop-shadow-md transition-transform duration-300 hover:scale-105"
              style={{ position: "relative", left: "30px" }}
            />
          </div>
          <h1 className="text-3xl font-bold">Daftar sebagai UMKM</h1>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={3} steps={steps} />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStep === 1 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap *</Label>
                    <Input
                      id="nama"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nik">NIK *</Label>
                    <Input
                      id="nik"
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ktp">Upload Foto KTP *</Label>
                    <Input
                      id="ktp"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, ktp: e.target.files?.[0] || null })}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="namaBisnis">Nama Bisnis *</Label>
                    <Input
                      id="namaBisnis"
                      value={formData.namaBisnis}
                      onChange={(e) => setFormData({ ...formData, namaBisnis: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kategori">Kategori *</Label>
                    <Select
                      value={formData.kategori}
                      onValueChange={(value) => setFormData({ ...formData, kategori: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
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
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jumlahKaryawan">Jumlah Karyawan</Label>
                    <Input
                      id="jumlahKaryawan"
                      type="number"
                      value={formData.jumlahKaryawan}
                      onChange={(e) => setFormData({ ...formData, jumlahKaryawan: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat Lengkap *</Label>
                  <Input
                    id="alamat"
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    placeholder="Masukkan alamat lengkap bisnis"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provinsi">Provinsi *</Label>
                  <Select
                    value={formData.provinsi}
                    onValueChange={(value) => setFormData({ ...formData, provinsi: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fotoBisnis">Foto Bisnis</Label>
                  <Input
                    id="fotoBisnis"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, fotoBisnis: e.target.files?.[0] || null })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Apakah bisnis Anda sudah terdigitalisasi? *</Label>
                  <RadioGroup 
                    value={isDigitalized} 
                    onValueChange={setIsDigitalized}
                    disabled={isLoading}
                  >
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

                {isDigitalized === 'yes' && (
                  <div className="space-y-4 pt-4 mt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="nmid">Nomor Rekening QRIS (NMID)</Label>
                      <Input
                        id="nmid"
                        type="number"
                        value={formData.nmid}
                        onChange={(e) => setFormData({ ...formData, nmid: e.target.value })}
                        placeholder="Masukkan angka saja"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nr">Nomor Rekening</Label>
                      <Input
                        id="nr"
                        type="number"
                        value={formData.nr}
                        onChange={(e) => setFormData({ ...formData, nr: e.target.value })}
                        placeholder="Masukkan angka saja"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nib">Nomor Izin Berusaha (NIB)</Label>
                      <Input
                        id="nib"
                        type="number"
                        value={formData.nib}
                        onChange={(e) => setFormData({ ...formData, nib: e.target.value })}
                        placeholder="Masukkan angka saja"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

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
                <h3 className="text-2xl font-bold mb-2">Usaha Anda Berhasil Didaftarkan!</h3>
                <p className="text-muted-foreground">
                  Selamat! Akun UMKM Anda telah berhasil dibuat.
                </p>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && currentStep < 3 && (
                <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                  Kembali
                </Button>
              )}
              <Button
                onClick={handleNext}
                className={currentStep === 1 ? "w-full" : "ml-auto"}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : 
                 currentStep === 3 ? "Masuk ke Dashboard" : "Lanjut"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterUMKM;