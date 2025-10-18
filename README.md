# 💼 TemanUsaha  
### *Empowering UMKM with AI Micro-Investment & Analytics Platform*  

![TemanUsaha Banner](https://github.com/your-org/temanusaha/assets/banner-temanusaha.png)

> “UMKM Berkembang, Masa Depan Kuat.”  
> Platform digital berbasis **AI & Cloud** yang mempertemukan **UMKM F&B potensial di wilayah 3T (Tertinggal, Terdepan, Terluar)** dengan **investor retail maupun institusi** melalui mekanisme **micro-equity & revenue-sharing** yang transparan dan aman.

---

## 🌐 Live Preview
🚀 *Coming Soon* → [temanusaha.io](https://temanusaha.io)  
📱 *Prototype UI:* [Figma Design](https://www.figma.com/file/example/TemanUsaha-Prototype)

---

## 🎯 Visi & Misi

**Visi:**  
> Mewujudkan ekosistem investasi mikro yang inklusif, transparan, dan berkelanjutan bagi UMKM Indonesia.

**Misi:**
- 💰 Memberikan akses pembiayaan yang adil bagi UMKM 3T.  
- 🧠 Memberdayakan UMKM dengan AI & literasi finansial.  
- 🌱 Menyediakan investasi berdampak sosial dengan ROI kompetitif.  
- 🤝 Menjembatani potensi lokal dan peluang global.

---

## 🧩 UI/UX Highlights

TemanUsaha dirancang dengan prinsip **clean, data-driven, dan human-centered**.  
Berikut tampilan utama antarmuka:

| 💼 Halaman | Deskripsi | Cuplikan |
|-------------|------------|-----------|
| **Landing Page** | Berisi tagline “Empowering UMKM with Smart Investment”, CTA “Mulai Investasi Sekarang” | ![Landing UI](https://github.com/your-org/temanusaha/assets/ui-landing.png) |
| **Investor Dashboard** | Menampilkan portofolio, ROI, dan credit score setiap UMKM | ![Investor Dashboard](https://github.com/your-org/temanusaha/assets/ui-dashboard.png) |
| **UMKM Analytics** | Visualisasi performa penjualan, pengeluaran, dan skor kredit berbasis AI | ![UMKM Analytics](https://github.com/your-org/temanusaha/assets/ui-umkm.png) |
| **Marketplace UMKM** | Investor dapat menelusuri UMKM dengan filter risiko, sektor, dan lokasi | ![Marketplace](https://github.com/your-org/temanusaha/assets/ui-marketplace.png) |

**Desain Prinsip:**
- 🎨 *Minimalist visual hierarchy* (dark text on light background, ample white space).  
- 📊 *Data visual clarity* (line chart ROI, progress bars credit score).  
- 🔔 *Contextual interaction* (notifikasi real-time saat pendanaan berhasil).  
- 💬 *Trust-building tone* — setiap komponen UI menonjolkan transparansi dan dampak sosial.

---

## ⚙️ Fitur Utama

| Fitur | Deskripsi |
|-------|------------|
| 🤖 **AI Credit Scoring** | Menilai kelayakan investasi berbasis data transaksi digital (QRIS, e-wallet, marketplace). |
| 🧠 **Fraud Detection Engine** | Deteksi anomali dengan *Isolation Forest* & *Autoencoder*. |
| 💰 **Micro-Equity Investment** | Investor dapat menanam modal mulai Rp1 juta dengan kepemilikan 0.5–5%. |
| 🔄 **Automated Repayment** | Bagi hasil otomatis via Virtual Account / e-wallet. |
| 📈 **Investor Analytics Dashboard** | Menampilkan performa ROI & dampak sosial investasi. |
| 🧾 **UMKM Business Insight** | Membantu UMKM memahami arus kas, laba bersih, dan skor risiko. |

---

## 🧠 Arsitektur Sistem

**Tech Stack**

| Layer | Teknologi |
|-------|------------|
| 🖥️ Frontend | React + Vite + TailwindCSS |
| ⚙️ Backend | Python Flask / Go |
| 🧩 Database | Supabase (PostgreSQL) |
| 🧮 AI/ML | Scikit-Learn, TensorFlow |
| ☁️ Cloud | AWS / GCP |
| 💳 Payment | Xendit / Midtrans |
| 🔒 Security | AES-256 Encryption, KYC Dukcapil API |

```mermaid
graph TD
  A[Frontend - React/Vite] --> B[Backend API - Flask/Go]
  B --> C[AI/ML Engine]
  B --> D[Payment Gateway]
  B --> E[Database - Supabase]
  C --> E
  D --> E
  F[Investor/UMKM] --> A
