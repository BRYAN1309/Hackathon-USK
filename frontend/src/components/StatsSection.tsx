import { stats } from "@/data/stats";

export const StatsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Dampak Nyata yang Kami Ciptakan</h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Bersama-sama memberdayakan UMKM dan menciptakan peluang ekonomi di seluruh Indonesia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl font-semibold mb-1">{stat.label}</div>
                <div className="text-primary-foreground/80">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};