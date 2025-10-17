import { stepsUMKM, stepsInvestor } from "@/data/howItWorks";

export const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Bagaimana Cara Kerjanya?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Proses yang sederhana dan transparan untuk UMKM dan Investor
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* UMKM Flow */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="text-2xl font-bold mb-8 text-primary">Untuk UMKM</h3>
            <div className="space-y-6">
              {stepsUMKM.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-semibold">{step.title}</h4>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Investor Flow */}
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h3 className="text-2xl font-bold mb-8 text-primary">Untuk Investor</h3>
            <div className="space-y-6">
              {stepsInvestor.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-semibold">{step.title}</h4>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
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