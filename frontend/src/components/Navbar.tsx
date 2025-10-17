import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.svg";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="TemanUsaha Logo" 
              className="w-100 h-100 transition-transform group-hover:scale-110" 
            />
          </Link>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              asChild 
              variant="hero" 
              size="default"
              className="font-semibold"
            >
              <Link to="/login-umkm">UMKM</Link>
            </Button>
            <Button 
              asChild 
              variant={isScrolled ? "outline" : "hero-outline"}
              size="default"
              className="font-semibold"
            >
              <Link to="/login-investor">Investor</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
