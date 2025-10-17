import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, QrCode, FileText, Smartphone } from "lucide-react";
import logo from "@/assets/logo.png";

const DigitalisasiGuide = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "Download Aplikasi QRIS",
      description: "Unduh aplikasi QRIS dari bank atau e-wallet pilihan Anda (GoPay, OVO, Dana, dll).",
    },
    {
      icon: FileText,
      title: "Siapkan Dokumen",
      description: "Siapkan KTP, NIB (Nomor Induk Berusaha), dan dokumen usaha lainnya.",
    },
    {
      icon: QrCode,
      title: "Daftar QRIS",
      description: "Ikuti proses pendaftaran di aplikasi dan tunggu approval (biasanya 1-3 hari kerja).",
    },
    {
      icon: CheckCircle2,
      title: "Dapatkan NMID",
      description: "Setelah disetujui, Anda akan mendapat NMID (Nomor Merchant ID) untuk QRIS Anda.",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <img src={logo} alt="TemanUsaha" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Panduan Digitalisasi UMKM</h1>
          <p className="text-muted-foreground">
            Ikuti langkah-langkah berikut untuk mendapatkan QRIS dan bergabung dengan TemanUsaha
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-6 h-6 text-primary" />
              Cara Mendapatkan QRIS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">Butuh Bantuan?</h3>
            <p className="mb-4">
              Tim kami siap membantu Anda dalam proses digitalisasi usaha. Hubungi kami di:
            </p>
            <div className="space-y-2">
              <p className="font-medium">📱 WhatsApp: +62 812-3456-7890</p>
              <p className="font-medium">📧 Email: support@temanusaha.id</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/register-umkm">Kembali ke Pendaftaran</Link>
          </Button>
          <Button asChild size="lg">
            <Link to="/">Ke Halaman Utama</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DigitalisasiGuide;
