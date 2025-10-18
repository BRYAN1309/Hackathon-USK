import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import logo from "../assets/logo.svg";
import investorBg from "@/assets/investorPit-2.jpg";

const RegisterInvestor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    nik: "",
    phone: "",
    ktp: null as File | null,
    fokusInvestasi: "",
    tanggalAktif: "",
    jumlahPortfolio: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, ktp: e.target.files?.[0] || null }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, fokusInvestasi: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Pendaftaran Berhasil!",
        description: "Akun investor Anda berhasil dibuat.",
      });
      navigate("/dashboard-investor");
    }, 1500);
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${investorBg})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <Card className="w-full max-w-2xl shadow-lg z-10">
        <CardHeader className="space-y-4 text-center">
          <div className="relative w-full">
            <img
              src={logo}
              alt="TemanUsaha"
              className="block mx-auto w-48 h-auto md:w-56 drop-shadow-md transition-transform duration-300 hover:scale-105"
              style={{ position: "relative", left: "30px" }}
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Daftar sebagai Investor
          </CardTitle>
          <CardDescription>
            Isi formulir di bawah ini untuk memulai investasi Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Informasi Personal
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input id="nama" value={formData.nama} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK</Label>
                  <Input id="nik" value={formData.nik} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input id="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ktp">Upload Foto KTP</Label>
                  <Input id="ktp" type="file" accept="image/*" onChange={handleFileChange} required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Detail Investasi
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fokusInvestasi">Fokus Investasi</Label>
                  <Select value={formData.fokusInvestasi} onValueChange={handleSelectChange}>
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
                  <Input id="tanggalAktif" type="date" value={formData.tanggalAktif} onChange={handleChange} required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="jumlahPortfolio">
                    Jumlah Portfolio Aktif yang Diinginkan
                  </Label>
                  <Input id="jumlahPortfolio" type="number" value={formData.jumlahPortfolio} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Mendaftar..." : "Daftar Sekarang"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link to="/login-investor" className="text-primary font-medium hover:underline">
                Masuk di sini
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterInvestor;