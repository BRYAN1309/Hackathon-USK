import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Mail, MapPin, Phone, User } from "lucide-react";
import { umkmDetail } from "@/data/umkm";
import { userGamification, gamificationLevels } from "@/data/gamification";

const UMKMProfile = () => {
  const currentLevel = gamificationLevels.find(l => l.level === userGamification.level);
  const nextLevel = gamificationLevels.find(l => l.minPoints > (currentLevel?.minPoints ?? 0));
  
  const progressPercentage = nextLevel
    ? ((userGamification.points - (currentLevel?.minPoints ?? 0)) / (nextLevel.minPoints - (currentLevel?.minPoints ?? 0))) * 100
    : 100;

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar type="umkm" />
      <div className="flex-1">
        <DashboardHeader userName={umkmDetail.name} />
        <main className="p-6 space-y-6 animate-fade-in-up">
          <h1 className="text-3xl font-bold">Profil Usaha</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Detail Usaha</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${umkmDetail.name.replace(" ", "+")}&background=random`} />
                      <AvatarFallback>{umkmDetail.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">{umkmDetail.name}</h2>
                      <p className="text-white/80">{umkmDetail.category}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/30">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-white/80" />
                      <span>{umkmDetail.owner}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-white/80" />
                      <span>{umkmDetail.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-white/80" />
                      <span>email@contoh.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white/80" />
                      <span>{umkmDetail.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Level & Poin
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="default" className="text-lg mb-4">{userGamification.level}</Badge>
                  <p className="text-4xl font-bold">{userGamification.points.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Poin Saat Ini</p>
                  
                  <div className="mt-6 text-left">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>{currentLevel?.level} ({currentLevel?.minPoints} Poin)</span>
                      {nextLevel && <span>{nextLevel.level} ({nextLevel.minPoints} Poin)</span>}
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    {nextLevel && (
                       <p className="text-xs text-center mt-2 text-muted-foreground">
                         Kumpulkan {nextLevel.minPoints - userGamification.points} poin lagi untuk naik level!
                       </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UMKMProfile;