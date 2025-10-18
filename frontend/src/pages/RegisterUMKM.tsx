import { useState, useEffect } from "react";
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
import { Loader2, ShieldCheck, PieChart, Star, CheckCircle2 } from "lucide-react"; // Perbaikan di sini

const RegisterUMKM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDigitalized, setIsDigitalized] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [aiCheckStatus, setAiCheckStatus] = useState<string>("");
  const [creditScore, setCreditScore] = useState<number | null>(null);

  const steps = ["Identitas", "Profil Bisnis", "Konfirmasi Data", "Pengecekan AI", "Selesai"];

  const provinces = [
    "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Sulawesi Utara",
    "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan",
    "Sulawesi Tenggara", "Maluku Utara", "Maluku", "Papua Barat",
    "Papua Barat Daya", "Papua Pegunungan", "Papua Tengah", "Papua Selatan", "Papua"
  ];

  const businessCategories = [{ value: "fnb", label: "Food & Beverage" }];

  const [formData, setFormData] = useState({
    nama: "", email: "", password: "", nik: "", phone: "", ktp: null as File | null,
    namaBisnis: "", kategori: "fnb", umurBisnis: "", alamat: "", provinsi: "",
    jumlahKaryawan: "", nmid: "", nr: "", nib: "", fotoBisnis: null as File | null,
  });

  const handleStep1Submit = async () => {
    if (!formData.nama || !formData.email || !formData.password || !formData.nik || !formData.phone || !formData.ktp) {
      toast({ title: "Error", description: "Harap lengkapi semua field yang wajib diisi", variant: "destructive" });
      return false;
    }
    setIsLoading(true);
    try {
      const response = await registerUser({
        nama: formData.nama, email: formData.email, password: formData.password,
        nik: formData.nik, phone_number: formData.phone, foto_ktp: formData.ktp,
      });
      const extractedUserId = response?.data?.user?.id || response?.data?.[0]?.id;
      if (extractedUserId) {
        setUserId(extractedUserId);
        toast({ title: "Berhasil", description: "Registrasi user berhasil" });
        return true;
      } else {
        throw new Error("User ID tidak ditemukan dalam response");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Gagal melakukan registrasi user", variant: "destructive" });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async () => {
    if (!formData.namaBisnis || !formData.kategori || !formData.alamat || !formData.provinsi) {
      toast({ title: "Error", description: "Harap lengkapi field nama bisnis, kategori, alamat, dan provinsi", variant: "destructive" });
      return false;
    }
    if (!userId) {
      toast({ title: "Error", description: "User ID tidak ditemukan, silakan kembali ke step 1", variant: "destructive" });
      return false;
    }
    setIsLoading(true);
    try {
      const umkmFormData = new FormData();
      umkmFormData.append("nama_bisnis", formData.namaBisnis);
      umkmFormData.append("kategori_bisnis", formData.kategori);
      umkmFormData.append("lokasi", formData.provinsi);
      umkmFormData.append("user_id", userId.toString());
      umkmFormData.append("alamat_bisnis", formData.alamat);
      if (formData.umurBisnis) umkmFormData.append("usia_bisnis", formData.umurBisnis);
      if (formData.jumlahKaryawan) umkmFormData.append("jumlah_karyawan", formData.jumlahKaryawan);
      if (formData.nr) umkmFormData.append("nomor_rekening", formData.nr);
      if (formData.nmid) umkmFormData.append("nmid", formData.nmid);
      if (formData.nib) umkmFormData.append("surat_izin_usaha", formData.nib);
      if (formData.fotoBisnis) umkmFormData.append("foto_bisnis", formData.fotoBisnis);
      
      const response = await registerUMKM(umkmFormData);
      if (response?.status === "success" || response?.data) {
        toast({ title: "Berhasil", description: "Registrasi UMKM berhasil" });
        return true;
      }
      return true;
    } catch (error: any) {
      let errorMessage = "Gagal melakukan registrasi UMKM. Silakan coba lagi.";
      if (error.response?.data?.message) errorMessage = error.response.data.message;
      else if (error.response?.data?.detail) errorMessage = error.response.data.detail;
      else if (error.message) errorMessage = error.message;
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const runAiChecks = () => {
    setIsLoading(true);
    setAiCheckStatus("fraud_detection");
    setTimeout(() => {
      setAiCheckStatus("clustering");
      setTimeout(() => {
        setAiCheckStatus("credit_scoring");
        setTimeout(() => {
          const isSuccess = Math.random() > 0.3; 
          if (isSuccess) {
            const score = Math.floor(Math.random() * (85 - 65 + 1)) + 65;
            setCreditScore(score);
            setAiCheckStatus("success");
          } else {
            setAiCheckStatus("failed");
          }
          setIsLoading(false);
        }, 2000);
      }, 2000);
    }, 2000);
  };
  
  const handleNext = async () => {
    if (currentStep === 1) {
      if (await handleStep1Submit()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (isDigitalized === "no") {
        navigate("/digitalisasi-guide");
        return;
      }
      if (isDigitalized === "yes") {
        if (await handleStep2Submit()) setCurrentStep(3);
      } else {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      setCurrentStep(4);
      runAiChecks();
    } else if (currentStep === 4) {
      if (aiCheckStatus === 'success') {
        setCurrentStep(5);
      } else if (aiCheckStatus === 'failed') {
        toast({ title: "Pendaftaran Gagal", description: "Anda tidak lolos pengecekan AI.", variant: "destructive" });
        navigate('/dashboard-umkm');
      }
    } else if (currentStep === 5) {
      toast({ title: "Pendaftaran Berhasil!", description: "Usaha Anda berhasil didaftarkan." });
      navigate("/dashboard-umkm");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="nama">Nama Lengkap *</Label><Input id="nama" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} disabled={isLoading} /></div>
            <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={isLoading} /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="password">Password *</Label><Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} disabled={isLoading} /></div>
            <div className="space-y-2"><Label htmlFor="nik">NIK *</Label><Input id="nik" value={formData.nik} onChange={(e) => setFormData({ ...formData, nik: e.target.value })} disabled={isLoading} /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="phone">No. Telepon *</Label><Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={isLoading} /></div>
            <div className="space-y-2"><Label htmlFor="ktp">Upload Foto KTP *</Label><Input id="ktp" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, ktp: e.target.files?.[0] || null })} disabled={isLoading} /></div>
          </div>
        </>
      );
      case 2: return (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="namaBisnis">Nama Bisnis *</Label><Input id="namaBisnis" value={formData.namaBisnis} onChange={(e) => setFormData({ ...formData, namaBisnis: e.target.value })} disabled={isLoading}/></div>
            <div className="space-y-2"><Label htmlFor="kategori">Kategori *</Label><Select value={formData.kategori} onValueChange={(value) => setFormData({ ...formData, kategori: value })} disabled={isLoading}><SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger><SelectContent>{businessCategories.map((c) => (<SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>))}</SelectContent></Select></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="umurBisnis">Umur Bisnis (tahun)</Label><Input id="umurBisnis" type="number" value={formData.umurBisnis} onChange={(e) => setFormData({ ...formData, umurBisnis: e.target.value })} disabled={isLoading}/></div>
            <div className="space-y-2"><Label htmlFor="jumlahKaryawan">Jumlah Karyawan</Label><Input id="jumlahKaryawan" type="number" value={formData.jumlahKaryawan} onChange={(e) => setFormData({ ...formData, jumlahKaryawan: e.target.value })} disabled={isLoading}/></div>
          </div>
          <div className="space-y-2"><Label htmlFor="alamat">Alamat Lengkap *</Label><Input id="alamat" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} placeholder="Masukkan alamat lengkap bisnis" disabled={isLoading}/></div>
          <div className="space-y-2"><Label htmlFor="provinsi">Provinsi *</Label><Select value={formData.provinsi} onValueChange={(value) => setFormData({ ...formData, provinsi: value })} disabled={isLoading}><SelectTrigger><SelectValue placeholder="Pilih provinsi" /></SelectTrigger><SelectContent>{provinces.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}</SelectContent></Select></div>
          <div className="space-y-2"><Label htmlFor="fotoBisnis">Foto Bisnis</Label><Input id="fotoBisnis" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, fotoBisnis: e.target.files?.[0] || null })} disabled={isLoading}/></div>
          <div className="space-y-2"><Label>Apakah bisnis Anda sudah terdigitalisasi? *</Label><RadioGroup value={isDigitalized} onValueChange={setIsDigitalized} disabled={isLoading}><div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="yes" /><Label htmlFor="yes">Ya</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="no" id="no" /><Label htmlFor="no">Tidak</Label></div></RadioGroup></div>
          {isDigitalized === 'yes' && (<div className="space-y-4 pt-4 mt-4 border-t"><div className="space-y-2"><Label htmlFor="nmid">Nomor Rekening QRIS (NMID)</Label><Input id="nmid" type="number" value={formData.nmid} onChange={(e) => setFormData({ ...formData, nmid: e.target.value })} placeholder="Masukkan angka saja" disabled={isLoading}/></div><div className="space-y-2"><Label htmlFor="nr">Nomor Rekening</Label><Input id="nr" type="number" value={formData.nr} onChange={(e) => setFormData({ ...formData, nr: e.target.value })} placeholder="Masukkan angka saja" disabled={isLoading}/></div><div className="space-y-2"><Label htmlFor="nib">Nomor Izin Berusaha (NIB)</Label><Input id="nib" type="number" value={formData.nib} onChange={(e) => setFormData({ ...formData, nib: e.target.value })} placeholder="Masukkan angka saja" disabled={isLoading}/></div></div>)}
        </>
      );
      case 3: return (
        <div className="space-y-4">
          <div><h3 className="text-lg font-semibold">Identitas Diri</h3><div className="text-sm text-muted-foreground"><p><strong>Nama:</strong> {formData.nama}</p><p><strong>Email:</strong> {formData.email}</p><p><strong>NIK:</strong> {formData.nik}</p><p><strong>No. Telepon:</strong> {formData.phone}</p></div></div>
          <div><h3 className="text-lg font-semibold">Profil Bisnis</h3><div className="text-sm text-muted-foreground"><p><strong>Nama Bisnis:</strong> {formData.namaBisnis}</p><p><strong>Kategori:</strong> {businessCategories.find(c => c.value === formData.kategori)?.label}</p><p><strong>Umur Bisnis:</strong> {formData.umurBisnis} tahun</p><p><strong>Alamat:</strong> {formData.alamat}</p><p><strong>Provinsi:</strong> {formData.provinsi}</p><p><strong>Jumlah Karyawan:</strong> {formData.jumlahKaryawan}</p></div></div>
          {isDigitalized === 'yes' && (<div><h3 className="text-lg font-semibold">Data Digitalisasi</h3><div className="text-sm text-muted-foreground"><p><strong>NMID:</strong> {formData.nmid}</p><p><strong>Nomor Rekening:</strong> {formData.nr}</p><p><strong>NIB:</strong> {formData.nib}</p></div></div>)}
        </div>
      );
      case 4: return (
        <div className="text-center py-8">
          {isLoading && (<div className="flex flex-col items-center gap-4"><Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-lg font-semibold">
              {aiCheckStatus === 'fraud_detection' && 'Menganalisis Potensi Penipuan...'}
              {aiCheckStatus === 'clustering' && 'Mengelompokkan Profil Bisnis...'}
              {aiCheckStatus === 'credit_scoring' && 'Menghitung Skor Kredit...'}
            </p>
          </div>)}
          {aiCheckStatus === 'success' && (<div className="flex flex-col items-center gap-4 text-center"><CheckCircle2 className="w-16 h-16 text-green-500" /><h3 className="text-2xl font-bold">Pengecekan AI Selesai!</h3><p>Selamat! Anda lolos semua pengecekan.</p><div className="mt-4"><p className="text-lg">Credit Score Anda:</p><p className="text-5xl font-bold text-primary">{creditScore}</p></div></div>)}
          {aiCheckStatus === 'failed' && (<div className="flex flex-col items-center gap-4 text-center"><ShieldCheck className="w-16 h-16 text-red-500" /><h3 className="text-2xl font-bold">Pengecekan Gagal</h3><p>Maaf, pendaftaran Anda tidak dapat kami proses saat ini.</p><Button onClick={() => navigate('/dashboard-umkm')} className="mt-4">Kembali ke Dashboard</Button></div>)}
        </div>
      );
      case 5: return (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-10 h-10 text-primary" /></div>
          <h3 className="text-2xl font-bold mb-2">Usaha Anda Berhasil Didaftarkan!</h3>
          <p className="text-muted-foreground">Selamat! Akun UMKM Anda telah berhasil dibuat dan diverifikasi.</p>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8"><img src={logo} alt="TemanUsaha" className="block mx-auto w-48 h-auto md:w-56 drop-shadow-md transition-transform duration-300 hover:scale-105" style={{ position: "relative", left: "30px" }} /><h1 className="text-3xl font-bold">Daftar sebagai UMKM</h1></div>
        <StepIndicator currentStep={currentStep} totalSteps={5} steps={steps} />
        <Card className="shadow-lg"><CardHeader><CardTitle>{steps[currentStep - 1]}</CardTitle></CardHeader><CardContent className="space-y-4">{renderStepContent()}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && currentStep < 4 && (<Button variant="outline" onClick={handleBack} disabled={isLoading}>Kembali</Button>)}
            <Button onClick={handleNext} className={currentStep === 1 || (currentStep === 4 && aiCheckStatus === 'failed') ? "w-full" : "ml-auto"} disabled={isLoading || (currentStep === 4 && aiCheckStatus !== 'success' && aiCheckStatus !== 'failed')}>
              {isLoading ? "Loading..." : 
                currentStep === 3 ? "Konfirmasi & Lanjutkan" :
                currentStep === 4 && aiCheckStatus === 'success' ? "Lanjutkan" :
                currentStep === 5 ? "Masuk ke Dashboard" : "Lanjut"}
            </Button>
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
};
export default RegisterUMKM;