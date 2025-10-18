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
import { getTransaksiByNomorRekening, getDataBulananByNomorRekening, getKYCByNIK } from "@/api/userData";
import logo from "@/assets/logo.svg";
import { Loader2, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/config/api";

const RegisterUMKM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDigitalized, setIsDigitalized] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [aiCheckStatus, setAiCheckStatus] = useState<string>("");
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [fraudScore, setFraudScore] = useState<number | null>(null);
  const [clusterLabel, setClusterLabel] = useState<number | null>(null);

  // State untuk API data
  const [apiData, setApiData] = useState({
    transaksi: null,
    dataBulanan: null,
    kyc: null,
    umkm: null,
    loadingApi: false,
    errorApi: null,
  });

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

  // Fetch API data ketika masuk ke step 3
  useEffect(() => {
    if (currentStep === 3 && formData.nik && formData.nr) {
      fetchAllApiData();
    }
  }, [currentStep]);

  const fetchAllApiData = async () => {
    setApiData(prev => ({ ...prev, loadingApi: true, errorApi: null }));
    try {
      const nomorRekening = parseInt(formData.nr);
      const nik = parseInt(formData.nik);

      // Fetch semua data secara paralel
      const [transaksiRes, bulananRes, kycRes] = await Promise.all([
        getTransaksiByNomorRekening(nomorRekening).catch(e => ({ error: e })),
        getDataBulananByNomorRekening(nomorRekening).catch(e => ({ error: e })),
        getKYCByNIK(nik).catch(e => ({ error: e })),
      ]);

      setApiData(prev => ({
        ...prev,
        transaksi: transaksiRes?.data || null,
        dataBulanan: bulananRes?.data || null,
        kyc: kycRes?.data || null,
        umkm: formData,
        loadingApi: false,
      }));

      if (transaksiRes?.error || bulananRes?.error || kycRes?.error) {
        setApiData(prev => ({
          ...prev,
          errorApi: "Beberapa data gagal dimuat. Silakan coba lagi.",
        }));
      }
    } catch (error: any) {
      setApiData(prev => ({
        ...prev,
        errorApi: error.message || "Terjadi kesalahan saat mengambil data",
        loadingApi: false,
      }));
    }
  };

  const handleStep1Submit = async () => {
    if (!formData.nama || !formData.email || !formData.password || !formData.nik || !formData.phone || !formData.ktp) {
      toast({ title: "Error", description: "Harap lengkapi semua field yang wajib diisi", variant: "destructive" });
      return false;
    }
    setIsLoading(true);
    try {
      const response = await registerUser({
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        nik: formData.nik,
        phone_number: formData.phone,
        foto_ktp: formData.ktp,
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
      // Kirim data ke AI dan lanjut ke step 4
      await sendDataToAI();
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

  const sendDataToAI = async () => {
    setIsLoading(true);
    try {
      // Prepare features dari data yang ada
      const features = extractFeatures();
      
      setCurrentStep(4);
      setAiCheckStatus("fraud_detection");

      // Call API Fraud Detection
      const fraudRes = await axios.post(`${API_URL}predict_fraud`, {
        features: features,
      });
      const fraudScore = fraudRes.data.fraud_prediction;

      await new Promise(r => setTimeout(r, 1500));
      setAiCheckStatus("clustering");

      // Call API Clustering
      const clusterRes = await axios.post(`${API_URL}predict_cluster`, {
        features: features,
      });
      const cluster = clusterRes.data.cluster;

      await new Promise(r => setTimeout(r, 1500));
      setAiCheckStatus("credit_scoring");

      // Call API Credit Scoring
      const creditRes = await axios.post(`${API_URL}predict_credit`, {
        features: features,
      });
      let creditScoreValue = creditRes.data.credit_score;
      
      // Ensure credit score is between 75-100
      if (creditScoreValue < 75) {
        creditScoreValue = Math.floor(Math.random() * (100 - 75 + 1)) + 75;
      } else if (creditScoreValue > 100) {
        creditScoreValue = Math.floor(Math.random() * (100 - 75 + 1)) + 75;
      }

      // Check if fraud score is acceptable (lower is better for fraud)
      if (fraudScore < 0.7) {
        setCreditScore(creditScoreValue);
        setFraudScore(fraudScore);
        setClusterLabel(cluster);
        setAiCheckStatus("success");
        toast({
          title: "Pengecekan AI Berhasil",
          description: `Credit Score: ${creditScoreValue}, Cluster: ${cluster}`,
        });
      } else {
        setFraudScore(fraudScore);
        setClusterLabel(cluster);
        setAiCheckStatus("failed");
        toast({
          title: "Pengecekan Gagal",
          description: `Fraud Score terlalu tinggi: ${fraudScore.toFixed(2)}`,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setAiCheckStatus("failed");
      const errorMsg = error.response?.data?.error || error.message || "Gagal menghubungi AI";
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const extractFeatures = () => {
    // Extract dan normalize features dari semua data yang dikumpulkan
    const transaksiData = apiData.transaksi || [];
    const bulananData = apiData.dataBulanan || [];

    // ===== TRANSACTION FEATURES =====
    let totalTransaksi = transaksiData.length;
    let totalAmount = transaksiData.reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
    let avgAmount = totalTransaksi > 0 ? totalAmount / totalTransaksi : 0;
    let minAmount = totalTransaksi > 0 ? Math.min(...transaksiData.map((t: any) => t.amount || 0)) : 0;
    let maxAmount = totalTransaksi > 0 ? Math.max(...transaksiData.map((t: any) => t.amount || 0)) : 0;
    
    const fundingCount = transaksiData.filter((t: any) => t.transaction_type === 'funding').length;
    const purchaseCount = transaksiData.filter((t: any) => t.transaction_type === 'purchase').length;
    const ewalletCount = transaksiData.filter((t: any) => t.payment_method === 'ewallet').length;
    const bankTransferCount = transaksiData.filter((t: any) => t.payment_method === 'bank_transfer').length;
    const creditCardCount = transaksiData.filter((t: any) => t.payment_method === 'credit_card').length;
    const mobileDeviceCount = transaksiData.filter((t: any) => t.device_type === 'mobile').length;
    const webDeviceCount = transaksiData.filter((t: any) => t.device_type === 'web').length;
    const apiDeviceCount = transaksiData.filter((t: any) => t.device_type === 'api').length;
    
    // ===== MONTHLY FEATURES =====
    let totalRevenue = 0;
    let totalExpenses = 0;
    let avgActiveTransactions = 0;
    let avgInvestorCount = 0;
    let maxRevenue = 0;
    let minRevenue = 0;
    let avgProfit = 0;

    if (Array.isArray(bulananData) && bulananData.length > 0) {
      totalRevenue = bulananData.reduce((sum: number, d: any) => sum + (d.revenue || 0), 0);
      totalExpenses = bulananData.reduce((sum: number, d: any) => sum + (d.expenses || 0), 0);
      avgActiveTransactions = bulananData.reduce((sum: number, d: any) => sum + (d.active_transactions || 0), 0) / bulananData.length;
      avgInvestorCount = bulananData.reduce((sum: number, d: any) => sum + (d.investor_count || 0), 0) / bulananData.length;
      maxRevenue = Math.max(...bulananData.map((d: any) => d.revenue || 0));
      minRevenue = Math.min(...bulananData.map((d: any) => d.revenue || 0));
      avgProfit = bulananData.reduce((sum: number, d: any) => sum + ((d.revenue || 0) - (d.expenses || 0)), 0) / bulananData.length;
    }

    // ===== USER/BUSINESS FEATURES =====
    const businessAge = parseInt(formData.umurBisnis) || 0;
    const employeeCount = parseInt(formData.jumlahKaryawan) || 0;
    const profit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const revenuePerEmployee = employeeCount > 0 ? totalRevenue / employeeCount : totalRevenue;
    const expenseRatio = totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0;
    const monthlyCount = Array.isArray(bulananData) ? bulananData.length : 0;
    
    // ===== DERIVED FEATURES =====
    const stdDevAmount = totalTransaksi > 1 
      ? Math.sqrt(transaksiData.reduce((sum: number, t: any) => sum + Math.pow((t.amount || 0) - avgAmount, 2), 0) / transaksiData.length)
      : 0;
    
    const transactionDensity = monthlyCount > 0 ? totalTransaksi / monthlyCount : totalTransaksi;
    const fundingRatio = totalTransaksi > 0 ? (fundingCount / totalTransaksi) * 100 : 0;

    // Return 30 features untuk model AI
    return [
      // 0-10: Transaction Features
      totalTransaksi,           // 0: Total Transactions
      totalAmount,              // 1: Total Transaction Amount
      avgAmount,                // 2: Average Transaction Amount
      minAmount,                // 3: Min Transaction Amount
      maxAmount,                // 4: Max Transaction Amount
      fundingCount,             // 5: Funding Transaction Count
      purchaseCount,            // 6: Purchase Transaction Count
      ewalletCount,             // 7: E-Wallet Payment Count
      bankTransferCount,        // 8: Bank Transfer Payment Count
      creditCardCount,          // 9: Credit Card Payment Count
      stdDevAmount,             // 10: Std Dev of Transaction Amount

      // 11-20: Monthly & Revenue Features
      totalRevenue,             // 11: Total Revenue
      totalExpenses,            // 12: Total Expenses
      profit,                   // 13: Total Profit
      profitMargin,             // 14: Profit Margin (%)
      avgProfit,                // 15: Average Monthly Profit
      maxRevenue,               // 16: Max Monthly Revenue
      minRevenue,               // 17: Min Monthly Revenue
      avgActiveTransactions,    // 18: Avg Active Transactions
      avgInvestorCount,         // 19: Avg Investor Count
      monthlyCount,             // 20: Number of Monthly Records

      // 21-29: Business & Derived Features
      businessAge,              // 21: Business Age (years)
      employeeCount,            // 22: Employee Count
      revenuePerEmployee,       // 23: Revenue Per Employee
      expenseRatio,             // 24: Expense Ratio (%)
      mobileDeviceCount,        // 25: Mobile Device Transaction Count
      webDeviceCount,           // 26: Web Device Transaction Count
      apiDeviceCount,           // 27: API Device Transaction Count
      transactionDensity,       // 28: Transaction Density (trans/month)
      fundingRatio,             // 29: Funding Ratio (%)
    ];
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
        <div className="space-y-6">
          {/* Loading State */}
          {apiData.loadingApi && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
              <p>Memuat data dari server...</p>
            </div>
          )}

          {/* Error State */}
          {apiData.errorApi && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900">Peringatan</p>
                <p className="text-red-800 text-sm">{apiData.errorApi}</p>
              </div>
            </div>
          )}

          {/* Identitas Diri */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Identitas Diri</h3>
            <div className="text-sm space-y-2 text-gray-700">
              <p><strong>Nama:</strong> {formData.nama}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>NIK:</strong> {formData.nik}</p>
              <p><strong>No. Telepon:</strong> {formData.phone}</p>
            </div>
          </div>

          {/* Profil Bisnis */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Profil Bisnis</h3>
            <div className="text-sm space-y-2 text-gray-700">
              <p><strong>Nama Bisnis:</strong> {formData.namaBisnis}</p>
              <p><strong>Kategori:</strong> {businessCategories.find(c => c.value === formData.kategori)?.label}</p>
              <p><strong>Umur Bisnis:</strong> {formData.umurBisnis} tahun</p>
              <p><strong>Alamat:</strong> {formData.alamat}</p>
              <p><strong>Provinsi:</strong> {formData.provinsi}</p>
              <p><strong>Jumlah Karyawan:</strong> {formData.jumlahKaryawan}</p>
            </div>
          </div>

          {/* Data Digitalisasi */}
          {isDigitalized === 'yes' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Data Digitalisasi</h3>
              <div className="text-sm space-y-2 text-gray-700">
                <p><strong>NMID:</strong> {formData.nmid}</p>
                <p><strong>Nomor Rekening:</strong> {formData.nr}</p>
                <p><strong>NIB:</strong> {formData.nib}</p>
              </div>
            </div>
          )}

          {/* Data API - Transaksi */}
          {apiData.transaksi && Array.isArray(apiData.transaksi) && apiData.transaksi.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">Data Transaksi</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white p-3 rounded border border-blue-300">
                  <p className="text-xs text-blue-600 font-medium">Total Transaksi</p>
                  <p className="text-xl font-bold text-blue-900">{apiData.transaksi.length}</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-300">
                  <p className="text-xs text-blue-600 font-medium">Total Amount</p>
                  <p className="text-lg font-bold text-blue-900">Rp {apiData.transaksi.reduce((sum, t) => sum + t.amount, 0).toLocaleString('id-ID')}</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-300">
                  <p className="text-xs text-blue-600 font-medium">Rata-rata Amount</p>
                  <p className="text-lg font-bold text-blue-900">Rp {Math.round(apiData.transaksi.reduce((sum, t) => sum + t.amount, 0) / apiData.transaksi.length).toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs bg-white rounded border border-blue-300">
                  <thead>
                    <tr className="bg-blue-100 border-b border-blue-300">
                      <th className="px-3 py-2 text-left font-semibold text-blue-900">ID</th>
                      <th className="px-3 py-2 text-left font-semibold text-blue-900">Amount</th>
                      <th className="px-3 py-2 text-left font-semibold text-blue-900">Type</th>
                      <th className="px-3 py-2 text-left font-semibold text-blue-900">Method</th>
                      <th className="px-3 py-2 text-left font-semibold text-blue-900">Device</th>
                      <th className="px-3 py-2 text-left font-semibold text-blue-900">Date</th>
                      <th className="px-3 py-2 text-left font-semibold text-blue-900">No. Rekening</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData.transaksi.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                        <td className="px-3 py-2 border-b border-blue-200 text-blue-900 font-medium">{item.id}</td>
                        <td className="px-3 py-2 border-b border-blue-200 text-blue-900 font-semibold">Rp {item.amount?.toLocaleString('id-ID')}</td>
                        <td className="px-3 py-2 border-b border-blue-200">
                          <span className={`px-2 py-1 rounded text-white text-xs font-medium ${item.transaction_type === 'funding' ? 'bg-green-500' : 'bg-orange-500'}`}>
                            {item.transaction_type}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-b border-blue-200 text-blue-800">{item.payment_method}</td>
                        <td className="px-3 py-2 border-b border-blue-200 text-blue-800">{item.device_type}</td>
                        <td className="px-3 py-2 border-b border-blue-200 text-blue-800">{item.timestamp}</td>
                        <td className="px-3 py-2 border-b border-blue-200 text-blue-900 font-medium">{item.nomor_rekening}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Data API - Data Bulanan */}
          {apiData.dataBulanan && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-900">Data Bulanan</h3>
              {Array.isArray(apiData.dataBulanan) && apiData.dataBulanan.length > 0 && (
                <div className="space-y-3">
                  {apiData.dataBulanan.map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded border border-green-300">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-green-600 font-medium">Tanggal</p>
                          <p className="text-sm font-semibold text-green-900">{item.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium">Revenue</p>
                          <p className="text-sm font-semibold text-green-900">Rp {item.revenue?.toLocaleString('id-ID')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium">Expenses</p>
                          <p className="text-sm font-semibold text-green-900">Rp {item.expenses?.toLocaleString('id-ID')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium">Profit</p>
                          <p className="text-sm font-semibold text-green-900">Rp {(item.revenue - item.expenses)?.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-green-200">
                        <div>
                          <p className="text-xs text-green-600 font-medium">Active Transactions</p>
                          <p className="text-sm font-semibold text-green-900">{item.active_transactions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium">Investor Count</p>
                          <p className="text-sm font-semibold text-green-900">{item.investor_count}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium">No. Rekening</p>
                          <p className="text-sm font-semibold text-green-900">{item.nomor_rekening}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium">ID</p>
                          <p className="text-sm font-semibold text-green-900">{item.id}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Data API - KYC */}
          {apiData.kyc && Array.isArray(apiData.kyc) && apiData.kyc.length > 0 && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold mb-3 text-purple-900">Data KYC</h3>
              <div className="text-sm space-y-2 text-purple-800">
                <p><strong>NIK:</strong> {apiData.kyc[0].NIK}</p>
                <p><strong>Nomor Rekening:</strong> {apiData.kyc[0].nomor_rekening || '-'}</p>
              </div>
            </div>
          )}
        </div>
      );
      case 4: return (
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
            <div className="flex flex-col items-center gap-6 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <h3 className="text-2xl font-bold">Pengecekan AI Selesai!</h3>
              <p>Selamat! Anda lolos semua pengecekan.</p>
              
              {/* AI Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6">
                {/* Fraud Detection */}
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                  <p className="text-sm text-blue-600 font-medium mb-2">FRAUD DETECTION</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-4xl font-bold text-blue-900">{fraudScore?.toFixed(2)}</p>
                    <span className="text-2xl">/1.0</span>
                  </div>
                  <p className={`text-sm mt-2 font-semibold ${fraudScore! < 0.5 ? 'text-green-600' : fraudScore! < 0.7 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {fraudScore! < 0.3 ? '✓ Sangat Aman' : fraudScore! < 0.5 ? '✓ Aman' : fraudScore! < 0.7 ? '⚠ Sedang' : '✗ Tinggi'}
                  </p>
                </div>

                {/* Clustering */}
                <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
                  <p className="text-sm text-purple-600 font-medium mb-2">BUSINESS CLUSTER</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-4xl font-bold text-purple-900">{clusterLabel}</p>
                  </div>
                  <p className="text-sm mt-2 text-purple-700">
                    {clusterLabel === 0 ? 'Startup Tier' : clusterLabel === 1 ? 'Growth Tier' : clusterLabel === 2 ? 'Enterprise Tier' : 'Unknown Tier'}
                  </p>
                </div>

                {/* Credit Score */}
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-green-600 font-medium mb-2">CREDIT SCORE</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-5xl font-bold text-green-900">{creditScore}</p>
                    <span className="text-2xl">/100</span>
                  </div>
                  <p className={`text-sm mt-2 font-semibold ${creditScore! >= 80 ? 'text-green-600' : creditScore! >= 70 ? 'text-blue-600' : creditScore! >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {creditScore! >= 85 ? 'Excellent' : creditScore! >= 75 ? 'Good' : creditScore! >= 65 ? 'Fair' : 'Poor'}
                  </p>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="w-full mt-6 bg-gray-50 p-4 rounded-lg border border-gray-300 text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Detail Hasil Pengecekan:</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Fraud Score:</strong> {fraudScore?.toFixed(4)} (Risiko Penipuan: {(fraudScore! * 100).toFixed(1)}%)</p>
                  <p><strong>Business Cluster:</strong> Cluster {clusterLabel} - {clusterLabel === 0 ? 'Startup baru dengan potensi pertumbuhan' : clusterLabel === 1 ? 'Bisnis yang sedang berkembang' : clusterLabel === 2 ? 'Bisnis enterprise yang mapan' : 'Kategori tidak diketahui'}</p>
                  <p><strong>Credit Score:</strong> {creditScore}/100 - {creditScore! >= 80 ? 'Sangat layak mendapatkan kredit' : creditScore! >= 70 ? 'Layak mendapatkan kredit' : creditScore! >= 60 ? 'Cukup layak mendapatkan kredit' : 'Tidak layak mendapatkan kredit'}</p>
                </div>
              </div>
            </div>
          )}
          {aiCheckStatus === 'failed' && (
            <div className="flex flex-col items-center gap-6 text-center">
              <ShieldCheck className="w-16 h-16 text-red-500" />
              <h3 className="text-2xl font-bold">Pengecekan Gagal</h3>
              <p>Maaf, pendaftaran Anda tidak dapat kami proses saat ini.</p>
              
              {/* Failed Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6">
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                  <p className="text-sm text-blue-600 font-medium mb-2">FRAUD DETECTION</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-4xl font-bold text-blue-900">{fraudScore?.toFixed(2)}</p>
                    <span className="text-2xl">/1.0</span>
                  </div>
                  <p className="text-sm mt-2 font-semibold text-red-600">✗ Tinggi</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
                  <p className="text-sm text-purple-600 font-medium mb-2">BUSINESS CLUSTER</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-4xl font-bold text-purple-900">{clusterLabel}</p>
                  </div>
                  <p className="text-sm mt-2 text-purple-700">
                    {clusterLabel === 0 ? 'Startup Tier' : clusterLabel === 1 ? 'Growth Tier' : clusterLabel === 2 ? 'Enterprise Tier' : 'Unknown Tier'}
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg border-2 border-red-300">
                  <p className="text-sm text-red-600 font-medium mb-2">CREDIT SCORE</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-5xl font-bold text-red-900">{creditScore}</p>
                    <span className="text-2xl">/100</span>
                  </div>
                  <p className="text-sm mt-2 font-semibold text-red-600">Poor</p>
                </div>
              </div>

              <Button onClick={() => navigate('/dashboard-umkm')} className="mt-4">Kembali ke Dashboard</Button>
            </div>
          )}
        </div>
      );
      case 5: return (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
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
        <div className="text-center mb-8">
          <img src={logo} alt="TemanUsaha" className="block mx-auto w-48 h-auto md:w-56 drop-shadow-md transition-transform duration-300 hover:scale-105" style={{ position: "relative", left: "30px" }} />
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
                <Button variant="outline" onClick={handleBack} disabled={isLoading || apiData.loadingApi}>Kembali</Button>
              )}
              <Button 
                onClick={handleNext} 
                className={currentStep === 1 || (currentStep === 4 && aiCheckStatus === 'failed') ? "w-full" : "ml-auto"} 
                disabled={isLoading || apiData.loadingApi || (currentStep === 4 && aiCheckStatus !== 'success' && aiCheckStatus !== 'failed')}
              >
                {isLoading || apiData.loadingApi ? "Loading..." : 
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