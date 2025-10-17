import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Siap Memulai Perjalanan Anda?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
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
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/register-investor">
                Daftar sebagai Investor
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t border-border">
            <p className="text-muted-foreground mb-4">
              Butuh informasi lebih lanjut?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <a href="mailto:info@temanusaha.id" className="story-link font-medium">
                info@temanusaha.id
              </a>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <a href="tel:+6281234567890" className="story-link font-medium">
                +62 812-3456-7890
              </a>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <a href="https://wa.me/6281234567890" className="story-link font-medium">
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
