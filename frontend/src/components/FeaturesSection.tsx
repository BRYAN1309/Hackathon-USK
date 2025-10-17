import { features } from "@/data/features";
import umkmImage1 from "@/assets/umkm-1.jpg";
import umkmImage2 from "@/assets/umkm-2.jpg";

export const FeaturesSection = () => {
  return (
    <section className="relative py-20 px-4 min-h-screen flex items-center">
      {/* Latar Belakang Penuh dengan umkm-1.jpg */}
      <div className="absolute inset-0 z-0">
        <img
          src={umkmImage1}
          alt="Produk-produk UMKM Indonesia"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Konten Utama */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Kolom Kiri: Box dengan gambar umkm-2.jpg */}
          <div className="w-full h-full bg-background/50 backdrop-blur-md rounded-2xl p-4 shadow-2xl animate-fade-in">
            <img
              src={umkmImage2}
              alt="Kegiatan UMKM"
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          {/* Kolom Kanan: Satu Card Besar untuk Semua Fitur */}
          <div 
            className="font-sans w-full bg-background/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in" 
            style={{ animationDelay: "200ms" }}
          >
            <div className="text-left mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
                Kenapa <span className="text-primary">Memilih Teman</span> Usaha?
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Kami adalah mitra pertumbuhan yang menggabungkan teknologi AI canggih dengan dampak sosial nyata.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-display">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {feature.description}
                      </p>
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