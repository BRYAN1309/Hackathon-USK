import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={sectionRef} className={`bg-background border-t border-border transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Main content area with Flexbox */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-8">
          
          {/* Brand Column (Left Side) */}
          <div className="space-y-4 lg:w-1/3">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative w-full">
                <img
                  src={logo}
                  alt="TemanUsaha"
                  className="block mx-auto w-48 h-auto md:w-56 drop-shadow-md transition-transform duration-300 hover:scale-105"
                  style={{ position: "relative", left: "0px" }}
                />
              </div>
            </Link>
            <p className="text-muted-foreground">
              AI Micro-Investment Platform yang mempertemukan UMKM dengan investor.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Side container for Resources and Contact */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-20">
            {/* Resources Column */}
            <div>
              <h3 className="font-semibold mb-4 font-display">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Cara Kerja
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link to="/digitalisasi-guide" className="text-muted-foreground hover:text-primary transition-colors">
                    Panduan Digitalisasi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div>
              <h3 className="font-semibold mb-4 font-display">Hubungi Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Jl. Kebon Jeruk Raya No. 27, Jakarta Barat 11530</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <a href="tel:6282116801709" className="hover:text-primary transition-colors">
                    +62 821-1680-1709
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <a href="mailto:info@temanusaha.id" className="hover:text-primary transition-colors">
                    info@temanusaha.id
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 TemanUsaha. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};