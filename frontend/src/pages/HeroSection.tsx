import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="UMKM Success" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            BISNIS YANG <span className="text-primary">ANDA</span> IMPIKAN,
            <br />
            PERTUMBUHAN YANG <span className="text-primary">MEREKA</span> PERCAYAI
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            Platform AI Micro-Investment yang mempertemukan UMKM F&B wilayah 3T dengan investor untuk pertumbuhan dan kesuksesan tanpa batas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <Button 
              asChild 
              variant="hero" 
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link to="/register-umkm">Gabung sebagai UMKM</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link to="/register-investor">Gabung sebagai Investor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};