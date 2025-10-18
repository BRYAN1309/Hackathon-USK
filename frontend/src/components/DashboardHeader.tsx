import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";

interface DashboardHeaderProps {
  userName?: string;
  notificationOpen?: boolean;
  setNotificationOpen?: (open: boolean) => void;
  handleKlaim?: () => void;
}

export const DashboardHeader = ({ userName = "User", notificationOpen, setNotificationOpen, handleKlaim }: DashboardHeaderProps) => {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="bg-background border-b border-border py-4 px-6">
      <div className="flex items-center justify-end space-x-4">
        {handleKlaim && setNotificationOpen && (
            <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Notifikasi</h4>
                            <p className="text-sm text-muted-foreground">
                                Investor Pro Memberikan dana Rp 50,000,000 dengan menuntut imbalan 15% Saham kepemilikan !!!
                            </p>
                        </div>
                        <Button onClick={handleKlaim}>Klaim</Button>
                    </div>
                </PopoverContent>
            </Popover>
        )}
        <span className="font-bold text-lg">{userName}</span>
      </div>
    </header>
  );
};