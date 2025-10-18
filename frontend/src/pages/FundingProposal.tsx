import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const FundingProposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ownershipType, setOwnershipType] = useState("equity");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/dashboard-umkm");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar type="umkm" />
      
      <div className="flex-1">
        <DashboardHeader userName="Warung Bu Sari" />
        
        <main className="p-6 max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/cari-investor")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Investor
          </Button>

          <div className="space-y-6">
            {/* Equity Ownership Section */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Apa itu Kepemilikan Saham (Equity)?</CardTitle>
                <CardDescription>Memahami konsep kepemilikan dalam bisnis Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Definisi Sederhana</h4>
                  <p className="text-muted-foreground">
                    Kepemilikan saham atau <strong>equity</strong> adalah bagian dari bisnis Anda yang Anda berikan kepada investor sebagai imbalan atas dana yang mereka investasikan. 
                    Bayangkan bisnis Anda seperti sebuah kue—ketika investor membeli saham, mereka mendapat "potongan kue" dari bisnis Anda.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Cara Kerja Equity</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Anda tetap menjadi pemilik mayoritas:</strong> Misalnya, jika investor membeli 20% saham, Anda masih memiliki 80% dari bisnis Anda.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Investor berbagi untung dan rugi:</strong> Jika bisnis untung, investor mendapat bagian sesuai persentase sahamnya. Jika rugi, mereka juga menanggung kerugian.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Tidak ada utang yang harus dibayar:</strong> Berbeda dengan pinjaman bank, Anda tidak perlu mengembalikan uang investor setiap bulan. Dana yang mereka berikan adalah investasi, bukan utang.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Hak suara terbatas:</strong> Investor biasanya memiliki hak untuk memberikan masukan, namun keputusan akhir bisnis tetap di tangan Anda sebagai pemilik mayoritas.</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Contoh Ilustrasi</h4>
                  <p className="text-sm text-muted-foreground">
                    Anda memiliki warung makan dan membutuhkan Rp 100 juta untuk ekspansi. Investor setuju memberikan dana tersebut dengan imbalan 15% kepemilikan saham. 
                    Artinya, dari setiap keuntungan Rp 1 juta yang bisnis Anda hasilkan, investor berhak mendapat Rp 150.000, sedangkan Anda mendapat Rp 850.000.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* ROI Section */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Apa itu Return of Investment (ROI)?</CardTitle>
                <CardDescription>Memahami pembagian keuntungan investasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Definisi Sederhana</h4>
                  <p className="text-muted-foreground">
                    <strong>Return of Investment (ROI)</strong> atau "imbal hasil investasi" adalah keuntungan yang diterima investor dari dana yang mereka tanamkan di bisnis Anda. 
                    ROI dihitung berdasarkan persentase keuntungan bisnis dibandingkan dengan jumlah uang yang diinvestasikan.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Cara Kerja ROI</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Dibagikan dari keuntungan bersih:</strong> ROI hanya dibagikan jika bisnis Anda menghasilkan keuntungan (profit). Jika tidak ada profit, tidak ada ROI yang dibagikan.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Persentase tetap atau bervariasi:</strong> Tergantung kesepakatan, ROI bisa berupa persentase tetap (misal 15% per tahun) atau mengikuti performa bisnis.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Periode pembagian:</strong> ROI biasanya dibagikan secara berkala—bisa bulanan, kuartalan, atau tahunan, sesuai perjanjian.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Semakin tinggi profit, semakin besar ROI:</strong> Jika bisnis Anda berkembang pesat, investor akan mendapat ROI lebih besar, dan Anda juga akan mendapat keuntungan lebih besar.</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Contoh Perhitungan ROI</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Investor menanamkan <strong>Rp 100 juta</strong> di bisnis Anda. Dalam satu tahun, bisnis Anda menghasilkan profit bersih <strong>Rp 200 juta</strong>.
                    </p>
                    <p>
                      Jika investor memiliki <strong>15% saham</strong>, maka ROI yang mereka terima adalah:
                    </p>
                    <p className="font-mono bg-background p-3 rounded border border-border">
                      ROI = 15% × Rp 200 juta = <strong className="text-primary">Rp 30 juta</strong>
                    </p>
                    <p>
                      Dalam hal ini, investor mendapat kembali uangnya (Rp 100 juta) ditambah keuntungan Rp 30 juta dalam setahun. 
                      Itu berarti ROI mereka adalah <strong>30%</strong> dari investasi awal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Syarat & Ketentuan</CardTitle>
                <CardDescription>Harap dibaca dengan seksama sebelum melanjutkan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>1. Persetujuan Perjanjian:</strong> Dengan mengajukan pendanaan ini, Anda menyetujui untuk mengikatkan diri dalam perjanjian investasi dengan investor yang dipilih, 
                    termasuk namun tidak terbatas pada pembagian kepemilikan saham dan/atau ROI sesuai yang telah disepakati.
                  </p>
                  <p>
                    <strong>2. Validasi Data:</strong> Anda menjamin bahwa seluruh data dan informasi bisnis yang Anda berikan adalah benar, akurat, dan dapat dipertanggungjawabkan. 
                    Penyediaan data yang tidak akurat dapat berakibat pada pembatalan perjanjian dan tuntutan hukum.
                  </p>
                  <p>
                    <strong>3. Transparansi Keuangan:</strong> Anda bersedia untuk melaporkan kondisi keuangan bisnis secara berkala kepada investor sesuai dengan ketentuan yang disepakati, 
                    termasuk laporan laba rugi, arus kas, dan neraca keuangan.
                  </p>
                  <p>
                    <strong>4. Pembagian Keuntungan:</strong> Pembagian keuntungan (ROI) akan dilakukan sesuai dengan performa bisnis dan persentase kepemilikan yang telah disepakati. 
                    Apabila bisnis mengalami kerugian, investor turut menanggung risiko kerugian tersebut sesuai proporsi kepemilikannya.
                  </p>
                  <p>
                    <strong>5. Hak dan Kewajiban:</strong> Investor memiliki hak untuk mendapat informasi berkala tentang perkembangan bisnis, namun keputusan operasional sehari-hari tetap menjadi wewenang Anda sebagai pengelola bisnis, 
                    kecuali untuk keputusan strategis besar yang memerlukan persetujuan bersama.
                  </p>
                  <p>
                    <strong>6. Jangka Waktu dan Exit Strategy:</strong> Perjanjian investasi akan berlaku sesuai jangka waktu yang disepakati. 
                    Investor berhak untuk menjual atau mengalihkan kepemilikan sahamnya sesuai dengan mekanisme yang telah diatur dalam perjanjian.
                  </p>
                  <p>
                    <strong>7. Kepatuhan Hukum:</strong> Kedua belah pihak wajib mematuhi seluruh peraturan perundang-undangan yang berlaku di Indonesia terkait investasi, perpajakan, dan usaha mikro, kecil, dan menengah (UMKM).
                  </p>
                  <p>
                    <strong>8. Penyelesaian Sengketa:</strong> Apabila terjadi perselisihan atau sengketa, kedua belah pihak sepakat untuk menyelesaikannya melalui musyawarah terlebih dahulu. 
                    Jika tidak tercapai kesepakatan, penyelesaian akan dilakukan melalui jalur hukum yang berlaku di wilayah Republik Indonesia.
                  </p>
                  <p className="text-destructive font-semibold pt-2">
                    ⚠️ Perhatian: Keputusan untuk menerima investasi merupakan komitmen serius yang mengikat secara hukum. 
                    Pastikan Anda memahami seluruh konsekuensi sebelum melanjutkan pengajuan ini.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => navigate("/cari-investor")}>
                Batalkan
              </Button>
              <Button onClick={handleSubmit} size="lg">
                Ajukan Dana
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">Pengajuan Dana Berhasil!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Pengajuan pendanaan Anda telah berhasil dikirim kepada investor. 
              Tim kami akan menghubungi Anda dalam 1-3 hari kerja untuk proses verifikasi dan persetujuan lebih lanjut.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-secondary/50 p-4 rounded-lg mt-4">
            <h4 className="font-semibold mb-2 text-sm">Langkah Selanjutnya:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Verifikasi dokumen bisnis</li>
              <li>✓ Penilaian kredit oleh AI</li>
              <li>✓ Negosiasi dengan investor</li>
              <li>✓ Penandatanganan perjanjian</li>
            </ul>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={handleCloseSuccess} className="w-full">
              Kembali ke Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FundingProposal;