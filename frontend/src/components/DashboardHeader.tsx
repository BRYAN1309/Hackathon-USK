import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
}

export const DashboardHeader = ({ userName = "User" }: DashboardHeaderProps) => {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="bg-background border-b border-border py-4 px-6">
      <div className="flex items-center justify-end">
        <span className="font-bold text-lg">{userName}</span>
      </div>
    </header>
  );
};
