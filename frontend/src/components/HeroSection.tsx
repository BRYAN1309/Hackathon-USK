import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="UMKM Success" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">UMKM Berkembang,</span>
            <br />
            <span className="text-primary">Masa Depan Kuat</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Platform AI Micro-Investment yang mempertemukan UMKM F&B wilayah 3T dengan investor.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-medium">AI Credit Scoring & Fraud Detection</span>
            </div>
            <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-medium">Investasi Aman & Transparan</span>
            </div>
            <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-medium">Dampak Sosial Nyata bagi UMKM 3T</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
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
