import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "@/assets/Logo.svg";

const LoginUMKM = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard-umkm");
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="relative w-full">
            <img
              src={logo}
              alt="TemanUsaha"
              className="block mx-auto w-48 h-auto md:w-56 drop-shadow-md transition-transform duration-300 hover:scale-105"
              style={{ position: "relative", left: "30px" }}
            />
          </div>

          {/* Judul */}
          <CardTitle className="text-2xl font-bold mt-2">Login UMKM</CardTitle>
          <CardDescription>Masuk ke akun UMKM Anda</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Tombol Masuk */}
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
              size="lg"
            >
              Masuk
            </Button>

            {/* Link Daftar */}
            <p className="text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link
                to="/register-umkm"
                className="text-primary font-medium hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginUMKM;
