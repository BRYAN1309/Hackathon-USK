import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ctaBgImage from "@/assets/investorPit.webp"; // Impor gambar background

export const CTASection = () => {
  return (
    <section className="relative py-20 px-4">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={ctaBgImage} 
          alt="Investor Meeting" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display">
            <span className="text-primary">Siap Memulai</span> Perjalanan Anda?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-sans">
            Bergabunglah dengan ribuan UMKM dan investor yang telah mempercayai TemanUsaha untuk 
            pertumbuhan bisnis dan investasi yang berkelanjutan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="hero" size="lg" className="group">
              <Link to="/register-umkm">
                Daftar sebagai UMKM
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="lg" className="group">
              <Link to="/register-investor">
                Daftar sebagai Investor
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t border-white/20">
            <p className="text-gray-300 mb-4">
              Butuh informasi lebih lanjut?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm font-sans">
              <a href="mailto:info@temanusaha.id" className="story-link font-medium text-white">
                info@temanusaha.id
              </a>
              <span className="hidden sm:inline text-gray-400">•</span>
              <a href="tel:+6281234567890" className="story-link font-medium text-white">
                +62 812-3456-7890
              </a>
              <span className="hidden sm:inline text-gray-400">•</span>
              <a href="https://wa.me/6281234567890" className="story-link font-medium text-white">
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};