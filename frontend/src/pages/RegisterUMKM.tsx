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
import { Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";

import { getTransaksiByNomorRekening, getDataBulananByNomorRekening, getKYCByNIK } from "@/api/userData";

// Interface untuk data tambahan - disesuaikan dengan response API
interface TransaksiData {
  id?: number;
  tanggal?: string;
  jumlah?: number;
  jenis?: string;
  nomor_rekening?: string;
  [key: string]: any; // Untuk menampung field tambahan
}

interface DataBulanan {
  date?: string;
  revenue?: number;
  expenses?: number;
  active_transactions?: number;
  investor_count?: number;
  nomor_rekening?: string;
  [key: string]: any; // Untuk menampung field tambahan
}

interface KYCData {
  id?: number;
  user_id?: number;
  NIK?: string;
  nomor_rekening?: string;
  created_at?: string;
  [key: string]: any; // Untuk menampung field tambahan
}

const RegisterUMKM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDigitalized, setIsDigitalized] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [aiCheckStatus, setAiCheckStatus] = useState<string>("");
  const [creditScore, setCreditScore] = useState<number | null>(null);
  
  // State untuk data tambahan
  const [transaksiData, setTransaksiData] = useState<TransaksiData[]>([]);
  const [dataBulanan, setDataBulanan] = useState<DataBulanan[]>([]);
  const [kycData, setKycData] = useState<KYCData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const steps = ["Identitas", "Profil Bisnis", "Konfirmasi Data", "Pengecekan AI", "Selesai"];

  const provinces = [
    "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Sulawesi Utara",
    "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan",
    "Sulawesi Tenggara", "Maluku Utara", "Maluku", "Papua Barat",
    "Papua Barat Daya", "Papua Pegunungan", "Papua Tengah", "Papua Selatan", "Papua"
  ];

  const businessCategories = [{ value: "fnb", label: "Food & Beverage" }];

  const [formData, setFormData] = useState({
    nama: "", 
    email: "", 
    password: "", 
    nik: "", // Tetap sebagai string untuk input handling
    phone: "", 
    ktp: null as File | null,
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

  // useEffect untuk mengambil data tambahan saat step 3 berdasarkan NIK dan nomor rekening
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentStep === 3) {
        setIsLoadingData(true);
        try {
          console.log('Fetching data dengan parameter:', {
            nik: formData.nik,
            nr: formData.nr
          });

          // Array untuk menyimpan semua promise
          const promises: Promise<any>[] = [];

          // Ambil data KYC berdasarkan NIK dari step 1 - Convert ke number
          if (formData.nik) {
            const nikNumber = Number(formData.nik);
            if (!isNaN(nikNumber)) {
              console.log('Memanggil getKYCByNIK dengan:', nikNumber);
              promises.push(getKYCByNIK(nikNumber));
            } else {
              console.log('NIK tidak valid:', formData.nik);
              promises.push(Promise.resolve([]));
            }
          } else {
            promises.push(Promise.resolve([]));
          }

          // Ambil data transaksi dan data bulanan berdasarkan nomor rekening dari step 2
          if (formData.nr) {
            console.log('Memanggil API dengan nomor rekening:', formData.nr);
            promises.push(getTransaksiByNomorRekening(formData.nr));
            promises.push(getDataBulananByNomorRekening(formData.nr));
          } else {
            promises.push(Promise.resolve([]));
            promises.push(Promise.resolve([]));
          }

          // Tunggu semua request selesai
          const [kycRes, transaksiRes, dataBulananRes] = await Promise.all(promises);

          console.log('Response dari API:', {
            kycRes,
            transaksiRes,
            dataBulananRes
          });

          // Process KYC data
          let processedKycData: KYCData[] = [];
          if (kycRes && kycRes.data) {
            processedKycData = Array.isArray(kycRes.data) ? kycRes.data : [kycRes.data];
          } else if (Array.isArray(kycRes)) {
            processedKycData = kycRes;
          } else if (kycRes) {
            processedKycData = [kycRes];
          }

          // Process transaksi data
          let processedTransaksiData: TransaksiData[] = [];
          if (transaksiRes && transaksiRes.data) {
            processedTransaksiData = Array.isArray(transaksiRes.data) ? transaksiRes.data : [transaksiRes.data];
          } else if (Array.isArray(transaksiRes)) {
            processedTransaksiData = transaksiRes;
          } else if (transaksiRes) {
            processedTransaksiData = [transaksiRes];
          }

          // Process data bulanan
          let processedDataBulanan: DataBulanan[] = [];
          if (dataBulananRes && dataBulananRes.data) {
            processedDataBulanan = Array.isArray(dataBulananRes.data) ? dataBulananRes.data : [dataBulananRes.data];
          } else if (Array.isArray(dataBulananRes)) {
            processedDataBulanan = dataBulananRes;
          } else if (dataBulananRes) {
            processedDataBulanan = [dataBulananRes];
          }

          console.log('Processed data:', {
            processedKycData,
            processedTransaksiData,
            processedDataBulanan
          });

          // Set state untuk masing-masing data
          setKycData(processedKycData);
          setTransaksiData(processedTransaksiData);
          setDataBulanan(processedDataBulanan);

        } catch (error) {
          console.error("Error fetching user data:", error);
          toast({
            title: "Error",
            description: "Gagal memuat data tambahan",
            variant: "destructive",
          });
        } finally {
          setIsLoadingData(false);
        }
      }
    };
    
    fetchUserData();
  }, [currentStep, formData.nik, formData.nr, toast]);

  const handleStep1Submit = async (): Promise<boolean> => {
    if (!formData.nama || !formData.email || !formData.password || !formData.nik || !formData.phone || !formData.ktp) {
      toast({ 
        title: "Error", 
        description: "Harap lengkapi semua field yang wajib diisi", 
        variant: "destructive" 
      });
      return false;
    }
    
    setIsLoading(true);
    try {
      // Convert nik ke number untuk API call
      const nikNumber = Number(formData.nik);
      if (isNaN(nikNumber)) {
        toast({ 
          title: "Error", 
          description: "NIK harus berupa angka", 
          variant: "destructive" 
        });
        return false;
      }

      const userFormData = new FormData();
      userFormData.append("nama", formData.nama);
      userFormData.append("email", formData.email);
      userFormData.append("password", formData.password);
      userFormData.append("nik", nikNumber.toString());
      userFormData.append("phone_number", formData.phone);
      if (formData.ktp) {
        userFormData.append("foto_ktp", formData.ktp);
      }

      const response = await registerUser(userFormData);
      
      const extractedUserId = response?.data?.user?.id || response?.data?.[0]?.id || response?.data?.id;
      if (extractedUserId) {
        setUserId(Number(extractedUserId));
        toast({ 
          title: "Berhasil", 
          description: "Registrasi user berhasil" 
        });
        return true;
      } else {
        throw new Error("User ID tidak ditemukan dalam response");
      }
    } catch (error: any) {
      console.error('Error registrasi user:', error);
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Gagal melakukan registrasi user", 
        variant: "destructive" 
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async (): Promise<boolean> => {
    if (!formData.namaBisnis || !formData.kategori || !formData.alamat || !formData.provinsi) {
      toast({ 
        title: "Error", 
        description: "Harap lengkapi field nama bisnis, kategori, alamat, dan provinsi", 
        variant: "destructive" 
      });
      return false;
    }
    
    if (!userId) {
      toast({ 
        title: "Error", 
        description: "User ID tidak ditemukan, silakan kembali ke step 1", 
        variant: "destructive" 
      });
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
        toast({ 
          title: "Berhasil", 
          description: "Registrasi UMKM berhasil" 
        });
        return true;
      }
      return true;
    } catch (error: any) {
      let errorMessage = "Gagal melakukan registrasi UMKM. Silakan coba lagi.";
      if (error.response?.data?.message) errorMessage = error.response.data.message;
      else if (error.response?.data?.detail) errorMessage = error.response.data.detail;
      else if (error.message) errorMessage = error.message;
      
      toast({ 
        title: "Error", 
        description: errorMessage, 
        variant: "destructive" 
      });
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
        toast({ 
          title: "Pendaftaran Gagal", 
          description: "Anda tidak lolos pengecekan AI.", 
          variant: "destructive" 
        });
        navigate('/dashboard-umkm');
      }
    } else if (currentStep === 5) {
      toast({ 
        title: "Pendaftaran Berhasil!", 
        description: "Usaha Anda berhasil didaftarkan." 
      });
      navigate("/dashboard-umkm");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Fungsi untuk handle input number
  const handleNumberInput = (field: string, value: string) => {
    // Hanya mengizinkan input angka
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, [field]: numericValue });
  };

  // Fungsi untuk menampilkan data dengan aman
  const displayValue = (value: any, defaultValue: string = '-') => {
    if (value === null || value === undefined || value === '') return defaultValue;
    return value.toString();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: 
        return (
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
                  onChange={(e) => handleNumberInput('nik', e.target.value)}
                  disabled={isLoading} 
                  placeholder="Masukkan 16 digit NIK"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">No. Telepon *</Label>
                <Input 
                  id="phone" 
                  value={formData.phone} 
                  onChange={(e) => handleNumberInput('phone', e.target.value)}
                  disabled={isLoading} 
                  placeholder="Contoh: 081234567890"
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
        );
      
      case 2: 
        return (
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
                    {businessCategories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
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
                  {provinces.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
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
                    value={formData.nmid} 
                    onChange={(e) => handleNumberInput('nmid', e.target.value)}
                    placeholder="Masukkan angka saja" 
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nr">Nomor Rekening</Label>
                  <Input 
                    id="nr" 
                    value={formData.nr} 
                    onChange={(e) => handleNumberInput('nr', e.target.value)}
                    placeholder="Masukkan angka saja" 
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nib">Nomor Izin Berusaha (NIB)</Label>
                  <Input 
                    id="nib" 
                    value={formData.nib} 
                    onChange={(e) => handleNumberInput('nib', e.target.value)}
                    placeholder="Masukkan angka saja" 
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}
          </>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Identitas Diri</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Nama:</strong> {formData.nama}<br />
                <strong>Email:</strong> {formData.email}<br />
                <strong>NIK:</strong> {formData.nik}<br />
                <strong>Telepon:</strong> {formData.phone}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Profil Bisnis</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Nama Bisnis:</strong> {formData.namaBisnis}<br />
                <strong>Kategori:</strong> {formData.kategori}<br />
                <strong>Alamat:</strong> {formData.alamat}<br />
                <strong>Provinsi:</strong> {formData.provinsi}<br />
                {formData.nr && <><strong>Nomor Rekening:</strong> {formData.nr}<br /></>}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h3 className="text-lg font-semibold">Data Tambahan</h3>

              {isLoadingData ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">Memuat data tambahan...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-1 gap-4">
                  <Card className="p-4 bg-muted/30">
                    <CardTitle className="text-base mb-2">Data KYC (by NIK: {formData.nik})</CardTitle>
                    <CardContent className="p-0 text-sm space-y-1">
                      {kycData.length > 0 ? (
                        kycData.map((item, index) => (
                          <div key={index} className="border-b pb-2 mb-2">
                            <p><strong>ID:</strong> {displayValue(item.id)}</p>
                            <p><strong>User ID:</strong> {displayValue(item.user_id)}</p>
                            <p><strong>NIK:</strong> {displayValue(item.NIK)}</p>
                            <p><strong>Nomor Rekening:</strong> {displayValue(item.nomor_rekening)}</p>
                            <p><strong>Dibuat:</strong> {item.created_at ? new Date(item.created_at).toLocaleString() : '-'}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">Tidak ada data KYC untuk NIK: {formData.nik}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="p-4 bg-muted/30">
                    <CardTitle className="text-base mb-2">Data Transaksi (by Nomor Rekening: {formData.nr})</CardTitle>
                    <CardContent className="p-0 text-sm space-y-1">
                      {transaksiData.length > 0 ? (
                        transaksiData.map((item, index) => (
                          <div key={index} className="border-b pb-2 mb-2">
                            <p><strong>ID:</strong> {displayValue(item.id)}</p>
                            <p><strong>Tanggal:</strong> {displayValue(item.tanggal)}</p>
                            <p><strong>Jumlah:</strong> {item.jumlah ? `Rp${item.jumlah.toLocaleString()}` : '0'}</p>
                            <p><strong>Jenis:</strong> {displayValue(item.jenis)}</p>
                            <p><strong>Nomor Rekening:</strong> {displayValue(item.nomor_rekening)}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">Tidak ada data transaksi untuk nomor rekening: {formData.nr}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="p-4 bg-muted/30">
                    <CardTitle className="text-base mb-2">Data Bulanan (by Nomor Rekening: {formData.nr})</CardTitle>
                    <CardContent className="p-0 text-sm space-y-1">
                      {dataBulanan.length > 0 ? (
                        dataBulanan.map((item, index) => (
                          <div key={index} className="border-b pb-2 mb-2">
                            <p><strong>Tanggal:</strong> {displayValue(item.date)}</p>
                            <p><strong>Pendapatan:</strong> Rp{displayValue(item.revenue, '0')}</p>
                            <p><strong>Pengeluaran:</strong> Rp{displayValue(item.expenses, '0')}</p>
                            <p><strong>Transaksi Aktif:</strong> {displayValue(item.active_transactions, '0')}</p>
                            <p><strong>Investor:</strong> {displayValue(item.investor_count, '0')}</p>
                            <p><strong>Nomor Rekening:</strong> {displayValue(item.nomor_rekening)}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">Tidak ada data bulanan untuk nomor rekening: {formData.nr}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        );

      case 4: 
        return (
          <div className="text-center py-8">
            {isLoading && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-lg font-semibold">
                  {aiCheckStatus === 'fraud_detection' && 'Menganalisis Potensi Penipuan...'}
                  {aiCheckStatus === 'clustering' && 'Mengelompokkan Profil Bisnis...'}
                  {aiCheckStatus === 'credit_scoring' && 'Menghitung Skor Kredit...'}
                </p>
              </div>
            )}
            {aiCheckStatus === 'success' && (
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <h3 className="text-2xl font-bold">Pengecekan AI Selesai!</h3>
                <p>Selamat! Anda lolos semua pengecekan.</p>
                <div className="mt-4">
                  <p className="text-lg">Credit Score Anda:</p>
                  <p className="text-5xl font-bold text-primary">{creditScore}</p>
                </div>
              </div>
            )}
            {aiCheckStatus === 'failed' && (
              <div className="flex flex-col items-center gap-4 text-center">
                <ShieldCheck className="w-16 h-16 text-red-500" />
                <h3 className="text-2xl font-bold">Pengecekan Gagal</h3>
                <p>Maaf, pendaftaran Anda tidak dapat kami proses saat ini.</p>
                <Button onClick={() => navigate('/dashboard-umkm')} className="mt-4">
                  Kembali ke Dashboard
                </Button>
              </div>
            )}
          </div>
        );
      
      case 5: 
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Usaha Anda Berhasil Didaftarkan!</h3>
            <p className="text-muted-foreground">
              Selamat! Akun UMKM Anda telah berhasil dibuat dan diverifikasi.
            </p>
          </div>
        );
      
      default: 
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <img 
            src={logo} 
            alt="TemanUsaha" 
            className="block mx-auto w-48 h-auto md:w-56 drop-shadow-md transition-transform duration-300 hover:scale-105" 
            style={{ position: "relative", left: "30px" }} 
          />
          <h1 className="text-3xl font-bold">Daftar sebagai UMKM</h1>
        </div>
        
        <StepIndicator currentStep={currentStep} totalSteps={5} steps={steps} />
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6">
              {currentStep > 1 && currentStep < 4 && (
                <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                  Kembali
                </Button>
              )}
              
              <Button 
                onClick={handleNext} 
                className={currentStep === 1 || (currentStep === 4 && aiCheckStatus === 'failed') ? "w-full" : "ml-auto"} 
                disabled={isLoading || (currentStep === 4 && aiCheckStatus !== 'success' && aiCheckStatus !== 'failed')}
              >
                {isLoading ? "Loading..." : 
                  currentStep === 3 ? "Konfirmasi & Lanjutkan" :
                  currentStep === 4 && aiCheckStatus === 'success' ? "Lanjutkan" :
                  currentStep === 5 ? "Masuk ke Dashboard" : "Lanjut"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterUMKM;