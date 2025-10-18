import { useState } from "react";
import { Home, BarChart3, Receipt, Users, Search } from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const investorsData = [
  {
    id: 1,
    name: "PT Maju Bersama",
    type: "Institusi",
    portfolio: "25 UMKM",
    avgROI: "18.5%",
    focus: "F&B, Retail",
    minInvestment: "Rp 100JT",
    description: "Investor institusi dengan fokus pada UMKM F&B di wilayah 3T. Memiliki track record yang solid dalam mendukung pertumbuhan bisnis mikro dengan pendekatan berkelanjutan."
  },
  {
    id: 2,
    name: "Budi Santoso",
    type: "Retail",
    portfolio: "8 UMKM",
    avgROI: "15.2%",
    focus: "F&B",
    minInvestment: "Rp 50JT",
    description: "Investor retail berpengalaman dengan passion di industri kuliner. Aktif memberikan mentoring dan networking untuk mitra UMKM."
  },
  {
    id: 3,
    name: "CV Ventura Nusantara",
    type: "Institusi",
    portfolio: "42 UMKM",
    avgROI: "20.3%",
    focus: "F&B, UMKM Digital",
    minInvestment: "Rp 150JT",
    description: "Perusahaan venture capital yang fokus pada pemberdayaan UMKM di daerah terpencil. Menyediakan pendampingan bisnis dan teknologi."
  },
  {
    id: 4,
    name: "Siti Nurhaliza",
    type: "Retail",
    portfolio: "5 UMKM",
    avgROI: "12.8%",
    focus: "F&B Tradisional",
    minInvestment: "Rp 30JT",
    description: "Entrepreneur sukses yang ingin berkontribusi pada pengembangan UMKM lokal, terutama yang melestarikan kuliner tradisional."
  },
  {
    id: 5,
    name: "PT Investasi Rakyat",
    type: "Institusi",
    portfolio: "60 UMKM",
    avgROI: "16.7%",
    focus: "Multi-Sektor",
    minInvestment: "Rp 200JT",
    description: "Lembaga investasi dengan misi sosial untuk mendorong inklusi ekonomi melalui pendanaan UMKM di seluruh Indonesia."
  },
  {
    id: 6,
    name: "Ahmad Fauzi",
    type: "Retail",
    portfolio: "3 UMKM",
    avgROI: "14.1%",
    focus: "F&B Modern",
    minInvestment: "Rp 25JT",
    description: "Investor muda yang tertarik mendukung UMKM dengan konsep modern dan inovatif, terutama yang memanfaatkan teknologi digital."
  },
];

const ListInvestor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvestor, setSelectedInvestor] = useState<typeof investorsData[0] | null>(null);
  const navigate = useNavigate();

  const filteredInvestors = investorsData.filter(investor =>
    investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    investor.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
    investor.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAjukanDana = () => {
    setSelectedInvestor(null);
    navigate(`/funding-proposal/${selectedInvestor?.id}`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar type="umkm" />
      
      <div className="flex-1">
        <DashboardHeader userName="Warung Makan Sederhana" />
        
        <main className="p-6 animate-fade-in-up">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Cari Investor untuk Didanai</h2>
            <p className="text-muted-foreground">Temukan investor yang sesuai dengan kebutuhan bisnis Anda</p>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Cari investor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map((investor) => (
              <Card key={investor.id} className="border-border hover:shadow-elegant transition-smooth flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{investor.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {investor.type}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Portfolio:</span>
                      <span className="font-medium">{investor.portfolio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg ROI:</span>
                      <span className="font-medium text-green-600">{investor.avgROI}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fokus:</span>
                      <span className="font-medium">{investor.focus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min. Investasi:</span>
                      <span className="font-medium">{investor.minInvestment}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setSelectedInvestor(investor)}
                    className="w-full"
                    variant="transparent-gradient"
                  >
                    Lihat Detail
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredInvestors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada investor yang sesuai dengan pencarian Anda</p>
            </div>
          )}
        </main>
      </div>

      <Dialog open={!!selectedInvestor} onOpenChange={() => setSelectedInvestor(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedInvestor?.name}</DialogTitle>
            <DialogDescription>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary mt-2">
                {selectedInvestor?.type}
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Tentang Investor</h4>
              <p className="text-muted-foreground">{selectedInvestor?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Total Portfolio</p>
                <p className="text-lg font-semibold">{selectedInvestor?.portfolio}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rata-rata ROI</p>
                <p className="text-lg font-semibold text-green-600">{selectedInvestor?.avgROI}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fokus Industri</p>
                <p className="text-lg font-semibold">{selectedInvestor?.focus}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Minimal Investasi</p>
                <p className="text-lg font-semibold">{selectedInvestor?.minInvestment}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedInvestor(null)}>
              Tutup
            </Button>
            <Button onClick={handleAjukanDana}>
              Ajukan Dana
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListInvestor;