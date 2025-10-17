import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Heart, BarChart3, Users, Zap } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "AI Credit Scoring",
      description: "Sistem penilaian kredit berbasis AI yang akurat dan real-time untuk menilai kelayakan UMKM.",
    },
    {
      icon: Shield,
      title: "Fraud Detection",
      description: "Teknologi canggih untuk mendeteksi dan mencegah aktivitas penipuan demi keamanan investasi.",
    },
    {
      icon: Heart,
      title: "Dampak Sosial",
      description: "Memberdayakan UMKM di wilayah 3T untuk menciptakan dampak ekonomi yang berkelanjutan.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Dashboard analitik lengkap untuk memantau performa bisnis dan investasi Anda.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Bergabung dengan komunitas investor dan UMKM yang saling mendukung pertumbuhan.",
    },
    {
      icon: Zap,
      title: "Quick Investment",
      description: "Proses investasi yang cepat dan mudah dengan sistem micro-equity yang transparan.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Fitur Unggulan</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Platform lengkap dengan teknologi AI untuk menghubungkan UMKM dengan investor secara aman dan efisien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
