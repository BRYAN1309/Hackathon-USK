import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginUMKM from "./pages/LoginUMKM";
import LoginInvestor from "./pages/LoginInvestor";
import RegisterUMKM from "./pages/RegisterUMKM";
import RegisterInvestor from "./pages/RegisterInvestor";
import DashboardUMKM from "./pages/DashboardUMKM";
import DashboardInvestor from "./pages/DashboardInvestor";
import UMKMList from "./pages/UMKMList";
import UMKMDetail from "./pages/UMKMDetail";
import RiwayatTransaksiUMKM from "./pages/RiwayatTransaksiUMKM";
import AnalisisUMKM from "./pages/AnalisisUMKM";
import DigitalisasiGuide from "./pages/DigitalisasiGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login-umkm" element={<LoginUMKM />} />
          <Route path="/login-investor" element={<LoginInvestor />} />
          <Route path="/register-umkm" element={<RegisterUMKM />} />
          <Route path="/register-investor" element={<RegisterInvestor />} />
          <Route path="/dashboard-umkm" element={<DashboardUMKM />} />
          <Route path="/dashboard-umkm/analisis" element={<AnalisisUMKM />} />
          <Route path="/dashboard-umkm/riwayat" element={<RiwayatTransaksiUMKM />} />
          <Route path="/dashboard-investor" element={<DashboardInvestor />} />
          <Route path="/dashboard-investor/umkm-list" element={<UMKMList />} />
          <Route path="/dashboard-investor/umkm/:id" element={<UMKMDetail />} />
          <Route path="/digitalisasi-guide" element={<DigitalisasiGuide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
