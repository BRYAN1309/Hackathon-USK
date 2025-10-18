// src/data/gamification.ts
import { ShieldCheck, TrendingUp, PiggyBank, Award } from "lucide-react";

export const gamificationLevels = [
  { level: "Perunggu", minPoints: 0 },
  { level: "Perak", minPoints: 500 },
  { level: "Emas", minPoints: 1500 },
  { level: "Berlian", minPoints: 5000 },
];

export const userGamification = {
  points: 1250,
  level: "Perak",
};

export const umkmTasks = [
  {
    id: 1,
    title: "Mempertahankan Skor Kredit > 80",
    description: "Jaga skor kredit Anda di atas 80 selama 1 bulan penuh.",
    points: 150,
    category: "Keuangan",
    icon: ShieldCheck,
    isCompleted: true,
  },
  {
    id: 2,
    title: "Naikkan Total Revenue 5%",
    description: "Tingkatkan total pendapatan bulanan Anda sebesar 5% dari bulan sebelumnya.",
    points: 200,
    category: "Pertumbuhan",
    icon: TrendingUp,
    isCompleted: false,
  },
  {
    id: 3,
    title: "Lengkapi Profil Usaha 100%",
    description: "Isi semua informasi yang diperlukan pada profil usaha Anda.",
    points: 50,
    category: "Administrasi",
    icon: Award,
    isCompleted: true,
  },
  {
    id: 4,
    title: "Menabung Rutin",
    description: "Lakukan setoran tabungan usaha minimal 4 kali dalam sebulan.",
    points: 100,
    category: "Keuangan",
    icon: PiggyBank,
    isCompleted: false,
  },
];