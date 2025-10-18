// src/pages/UMKMTugas.tsx
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award } from "lucide-react";
import { umkmTasks, userGamification } from "@/data/gamification";

const UMKMTugas = () => {
  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="umkm" />
      <div className="flex-1">
        <DashboardHeader userName="Warung Makan Sederhana" />
        <main className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">Tugas & Tantangan</h1>
              <p className="text-muted-foreground">
                Selesaikan tugas untuk mendapatkan poin dan naik level!
              </p>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-bold text-primary text-lg">{userGamification.points} Poin</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Level: {userGamification.level}</p>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Daftar Tugas</CardTitle>
              <CardDescription>Pilih tugas di bawah ini untuk diselesaikan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {umkmTasks.map(task => {
                const Icon = task.icon;
                return (
                  <div key={task.id} className={`border rounded-lg p-4 flex items-center justify-between transition-colors ${task.isCompleted ? 'bg-green-50 border-green-200' : 'hover:bg-muted'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${task.isCompleted ? 'bg-green-100' : 'bg-primary/10'}`}>
                        <Icon className={`w-6 h-6 ${task.isCompleted ? 'text-green-600' : 'text-primary'}`} />
                      </div>
                      <div>
                        <p className={`font-semibold ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {task.isCompleted ? (
                        <div className="flex items-center gap-2 text-green-600">
                           <CheckCircle2 className="w-5 h-5" />
                           <span className="font-semibold">Selesai</span>
                        </div>
                      ) : (
                        <>
                           <p className="font-bold text-lg text-primary">+{task.points} Poin</p>
                           <Button size="sm" className="mt-1">Kerjakan</Button>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UMKMTugas;