import { stepsUMKM, stepsInvestor } from "@/data/howItWorks";
import { useEffect, useRef, useState } from "react";

export const HowItWorksSection = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-secondary">
      <div className="container mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-4 font-display">
            <span className="text-primary">Bagaimana Cara</span> Kerjanya?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Proses yang sederhana dan transparan untuk UMKM dan Investor
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Kotak Alur UMKM */}
          <div className={`bg-background rounded-2xl p-8 lg:p-10 shadow-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "200ms" }}>
            <h3 className="text-2xl font-bold mb-10 text-primary text-center font-display">
              Untuk UMKM
            </h3>
            <div className="relative flex flex-col gap-8">
              {stepsUMKM.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-5 items-start relative">
                    {/* Garis Vertikal (kecuali untuk item terakhir) */}
                    {index < stepsUMKM.length - 1 && (
                      <div className="absolute left-6 top-12 h-full border-l-2 border-dashed border-border" />
                    )}
                    
                    <div className="flex-shrink-0 z-10 bg-background">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-semibold font-display">{step.title}</h4>
                      </div>
                      <p className="text-muted-foreground font-sans">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kotak Alur Investor */}
          <div className={`bg-background rounded-2xl p-8 lg:p-10 shadow-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "400ms" }}>
            <h3 className="text-2xl font-bold mb-10 text-primary text-center font-display">
              Untuk Investor
            </h3>
            <div className="relative flex flex-col gap-8">
              {stepsInvestor.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-5 items-start relative">
                    {/* Garis Vertikal (kecuali untuk item terakhir) */}
                    {index < stepsInvestor.length - 1 && (
                       <div className="absolute left-6 top-12 h-full border-l-2 border-dashed border-border" />
                    )}

                    <div className="flex-shrink-0 z-10 bg-background">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-semibold font-display">{step.title}</h4>
                      </div>
                      <p className="text-muted-foreground font-sans">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};